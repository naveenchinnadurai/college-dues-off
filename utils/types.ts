

export interface User {
  id: String | null;
  type: 'student' | 'staff';
  name: String | null;
  email: String | null;
  department: String;
  role: String | null
}

export interface Student {
  year: String;
}

export interface Staff {
  role: 'Staff' | 'HOD';
  subjectTeaching: String[];
  advisorFor: String;
}


export type studentRoutes = {
  home: undefined;
};

export interface subjects {
  subCode: String;
  subName: String
}