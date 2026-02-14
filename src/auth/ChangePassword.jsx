import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { updateUserPassword } from '../firebase/auth';
import { markPasswordChanged } from '../firebase/firestore';
import { KeyRound, ShieldCheck, AlertCircle, Loader } from 'lucide-react';

const ChangePassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [status, setStatus] = useState({ loading: false, error: '' });
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) return setStatus({ error: "Passwords don't match" });
        if (password.length < 6) return setStatus({ error: "Password must be at least 6 characters" });

        setStatus({ loading: true, error: '' });
        try {
            await updateUserPassword(currentUser, password);
            await markPasswordChanged(currentUser.uid);
            // We force a page reload or navigate so AuthContext refreshes the profile
            window.location.href = '/dashboard'; 
        } catch (err) {
            setStatus({ loading: false, error: err.message || "Failed to update password." });
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
                <div className="text-center mb-8">
                    <div className="inline-flex p-4 bg-yellow-500/10 rounded-full mb-4">
                        <KeyRound className="text-yellow-500" size={32} />
                    </div>
                    <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">Secure Your <span className="text-yellow-500">Account</span></h2>
                    <p className="text-gray-400 text-sm mt-2">You're using a temporary password. Please set a new one to continue.</p>
                </div>

                <form onSubmit={handleUpdate} className="space-y-6">
                    {status.error && (
                        <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-center gap-3 text-red-400 text-sm">
                            <AlertCircle size={18} /> {status.error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">New Password</label>
                        <input 
                            type="password" required 
                            className="w-full bg-gray-800 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors"
                            value={password} onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Confirm New Password</label>
                        <input 
                            type="password" required
                            className="w-full bg-gray-800 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors"
                            value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <button 
                        disabled={status.loading}
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-black py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-tighter"
                    >
                        {status.loading ? <Loader className="animate-spin" size={20} /> : <ShieldCheck size={20} />}
                        Update & Access Dashboard
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;