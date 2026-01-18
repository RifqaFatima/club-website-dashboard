import { Link } from 'react-router-dom';
import { ArrowRight, Code, Users, Calendar } from 'lucide-react';

const Home = () => {
    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="bg-gray-900 text-white py-20 lg:py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-90 z-0"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
                        IEEE Computer Society
                    </h1>
                    <h2 className="text-2xl md:text-3xl text-yellow-500 font-semibold mb-6">
                        ZHCET AMU
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-300 italic mb-10">
                        Innovate. Connect. Excel.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                            to="/members"
                            className="px-8 py-3 bg-yellow-500 text-gray-900 font-bold rounded-lg hover:bg-yellow-400 transition-colors transform hover:scale-105 duration-200"
                        >
                            Join Us
                        </Link>
                        <Link
                            to="/projects"
                            className="px-8 py-3 bg-transparent border-2 border-yellow-500 text-yellow-500 font-bold rounded-lg hover:bg-yellow-500 hover:text-gray-900 transition-colors transform hover:scale-105 duration-200"
                        >
                            View Projects
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="p-6 bg-gray-700 rounded-lg shadow-lg">
                            <Users className="mx-auto text-yellow-500 mb-4" size={40} />
                            <h3 className="text-3xl font-bold text-white mb-2">50+ Members</h3>
                            <p className="text-gray-400">Active and Passionate</p>
                        </div>
                        <div className="p-6 bg-gray-700 rounded-lg shadow-lg">
                            <Calendar className="mx-auto text-yellow-500 mb-4" size={40} />
                            <h3 className="text-3xl font-bold text-white mb-2">10 Events/Year</h3>
                            <p className="text-gray-400">Workshops & Competitions</p>
                        </div>
                        <div className="p-6 bg-gray-700 rounded-lg shadow-lg">
                            <Code className="mx-auto text-yellow-500 mb-4" size={40} />
                            <h3 className="text-3xl font-bold text-white mb-2">8+ Projects</h3>
                            <p className="text-gray-400">Innovative Solutions</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Intro Section */}
            <section className="py-20 bg-gray-900">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-white mb-8 border-b-4 border-yellow-500 inline-block pb-2">
                        Who We Are
                    </h2>
                    <p className="text-lg text-gray-300 leading-relaxed">
                        The IEEE Computer Society Student Chapter at AMU is a vibrant community of tech enthusiasts dedicated to exploring the frontiers of computing. We aim to foster a culture of learning, creativity, and professional growth among students. Through workshops, hackathons, and collaborative projects, we provide a platform for students to enhance their technical skills and connect with industry trends. Join us as we build the future of technology, one line of code at a time.
                    </p>
                    <div className="mt-8">
                        <Link to="/about" className="inline-flex items-center text-yellow-500 hover:text-yellow-400 font-semibold transition-colors">
                            Learn More <ArrowRight size={20} className="ml-2" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
