export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'engineer' | 'viewer';
  avatar: string | null;
  jobTitle?: string;
  department?: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  color: string;
  ownerId: string;
  memberIds: string[];
  status: 'active' | 'completed' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export type TaskStatus = 'backlog' | 'todo' | 'in-progress' | 'in-review' | 'done';
export type Priority = 'critical' | 'high' | 'medium' | 'low';

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Comment {
  id: string;
  authorId: string;
  body: string;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: Priority;
  projectId: string;
  userId: string;
  sprintId?: string;
  assigneeId?: string;
  reporterId?: string;
  labels: string[];
  storyPoints?: number | null;
  startDate?: string | null;
  dueDate?: string | null;
  subtasks: Subtask[];
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
}
