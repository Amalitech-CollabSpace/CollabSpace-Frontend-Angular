export interface Task {
  id: string;
  title: string;
  descritption?: string;
  status: string;
  dueDate: string;
  overdue: boolean;
  assignee_id: string;
  project_id: string;
  priority: string;
}