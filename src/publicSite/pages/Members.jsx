
import { useState } from 'react';

const Members = () => {
    const [activeTab, setActiveTab] = useState('core');

    const coreTeam = [
        { name: "Anaum Khan", role: "Chairperson", image: "https://ui-avatars.com/api/?name=Anaum+Khan&background=random" },
        { name: "Ziya Ali", role: "Vice Chairperson", image: "https://ui-avatars.com/api/?name=Ziya+Ali&background=random" },
        { name: "Rifqa Fatima", role: "Secretary", image: "https://ui-avatars.com/api/?name=Rifqa+Fatima&background=random" },
        { name: "Mohammad Hazique Khan", role: "Technical Media Head", image: "https://ui-avatars.com/api/?name=Mohammad+Hazique+Khan&background=random" },
        { name: "Mahum Siddiqui", role: "PR and Media Head", image: "https://ui-avatars.com/api/?name=Mahum+Siddiqui&background=random" },
        { name: "Niloy Nath", role: "Treasurer", image: "https://ui-avatars.com/api/?name=Niloy+Nath&background=random" },
    ];

    const subTeams = [
        {
            name: "Team Develop",
            lead: "Mohammad Hazique Khan",
            members: ["Mohit Sharma", "Azhan Ali", "Abdullah", "Faraz Ahmad"],
        },
        {
            name: "Team Innovate",
            lead: "Ziya Ali",
            members: ["Pranjal Yadav", "Sabiquddin", "Sadia Peerzada", "Aiama Sajad"],
        },
        {
            name: "Team Research",
            lead: "Rifqa Fatima",
            members: ["Arham Ashraf", "Fatima Amir", "Ayaan Aziz"],
        },
        {
            name: "Team Engage",
            lead: "Mahum Siddiqui",
            members: ["Harshita Singh", "Md Farhan", "Asna Mirza"],
        },
    ];

    // Helper to get all members
    const getAllMembers = () => {
        const coreNames = coreTeam.map(m => m.name);
        const otherMembers = new Set();

        // Add Sub Team Leads and Members
        subTeams.forEach(team => {
            if (!coreNames.includes(team.lead)) otherMembers.add(team.lead);
            team.members.forEach(member => {
                if (!coreNames.includes(member)) otherMembers.add(member);
            });
        });

        // Return Core Team first, then others sorted alphabetically
        return [...coreNames, ...Array.from(otherMembers).sort()];
    };

    return (
        <div className="bg-gray-900 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-center text-white mb-10">Our Team</h1>

            {/* Tabs */}
            <div className="flex justify-center mb-12">
                <div className="bg-gray-800 p-1 rounded-lg inline-flex flex-wrap justify-center gap-2">
                    <button
                        onClick={() => setActiveTab('core')}
                        className={`px-6 py-2 rounded-md font-medium transition-colors ${activeTab === 'core'
                            ? 'bg-gray-200 text-gray-900'
                            : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        Core Team
                    </button>
                    <button
                        onClick={() => setActiveTab('all')}
                        className={`px-6 py-2 rounded-md font-medium transition-colors ${activeTab === 'all'
                            ? 'bg-gray-200 text-gray-900'
                            : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        All Members
                    </button>
                    <button
                        onClick={() => setActiveTab('structure')}
                        className={`px-6 py-2 rounded-md font-medium transition-colors ${activeTab === 'structure'
                            ? 'bg-gray-200 text-gray-900'
                            : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        Team Structure
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="min-h-[400px]">
                {/* Core Team Section */}
                {activeTab === 'core' && (
                    <div className="mb-20 animate-fade-in">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {coreTeam.map((member, index) => (
                                <div key={index} className="bg-gray-800 rounded-lg p-6 text-center transform hover:-translate-y-2 transition-transform duration-300 shadow-lg border border-gray-700 hover:border-gray-500">
                                    <img
                                        src={member.image}
                                        alt={member.role}
                                        className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-2 border-gray-400"
                                    />
                                    <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                                    <p className="text-gray-400 font-medium mb-1">{member.role}</p>
                                    <p className="text-gray-500 text-sm">IEEE CS AMU</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* All Members Section */}
                {activeTab === 'all' && (
                    <div className="animate-fade-in">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {getAllMembers().map((member, index) => (
                                <div key={index} className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-gray-500 transition-colors text-center">
                                    <h3 className="text-lg font-medium text-gray-200">{member}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Team Structure Section */}
                {activeTab === 'structure' && (
                    <div className="animate-fade-in">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {subTeams.map((team, index) => (
                                <div key={index} className="flex flex-col bg-gray-700 rounded-t-3xl pt-6 pb-2 px-4 shadow-md relative min-h-[400px] border border-gray-600">
                                    <h3 className="text-xl lg:text-md font-bold text-white uppercase mb-6 text-center tracking-wider">{team.name}</h3>
                                    <div className="flex-grow space-y-3 mb-16">
                                        {team.members.map((name, idx) => (
                                            <div key={idx} className="text-center">
                                                <span className="inline-block bg-gray-200 text-gray-900 font-bold py-2 px-4 rounded-full border border-gray-400 w-full shadow-sm text-sm">
                                                    {name}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Team Lead - Rectangular Box at Bottom */}
                                    <div className="absolute bottom-0 left-0 right-0 bg-gray-900 py-3 border-t border-gray-600 rounded-b-lg -mb-2 mx-4 shadow-lg">
                                        <p className="text-center font-extrabold text-gray-300 uppercase tracking-wider">{team.lead}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Members;

