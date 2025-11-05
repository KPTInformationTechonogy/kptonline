from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from api.routers import auth, user, product, cart, order, admin
from api.db.session import Base, engine
from api import models
from api.routers import inquiry

Base.metadata.create_all(bind=engine)
app = FastAPI(
    title="E-commerce API",
    description="Backend for a modern e-commerce web application built with FastAPI.",
    version="0.1.0",
    docs_url="/docs",
    redoc_url="/redoc"
)
# CORS configuration
origins = [
    "http://localhost",
    "http://localhost:3000", # Example frontend URL
    # Add other allowed origins for your production frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/v1")
app.include_router(user.router, prefix="/api/v1")
app.include_router(product.router, prefix="/api/v1")
app.include_router(cart.router, prefix="/api/v1")
app.include_router(order.router, prefix="/api/v1")
app.include_router(admin.router, prefix="/api/v1")
app.include_router(inquiry.router, prefix="/api/v1")
app.mount("/static", StaticFiles(directory="static"), name="static")


@app.get("/")
async def root():
    return {"message": "Welcome to the E-commerce API!"}

# Example of applying rate limiting globally (or to specific routes via dependencies)
# For a more robust rate limiter, consider `fastapi-limiter` with Redis.
# @app.middleware("http")
# async def apply_rate_limit(request: Request, call_next):
#     try:
#         await rate_limit(request)
#     except HTTPException as e:
#         return JSONResponse(status_code=e.status_code, content={"detail": e.detail})
#     response = await call_next(request)
#     return responsep