# schemas.py

from pydantic import BaseModel, EmailStr, ConfigDict
from typing import Optional
from uuid import UUID
from enum import Enum
from datetime import datetime

# Enum
class RequestStatus(str, Enum):
    Pending = "Pending"
    Approved = "Approved"
    Rejected = "Rejected"
    
    
# ---------------- Staff Schemas ----------------
class StaffCreate(BaseModel):
    email: EmailStr
    name: str
    password: str
    role: Optional[str] = None
    
class StaffResponse(BaseModel):
    id: UUID
    email: EmailStr
    name: str
    role: Optional[str]

    model_config = ConfigDict(from_attributes=True)
    
class NoDuesRequestResponse(BaseModel):
    id: UUID
    subject_id: UUID
    staff_id: UUID
    student_id: str
    status: RequestStatus
    message: Optional[str] = None
    updated_on: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)
    
# ---------------- Class Staff Subject Schemas ----------------

class SubjectCreate(BaseModel):
    code: str
    name: str

class SubjectResponse(SubjectCreate):
    id: UUID
    
class DepartmentCreate(BaseModel):
    name: str
    HOD: UUID  # Staff ID

class DepartmentResponse(DepartmentCreate):
    id: UUID

class SubjectAssignmentRequest(BaseModel):
    class_id: str
    subject_id: UUID
    staff_id: UUID




# ---------------- Student Schemas ----------------

class StudentBase(BaseModel):
    reg_no: str
    roll_no: str
    name: str
    email: Optional[EmailStr]
    class_id: Optional[str]

class StudentCreate(StudentBase):
    password: str

class StudentResponse(StudentBase):
    model_config = ConfigDict(from_attributes=True)

# ---------------- No Dues Request Schemas ----------------

class NoDuesRequestBase(BaseModel):
    subject_id: UUID

class NoDuesRequestResponse(BaseModel):
    id: UUID
    subject_id: UUID
    student_id: str
    staff_id: UUID
    message: Optional[str] = None
    status: RequestStatus
    created_on: Optional[datetime] = None
    updated_on: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)
