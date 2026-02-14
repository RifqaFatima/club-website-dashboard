
// import { useState } from 'react';
// import { Calendar, Clock, MapPin, AlertCircle, Sparkles } from 'lucide-react';
// import PitchPerfectImg from '../../assets/events/PitchPerfectImg.jpg';
// import LatexEssImg from '../../assets/events/LatexEssImg.jpg';
// import AIDataImg from '../../assets/events/AIDataImg.jpg';
// import GitGoImg from '../../assets/events/GitGoImg.jpg';

// const Events = () => {
//     const [activeTab, setActiveTab] = useState('upcoming');

//     const pastEvents = [
//         {
//             title: "Pitch Perfect: Project Presentation Competition",
//             image: PitchPerfectImg,
//             date: "Oct 06, 2023",
//             time: "XYZ",
//             location: "Lab 1",
//             description: "A project proposal presentation competition",
//         },
//         {
//             title: "Latex Essentials: Document Making Workshop",
//             image: LatexEssImg,
//             date: "Aug 18-19, 2024",
//             time: "2-Day Workshop",
//             location: "Lab 1",
//             description: "A two-day workshop on LaTeX Essentials: Perfecting the art of documents making."
//         },
//         {
//             title: "Git & Go: Workshop",
//             image: GitGoImg,
//             date: "Oct 13, 2024",
//             time: "7:00 PM",
//             location: "Online",
//             description: "A workshop on beginner's journey into open source",
//         },
//         {
//             title: "AI & Data Science Webinar",
//             image: AIDataImg,
//             date: "March 19, 2025",
//             time: "4:00 PM",
//             location: "Online",
//             description: "Aimed to shed light on the growing influence of Artificial Intelligence and Data Science in today's industrial landscape"
//         },
//     ];

//     return (
//         <div className="bg-gray-900 min-h-screen py-24 px-4 sm:px-6 lg:px-8 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-yellow-500/5 via-gray-900 to-black">
//             <div className="max-w-7xl mx-auto">
                
//                 {/* Enhanced Heading */}
//                 <div className="text-center mb-16">
//                     <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tighter uppercase italic">
//                         Club <span className="bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">Events</span>
//                     </h1>
//                     <div className="flex items-center justify-center gap-3">
//                         <span className="h-px w-8 bg-gray-700"></span>
//                         <p className="text-gray-500 font-medium tracking-[0.3em] uppercase text-xs">Knowledge • Innovation • Community</p>
//                         <span className="h-px w-8 bg-gray-700"></span>
//                     </div>
//                 </div>

//                 {/* Glassmorphic Tabs */}
//                 <div className="flex justify-center mb-16">
//                     <div className="bg-white/5 backdrop-blur-md p-1.5 rounded-2xl flex gap-1 border border-white/10 shadow-2xl">
//                         <button
//                             onClick={() => setActiveTab('upcoming')}
//                             className={`px-8 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
//                                 activeTab === 'upcoming'
//                                     ? 'bg-yellow-500 text-gray-900 shadow-[0_0_20px_rgba(234,179,8,0.3)]'
//                                     : 'text-gray-400 hover:text-white hover:bg-white/5'
//                             }`}
//                         >
//                             Upcoming
//                         </button>
//                         <button
//                             onClick={() => setActiveTab('past')}
//                             className={`px-8 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
//                                 activeTab === 'past'
//                                     ? 'bg-yellow-500 text-gray-900 shadow-[0_0_20px_rgba(234,179,8,0.3)]'
//                                     : 'text-gray-400 hover:text-white hover:bg-white/5'
//                             }`}
//                         >
//                             Past Archives
//                         </button>
//                     </div>
//                 </div>

//                 {/* Content Section */}
//                 <div className="min-h-[400px]">
//                     {activeTab === 'upcoming' ? (
//                         <div className="flex flex-col items-center justify-center p-12 bg-white/5 backdrop-blur-sm rounded-3xl border border-gray-700 border-dashed h-96 group transition-all duration-500 hover:border-yellow-500/50">
//                             <div className="relative mb-6">
//                                 <AlertCircle size={64} className="text-gray-700 group-hover:text-yellow-500/20 transition-colors duration-500" />
//                                 <Sparkles size={24} className="absolute -top-2 -right-2 text-yellow-500 animate-pulse" />
//                             </div>
//                             <h3 className="text-2xl font-black text-gray-400 mb-2 uppercase tracking-tight">Quiet for now</h3>
//                             <p className="text-gray-600 font-medium italic">We're cooking up something big. Stay tuned.</p>
//                         </div>
//                     ) : (
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 animate-[fadeIn_0.5s_ease-out]">
//                             {pastEvents.map((event, index) => (
//                                 <div key={index} className="group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-yellow-500/50 transition-all duration-500 hover:-translate-y-3 shadow-2xl">
//                                     {/* Image Container with Overlay */}
//                                     <div className="relative h-52 w-full overflow-hidden">
//                                         <img 
//                                             src={event.image}
//                                             alt={event.title}
//                                             className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
//                                         />
//                                         <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />
//                                         <div className="absolute top-4 right-4 bg-yellow-500 text-gray-900 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
//                                             Completed
//                                         </div>
//                                     </div>

//                                     <div className="p-8">
//                                         <h3 className="text-xl font-black text-white mb-4 group-hover:text-yellow-400 transition-colors leading-tight">
//                                             {event.title}
//                                         </h3>
                                        
