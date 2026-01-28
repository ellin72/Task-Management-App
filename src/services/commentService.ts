import {
    collection,
    addDoc,
    query,
    where,
    orderBy,
    onSnapshot,
} from 'firebase/firestore';
import { db } from './firebase';
import type { Comment } from '../types';

const commentsCollection = collection(db, 'comments');

export const addComment = async (
    taskId: string,
    userId: string,
    userName: string,
    text: string
): Promise<void> => {
    await addDoc(commentsCollection, {
        taskId,
        userId,
        userName,
        text,
        createdAt: new Date().toISOString(),
    });
};

export const subscribeToComments = (taskId: string, callback: (comments: Comment[]) => void) => {
    const q = query(
        commentsCollection,
        where('taskId', '==', taskId),
        orderBy('createdAt', 'asc')
    );

    return onSnapshot(q, (snapshot) => {
        const comments: Comment[] = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as Comment[];
        callback(comments);
    });
};
