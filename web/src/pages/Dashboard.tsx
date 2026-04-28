import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { LayoutDashboard, Package, ShoppingBag, Settings, LogOut, MessageCircle, Bell, Search, Sparkles } from 'lucide-react';
import Inventory from './Inventory';
import Orders from './Orders';
import Messaging from './Messaging';

export default function Dashboard() {
    return (
        <div className="flex flex-col md:flex-row h-[100dvh] bg-slate-50 relative overflow-hidden font-sans">
            {/* Ambient Background Elements */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-medical-primary/5 rounded-full blur-[80px] md:blur-[120px] -mr-32 -mt-32 md:-mr-64 md:-mt-64 pointer-events-none"></div>

            {/* Desktop Sidebar (hidden on mobile) */}
            <aside className="hidden md:flex w-80 bg-white border-r border-slate-200 flex-col relative z-20 shadow-2xl">
                <div className="p-10 border-b border-slate-100 flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-tr from-sky-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-sky-500/20 rotate-12 group hover:rotate-0 transition-all duration-500">
                        <Sparkles className="text-white w-7 h-7" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tighter">FADJ <span className="text-medical-primary">MA</span></h1>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] -mt-1">Nova Terminal</p>
                    </div>
                </div>

                <nav className="flex-1 px-6 py-10 space-y-4">
                    <DesktopNavLink to="/dashboard" icon={<LayoutDashboard size={24} />} label="Overview" />
                    <DesktopNavLink to="/dashboard/inventory" icon={<Package size={24} />} label="Inventory" />
                    <DesktopNavLink to="/dashboard/orders" icon={<ShoppingBag size={24} />} label="Orders" />
                    <DesktopNavLink to="/dashboard/messages" icon={<MessageCircle size={24} />} label="Messaging" />
                    <DesktopNavLink to="/dashboard/settings" icon={<Settings size={24} />} label="Settings" />
                </nav>

                <div className="p-8 border-t border-slate-100">
                    <button
                        onClick={() => { localStorage.clear(); window.location.href = '/login'; }}
                        className="flex items-center space-x-4 text-slate-400 w-full px-6 py-4 hover:bg-red-50 hover:text-red-500 rounded-2xl transition-all duration-300 font-bold group"
                    >
                        <LogOut size={22} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Disconnect</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col relative z-10 overflow-hidden pb-24 md:pb-0">
                {/* Mobile Header */}
                <header className="md:hidden bg-white/80 backdrop-blur-3xl border-b border-slate-200/50 pt-12 pb-4 px-6 flex justify-between items-center relative z-30 shadow-sm">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-tr from-sky-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-sky-500/20">
                            <Sparkles className="text-white w-5 h-5" />
                        </div>
                        <div>
                            <h1 className="text-xl font-black text-slate-900 tracking-tighter">FADJ <span className="text-medical-primary">MA</span></h1>
                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] -mt-1">Nova Terminal</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button className="relative w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 active:scale-95 transition-all">
                            <Bell size={18} />
                            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
                        </button>
                    </div>
                </header>

                {/* Desktop Header */}
                <header className="hidden md:flex bg-white/80 backdrop-blur-md border-b border-slate-200 h-24 px-12 justify-between items-center relative z-30">
                    <div className="relative group w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-medical-primary transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="Search terminal data..."
                            className="w-full bg-slate-100/50 border-none rounded-2xl pl-12 pr-6 py-3 focus:ring-4 focus:ring-medical-primary/10 transition-all outline-none font-bold text-slate-700 placeholder-slate-400"
                        />
                    </div>

                    <div className="flex items-center space-x-8">
                        <button className="relative w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-all group">
                            <Bell size={22} />
                            <span className="absolute top-3 right-3 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
                        </button>

                        <div className="flex items-center space-x-4 bg-slate-50 p-2 pr-6 rounded-2xl border border-slate-100 cursor-pointer hover:bg-white hover:shadow-lg transition-all border-b-4 active:scale-95">
                            <div className="w-12 h-12 bg-gradient-to-tr from-sky-400 to-emerald-400 rounded-xl flex items-center justify-center font-black text-white text-xl shadow-lg">
                                PH
                            </div>
                            <div>
                                <p className="text-sm font-black text-slate-800 tracking-tight">Pharmacie Galien</p>
                                <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest leading-none">Status: Online</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dynamic Content */}
                <div className="flex-1 overflow-auto p-6 md:p-12 relative custom-scrollbar">
                    <Routes>
                        <Route path="/" element={<Overview />} />
                        <Route path="/inventory" element={<Inventory />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/messages" element={<Messaging />} />
                        <Route path="/settings" element={<div className="glass-card p-10 md:p-20 rounded-[2rem] md:rounded-[3rem] text-center text-slate-400 font-black tracking-widest uppercase text-xs md:text-base">Encryption Modules Offline</div>} />
                    </Routes>
                </div>
            </main>

            {/* Mobile Bottom Navigation Bar (2026 Style) */}
            <nav className="md:hidden fixed bottom-0 w-full bg-white/80 backdrop-blur-3xl border-t border-white/50 px-6 py-4 flex justify-between items-center z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] pb-8">
                <MobileNavLink to="/dashboard" icon={<LayoutDashboard size={24} />} />
                <MobileNavLink to="/dashboard/inventory" icon={<Package size={24} />} />
                
                {/* Floating Center Action Button */}
                <div className="relative -top-6">
                    <Link to="/dashboard/orders" className="w-16 h-16 bg-gradient-to-tr from-sky-500 to-emerald-500 rounded-full flex items-center justify-center text-white shadow-xl shadow-sky-500/30 active:scale-90 transition-transform border-4 border-slate-50">
                        <ShoppingBag size={28} />
                    </Link>
                </div>

                <MobileNavLink to="/dashboard/messages" icon={<MessageCircle size={24} />} />
                <MobileNavLink to="/dashboard/settings" icon={<Settings size={24} />} />
            </nav>
        </div>
    );
}

function DesktopNavLink({ to, icon, label }: any) {
    const location = useLocation();
    const active = location.pathname === to || (to === '/dashboard' && location.pathname === '/dashboard/');

    return (
        <Link
            to={to}
            className={`flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all duration-500 font-black tracking-tighter text-lg ${active
                    ? 'bg-medical-primary text-white shadow-xl shadow-sky-500/30 -translate-y-1'
                    : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                }`}
        >
            <div className={active ? 'scale-110' : 'opacity-70'}>{icon}</div>
            <span>{label}</span>
        </Link>
    );
}

function MobileNavLink({ to, icon }: any) {
    const location = useLocation();
    const active = location.pathname === to || (to === '/dashboard' && location.pathname === '/dashboard/');

    return (
        <Link
            to={to}
            className={`flex flex-col items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300 ${active
                    ? 'text-sky-500 bg-sky-50'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
        >
            <div className={`${active ? 'scale-110' : 'scale-100'} transition-transform`}>{icon}</div>
            {active && <div className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-1 absolute bottom-1"></div>}
        </Link>
    );
}

function Overview() {
    const [tipIndex, setTipIndex] = useState(0);
    const tips = [
        "Buvez 2L d'eau pour optimiser la synchronisation neurale.",
        "La lumière du matin booste votre sérotonine et réinitialise votre horloge biologique.",
        "Prenez une pause respiratoire profonde de 5 minutes toutes les 2 heures.",
        "Les acides gras Oméga-3 sont essentiels à la santé des processeurs biologiques.",
        "Des cycles de sommeil réguliers améliorent l'efficacité métabolique de 15%."
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setTipIndex((prev) => (prev + 1) % tips.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-8 md:space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                <StatCard title="Total Inventory" value="1,248" color="bg-sky-50 text-sky-600 border-sky-100" />
                <StatCard title="Energy Units" value="894K" color="bg-emerald-50 text-emerald-600 border-emerald-100" />
                <div className="col-span-2 md:col-span-1">
                    <StatCard title="Critical Alert" value="03" color="bg-red-50 text-red-600 border-red-100" />
                </div>
            </div>

            {/* Health Tips Section */}
            <div className="glass-card rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 border-emerald-100 bg-emerald-50/30 flex items-center space-x-6 relative overflow-hidden group">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 shrink-0 shadow-lg shadow-emerald-500/10">
                    <Sparkles className="animate-pulse w-6 h-6 md:w-8 md:h-8" />
                </div>
                <div className="flex-1">
                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Protocole Santé Neurale</p>
                    <p className="text-sm md:text-lg font-bold text-slate-700 leading-tight transition-all duration-500">{tips[tipIndex]}</p>
                </div>
                <div className="hidden md:block text-[8px] font-black text-slate-300 uppercase tracking-[0.3em] rotate-90 absolute -right-4">Advice_V1.2</div>
            </div>

            <div className="glass-card rounded-[2rem] md:rounded-[3.5rem] p-8 md:p-12 border-white/40 h-[300px] md:h-[400px] flex flex-col items-center justify-center space-y-6">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-slate-100 rounded-full flex items-center justify-center text-slate-300">
                    <Activity size={40} className="animate-pulse" />
                </div>
                <p className="text-slate-400 font-black tracking-[0.2em] md:tracking-[0.5em] uppercase text-[10px] md:text-sm text-center">Neural Analytics Loading...</p>
            </div>
        </div>
    )
}

function StatCard({ title, value, color }: any) {
    return (
        <div className={`glass-card p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border shadow-xl md:shadow-2xl shadow-slate-200/50 group cursor-default ${color.split(' ')[2]}`}>
            <h3 className="text-[10px] md:text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] md:tracking-[0.3em] mb-2 md:mb-4 group-hover:text-slate-600 transition-colors">{title}</h3>
            <div className="flex items-end justify-between">
                <p className={`text-3xl md:text-4xl font-black tracking-tighter ${color.split(' ')[1]}`}>{value}</p>
                <div className={`w-4 md:w-8 h-1 bg-current opacity-20 group-hover:w-8 md:group-hover:w-16 transition-all duration-500`}></div>
            </div>
        </div>
    )
}

function Activity({ size, className }: any) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
        </svg>
    );
}
