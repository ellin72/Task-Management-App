import { useEffect, useState } from 'react';
import type { Comment } from '../types';
import { subscribeToComments } from '../services/commentService';

export const useComments = (taskId: string) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!taskId) return;

        const unsubscribe = subscribeToComments(taskId, (comments) => {
            setComments(comments);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [taskId]);

    return { comments, loading };
};
