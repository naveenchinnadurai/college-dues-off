from sqlalchemy import (
    Column, String, Integer, Enum, ForeignKey, Text, Date, DateTime, Float, PrimaryKeyConstraint, Table, UniqueConstraint
)
from sqlalchemy.orm import relationship, backref
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.dialects.postgresql import UUID
from db.database import Base
from datetime import datetime
import enum
import uuid
import pytz

def get_ist_time():
    utc_now = datetime.utcnow()
    ist_now = pytz.utc.localize(utc_now).astimezone(pytz.timezone("Asia/Kolkata"))
    return ist_now

# Enums
class RequestStatus(enum.Enum):
    Pending = "Pending"
    Approved = "Approved"
    Rejected = "Rejected"


class BonafideType(enum.Enum):
    General = "General"
    Address_Proof = "Address_Proof"
    Scholarship = "Scholarship"
    Passport = "Passport"


# Models

class Student(Base):
    __tablename__ = "students"
    reg_no = Column(String, primary_key=True)
    roll_no = Column(String, unique=True, nullable=False)
    name = Column(String, nullable=False)
    email = Column(String)
    password = Column(Text, nullable=False)
    class_id = Column(String, ForeignKey("classes.id"))
    
    class_ = relationship("Class", back_populates="students")
    bonafide_requests = relationship("BonafideRequest", back_populates="student", cascade="all, delete-orphan")
    onduty_requests = relationship("OnDutyRequest", back_populates="student", cascade="all, delete-orphan")
    no_dues_requests = relationship("NoDuesRequest", back_populates="student", cascade="all, delete-orphan")
    internal_marks = relationship("InternalMark", back_populates="student", cascade="all, delete-orphan")

class Staff(Base):
    __tablename__ = "staffs"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String, unique=True, nullable=False)
    name = Column(String, nullable=False)
    password = Column(String, nullable=False)
    role = Column(String)
    # department = Column(UUID(as_uuid=True), ForeignKey("department.id"))
    class_staff_links = relationship("ClassStaffSubject", back_populates="staff", cascade="all, delete-orphan")
    subjects = association_proxy('class_staff_links', 'subject',creator=lambda subject: ClassStaffSubject(subject=subject))
    classes = association_proxy('class_staff_links', 'class_',creator=lambda class_: ClassStaffSubject(class_=class_))

    advisor_for = relationship("Class", back_populates="advisor_obj", uselist=False, foreign_keys="Class.advisor")
    department_hod = relationship("Department", back_populates="hod_obj", uselist=False, foreign_keys="Department.HOD")

class Class(Base):
    __tablename__ = "classes"
    id = Column(String, primary_key=True)
    advisor = Column(UUID(as_uuid=True), ForeignKey("staffs.id"), unique=True)
    semester = Column(Integer)
    department = Column(UUID(as_uuid=True), ForeignKey("department.id"), nullable=True)
    year = Column(String)
    batch = Column(String)
    
    students = relationship("Student", back_populates="class_", cascade="all, delete-orphan")
    advisor_obj = relationship("Staff", back_populates="advisor_for", foreign_keys=[advisor])
    department_obj = relationship("Department", back_populates="classes")
    
    class_staff_links = relationship("ClassStaffSubject", back_populates="class_", cascade="all, delete-orphan")
    subjects = association_proxy('class_staff_links', 'subject',creator=lambda subject: ClassStaffSubject(subject=subject))
    staff_members = association_proxy('class_staff_links', 'staff',creator=lambda staff: ClassStaffSubject(staff=staff))


class Department(Base):
    __tablename__ = "department"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String)
    HOD = Column(UUID(as_uuid=True), ForeignKey("staffs.id"), unique=True)
    
    hod_obj = relationship("Staff", back_populates="department_hod", foreign_keys=[HOD])
    classes = relationship("Class", back_populates="department_obj", cascade="all, delete-orphan")

class Subject(Base):
    __tablename__ = "subjects"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    code = Column(String)
    name = Column(String)
    
    class_staff_links = relationship("ClassStaffSubject", back_populates="subject", cascade="all, delete-orphan")
    classes = association_proxy('class_staff_links', 'class_', creator=lambda class_: ClassStaffSubject(class_=class_))
    staff_members = association_proxy('class_staff_links', 'staff', creator=lambda staff: ClassStaffSubject(staff=staff))
    no_dues_requests = relationship("NoDuesRequest", back_populates="subject", cascade="all, delete-orphan")
    internal_marks = relationship("InternalMark", back_populates="subject", cascade="all, delete-orphan")


class ClassStaffSubject(Base):
    __tablename__ = "class_staff_subjects"
    class_id = Column(String, ForeignKey("classes.id"))
    subject_id = Column(UUID(as_uuid=True), ForeignKey("subjects.id"))
    staff_id = Column(UUID(as_uuid=True), ForeignKey("staffs.id"))
    
    class_ = relationship("Class", back_populates="class_staff_links")
    subject = relationship("Subject", back_populates="class_staff_links")
    staff = relationship("Staff", back_populates="class_staff_links")
    
    __table_args__ = (
        PrimaryKeyConstraint('class_id', 'subject_id', 'staff_id'),  # Composite key
    )

