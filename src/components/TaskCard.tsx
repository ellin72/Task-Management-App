import { useState } from 'react';
import type { Task, TaskStatus } from '../types';

interface TaskCardProps {
    task: Task;
    onEdit: (task: Task) => void;
    onDelete: (taskId: string) => void;
    onStatusChange: (taskId: string, status: TaskStatus) => void;
    onViewComments: (task: Task) => void;
}

const TaskCard = ({ task, onEdit, onDelete, onStatusChange, onViewComments }: TaskCardProps) => {
    const [showMenu, setShowMenu] = useState(false);

    const priorityColors = {
        low: 'bg-green-100 text-green-800',
        medium: 'bg-yellow-100 text-yellow-800',
        high: 'bg-red-100 text-red-800',
    };

    const statusOptions: TaskStatus[] = ['todo', 'in-progress', 'done'];

    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'No due date';
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-3 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-800 flex-1">{task.title}</h3>
                <div className="relative">
                    <button
                        onClick={() => setShowMenu(!showMenu)}
                        className="text-gray-500 hover:text-gray-700 p-1"
                        aria-label="Task options"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                    </button>
                    {showMenu && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                            <button
                                onClick={() => {
                                    onEdit(task);
                                    setShowMenu(false);
                                }}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => {
                                    onDelete(task.id);
                                    setShowMenu(false);
                                }}
                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <p className="text-gray-600 text-sm mb-3">{task.description}</p>
            <div className="flex items-center justify-between mb-3">
                <span className={`px-2 py-1 rounded text-xs font-medium ${priorityColors[task.priority]}`}>
                    {task.priority}
                </span>
                <span className="text-xs text-gray-500">{formatDate(task.dueDate)}</span>
            </div>
            <div className="flex gap-2 mb-3">
                {statusOptions.map((status) => (
                    <button
                        key={status}
                        onClick={() => onStatusChange(task.id, status)}
                        className={`px-3 py-1 rounded text-xs font-medium transition-colors ${task.status === status
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        {status === 'in-progress' ? 'In Progress' : status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                ))}
            </div>
            <button
                onClick={() => onViewComments(task)}
                className="w-full text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
                View Comments
            </button>
        </div>
    );
};

export default TaskCard;
