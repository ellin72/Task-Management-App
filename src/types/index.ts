export interface User {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
}

export type TaskStatus = 'todo' | 'in-progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    assignedTo: string[]; // Array of user IDs
    createdBy: string; // User ID
    dueDate: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface Comment {
    id: string;
    taskId: string;
    userId: string;
    userName: string;
    text: string;
    createdAt: string;
}

export interface TaskInput {
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    assignedTo: string[];
    dueDate: string | null;
}
