import { Image } from 'lucide-react';

const Gallery = () => {
    return (
        <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-gray-800 p-10 rounded-2xl shadow-2xl border border-gray-700 max-w-md w-full transform hover:scale-105 transition-transform duration-300">
                <div className="mb-6 flex justify-center">
                    <div className="bg-yellow-500/10 p-4 rounded-full">
                        <Image size={64} className="text-yellow-500" />
                    </div>
                </div>
                <h1 className="text-4xl font-extrabold text-white mb-4 tracking-tight">
                    Gallery
                </h1>
                <p className="text-xl text-yellow-500 font-semibold mb-6">
                    Coming Soon
                </p>
                <p className="text-gray-400">
                    We are currently curating the best moments. Stay tuned for an exciting visual experience!
                </p>
            </div>
        </div>
    );
};

export default Gallery;
