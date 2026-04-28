import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, ShieldCheck, ArrowRight, Fingerprint, Lock } from 'lucide-react';

export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ phone: '', password: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();
            if (res.ok) {
                localStorage.setItem('user', JSON.stringify(data.user));
                localStorage.setItem('token', data.token);
                navigate('/dashboard');
            } else {
                alert(data.error || "Login failed");
            }
        } catch (err) {
            console.error(err);
            alert("Login failed (Is server running?)");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-[100dvh] w-full bg-[#050505] flex flex-col relative overflow-hidden font-sans">
            {/* Background Animations */}
            <div className="absolute top-[-10%] left-[-20%] w-[80%] h-[50%] bg-sky-500/30 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute top-[20%] right-[-20%] w-[60%] h-[50%] bg-emerald-500/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>
            
            {/* Top Section - Branding */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
                <div className="w-24 h-24 mb-6 relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-sky-400 to-emerald-400 rounded-full blur-xl opacity-50 animate-pulse"></div>
                    <div className="relative w-full h-full bg-[#111] border-[0.5px] border-white/20 rounded-full flex items-center justify-center shadow-2xl">
                        <Activity className="text-white w-10 h-10" />
                    </div>
                </div>
                <h1 className="text-5xl font-black text-white tracking-tighter text-center">
                    FADJ <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">MA</span>
                </h1>
                <p className="text-slate-400 font-medium uppercase tracking-[0.2em] text-[10px] mt-2">Neural Pharmacy Net</p>
            </div>

            {/* Bottom Section - Login Form (Thumb-friendly) */}
            <div className="w-full bg-white/[0.03] backdrop-blur-3xl border-t border-white/10 p-8 rounded-t-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,0.5)] z-20">
                <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-8"></div>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="relative group">
                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
                            <Fingerprint size={20} />
                        </div>
                        <input
                            type="text"
                            className="w-full bg-black/40 border border-white/10 rounded-[2rem] pl-14 pr-6 py-5 text-white focus:outline-none focus:border-sky-500/50 focus:bg-sky-500/10 transition-all font-semibold placeholder-slate-500 text-sm"
                            placeholder="Terminal ID (+221...)"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </div>
                    
                    <div className="relative group">
                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
                            <Lock size={20} />
                        </div>
                        <input
                            type="password"
                            className="w-full bg-black/40 border border-white/10 rounded-[2rem] pl-14 pr-6 py-5 text-white focus:outline-none focus:border-emerald-500/50 focus:bg-emerald-500/10 transition-all font-semibold placeholder-slate-500 text-sm"
                            placeholder="Neural Passkey"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-sky-500 to-emerald-500 text-white py-5 rounded-[2rem] font-black text-lg shadow-[0_10px_20px_-10px_rgba(14,165,233,0.5)] active:scale-[0.97] transition-transform flex items-center justify-center gap-3 mt-4"
                    >
                        {loading ? "SYNCING..." : (
                            <>
                                <span>INITIALIZE</span>
                                <ArrowRight className="w-5 h-5" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 flex justify-between items-center px-2">
                    <a href="/register" className="text-sky-400 text-xs font-bold uppercase tracking-wider">New Node? Register</a>
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="text-emerald-400 w-4 h-4" />
                        <span className="text-slate-500 text-[9px] uppercase font-bold tracking-widest">Secured</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
