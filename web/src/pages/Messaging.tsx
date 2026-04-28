import { useState, useEffect, useRef } from 'react';
import { Send, User, MessageSquare, Search, Sparkles, Activity, ShieldCheck, Zap } from 'lucide-react';

export default function Messaging() {
    const [conversations, setConversations] = useState<any[]>([]);
    const [selectedPatient, setSelectedPatient] = useState<any>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [content, setContent] = useState('');
    const [search, setSearch] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const pharmacyId = JSON.parse(localStorage.getItem('user') || '{}').pharmacy?.id;

    useEffect(() => {
        setConversations([{ id: 'mock-patient-id', name: 'Moussa Diop', lastMsg: 'I need advice on dosage', time: '14:20' }]);
    }, []);

    useEffect(() => {
        if (selectedPatient) {
            fetchMessages();
            const interval = setInterval(fetchMessages, 3000);
            return () => clearInterval(interval);
        }
    }, [selectedPatient]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const fetchMessages = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/message/${pharmacyId}/${selectedPatient.id}`);
            const data = await res.json();
            setMessages(data);
        } catch (error) {
            console.error(error);
        }
    };

    const sendMessage = async () => {
        if (!content.trim()) return;
        try {
            await fetch('http://localhost:3000/api/message', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content,
                    senderId: pharmacyId,
                    receiverId: selectedPatient.id
                })
            });
            setContent('');
            fetchMessages();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
                <div>
                    <h3 className="text-4xl font-black text-slate-900 tracking-tighter mb-2">Neural <span className="text-medical-primary">Messaging</span></h3>
                    <p className="text-slate-500 font-medium tracking-wide">Lien de communication quantique sécurisé avec vos patients.</p>
                </div>
                <div className="flex items-center space-x-3 bg-emerald-50 px-6 py-3 rounded-2xl border border-emerald-100 uppercase tracking-widest text-[10px] font-black text-emerald-600">
                    <ShieldCheck size={18} />
                    <span>End-to-End Atomic Encryption</span>
                </div>
            </div>

            <div className="flex bg-white rounded-[4rem] border border-slate-200 overflow-hidden h-[750px] shadow-2xl relative">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-medical-primary/5 rounded-full -mr-48 -mt-48 blur-[100px] pointer-events-none"></div>

                {/* Sidebar (Patients) */}
                <div className="w-96 border-r border-slate-100 flex flex-col relative z-10">
                    <div className="p-8 border-b border-slate-50 space-y-6">
                        <div className="relative">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                placeholder="Scan patient frequency..."
                                className="w-full bg-slate-50/50 border-none rounded-2xl pl-16 pr-6 py-4 focus:ring-4 focus:ring-medical-primary/10 transition-all outline-none font-bold text-slate-700 placeholder-slate-400"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-auto p-4 space-y-2 custom-scrollbar">
                        {conversations.map(c => (
                            <button
                                key={c.id}
                                onClick={() => setSelectedPatient(c)}
                                className={`w-full p-6 rounded-[2.5rem] flex items-center space-x-5 transition-all duration-300 group ${selectedPatient?.id === c.id ? 'bg-medical-primary text-white shadow-xl shadow-sky-500/20 translate-x-2' : 'hover:bg-slate-50 text-slate-600'}`}
                            >
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl shadow-lg transition-transform group-hover:scale-110 ${selectedPatient?.id === c.id ? 'bg-white/20' : 'bg-medical-50 text-medical-primary'}`}>
                                    {c.name.charAt(0)}
                                </div>
                                <div className="text-left flex-1">
                                    <div className={`font-black tracking-tight text-lg ${selectedPatient?.id === c.id ? 'text-white' : 'text-slate-800'}`}>{c.name}</div>
                                    <div className={`text-xs font-medium truncate w-40 opacity-70 ${selectedPatient?.id === c.id ? 'text-white' : 'text-slate-400'}`}>{c.lastMsg}</div>
                                </div>
                                <div className="text-[10px] font-black opacity-50">{c.time}</div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Chat Engine */}
                <div className="flex-1 flex flex-col relative z-20 bg-slate-50/30 backdrop-blur-sm">
                    {selectedPatient ? (
                        <>
                            {/* Header Panel */}
                            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-white/50">
                                <div className="flex items-center space-x-5">
                                    <div className="relative">
                                        <div className="w-14 h-14 bg-gradient-to-tr from-sky-400 to-emerald-400 rounded-2xl flex items-center justify-center font-black text-white text-xl shadow-lg">
                                            <User size={28} />
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-4 border-white rounded-full"></div>
                                    </div>
                                    <div>
                                        <h4 className="text-2xl font-black text-slate-900 tracking-tighter leading-none">{selectedPatient.name}</h4>
                                        <div className="flex items-center space-x-2 mt-2">
                                            <Activity size={12} className="text-emerald-500 animate-pulse" />
                                            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest leading-none underline decoration-emerald-500/30 decoration-2 underline-offset-4">Active Neural Session</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-slate-400 hover:text-medical-primary hover:shadow-lg transition-all border border-slate-100">
                                        <Zap size={20} />
                                    </button>
                                    <button className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-slate-400 hover:text-red-500 hover:shadow-lg transition-all border border-slate-100">
                                        <Sparkles size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* Stream Segment */}
                            <div className="flex-1 overflow-auto p-10 space-y-8 custom-scrollbar">
                                <div className="text-center py-4">
                                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">Transmission logs opened: Today 09:42 UTC</span>
                                </div>

                                {messages.map(m => {
                                    const isMine = m.senderId === pharmacyId;
                                    return (
                                        <div key={m.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`max-w-[65%] p-6 rounded-[2.5rem] shadow-xl text-lg font-bold tracking-tight ${isMine
                                                ? 'bg-medical-primary text-white rounded-tr-none shadow-sky-500/10 border border-sky-400/20'
                                                : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none shadow-slate-100'
                                                }`}>
                                                {m.content}
                                            </div>
                                        </div>
                                    );
                                })}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Transcription Input */}
                            <div className="p-10 bg-white/80 backdrop-blur-xl border-t border-slate-100">
                                <div className="flex space-x-4 bg-slate-100/50 p-2 rounded-[2.5rem] border border-slate-200">
                                    <input
                                        className="flex-1 bg-transparent border-none rounded-3xl px-8 py-5 focus:outline-none font-bold text-slate-800 placeholder-slate-400 text-lg"
                                        placeholder="Enter neural command or transmission..."
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                                    />
                                    <button
                                        onClick={sendMessage}
                                        disabled={!content.trim()}
                                        className={`w-16 h-16 rounded-[1.8rem] flex items-center justify-center transition-all ${content.trim() ? 'bg-medical-primary text-white shadow-xl shadow-sky-500/30 hover:scale-105 active:scale-95' : 'bg-slate-200 text-slate-400'}`}
                                    >
                                        <Send size={28} />
                                    </button>
                                </div>
                                <div className="text-center mt-6">
                                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em] flex items-center justify-center gap-3">
                                        <span className="w-8 h-[1px] bg-slate-100"></span>
                                        AI Translation Enabled (FR • EN • WO)
                                        <span className="w-8 h-[1px] bg-slate-100"></span>
                                    </p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center bg-slate-50 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-tr from-sky-400/5 to-emerald-400/5"></div>
                            <div className="relative text-center flex flex-col items-center gap-10">
                                <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center shadow-2xl relative">
                                    <div className="absolute inset-0 bg-medical-primary/5 rounded-full animate-ping"></div>
                                    <MessageSquare size={64} className="text-slate-100" />
                                </div>
                                <div className="space-y-4">
                                    <h4 className="text-2xl font-black text-slate-300 uppercase tracking-[0.3em]">Neural Interface Offline</h4>
                                    <p className="text-slate-400 font-medium">Please select a neural link to initiate session.</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
