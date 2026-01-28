import { useState } from 'react';
import type { Task } from '../types';
import { useComments } from '../hooks/useComments';
import { addComment } from '../services/commentService';
import { useAuth } from '../contexts/AuthContext';

interface CommentsModalProps {
    isOpen: boolean;
    onClose: () => void;
    task: Task | null;
}

const CommentsModal = ({ isOpen, onClose, task }: CommentsModalProps) => {
    const [commentText, setCommentText] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const { user } = useAuth();
    const { comments, loading } = useComments(task?.id || '');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!commentText.trim() || !task || !user) return;

        setSubmitting(true);
        try {
            await addComment(
                task.id,
                user.uid,
                user.displayName || user.email || 'Anonymous',
                commentText.trim()
            );
            setCommentText('');
        } catch (error) {
            console.error('Error adding comment:', error);
        } finally {
            setSubmitting(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString();
    };

    if (!isOpen || !task) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
                <div className="p-6 border-b">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-gray-900">Comments - {task.title}</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700"
                            aria-label="Close comments"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    {loading ? (
                        <div className="flex justify-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                        </div>
                    ) : comments.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            No comments yet. Be the first to comment!
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {comments.map((comment) => (
                                <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="font-medium text-gray-900">{comment.userName}</span>
                                        <span className="text-xs text-gray-500">{formatDate(comment.createdAt)}</span>
                                    </div>
                                    <p className="text-gray-700">{comment.text}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="p-6 border-t">
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <textarea
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Add a comment..."
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={submitting || !commentText.trim()}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {submitting ? 'Posting...' : 'Post Comment'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CommentsModal;
