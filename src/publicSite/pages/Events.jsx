import { useState } from 'react';
import { Calendar, Clock, MapPin, AlertCircle } from 'lucide-react';
import PitchPerfectImg from '../../assets/events/PitchPerfectImg.jpg';
import LatexEssImg from '../../assets/events/LatexEssImg.jpg';
import AIDataImg from '../../assets/events/AIDataImg.jpg';
import GitGoImg from '../../assets/events/GitGoImg.jpg';

const Events = () => {
    const [activeTab, setActiveTab] = useState('upcoming');

    const pastEvents = [
        {
            title: "Pitch Perfect: Project Presentation Competition",
            image: PitchPerfectImg,
            date: "Oct 06, 2023",
            time: "XYZ",
            location: "Lab 1",
            description: "A project proposal presentation competition",
        },
        {
            title: "Coding Contest",
            date: "Aug 05, 2024",
            time: "3:00 PM",
            location: "Online",
            description: "Competitive programming contest for beginners."
        },
        {
            title: "Latex Essentials: Document Making Workshop",
            image: LatexEssImg,
            date: "Aug 18-19, 2024",
            time: "2-Day Workshop",
            location: "Lab 1",
            description: "A two-day workshop on LaTeX Essentials: Perfecting the art of documents making."
        },
         {
            title: "Tech Talk 2024",
            date: "Sep 20, 2024",
            time: "11:00 AM",
            location: "Assembly Hall",
            description: "Expert talk on future of AI and Machine Learning."
        },
        {
            title: "Git & Go: Workshop",
            image: GitGoImg,
            date: "Oct 13, 2024",
            time: "7:00 PM",
            location: "Online",
            desription: "A workshop on beginner's journey into open source",
        },
        {
            title: "Web Dev Workshop",
            date: "Oct 15, 2024",
            time: "2:00 PM",
            location: "Lab 1",
            description: "A hands-on session on React and Tailwind CSS."
        },
        {
            title: "AI & Data Science Webinar",
            image: AIDataImg,
            date: "March 19, 2025",
            time: "4:00 PM",
            location: "Online",
            description: "Aimed to shed light on the growing influence of Artificial Intelligence and Data Science in today's industrial landscape"
        },

    
    ];

    return (
        <div className="bg-gray-900 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-white mb-10">Events</h1>

                {/* Tabs */}
                <div className="flex justify-center mb-12">
                    <div className="bg-gray-800 p-1 rounded-lg inline-flex">
                        <button
                            onClick={() => setActiveTab('upcoming')}
                            className={`px-6 py-2 rounded-md font-medium transition-colors ${activeTab === 'upcoming'
                                    ? 'bg-yellow-500 text-gray-900'
                                    : 'text-gray-300 hover:text-white'
                                }`}
                        >
                            Upcoming Events
                        </button>
                        <button
                            onClick={() => setActiveTab('past')}
                            className={`px-6 py-2 rounded-md font-medium transition-colors ${activeTab === 'past'
                                    ? 'bg-yellow-500 text-gray-900'
                                    : 'text-gray-300 hover:text-white'
                                }`}
                        >
                            Past Events
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="min-h-[400px]">
                    {activeTab === 'upcoming' ? (
                        <div className="flex flex-col items-center justify-center p-12 bg-gray-800 rounded-lg border border-gray-700 border-dashed h-96">
                            <AlertCircle size={64} className="text-gray-600 mb-6" />
                            <h3 className="text-2xl font-bold text-gray-300 mb-2">No Upcoming Events</h3>
                            <p className="text-gray-500">Check back soon for exciting new events!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {pastEvents.map((event, index) => (
                                <div key={index} className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-yellow-500 transition-colors shadow-lg group">
                                    <img 
                                    src={event.image}
                                    alt={event.title}
                                    className="h-48 w-full object-cover"
                                    /> 
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-500 transition-colors">{event.title}</h3>
                                        <div className="space-y-2 mb-4">
                                            <div className="flex items-center text-gray-400 text-sm">
                                                <Calendar size={16} className="mr-2 text-yellow-500" />
                                                {event.date}
                                            </div>
                                            <div className="flex items-center text-gray-400 text-sm">
                                                <Clock size={16} className="mr-2 text-yellow-500" />
                                                {event.time}
                                            </div>
                                            <div className="flex items-center text-gray-400 text-sm">
                                                <MapPin size={16} className="mr-2 text-yellow-500" />
                                                {event.location}
                                            </div>
                                        </div>
                                        <p className="text-gray-400 text-sm">{event.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Events;
