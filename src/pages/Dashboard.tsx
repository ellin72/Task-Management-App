import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTasks } from '../hooks/useTasks';
import { createTask, updateTask, deleteTask } from '../services/taskService';
import type { Task, TaskInput, TaskStatus } from '../types';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import CommentsModal from '../components/CommentsModal';

const Dashboard = () => {
    const { user } = useAuth();
    const { tasks, loading } = useTasks();
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    const handleCreateTask = async (taskInput: TaskInput) => {
        if (!user) return;
        try {
            await createTask(taskInput, user.uid);
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    const handleUpdateTask = async (taskInput: TaskInput) => {
        if (!editingTask) return;
        try {
            await updateTask(editingTask.id, taskInput);
            setEditingTask(null);
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleDeleteTask = async (taskId: string) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await deleteTask(taskId);
            } catch (error) {
                console.error('Error deleting task:', error);
            }
        }
    };

    const handleStatusChange = async (taskId: string, status: TaskStatus) => {
        try {
            await updateTask(taskId, { status });
        } catch (error) {
            console.error('Error updating task status:', error);
        }
    };

    const handleEditTask = (task: Task) => {
        setEditingTask(task);
        setIsTaskModalOpen(true);
    };

    const handleViewComments = (task: Task) => {
        setSelectedTask(task);
        setIsCommentsModalOpen(true);
    };

    const closeTaskModal = () => {
        setIsTaskModalOpen(false);
        setEditingTask(null);
    };

    const todoTasks = tasks.filter((task) => task.status === 'todo');
    const inProgressTasks = tasks.filter((task) => task.status === 'in-progress');
    const doneTasks = tasks.filter((task) => task.status === 'done');

    const renderColumn = (title: string, tasksList: Task[]) => (
        <div className="bg-gray-50 rounded-lg p-4 min-h-[500px]">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center justify-between">
                <span>{title}</span>
                <span className="text-sm font-normal text-gray-500 bg-white px-2 py-1 rounded">
                    {tasksList.length}
                </span>
            </h2>
            <div className="space-y-3">
                {tasksList.map((task) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onEdit={handleEditTask}
                        onDelete={handleDeleteTask}
                        onStatusChange={handleStatusChange}
                        onViewComments={handleViewComments}
                    />
                ))}
                {tasksList.length === 0 && (
                    <div className="text-center py-8 text-gray-400 text-sm">
                        No tasks yet
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Task Board</h1>
                    <button
                        onClick={() => setIsTaskModalOpen(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        New Task
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {renderColumn('To Do', todoTasks)}
                        {renderColumn('In Progress', inProgressTasks)}
                        {renderColumn('Done', doneTasks)}
                    </div>
                )}
            </div>

            <TaskModal
                isOpen={isTaskModalOpen}
                onClose={closeTaskModal}
                onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
                initialData={editingTask || undefined}
                title={editingTask ? 'Edit Task' : 'Create New Task'}
            />

            <CommentsModal
                isOpen={isCommentsModalOpen}
                onClose={() => setIsCommentsModalOpen(false)}
                task={selectedTask}
            />
        </div>
    );
};

export default Dashboard;
