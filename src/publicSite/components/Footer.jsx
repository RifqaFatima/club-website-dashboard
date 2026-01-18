import { Mail, Facebook, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-900 border-t border-gray-800 pt-10 pb-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Column 1: Info */}
                    <div>
                        <h3 className="text-white text-lg font-bold mb-4">IEEE CS AMU</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Empowering students through technology, innovation, and collaboration at Aligarh Muslim University.
                        </p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-gray-400 hover:text-yellow-500 transition-colors text-sm">Home</Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-gray-400 hover:text-yellow-500 transition-colors text-sm">About</Link>
                            </li>
                            <li>
                                <Link to="/events" className="text-gray-400 hover:text-yellow-500 transition-colors text-sm">Events</Link>
                            </li>
                            <li>
                                <Link to="/members" className="text-gray-400 hover:text-yellow-500 transition-colors text-sm">Members</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Contact */}
                    <div>
                        <h3 className="text-white text-lg font-bold mb-4">Contact</h3>
                        <div className="flex items-center text-gray-400 text-sm mb-4">
                            <Mail size={18} className="mr-2 text-yellow-500" />
                            <a href="mailto:ieee.cs@amu.ac.in" className="hover:text-yellow-500">ieee.cs@amu.ac.in</a>
                        </div>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-800 text-center">
                    <p className="text-gray-500 text-sm">
                        © 2026 IEEE Computer Society AMU
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
