import { Rocket } from 'lucide-react';

const Projects = () => {
    return (
        <div className="bg-gray-900 min-h-[calc(100vh-6rem)] flex items-center justify-center px-4">
            <div className="text-center animate-fade-in">
                <Rocket size={64} className="text-yellow-500 mx-auto mb-6 animate-bounce" />
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Projects
                </h1>
                <p className="text-xl text-gray-400 mb-8">
                    Something amazing is coming soon!
                </p>
                <div className="inline-block bg-gray-800 rounded-lg px-6 py-3 border border-gray-700">
                    <p className="text-gray-300">
                        Stay tuned for our upcoming projects.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Projects;
