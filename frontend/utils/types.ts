

export interface User {
  id: String | null;
  type: 'Student' | 'Staff';
  name: String | null;
  email: String | null;
  department: String;
}

export interface Student {
  year: String;
}

export interface Staff {
  role: 'Staff' | 'HOD';
  subjectTeaching: String[];
  advisorFor: String;
}