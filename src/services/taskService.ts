import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    orderBy,
    getDocs,
} from 'firebase/firestore';
import { db } from './firebase';
import type { Task, TaskInput } from '../types';

const tasksCollection = collection(db, 'tasks');

export const createTask = async (taskInput: TaskInput, userId: string): Promise<string> => {
    const now = new Date().toISOString();
    const docRef = await addDoc(tasksCollection, {
        ...taskInput,
        createdBy: userId,
        createdAt: now,
        updatedAt: now,
    });
    return docRef.id;
};

export const updateTask = async (taskId: string, updates: Partial<TaskInput>): Promise<void> => {
    const taskRef = doc(db, 'tasks', taskId);
    await updateDoc(taskRef, {
        ...updates,
        updatedAt: new Date().toISOString(),
    });
};

export const deleteTask = async (taskId: string): Promise<void> => {
    const taskRef = doc(db, 'tasks', taskId);
    await deleteDoc(taskRef);
};

export const subscribeToTasks = (callback: (tasks: Task[]) => void) => {
    const q = query(tasksCollection, orderBy('createdAt', 'desc'));

    return onSnapshot(q, (snapshot) => {
        const tasks: Task[] = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as Task[];
        callback(tasks);
    });
};

export const getAllUsers = async () => {
    const usersCollection = collection(db, 'users');
    const snapshot = await getDocs(usersCollection);
    return snapshot.docs.map(doc => ({
        uid: doc.id,
        ...doc.data()
    }));
};
