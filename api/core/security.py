from fastapi import HTTPException, status, Depends
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from api.db.session import get_db
from api.core.utils import decode_access_token
from api.crud import user as crud_user
from api.schemas.auth import TokenData
from api.models.user import User, UserRole

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/v1/auth/login")

async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    token_data = decode_access_token(token)
    if token_data is None or token_data.email is None:
        raise credentials_exception
    user = crud_user.get_user_by_email(db, email=token_data.email)
    if user is None:
        raise credentials_exception
    return user

def get_current_active_user(current_user: User = Depends(get_current_user)) -> User:
    if not current_user.is_active:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Inactive user")
    return current_user

def require_role(required_roles: list[UserRole]):
    def role_checker(current_user: User = Depends(get_current_active_user)):
        if current_user.role not in required_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Not enough permissions. Required roles: {', '.join([role.value for role in required_roles])}",
            )
        return current_user
    return role_checker

# Basic rate limiting (conceptual, for a real app use a dedicated library like `fastapi-limiter`)
from starlette.requests import Request
from starlette.responses import JSONResponse
from collections import defaultdict
import time

_request_counts = defaultdict(lambda: {"count": 0, "last_reset": time.time()})
_RATE_LIMIT_DURATION = 60 # seconds
_MAX_REQUESTS = 100 # requests

async def rate_limit(request: Request):
    ip_address = request.client.host
    current_time = time.time()

    if current_time - _request_counts[ip_address]["last_reset"] > _RATE_LIMIT_DURATION:
        _request_counts[ip_address]["count"] = 0
        _request_counts[ip_address]["last_reset"] = current_time

    _request_counts[ip_address]["count"] += 1

    if _request_counts[ip_address]["count"] > _MAX_REQUESTS:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Too many requests. Please try again later.",
            headers={"Retry-After": str(_RATE_LIMIT_DURATION)},
        )