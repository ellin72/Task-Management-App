import { useEffect, useState } from 'react';
import type { Task } from '../types';
import { subscribeToTasks } from '../services/taskService';

export const useTasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = subscribeToTasks((tasks) => {
            setTasks(tasks);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return { tasks, loading };
};
