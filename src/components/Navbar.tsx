import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { logOut } from '../services/authService';

const Navbar = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logOut();
            navigate('/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <nav className="bg-blue-600 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <h1 className="text-xl font-bold">Task Manager</h1>
                    </div>
                    {user && (
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                {user.photoURL ? (
                                    <img
                                        src={user.photoURL}
                                        alt="Profile"
                                        className="h-8 w-8 rounded-full"
                                    />
                                ) : (
                                    <div className="h-8 w-8 rounded-full bg-blue-800 flex items-center justify-center">
                                        <span className="text-sm font-medium">
                                            {user.email?.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                )}
                                <span className="text-sm font-medium">
                                    {user.displayName || user.email}
                                </span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