class NoDuesRequest(Base):
    __tablename__ = "no_dues_requests"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    status = Column(Enum(RequestStatus))
    student_id = Column(String, ForeignKey("students.reg_no"))
    subject_id = Column(UUID(as_uuid=True), ForeignKey("subjects.id"))
    staff_id = Column(UUID(as_uuid=True), ForeignKey("staffs.id"))
    message = Column(Text)
    created_on = Column(DateTime(timezone=True), default=datetime.utcnow)
    
    student = relationship("Student", back_populates="no_dues_requests")
    subject = relationship("Subject", back_populates="no_dues_requests")


class BonafideRequest(Base):
    __tablename__ = "bonafide_requests"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    bonafide_type = Column(Enum(BonafideType))
    purpose = Column(String)
    message = Column(String)
    student_id = Column(String, ForeignKey("students.reg_no"))
    created_on = Column(DateTime, default=datetime.utcnow)
    
    student = relationship("Student", back_populates="bonafide_requests")
    advisor_approval = relationship("AdvisorBonafideApproval", back_populates="bonafide_request", cascade="all, delete-orphan")
    hod_approval = relationship("HODBonafideApproval", back_populates="bonafide_request", cascade="all, delete-orphan")


class OnDutyRequest(Base):
    __tablename__ = "onduty_requests"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    reason = Column(String)
    url = Column(String)
    from_date = Column(Date)
    to_date = Column(Date)
    student_id = Column(String, ForeignKey("students.reg_no"))
    created_on = Column(DateTime, default=datetime.utcnow)
    
    student = relationship("Student", back_populates="onduty_requests")
    advisor_approval = relationship("AdvisorOnDutyApproval", back_populates="onduty_request", cascade="all, delete-orphan")
    hod_approval = relationship("HODOnDutyApproval", back_populates="onduty_request", cascade="all, delete-orphan")


class AdvisorOnDutyApproval(Base):
    __tablename__ = "advisor_onduty_approvals"
    onduty_id = Column(UUID(as_uuid=True), ForeignKey("onduty_requests.id"), primary_key=True)
    staff_id = Column(UUID(as_uuid=True), ForeignKey("staffs.id"), primary_key=True)
    status = Column(Enum(RequestStatus),default=RequestStatus.Pending)
    updated_on = Column(DateTime, default=datetime.utcnow)
    message = Column(Text)

    onduty_request = relationship("OnDutyRequest", back_populates="advisor_approval")


class AdvisorBonafideApproval(Base):
    __tablename__ = "advisor_bonafide_approvals"
    bonafide_id = Column(UUID(as_uuid=True), ForeignKey("bonafide_requests.id"), primary_key=True)
    staff_id = Column(UUID(as_uuid=True), ForeignKey("staffs.id"), primary_key=True)
    status = Column(Enum(RequestStatus),default=RequestStatus.Pending)
    updated_on = Column(DateTime)
    message = Column(Text)
    
    bonafide_request = relationship("BonafideRequest", back_populates="advisor_approval")

class HODOnDutyApproval(Base):
    __tablename__ = "hod_onduty_approval"
    onduty_id = Column(UUID(as_uuid=True), ForeignKey("onduty_requests.id"), primary_key=True)
    staff_id = Column(UUID(as_uuid=True), ForeignKey("staffs.id"), primary_key=True)
    status = Column(Enum(RequestStatus),default=RequestStatus.Pending)
    updated_on = Column(DateTime, default=datetime.utcnow)
    message = Column(Text)
    
    onduty_request = relationship("OnDutyRequest", back_populates="hod_approval")


class HODBonafideApproval(Base):
    __tablename__ = "hod_bonafide_approvals"
    bonafide_id = Column(UUID(as_uuid=True), ForeignKey("bonafide_requests.id"), primary_key=True)
    staff_id = Column(UUID(as_uuid=True), ForeignKey("staffs.id"), primary_key=True)
    status = Column(Enum(RequestStatus),default=RequestStatus.Pending)
    message = Column(Text)
    updated_on = Column(DateTime, default=datetime.utcnow)
    
    
    bonafide_request = relationship("BonafideRequest", back_populates="hod_approval")


class InternalMark(Base):
    __tablename__ = "internal_marks"
    student_id = Column(String, ForeignKey("students.reg_no"), primary_key=True)
    subject_id = Column(UUID(as_uuid=True), ForeignKey("subjects.id"), primary_key=True)
    staff_id = Column(UUID(as_uuid=True), ForeignKey("staffs.id"))
    internal_name = Column(String, primary_key=True)
    marks_obtained = Column(Float)
    total_marks = Column(Float)
    
    staff = relationship("Staff", backref="internal_marks")
    student = relationship("Student", back_populates="internal_marks")
    subject = relationship("Subject", back_populates="internal_marks")
    
    __table_args__ = (
    PrimaryKeyConstraint('student_id', 'subject_id', 'internal_name'),
)

class Announcement(Base):
    __tablename__ = "announcements"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String)
    content = Column(String)
    created_on = Column(DateTime(timezone=True), default=get_ist_time())
    author = Column(UUID(as_uuid=True), ForeignKey("staffs.id"))
    staff = relationship("Staff", backref="announcements")