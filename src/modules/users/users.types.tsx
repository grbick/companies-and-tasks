export type User = {
  id: number;
  name: string;
  lastName: string;
  email: string;
  password: string;
  DOB: Date | string;
  role: number;
  company?: string;
  companyId?: number;
  salary: number;
  workingHours: number;
  tasks?: Task[];
  pendingTasks?: Task[];
};
export type Task = {
  from: Date | string;
  to: Date | string;
  description: string;
  employeeId?: number;
};
