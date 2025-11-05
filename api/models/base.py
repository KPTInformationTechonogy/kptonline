from sqlalchemy import Column, Integer
from api.db.base_class import Base

class BaseModel(Base):
    __abstract__ = True
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)