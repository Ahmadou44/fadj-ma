import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, ShieldCheck, Zap, Globe, MapPin, Phone, Lock, CheckCircle2 } from 'lucide-react';

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        password: '',
        address: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    role: 'PHARMACY',
                    pharmacyDetails: {
                        name: formData.name,
                        address: formData.address,
                        lat: 14.7167,
                        lng: -17.4677
                    }
                })
            });

            if (res.ok) {
                navigate('/login');
            } else {
                const data = await res.json();
                alert(data.error || "Nexus Alignment Error");
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 relative overflow-hidden font-sans">
            {/* Cosmic Background Elements */}
            <div className="absolute top-0 -left-20 w-[600px] h-[600px] bg-medical-primary/10 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-0 -right-20 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] animate-pulse delay-700"></div>

            <div className="flex flex-col md:flex-row max-w-6xl w-full bg-white/5 backdrop-blur-2xl rounded-[4rem] border border-white/10 overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] z-20">
                {/* Left Side: Visual Branding */}
                <div className="md:w-1/2 p-20 bg-gradient-to-br from-medical-primary/20 via-slate-900 to-slate-950 flex flex-col justify-between relative overflow-hidden text-white border-r border-white/5">
                    <div className="relative z-10">
                        <div className="w-16 h-16 bg-gradient-to-tr from-sky-400 to-emerald-400 rounded-2xl flex items-center justify-center shadow-lg shadow-sky-500/20 mb-10 rotate-12">
                            <Sparkles className="text-white w-10 h-10" />
                        </div>
                        <h1 className="text-6xl font-black tracking-tighter mb-4 leading-tight">NEXUS <br /><span className="text-medical-primary italic">ALIGNMENT</span></h1>
                        <p className="text-slate-400 text-lg font-medium max-w-sm">Rejoignez le réseau neural de distribution médicale Fadj Ma Nova.</p>
                    </div>

                    <div className="space-y-8 relative z-10">
                        <BenefitItem icon={<Globe />} text="Visible through the entire Lunar Network" />
                        <BenefitItem icon={<ShieldCheck />} text="Secured by Quantum Protocol 2.0" />
                        <BenefitItem icon={<Zap />} text="Instant sync with Global Inventory" />
                    </div>

                    {/* Abstract Decor */}
                    <div className="absolute -bottom-20 -left-20 w-80 h-80 border-[40px] border-white/5 rounded-full"></div>
                </div>

                {/* Right Side: Deployment Form */}
                <div className="flex-1 p-20 bg-white relative">
                    <div className="mb-12">
                        <div className="flex items-center space-x-3 text-medical-primary mb-4">
                            <CheckCircle2 size={24} />
                            <span className="text-xs font-black uppercase tracking-[0.4em]">Unit Registration Protocol</span>
                        </div>
                        <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Initialize Node</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-8">
                            <FuturisticInputField
                                label="Nom du Nexus"
                                icon={<Globe size={20} />}
                                placeholder="Pharmacie du Futur"
                                value={formData.name}
                                onChange={(val: string) => setFormData({ ...formData, name: val })}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <FuturisticInputField
                                    label="Signal de Contact"
                                    icon={<Phone size={20} />}
                                    placeholder="77 000 00 00"
                                    value={formData.phone}
                                    onChange={(val: string) => setFormData({ ...formData, phone: val })}
                                />
                                <FuturisticInputField
                                    label="Access Key"
                                    icon={<Lock size={20} />}
                                    type="password"
                                    value={formData.password}
                                    onChange={(val: string) => setFormData({ ...formData, password: val })}
                                />
                            </div>

                            <FuturisticInputField
                                label="Geo-Location Profile"
                                icon={<MapPin size={20} />}
                                placeholder="Dakar, Zone Industrielle..."
                                value={formData.address}
                                onChange={(val: string) => setFormData({ ...formData, address: val })}
                            />
                        </div>

                        <div className="pt-8">
                            <button
                                type="submit"
                                className="w-full neon-button py-8 rounded-[2.5rem] font-black text-2xl flex items-center justify-center space-x-4 shadow-2xl shadow-sky-500/20 group"
                            >
                                <span>INITIALIZE NODE</span>
                                <CheckCircle2 size={28} className="group-hover:scale-125 transition-transform" />
                            </button>
                        </div>
                    </form>

                    <div className="mt-12 text-center">
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                            Already part of the network? <Link to="/login" className="text-medical-primary hover:underline ml-2">Reconnect Neural Link</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function BenefitItem({ icon, text }: any) {
    return (
        <div className="flex items-center space-x-4 group cursor-default">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-medical-primary group-hover:scale-110 group-hover:bg-medical-primary group-hover:text-white transition-all duration-300">
                {icon}
            </div>
            <p className="text-slate-300 font-bold tracking-tight group-hover:text-white transition-colors">{text}</p>
        </div>
    );
}

function FuturisticInputField({ label, icon, placeholder, value, onChange, type = "text" }: any) {
    return (
        <div className="space-y-4">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] ml-6 italic">{label}</label>
            <div className="relative group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-medical-primary transition-colors">
                    {icon}
                </div>
                <input
                    required
                    type={type}
                    placeholder={placeholder}
                    className="w-full bg-slate-50 border-2 border-slate-50 rounded-[2rem] pl-16 pr-8 py-6 focus:bg-white focus:border-medical-primary/30 focus:shadow-xl focus:shadow-sky-500/5 transition-all outline-none font-black text-slate-700 placeholder-slate-300 text-lg"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            </div>
        </div>
    );
}
