import { useState, useEffect } from 'react';
import { getAllMembers } from '../../firebase/firestore';
import { Mail, Shield, Users, GitMerge } from 'lucide-react';

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

    const coreTeam = allMembers
        .filter(m => m.isCoreTeam === true)
        .sort((a, b) => {
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

    const regularMembers = allMembers
        .filter(m => m.isCoreTeam !== true)
        .sort((a, b) => a.name.localeCompare(b.name));

    const subTeams = [
        { name: "Team Develop", lead: "Mohammad Hazique Khan", members: regularMembers.filter(m => m.team === "Team Develop").map(m => m.name) },
        { name: "Team Innovate", lead: "Ziya Ali", members: regularMembers.filter(m => m.team === "Team Innovate").map(m => m.name) },
        { name: "Team Insight", lead: "Rifqa Fatima", members: regularMembers.filter(m => m.team === "Team Insight").map(m => m.name) },
        { name: "Team Engage", lead: "Mahum Siddiqui", members: regularMembers.filter(m => m.team === "Team Engage").map(m => m.name) },
    ];

    const getAvatarUrl = (name) => {
        // Updated color to eab308 (yellow-500)
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1f2937&color=eab308&size=128&bold=true`;
    };

    const MemberCard = ({ member, showRole = false }) => {
        return (
            <div className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 text-center transition-all duration-500 hover:bg-white/10 border border-white/10 hover:border-yellow-500/50 hover:-translate-y-3 shadow-2xl">
                <div className="absolute inset-0 bg-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl blur-xl" />
                
                <div className="relative z-10">
                    <div className="relative inline-block mb-6">
                        <img
                            src={getAvatarUrl(member.name)}
                            alt={member.name}
                            className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-gray-800 ring-2 ring-white/10 group-hover:ring-yellow-500/50 transition-all duration-500"
                        />
                        <div className="absolute -bottom-2 -right-2 bg-yellow-500 p-2 rounded-lg shadow-lg scale-0 group-hover:scale-100 transition-transform duration-300">
                            <Shield size={16} className="text-gray-900" />
                        </div>
                    </div>
                    
                    <h3 className="text-2xl font-black text-white mb-2 tracking-tight group-hover:text-yellow-500 transition-colors">{member.name}</h3>
                    
                    {showRole && member.role && (
                        <div className="inline-block px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-3">
                            <p className="text-yellow-500 text-xs font-bold uppercase tracking-widest">{member.role}</p>
                        </div>
                    )}
                    
                    {!showRole && member.team && (
                        <p className="text-gray-400 font-medium mb-3 italic">Member of {member.team}</p>
                    )}
                    
                    {member['contact info'] && (
                        <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-4 group-hover:text-gray-300">
                            <Mail size={14} className="group-hover:text-yellow-500" />
                            <a href={`mailto:${member['contact info']}`} className="hover:underline decoration-yellow-500 underline-offset-4 tracking-wide">
                                {member['contact info']}
                            </a>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="bg-gray-900 min-h-screen flex items-center justify-center">
                <div className="relative w-20 h-20">
                    <div className="absolute inset-0 border-4 border-yellow-500/20 rounded-full" />
                    <div className="absolute inset-0 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin" />
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-900 min-h-screen py-24 px-4 sm:px-6 lg:px-8 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-yellow-500/10 via-gray-900 to-black">
            {/* Header - Kept original gradient as requested */}
            <div className="max-w-4xl mx-auto text-center mb-16">
                <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tighter uppercase italic">
                    Our <span className="bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">Nexus</span>
                </h1>
                <p className="text-gray-500 font-medium tracking-[0.3em] uppercase text-xs">Architects of Innovation • IEEE CS AMU</p>
            </div>

            {/* Glassmorphic Tabs - Updated to yellow-500 */}
            <div className="flex justify-center mb-16">
                <div className="bg-white/5 backdrop-blur-md p-1.5 rounded-2xl flex gap-1 border border-white/10">
                    {[
                        { id: 'core', label: 'Core Team', icon: <Shield size={16}/> },
                        { id: 'all', label: 'All Members', icon: <Users size={16}/> },
                        { id: 'structure', label: 'Structure', icon: <GitMerge size={16}/> }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                                activeTab === tab.id
                                    ? 'bg-yellow-500 text-gray-900 shadow-[0_0_20px_rgba(234,179,8,0.3)]'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            {tab.icon} {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="max-w-7xl mx-auto min-h-[400px]">
                {activeTab === 'core' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 animate-[fadeIn_0.5s_ease-out]">
                        {coreTeam.map((member) => (
                            <MemberCard key={member.id} member={member} showRole={true} />
                        ))}
                    </div>
                )}

                {activeTab === 'all' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-[fadeIn_0.5s_ease-out]">
                        {regularMembers.map((member) => (
                            <MemberCard key={member.id} member={member} showRole={false} />
                        ))}
                    </div>
                )}

                {activeTab === 'structure' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-[fadeIn_0.5s_ease-out]">
                        {subTeams.map((team, index) => (
                            <div key={index} className="group flex flex-col bg-white/5 backdrop-blur-sm rounded-[2.5rem] pt-8 pb-4 px-5 border border-white/10 hover:border-yellow-500/30 transition-all duration-500 relative min-h-[450px]">
                                <h3 className="text-lg font-black text-yellow-500 uppercase mb-8 text-center tracking-tighter">{team.name}</h3>
                                <div className="flex-grow space-y-4 mb-20">
                                    {team.members.map((name, idx) => (
                                        <div key={idx} className="group/name relative">
                                            <span className="block bg-gray-800/80 text-gray-300 font-bold py-3 px-4 rounded-2xl border border-white/5 text-xs transition-all hover:bg-yellow-500 hover:text-gray-900 hover:translate-x-1 cursor-default">
                                                {name}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <div className="absolute bottom-4 left-4 right-4 bg-gray-900/90 backdrop-blur-md py-4 rounded-3xl border border-white/10 shadow-xl group-hover:border-yellow-500/50 transition-colors">
                                    <p className="text-center text-[10px] text-yellow-500 font-black uppercase tracking-[0.2em] mb-1">Lead By</p>
                                    <p className="text-center font-bold text-white text-sm">{team.lead}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Members;