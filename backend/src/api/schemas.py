from pydantic import BaseModel, EmailStr
from datetime import datetime

class JoinRequest(BaseModel):
    name: str
    email: EmailStr
    phone_number: str
    message: str
