import { useState, useEffect } from 'react';
import { Package, CheckCircle, XCircle, Clock, FileText, User, Phone, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';

interface Order {
    id: string;
    totalPrice: number;
    status: string;
    createdAt: string;
    paymentStatus: string;
    paymentMethod: string | null;
    prescriptionUrl: string | null;
    patient: {
        name: string;
        phone: string;
    };
    items: Array<{
        id: string;
        drug: { name: string };
        quantity: number;
        price: number;
    }>;
}

export default function Orders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const userStr = localStorage.getItem('user');
            if (!userStr) return;
            const user = JSON.parse(userStr);
            const pharmacyId = user.pharmacy?.id;

            const res = await fetch(`http://localhost:3000/api/order/pharmacy/${pharmacyId}`);
            const data = await res.json();
            setOrders(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (orderId: string, status: string) => {
        try {
            const res = await fetch(`http://localhost:3000/api/order/${orderId}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            });
            if (res.ok) fetchOrders();
        } catch (error) {
            console.error(error);
        }
    };

    const getStatusInfo = (status: string) => {
        switch (status) {
            case 'PENDING': return { icon: <Clock size={16} />, label: 'PROCESSING', color: 'text-orange-500 bg-orange-500/10 border-orange-500/20' };
            case 'CONFIRMED': return { icon: <ShieldCheck size={16} />, label: 'CONFIRMED', color: 'text-sky-500 bg-sky-500/10 border-sky-500/20' };
            case 'COMPLETED': return { icon: <CheckCircle size={16} />, label: 'DELIVERED', color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' };
            case 'REJECTED': return { icon: <XCircle size={16} />, label: 'ABORTED', color: 'text-red-500 bg-red-500/10 border-red-500/20' };
            default: return { icon: <Clock size={16} />, label: status, color: 'text-slate-500 bg-slate-500/10 border-slate-500/20' };
        }
    };

    return (
        <div className="space-y-6 md:space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter mb-1 md:mb-2">Order <span className="text-medical-primary">Flow</span></h3>
                    <p className="text-slate-500 font-medium tracking-wide italic text-xs md:text-base">Terminal de réception et traitement des flux bio-médicaux.</p>
                </div>
                <div className="flex gap-4 self-start md:self-end">
                    <div className="glass-card px-4 md:px-6 py-2 md:py-3 rounded-[1rem] md:rounded-2xl flex items-center space-x-2 md:space-x-3 border-white/40">
                        <div className="w-2 md:w-3 h-2 md:h-3 bg-emerald-500 rounded-full animate-pulse shadow-lg shadow-emerald-500/50"></div>
                        <span className="text-[10px] md:text-xs font-black text-slate-700 uppercase tracking-widest">Nexus Link Active</span>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-20 md:py-32 text-slate-400 font-black tracking-[0.2em] md:tracking-[0.4em] animate-pulse text-xs md:text-base">SYNCHRONISATION DES FLUX...</div>
            ) : (
                <div className="grid grid-cols-1 gap-6 md:gap-8">
                    {orders.map(order => {
                        const status = getStatusInfo(order.status);
                        return (
                            <div key={order.id} className="glass-card rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 border-white/40 shadow-xl md:shadow-2xl shadow-slate-200/50 group hover:-translate-y-1 transition-all duration-500">
                                <div className="flex flex-col lg:flex-row gap-6 md:gap-10">
                                    {/* Left Panel: Status & Patient */}
                                    <div className="lg:w-1/3 space-y-6 md:space-y-8">
                                        <div className="flex justify-between md:justify-start items-center md:space-x-4">
                                            <div className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl flex items-center space-x-1.5 md:space-x-2 border ${status.color}`}>
                                                {status.icon}
                                                <span className="text-[10px] md:text-xs font-black tracking-widest">{status.label}</span>
                                            </div>
                                            <span className="font-mono text-[10px] md:text-xs text-slate-400 font-bold tracking-tighter">#{order.id.slice(0, 12).toUpperCase()}</span>
                                        </div>

                                        <div className="space-y-3 md:space-y-4">
                                            <div className="flex items-center space-x-3 md:space-x-4 bg-slate-50 p-4 md:p-5 rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-inner">
                                                <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-xl md:rounded-2xl flex items-center justify-center text-medical-primary shadow-lg">
                                                    <User size={24} className="md:w-8 md:h-8" />
                                                </div>
                                                <div>
                                                    <h4 className="text-xl md:text-2xl font-black text-slate-800 tracking-tighter">{order.patient.name}</h4>
                                                    <div className="flex items-center text-slate-500 space-x-1.5 md:space-x-2 mt-0.5">
                                                        <Phone size={12} className="text-emerald-500 md:w-[14px] md:h-[14px]" />
                                                        <p className="text-xs md:text-sm font-bold">{order.patient.phone}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-2 md:space-x-3 text-slate-400 px-2 md:px-4">
                                                <MapPin size={12} className="md:w-[14px] md:h-[14px]" />
                                                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest">Dakar Sector • Zone A-14</span>
                                            </div>
                                        </div>

                                        <div className="flex gap-2 md:gap-3">
                                            <div className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl text-[9px] md:text-[10px] font-black border ${order.paymentStatus === 'PAID' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-orange-50 text-orange-600 border-orange-100'}`}>
                                                {order.paymentStatus}
                                            </div>
                                            {order.paymentMethod && (
                                                <div className="px-3 md:px-4 py-1.5 md:py-2 bg-slate-100 rounded-lg md:rounded-xl text-[9px] md:text-[10px] font-black text-slate-500 border border-slate-200 uppercase">
                                                    {order.paymentMethod.replace('_', ' ')}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Middle Panel: Items */}
                                    <div className="flex-1 space-y-4 md:space-y-6">
                                        <div className="bg-slate-50/50 rounded-[1.5rem] md:rounded-[2.5rem] p-5 md:p-8 border border-white/60">
                                            <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] md:tracking-[0.3em] mb-4 md:mb-6 flex items-center">
                                                <Package size={12} className="mr-1.5 md:mr-2 md:w-[14px] md:h-[14px]" />
                                                CARGO MANIFEST
                                            </p>
                                            <div className="space-y-3 md:space-y-4">
                                                {order.items.map(item => (
                                                    <div key={item.id} className="flex justify-between items-center bg-white p-3 md:p-4 rounded-xl md:rounded-2xl border border-slate-100 shadow-sm group/item hover:border-medical-primary transition-colors">
                                                        <div className="flex items-center space-x-3 md:space-x-4">
                                                            <div className="w-8 h-8 md:w-10 md:h-10 bg-medical-50 rounded-lg md:rounded-xl flex items-center justify-center text-medical-primary font-black text-sm md:text-base">
                                                                {item.drug.name.charAt(0)}
                                                            </div>
                                                            <span className="font-black text-slate-700 tracking-tight text-sm md:text-base">{item.drug.name}</span>
                                                        </div>
                                                        <div className="flex items-center space-x-4 md:space-x-8">
                                                            <span className="text-slate-400 font-bold text-xs md:text-sm">x{item.quantity}</span>
                                                            <span className="text-slate-900 font-black text-sm md:text-base">{item.price} F</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {order.prescriptionUrl && (
                                            <a
                                                href={order.prescriptionUrl}
                                                target="_blank"
                                                className="flex items-center justify-between w-full p-4 md:p-6 bg-medical-primary/5 rounded-[1.5rem] md:rounded-[2rem] border border-medical-primary/20 hover:bg-medical-primary/10 transition-all group/link"
                                            >
                                                <div className="flex items-center space-x-3 md:space-x-4 text-medical-primary font-black uppercase tracking-widest text-[10px] md:text-xs">
                                                    <FileText size={16} className="md:w-5 md:h-5" />
                                                    <span>View Neural Prescription</span>
                                                </div>
                                                <ExternalLink size={16} className="text-medical-primary group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform md:w-5 md:h-5" />
                                            </a>
                                        )}
                                    </div>

                                    {/* Right Panel: Actions */}
                                    <div className="lg:w-1/4 flex flex-col justify-between items-start md:items-end mt-4 md:mt-0 pt-4 md:pt-0 border-t border-slate-100 md:border-none">
                                        <div className="text-left md:text-right w-full flex justify-between md:block items-end">
                                            <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Energy Credits</p>
                                            <p className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter">{order.totalPrice}<span className="text-sm md:text-lg ml-1 text-slate-400">F</span></p>
                                        </div>

                                        <div className="flex flex-col gap-3 md:gap-4 w-full mt-6 md:mt-10">
                                            {order.status === 'PENDING' && (
                                                <>
                                                    <button
                                                        onClick={() => updateStatus(order.id, 'CONFIRMED')}
                                                        className="w-full bg-medical-primary text-white py-4 md:py-5 rounded-[1.5rem] md:rounded-[2rem] font-black text-sm md:text-lg shadow-xl shadow-sky-500/30 hover:shadow-sky-500/50 hover:scale-[1.02] active:scale-95 transition-all"
                                                    >
                                                        CONFIRM TRANSMISSION
                                                    </button>
                                                    <button
                                                        onClick={() => updateStatus(order.id, 'REJECTED')}
                                                        className="w-full bg-white border-2 border-slate-100 text-slate-400 py-4 md:py-5 rounded-[1.5rem] md:rounded-[2rem] font-black text-sm md:text-lg hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all"
                                                    >
                                                        ABORT PROTOCOL
                                                    </button>
                                                </>
                                            )}
                                            {order.status === 'CONFIRMED' && (
                                                <button
                                                    onClick={() => updateStatus(order.id, 'COMPLETED')}
                                                    className="w-full bg-emerald-500 text-white py-4 md:py-5 rounded-[1.5rem] md:rounded-[2rem] font-black text-sm md:text-lg shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-[1.02] active:scale-95 transition-all"
                                                >
                                                    SET AS READY
                                                </button>
                                            )}
                                            {(order.status === 'COMPLETED' || order.status === 'REJECTED') && (
                                                <div className="w-full py-4 md:py-5 rounded-[1.5rem] md:rounded-[2rem] bg-slate-100 text-slate-400 font-black text-center uppercase tracking-widest text-[10px] md:text-xs">
                                                    Archived Transaction
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    {orders.length === 0 && (
                        <div className="glass-card rounded-[2rem] md:rounded-[4rem] p-16 md:p-32 text-center flex flex-col items-center gap-6 md:gap-8 border-dashed border-slate-200 bg-slate-50/30">
                            <div className="w-24 h-24 md:w-32 md:h-32 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 animate-bounce">
                                <Package size={40} className="md:w-[64px] md:h-[64px]" />
                            </div>
                            <p className="text-slate-400 font-black tracking-[0.1em] md:tracking-[0.2em] uppercase text-sm md:text-xl">Aucun flux de données détecté</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
