from pydantic import BaseModel
from typing import List, Optional

class SubjectBase(BaseModel):
    id: str
    name: str
    semester: int

    class Config:
        from_attributes = True

class StaffBase(BaseModel):
    email: str
    name: str
    role: List[str]
    advisor_for: Optional[str]
    subject_taking: List[str]

class StaffCreate(StaffBase):
    password: str

class StaffResponse(StaffBase):
    subjects: List[SubjectBase]

    class Config:
        from_attributes = True

class StudentBase(BaseModel):
    reg_no: str
    roll_no: str
    name: str
    email: str
    dept: str
    year: str
    current_semester: int

class StudentCreate(StudentBase):
    password: str

class StudentResponse(StudentBase):
    subjects: List[SubjectBase]

    class Config:
        from_attributes = True

class NoDuesRequestBase(BaseModel):
    student_reg_no: str
    subject_id: str
    status: str = "Pending"

class NoDuesRequestResponse(NoDuesRequestBase):
    id: int
    student: StudentBase
    subject: SubjectBase

    class Config:
        from_attributes = True