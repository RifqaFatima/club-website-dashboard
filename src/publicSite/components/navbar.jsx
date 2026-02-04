import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

import logo from '../../assets/logo.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const publicNavLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Events', path: '/events' },
        { name: 'Members', path: '/members' },
        { name: 'Gallery', path: '/gallery' },
        { name: 'Projects', path: '/projects' },
    ];

    // Add Dashboard and Project Timeline links only when logged in
    const navLinks = currentUser 
        ? [...publicNavLinks, { name: 'Team Dashboard', path: '/dashboard' }, { name: 'Project Timeline', path: '/dashboard/projects' }]
        : publicNavLinks;

    async function handleLogout() {
        try {
            await logout();
            navigate('/');
            setIsOpen(false);
        } catch (error) {
            console.error('Logout failed:', error);
        }
    }

    return (
        <nav className="sticky top-0 z-50 bg-gray-900 border-b border-gray-800 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-24 items-center">
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="flex items-center gap-4">
                            <img src={logo} alt="IEEE Computer Society" className="h-16 md:h-20 w-auto" />
                            <div className="flex flex-col">
                                <span className="text-white font-bold text-lg leading-none tracking-wide">
                                    IEEE COMPUTER SOCIETY
                                </span>
                                <span className="text-yellow-500 font-bold text-xs md:text-sm tracking-wider mt-1">
                                    ALIGARH MUSLIM UNIVERSITY
                                </span>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8 items-center">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="text-gray-300 hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                            >
                                {link.name}
                            </Link>
                        ))}
                        
                        {/* Show Login or Logout based on auth state */}
                        {currentUser ? (
                            <button
                                onClick={handleLogout}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-bold transition-colors duration-200 flex items-center gap-2"
                            >
                                <LogOut size={16} />
                                Logout
                            </button>
                        ) : (
                            <Link
                                to="/login"
                                className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-4 py-2 rounded-md text-sm font-bold transition-colors duration-200"
                            >
                                Member Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-300 hover:text-white focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="md:hidden bg-gray-900 border-t border-gray-800">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="text-gray-300 hover:text-yellow-500 block px-3 py-2 rounded-md text-base font-medium"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        
                        {/* Show Login or Logout in mobile menu */}
                        {currentUser ? (
                            <button
                                onClick={handleLogout}
                                className="bg-red-600 hover:bg-red-700 text-white w-full text-left px-3 py-2 rounded-md text-base font-bold mt-4 flex items-center gap-2"
                            >
                                <LogOut size={16} />
                                Logout
                            </button>
                        ) : (
                            <Link
                                to="/login"
                                className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 block px-3 py-2 rounded-md text-base font-bold mt-4"
                                onClick={() => setIsOpen(false)}
                            >
                                Member Login
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;