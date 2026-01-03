import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag, LogOut, Bell } from 'lucide-react';
import Inventory from './Inventory';
import Orders from './Orders';

// Dashboard Overview Component
function DashboardOverview() {
    const [stats, setStats] = useState({ dailySales: 0, totalOrders: 0, pendingOrders: 0, lowStock: 0 });

    useEffect(() => {
        // Mock fetch
        // fetch('/api/pharmacy/1/stats').then...
        setStats({ dailySales: 150000, totalOrders: 12, pendingOrders: 3, lowStock: 5 });
    }, []);

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Tableau de bord</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="text-gray-500 text-sm font-medium mb-1">Chiffre d'affaires (Jour)</div>
                    <div className="text-3xl font-bold text-gray-900">{stats.dailySales.toLocaleString()} F</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="text-gray-500 text-sm font-medium mb-1">Commandes (Jour)</div>
                    <div className="text-3xl font-bold text-gray-900">{stats.totalOrders}</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 bg-orange-50 border-orange-100">
                    <div className="text-orange-600 text-sm font-medium mb-1">En attente</div>
                    <div className="text-3xl font-bold text-orange-700">{stats.pendingOrders}</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 bg-red-50 border-red-100">
                    <div className="text-red-600 text-sm font-medium mb-1">Stock faible</div>
                    <div className="text-3xl font-bold text-red-700">{stats.lowStock}</div>
                </div>
            </div>

            {/* Recent Activity Mockup */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-bold mb-4">Dernières ventes</h2>
                    <div className="space-y-3">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                                <div>
                                    <div className="font-medium">Doliprane 1000mg</div>
                                    <div className="text-sm text-gray-500">Il y a {i * 10} min</div>
                                </div>
                                <div className="font-bold text-green-600">+1000 F</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-bold mb-4">Alertes Stock</h2>
                    <div className="space-y-3">
                        {[1, 2].map(i => (
                            <div key={i} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                                <div className="flex items-center">
                                    <div className="w-2 h-2 rounded-full bg-red-500 mr-3"></div>
                                    <div className="font-medium">Efferalgan 1g</div>
                                </div>
                                <div className="text-sm font-bold text-red-600">Reste: 2</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Main Layout
export default function Dashboard() {
    const location = useLocation();
    const navigate = useNavigate();

    const menu = [
        { icon: LayoutDashboard, label: 'Tableau de bord', path: '/dashboard' },
        { icon: ShoppingBag, label: 'Commandes', path: '/dashboard/orders' },
        { icon: Package, label: 'Inventaire', path: '/dashboard/inventory' },
    ];

    const handleLogout = () => {
        // Clear token
        navigate('/login');
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
                <div className="p-6 border-b border-gray-100">
                    <h1 className="text-2xl font-bold text-emerald-600 flex items-center">
                        <span className="text-3xl mr-2">💊</span> Fadj Ma Pro
                    </h1>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {menu.map((item) => {
                        const Icon = item.icon;
                        const active = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${active
                                        ? 'bg-emerald-50 text-emerald-700 font-medium'
                                        : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <Icon size={20} className="mr-3" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-200">
                    <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                    >
                        <LogOut size={20} className="mr-3" />
                        Se déconnecter
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center sticky top-0 z-10">
                    <h2 className="text-gray-500">Pharmacie Centrale</h2>
                    <div className="relative p-2 rounded-full hover:bg-gray-100 cursor-pointer">
                        <Bell size={20} className="text-gray-600" />
                        <div className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full"></div>
                    </div>
                </header>

                <main className="p-8">
                    <Routes>
                        <Route path="/" element={<DashboardOverview />} />
                        <Route path="inventory" element={<Inventory />} />
                        <Route path="orders" element={<Orders />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
}
