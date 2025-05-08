# from sqlalchemy import Column, Table, String, Integer, Text, ARRAY, Boolean, ForeignKey, UniqueConstraint
# from sqlalchemy.orm import relationship
# from .database import Base, engine


# staff_subjects = Table(
#     "staff_subjects",
#     Base.metadata,
#     Column("staff_email", Text, ForeignKey("staffs.email"), primary_key=True),
#     Column("subject_id", String, ForeignKey("subjects.id"), primary_key=True)
# )

# class Staff(Base):
#     __tablename__ = "staffs"
#     email = Column(Text, primary_key=True)
#     name = Column(Text, nullable=False)
#     password = Column(Text, nullable=False)
#     role = Column(ARRAY(Text))
#     advisor_for = Column(Text)
#     subject_taking = Column(ARRAY(Text))
#     subjects = relationship("Subject", secondary="staff_subjects", backref="staffs")

# student_subjects = Table(
#     "student_subjects",
#     Base.metadata,
#     Column("student_reg_no", String, ForeignKey("students.reg_no"), primary_key=True),
#     Column("subject_id", String, ForeignKey("subjects.id"), primary_key=True)
# )

# class Student(Base):
#     __tablename__ = "students"
#     reg_no = Column(String, primary_key=True)
#     roll_no = Column(String, unique=True, nullable=False)
#     name = Column(Text, nullable=False)
#     email = Column(Text, unique=True, nullable=False)
#     password = Column(Text, nullable=False)
#     dept = Column(Text)
#     year = Column(Text)
#     current_semester = Column(Integer)
#     subjects = relationship("Subject", secondary="student_subjects", backref="students")

# class NoDuesRequest(Base):
#     __tablename__ = "no_dues_requests"
#     id = Column(Integer, primary_key=True, autoincrement=True)  # Auto-incremented Integer ID
#     student_reg_no = Column(String, ForeignKey('students.reg_no'), nullable=False)
#     subject_id = Column(String, ForeignKey('subjects.id'), nullable=False)
#     status = Column(String, default="Pending")
#     student = relationship("Student", backref="no_dues_requests")
#     subject = relationship("Subject")
#     __table_args__ = (UniqueConstraint('student_reg_no', 'subject_id', name='_student_subject_uc'),)

# class Subject(Base):
#     __tablename__ = "subjects"
#     id = Column(String, primary_key=True)
#     name = Column(Text, nullable=False)
#     semester = Column(Integer, nullable=False)

# class Class(Base):
#     __tablename__ = "classes"
#     id = Column(String, primary_key=True)
#     name = Column(Text, nullable=False)
#     semester = Column(Integer, nullable=False)
#     year = Column(Integer, nullable=False)
    
# Base.metadata.create_all(bind=engine)