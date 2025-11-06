export interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
  dueDate: string;
  overdue: boolean;
  assigneeId: string;
  project_id: string;
  priority: string;
}