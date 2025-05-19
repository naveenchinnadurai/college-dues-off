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

class AttendanceStatus(Enum):
    PRESENT = "Present"
    ABSENT = "Absent"
    EXCUSED = "Excused"


    
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
    
# ---------------- Department Schemas ----------------

class DepartmentBase(BaseModel):
    name: str
    HOD: UUID  # Staff ID

class DepartmentResponse(DepartmentBase):
    id: UUID
    
    model_config = {
        "from_attributes": True  # This replaces orm_mode=True
    }
    
# ---------------- Class Staff Subject Schemas ----------------

class SubjectCreate(BaseModel):
    code: str
    name: str

class SubjectResponse(SubjectCreate):
    id: UUID

class ClassCreate(BaseModel):
    id: str
    advisor: UUID  # Staff ID
    semester: int
    department: UUID  # Department ID
    year: str
    batch: str

class ClassResponse(ClassCreate):

    model_config = ConfigDict(from_attributes=True)
    
class DepartmentCreate(BaseModel):
    name: str
    HOD: UUID  # Staff ID

class DepartmentResponse(DepartmentCreate):
    id: UUID
    
    model_config = ConfigDict(from_attributes=True)

class SubjectAssignmentRequest(BaseModel):
    class_id: str
    subject_id: UUID
    staff_id: UUID



# ---------------- Student Schemas ----------------

class StudentBase(BaseModel):
    reg_no: str
    roll_no: str
    name: str
    email: Optional[EmailStr] = None
    class_id: Optional[str] = None

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
    
# ---------------- OnDutyRequest Schemas ----------------

class OnDutyRequestBase(BaseModel):
    student_id: str
    reason: str
    url: str
    from_date: datetime
    to_date: datetime

class OnDutyRequestResponse(OnDutyRequestBase):
    id: UUID
    status: RequestStatus
    created_on: Optional[datetime] = None
    updated_on: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)
    
# ---------------- Bonafide Request Schemas ----------------
class BonafideRequestBase(BaseModel):
    reason: str
    url: str
    from_date: datetime
    to_date: datetime
    
class BonafideRequestResponse(BonafideRequestBase):
    id: UUID
    student_id: str
    status: RequestStatus
    created_on: Optional[datetime] = None
    updated_on: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)

# ---------------- Approval Schemas ----------------
class ApprovalBase(BaseModel):
    staff_id: UUID
    request_id: UUID
    status: RequestStatus
    message: Optional[str] = None
    created_on: Optional[datetime] = None

class ApprovalResponse(ApprovalBase):
    id: UUID
    request_id: UUID
    staff_id: UUID
    status: RequestStatus
    message: Optional[str] = None
    created_on: Optional[datetime] = None
    updated_on: Optional[datetime] = None
    
    model_config = ConfigDict(from_attributes=True)

# ---------------- Announcement Schemas ----------------

class AnnouncementCreate(BaseModel):
    title: str
    content: str

class AnnouncementResponse(AnnouncementCreate):
    id: UUID
    created_on: datetime

    model_config = ConfigDict(from_attributes=True)
    
# ---------------- Attendance Schemas ----------------
class Attendance(BaseModel):
    student_id: str
    status: AttendanceStatus
    date: datetime