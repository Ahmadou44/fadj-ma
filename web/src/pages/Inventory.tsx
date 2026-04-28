import { useState, useEffect } from 'react';
import { Search, Plus, Filter, AlertTriangle, CheckCircle2, MoreVertical, X, Boxes, BadgeDollarSign } from 'lucide-react';

interface StockItem {
    id: string;
    drug: {
        name: string;
        form?: string;
        class?: string;
    };
    quantity: number;
    price: number;
}

export default function Inventory() {
    const [items, setItems] = useState<StockItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [search, setSearch] = useState('');
    const [newProduct, setNewProduct] = useState({ drugName: '', quantity: '', price: '' });

    useEffect(() => {
        fetchInventory();
    }, []);

    const fetchInventory = async () => {
        try {
            const userStr = localStorage.getItem('user');
            if (!userStr) return;
            const user = JSON.parse(userStr);
            const pharmacyId = user.pharmacy?.id;

            const res = await fetch(`http://localhost:3000/api/pharmacy/${pharmacyId}/inventory`);
            const data = await res.json();
            setItems(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        const userStr = localStorage.getItem('user');
        const user = JSON.parse(userStr || '{}');
        const pharmacyId = user.pharmacy?.id;

        try {
            const res = await fetch('http://localhost:3000/api/pharmacy/inventory', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pharmacyId, ...newProduct })
            });

            if (res.ok) {
                setShowAddModal(false);
                setNewProduct({ drugName: '', quantity: '', price: '' });
                fetchInventory();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const filteredItems = items.filter(item =>
        item.drug.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6">
                <div>
                    <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-1 md:mb-2">Inventory <span className="text-medical-primary">OS</span></h3>
                    <p className="text-slate-500 font-medium tracking-wide text-xs md:text-base">Interface de gestion neurale des stocks.</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="w-full md:w-auto neon-button px-6 md:px-8 py-4 rounded-[1.5rem] md:rounded-2xl flex items-center justify-center space-x-3 font-black group tracking-tighter"
                >
                    <Plus size={20} className="group-hover:rotate-90 transition-transform duration-500" />
                    <span>INJECTER STOCK</span>
                </button>
            </div>

            {/* Stock Insights Bar */}
            {!loading && items.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-in fade-in zoom-in duration-1000 delay-300">
                    <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Skus</p>
                        <p className="text-xl font-black text-slate-800">{items.length}</p>
                    </div>
                    <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Low Stock</p>
                        <p className="text-xl font-black text-orange-500">{items.filter(i => i.quantity < 20).length}</p>
                    </div>
                    <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Out of Stock</p>
                        <p className="text-xl font-black text-red-500">{items.filter(i => i.quantity === 0).length}</p>
                    </div>
                    <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Inventory Value</p>
                        <p className="text-xl font-black text-emerald-600">{items.reduce((acc, i) => acc + (i.price * i.quantity), 0).toLocaleString()} F</p>
                    </div>
                </div>
            )}

            {/* Quick Filters / Search */}
            <div className="space-y-4">
                <div className="glass-card p-3 md:p-4 rounded-[1.5rem] md:rounded-[2rem] flex flex-col md:flex-row gap-3 md:gap-4 border-white/5">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="text"
                            placeholder="Scanner la base de données..."
                            className="w-full bg-slate-100/50 backdrop-blur-md border-none rounded-[1.2rem] md:rounded-2xl pl-12 md:pl-16 pr-4 md:pr-6 py-4 md:py-5 focus:ring-4 focus:ring-medical-primary/10 transition-all outline-none font-bold text-slate-700 placeholder-slate-400 text-sm md:text-base"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <button className="w-full md:w-auto px-6 py-4 md:py-5 bg-white border border-slate-200 rounded-[1.2rem] md:rounded-2xl flex items-center justify-center space-x-3 text-slate-600 font-black hover:bg-slate-50 transition-all shadow-sm">
                        <Filter size={18} />
                        <span className="text-sm md:text-base">FILTRES</span>
                    </button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                    {['All', 'Antalgique', 'Antibiotique', 'Vitamine', 'Digestion'].map((cat) => (
                        <button 
                            key={cat}
                            className="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest bg-white border border-slate-100 text-slate-400 hover:border-medical-primary hover:text-medical-primary transition-all"
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Inventory Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                {filteredItems.map(item => (
                    <div key={item.id} className="glass-card p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] group hover:scale-[1.03] transition-all duration-500 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 md:w-40 md:h-40 bg-medical-primary/5 rounded-full -mr-16 -mt-16 md:-mr-20 md:-mt-20 group-hover:scale-150 transition-transform duration-1000"></div>

                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-6 md:mb-8">
                                <div className="p-4 md:p-5 bg-medical-primary/10 text-medical-primary rounded-[1rem] md:rounded-[1.5rem] group-hover:bg-medical-primary group-hover:text-white transition-all duration-500 shadow-lg shadow-sky-500/10">
                                    <Boxes size={24} className="md:w-8 md:h-8" />
                                </div>
                                <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors">
                                    <MoreVertical size={20} className="md:w-6 md:h-6" />
                                </button>
                            </div>

                            <div className="mb-6 md:mb-8">
                                <h4 className="text-xl md:text-2xl font-black text-slate-800 tracking-tighter group-hover:text-medical-primary transition-colors duration-300">{item.drug.name}</h4>
                                <div className="flex gap-2 mt-2">
                                    <span className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] bg-slate-100 px-3 py-1 rounded-full">Unitary Unit</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 md:gap-6 pt-6 md:pt-8 border-t border-slate-100">
                                <div>
                                    <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Quantum Stock</p>
                                    <div className="flex items-center space-x-2 md:space-x-3 bg-slate-50 p-2 md:p-3 rounded-xl md:rounded-2xl">
                                        <span className={`text-xl md:text-2xl font-black ${item.quantity < 20 ? 'text-orange-500' : 'text-slate-800'}`}>{item.quantity}</span>
                                        {item.quantity < 20 && <AlertTriangle size={16} className="text-orange-500 animate-pulse md:w-[18px] md:h-[18px]" />}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Market Value</p>
                                    <div className="flex items-center space-x-2 bg-emerald-50 p-2 md:p-3 rounded-xl md:rounded-2xl">
                                        <BadgeDollarSign size={16} className="text-emerald-500 md:w-5 md:h-5" />
                                        <span className="text-xl md:text-2xl font-black text-emerald-700">{item.price}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {loading && <div className="text-center py-16 md:py-24 text-slate-400 font-black animate-pulse tracking-[0.2em] md:tracking-[0.4em] uppercase text-[10px] md:text-sm">Synchronisation des ondes cérébrales...</div>}

            {!loading && filteredItems.length === 0 && (
                <div className="glass-card rounded-[2rem] md:rounded-[4rem] p-12 md:p-32 text-center flex flex-col items-center gap-6 md:gap-8 border-dashed border-slate-200 bg-slate-50/30">
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 animate-bounce">
                        <Boxes size={40} className="md:w-16 md:h-16" />
                    </div>
                    <p className="text-slate-400 font-black tracking-[0.1em] md:tracking-[0.2em] uppercase text-sm md:text-lg">Aucune Entité trouvée dans ce quadrant</p>
                </div>
            )}

            {/* Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-slate-950/40 backdrop-blur-xl animate-in fade-in duration-300">
                    <div className="glass-card w-full max-w-xl rounded-t-[2.5rem] md:rounded-[3.5rem] p-8 md:p-12 relative shadow-[0_-20px_50px_rgba(0,0,0,0.5)] md:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border-white/10 animate-in slide-in-from-bottom-full md:zoom-in-95 duration-500 transition-all max-h-[90dvh] overflow-y-auto">
                        <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-8 md:hidden"></div>
                        <div className="flex justify-between items-center mb-8 md:mb-12">
                            <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Injection <span className="text-medical-primary">Data</span></h3>
                            <button onClick={() => setShowAddModal(false)} className="w-10 h-10 md:w-14 md:h-14 bg-slate-100 rounded-[1rem] md:rounded-[1.5rem] flex items-center justify-center text-slate-500 hover:bg-red-50 hover:text-red-500 transition-all active:scale-90">
                                <X size={20} className="md:w-7 md:h-7" />
                            </button>
                        </div>

                        <form onSubmit={handleAddProduct} className="space-y-6 md:space-y-8">
                            <div className="space-y-2 md:space-y-3">
                                <label className="text-[10px] md:text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] ml-4 md:ml-6 italic">ID de la Molécule</label>
                                <input
                                    required placeholder="Ex: Paracétamol Complex"
                                    className="w-full futuristic-input bg-slate-50/50 text-sm md:text-base py-4 md:py-5 px-6"
                                    value={newProduct.drugName}
                                    onChange={e => setNewProduct({ ...newProduct, drugName: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4 md:gap-8">
                                <div className="space-y-2 md:space-y-3">
                                    <label className="text-[10px] md:text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] ml-4 md:ml-6 italic">Volume</label>
                                    <input
                                        required type="number" placeholder="500"
                                        className="w-full futuristic-input bg-slate-50/50 text-sm md:text-base py-4 md:py-5 px-6"
                                        value={newProduct.quantity}
                                        onChange={e => setNewProduct({ ...newProduct, quantity: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2 md:space-y-3">
                                    <label className="text-[10px] md:text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] ml-4 md:ml-6 italic">Credits F</label>
                                    <input
                                        required type="number" placeholder="2500"
                                        className="w-full futuristic-input bg-slate-50/50 text-sm md:text-base py-4 md:py-5 px-6"
                                        value={newProduct.price}
                                        onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
                                    />
                                </div>
                            </div>

                            <button type="submit" className="w-full neon-button py-5 md:py-7 rounded-[2rem] md:rounded-[2.5rem] font-black text-lg md:text-2xl flex items-center justify-center space-x-3 md:space-x-4 mt-6 md:mt-8 shadow-xl shadow-sky-500/30">
                                <CheckCircle2 size={24} className="md:w-7 md:h-7" />
                                <span>SYNCHRONISER</span>
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