//                                         <div className="grid grid-cols-1 gap-3 mb-6">
//                                             <div className="flex items-center text-gray-400 text-xs font-bold uppercase tracking-wider">
//                                                 <Calendar size={14} className="mr-3 text-yellow-500" />
//                                                 {event.date}
//                                             </div>
//                                             <div className="flex items-center text-gray-400 text-xs font-bold uppercase tracking-wider">
//                                                 <Clock size={14} className="mr-3 text-yellow-500" />
//                                                 {event.time}
//                                             </div>
//                                             <div className="flex items-center text-gray-400 text-xs font-bold uppercase tracking-wider">
//                                                 <MapPin size={14} className="mr-3 text-yellow-500" />
//                                                 {event.location}
//                                             </div>
//                                         </div>
                                        
//                                         <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 italic">
//                                             {event.description || event.desription}
//                                         </p>
//                                     </div>
                                    
//                                     {/* Subtle Bottom Glow */}
//                                     <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Events;/

import { useState } from 'react';
import { Calendar, Clock, MapPin, AlertCircle, Sparkles } from 'lucide-react';
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
            title: "Latex Essentials: Document Making Workshop",
            image: LatexEssImg,
            date: "Aug 18-19, 2024",
            time: "2-Day Workshop",
            location: "Lab 1",
            description: "A two-day workshop on LaTeX Essentials: Perfecting the art of documents making."
        },
        {
            title: "Git & Go: Workshop",
            image: GitGoImg,
            date: "Oct 13, 2024",
            time: "7:00 PM",
            location: "Online",
            description: "A workshop on beginner's journey into open source",
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
        <div className="bg-gray-900 min-h-screen py-24 px-4 sm:px-6 lg:px-8 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-yellow-500/5 via-gray-900 to-black">
            <div className="max-w-7xl mx-auto">
                
                {/* Heading - RESTORED TO ORIGINAL DESIGN */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tighter uppercase italic">
                        Club <span className="bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">Events</span>
                    </h1>
                    <div className="flex items-center justify-center gap-3">
                        <span className="h-px w-8 bg-gray-700"></span>
                        <p className="text-gray-500 font-medium tracking-[0.3em] uppercase text-xs">Knowledge • Innovation • Community</p>
                        <span className="h-px w-8 bg-gray-700"></span>
                    </div>
                </div>

                {/* Glassmorphic Tabs - Updated to Navbar yellow-500 */}
                <div className="flex justify-center mb-16">
                    <div className="bg-white/5 backdrop-blur-md p-1.5 rounded-2xl flex gap-1 border border-white/10 shadow-2xl">
                        <button
                            onClick={() => setActiveTab('upcoming')}
                            className={`px-8 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                                activeTab === 'upcoming'
                                    ? 'bg-yellow-500 text-gray-900 shadow-[0_0_20px_rgba(234,179,8,0.3)]'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            Upcoming
                        </button>
                        <button
                            onClick={() => setActiveTab('past')}
                            className={`px-8 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                                activeTab === 'past'
                                    ? 'bg-yellow-500 text-gray-900 shadow-[0_0_20px_rgba(234,179,8,0.3)]'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            Past Archives
                        </button>
                    </div>
                </div>

                {/* Content Section */}
                <div className="min-h-[400px]">
                    {activeTab === 'upcoming' ? (
                        <div className="flex flex-col items-center justify-center p-12 bg-white/5 backdrop-blur-sm rounded-3xl border border-gray-700 border-dashed h-96 group transition-all duration-500 hover:border-yellow-500/50">
                            <div className="relative mb-6">
                                <AlertCircle size={64} className="text-gray-700 group-hover:text-yellow-500/20 transition-colors duration-500" />
                                <Sparkles size={24} className="absolute -top-2 -right-2 text-yellow-500 animate-pulse" />
                            </div>
                            <h3 className="text-2xl font-black text-gray-400 mb-2 uppercase tracking-tight">Quiet for now</h3>
                            <p className="text-gray-600 font-medium italic">We're cooking up something big. Stay tuned.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 animate-[fadeIn_0.5s_ease-out]">
                            {pastEvents.map((event, index) => (
                                <div key={index} className="group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-yellow-500/50 transition-all duration-500 hover:-translate-y-3 shadow-2xl">
                                    <div className="relative h-52 w-full overflow-hidden">
                                        <img 
                                            src={event.image}
                                            alt={event.title}
                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />
                                        {/* Completed Badge matches Navbar yellow-500 */}
                                        <div className="absolute top-4 right-4 bg-yellow-500 text-gray-900 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                                            Completed
                                        </div>
                                    </div>

                                    <div className="p-8">
                                        <h3 className="text-xl font-black text-white mb-4 group-hover:text-yellow-500 transition-colors leading-tight">
                                            {event.title}
                                        </h3>
                                        
                                        <div className="grid grid-cols-1 gap-3 mb-6">
                                            {/* All icons updated to yellow-500 */}
                                            <div className="flex items-center text-gray-400 text-xs font-bold uppercase tracking-wider">
                                                <Calendar size={14} className="mr-3 text-yellow-500" />
                                                {event.date}
                                            </div>
                                            <div className="flex items-center text-gray-400 text-xs font-bold uppercase tracking-wider">
                                                <Clock size={14} className="mr-3 text-yellow-500" />
                                                {event.time}
                                            </div>
                                            <div className="flex items-center text-gray-400 text-xs font-bold uppercase tracking-wider">
                                                <MapPin size={14} className="mr-3 text-yellow-500" />
                                                {event.location}
                                            </div>
                                        </div>
                                        
                                        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 italic">
                                            {event.description || event.desription}
                                        </p>
                                    </div>
                                    
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
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
