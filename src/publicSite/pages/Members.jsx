


import { useState, useEffect } from 'react';
import { getAllMembers } from '../../firebase/firestore';
import { Mail } from 'lucide-react';

const Members = () => {
    const [activeTab, setActiveTab] = useState('core');
    const [allMembers, setAllMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchMembers() {
            try {
                const members = await getAllMembers();
                setAllMembers(members);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching members:', error);
                setLoading(false);
            }
        }
        fetchMembers();
    }, []);

    // Filter core team members
    const coreTeam = allMembers
        .filter(m => m.isCoreTeam === true)
        .sort((a, b) => {
            // Sort by role priority
            const rolePriority = {
                'Chairperson': 1,
                'Vice-Chairperson': 2,
                'Secretary': 3,
                'Technical Media Head': 4,
                'PR and Media Head': 5,
                'Treasurer': 6
            };
            return (rolePriority[a.role] || 99) - (rolePriority[b.role] || 99);
        });

    // Filter non-core members
    const regularMembers = allMembers
        .filter(m => m.isCoreTeam !== true)
        .sort((a, b) => a.name.localeCompare(b.name));

    // Team structure (hardcoded for now)
    const subTeams = [
        {
            name: "Team Develop",
            lead: "Mohammad Hazique Khan",
            members: regularMembers
                .filter(m => m.team === "Team Develop")
                .map(m => m.name)
        },
        {
            name: "Team Innovate",
            lead: "Ziya Ali",
            members: regularMembers
                .filter(m => m.team === "Team Innovate")
                .map(m => m.name)
        },
        {
            name: "Team Insight",
            lead: "Rifqa Fatima",
            members: regularMembers
                .filter(m => m.team === "Team Insight")
                .map(m => m.name)
        },
        {
            name: "Team Engage",
            lead: "Mahum Siddiqui",
            members: regularMembers
                .filter(m => m.team === "Team Engage")
                .map(m => m.name)
        },
    ];

    // Generate initials avatar URL
    const getAvatarUrl = (name) => {
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1F2937&color=EAB308&size=128&bold=true`;
    };

    // Member Card Component
    const MemberCard = ({ member, showRole = false }) => {
        return (
            <div className="bg-gray-800 rounded-lg p-6 text-center transform hover:-translate-y-2 transition-transform duration-300 shadow-lg border border-gray-700 hover:border-yellow-500">
                <img
                    src={getAvatarUrl(member.name)}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-gray-700"
                />
                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                
                {showRole && member.role && (
                    <p className="text-yellow-500 font-semibold mb-2">{member.role}</p>
                )}
                
                {!showRole && member.team && (
                    <p className="text-gray-400 font-medium mb-2">Team: {member.team}</p>
                )}
                
                {member['contact info'] && (
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mt-3">
                        <Mail size={16} className="text-yellow-500" />
                        <a 
                            href={`mailto:${member['contact info']}`}
                            className="hover:text-yellow-500 transition-colors"
                        >
                            {member['contact info']}
                        </a>
                    </div>
                )}
            </div>
        );
    };

    if (loading) {
        return (
            <div className="bg-gray-900 min-h-screen py-16 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-500 mx-auto mb-4"></div>
                    <p className="text-gray-400 text-lg">Loading members...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-900 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-center text-white mb-10">Our Team</h1>

            {/* Tabs */}
            <div className="flex justify-center mb-12">
                <div className="bg-gray-800 p-1 rounded-lg inline-flex flex-wrap justify-center gap-2">
                    <button
                        onClick={() => setActiveTab('core')}
                        className={`px-6 py-2 rounded-md font-medium transition-colors ${
                            activeTab === 'core'
                                ? 'bg-yellow-500 text-gray-900'
                                : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        Core Team
                    </button>
                    <button
                        onClick={() => setActiveTab('all')}
                        className={`px-6 py-2 rounded-md font-medium transition-colors ${
                            activeTab === 'all'
                                ? 'bg-yellow-500 text-gray-900'
                                : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        All Members
                    </button>
                    <button
                        onClick={() => setActiveTab('structure')}
                        className={`px-6 py-2 rounded-md font-medium transition-colors ${
                            activeTab === 'structure'
                                ? 'bg-yellow-500 text-gray-900'
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
                            {coreTeam.map((member) => (
                                <MemberCard 
                                    key={member.id} 
                                    member={member} 
                                    showRole={true} 
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* All Members Section */}
                {activeTab === 'all' && (
                    <div className="animate-fade-in">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {regularMembers.map((member) => (
                                <MemberCard 
                                    key={member.id} 
                                    member={member} 
                                    showRole={false} 
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Team Structure Section */}
                {activeTab === 'structure' && (
                    <div className="animate-fade-in">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {subTeams.map((team, index) => (
                                <div 
                                    key={index} 
                                    className="flex flex-col bg-gray-700 rounded-t-3xl pt-6 pb-2 px-4 shadow-md relative min-h-[400px] border border-gray-600"
                                >
                                    <h3 className="text-xl lg:text-md font-bold text-white uppercase mb-6 text-center tracking-wider">
                                        {team.name}
                                    </h3>
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
                                        <p className="text-center font-extrabold text-gray-300 uppercase tracking-wider">
                                            {team.lead}
                                        </p>
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

