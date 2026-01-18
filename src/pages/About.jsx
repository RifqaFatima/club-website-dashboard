import { Award, Zap, Users, Shield } from 'lucide-react';

const About = () => {
    return (
        <div className="bg-gray-900 min-h-screen pb-20">

            {/* Advisor Section */}
            <section className="bg-gray-800 py-16">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center gap-10">
                        <div className="md:w-1/3 flex justify-center">
                            {/* Placeholder for Advisor Image */}
                            <div className="w-48 h-48 bg-gray-700 rounded-full flex items-center justify-center border-4 border-yellow-500 overflow-hidden shadow-xl">
                                <span className="text-gray-400 text-center px-4">Advisor Image</span>
                            </div>
                        </div>
                        <div className="md:w-2/3 text-center md:text-left">
                            <h2 className="text-3xl font-bold text-white mb-4">Faculty Advisor Message</h2>
                            <blockquote className="text-gray-300 italic text-lg mb-6 border-l-4 border-yellow-500 pl-4">
                                "It is with great pride that I welcome you to the IEEE Computer Society chapter... We aim to bridge the gap between academic learning and industry requirements."
                            </blockquote>
                            <p className="text-yellow-500 font-bold text-xl">- Dr. Wajid Ali</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision & Values */}
            <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-white mb-6">Vision & Values</h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        "To be the leading student organization fostering innovation, technical excellence, and professional development."
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <ValueCard icon={<Zap size={32} />} title="Innovation" description="Pushing boundaries with creative solutions." />
                    <ValueCard icon={<Users size={32} />} title="Collaboration" description="Working together to achieve greatness." />
                    <ValueCard icon={<Award size={32} />} title="Excellence" description="Striving for the highest quality in all we do." />
                    <ValueCard icon={<Shield size={32} />} title="Integrity" description="Upholding strong ethical standards." />
                </div>
            </section>

            {/* History Timeline */}
            <section className="py-12 bg-gray-800">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-white text-center mb-12">Our Journey</h2>

                    <div className="relative border-l-2 border-gray-600 ml-6 md:ml-10 space-y-12">
                        <TimelineItem year="2020" title="Chapter Founded" description="25 founding members laid the groundwork for our society." />
                        <TimelineItem year="2021" title="First Workshop Series" description="Launched series on AI, Web Dev, and Cloud Computing." />
                        <TimelineItem year="2022" title="Inaugural Hackathon" description="Hosted our first major hackathon with 100+ participants." />
                        <TimelineItem year="2023" title="Industry Partnerships" description="Established internships & mentorship programs with tech firms." />
                        <TimelineItem year="2024" title="National Recognition" description="Awarded 'Best Student Chapter in North India'." />
                    </div>
                </div>
            </section>
        </div>
    );
};

const ValueCard = ({ icon, title, description }) => (
    <div className="bg-gray-800 p-6 rounded-lg text-center hover:bg-gray-750 transition-colors shadow-lg border border-gray-700 hover:border-yellow-500">
        <div className="text-yellow-500 mb-4 flex justify-center">{icon}</div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
    </div>
);

const TimelineItem = ({ year, title, description }) => (
    <div className="relative pl-8 md:pl-12">
        <div className="absolute -left-[9px] top-0 w-5 h-5 bg-yellow-500 rounded-full border-4 border-gray-800"></div>
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
            <span className="text-yellow-500 font-bold text-xl font-mono">{year}</span>
            <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
        <p className="text-gray-400 mt-1">{description}</p>
    </div>
);

export default About;
