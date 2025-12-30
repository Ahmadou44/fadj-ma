import { Routes, Route, Link } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag, Settings, LogOut } from 'lucide-react';
import Inventory from './Inventory'; // We will create this next

export default function Dashboard() {
    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
                <div className="p-6 border-b border-gray-200">
                    <h1 className="text-2xl font-bold text-medical-600">Fadj Ma</h1>
                    <p className="text-xs text-gray-500">Pharmacy Portal</p>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    <NavLink to="/dashboard" icon={<LayoutDashboard size={20} />} label="Overview" active />
                    <NavLink to="/dashboard/inventory" icon={<Package size={20} />} label="Inventory" />
                    <NavLink to="/dashboard/orders" icon={<ShoppingBag size={20} />} label="Orders" />
                    <NavLink to="/dashboard/settings" icon={<Settings size={20} />} label="Settings" />
                </nav>

                <div className="p-4 border-t border-gray-200">
                    <button className="flex items-center space-x-3 text-red-600 w-full px-4 py-2 hover:bg-red-50 rounded-lg transition">
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600">Pharmacie de garde</span>
                        <div className="w-10 h-10 bg-medical-100 rounded-full flex items-center justify-center text-medical-700 font-bold">
                            PH
                        </div>
                    </div>
                </header>

                <div className="p-8">
                    <Routes>
                        <Route path="/" element={<Overview />} />
                        <Route path="/inventory" element={<Inventory />} />
                        <Route path="/orders" element={<Orders />} />
                    </Routes>
                </div>
            </main>
        </div>
    );
}

function NavLink({ to, icon, label, active = false }: any) {
    return (
        <Link to={to} className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${active ? 'bg-medical-50 text-medical-700' : 'text-gray-600 hover:bg-gray-100'}`}>
            {icon}
            <span className="font-medium">{label}</span>
        </Link>
    );
}

function Overview() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard title="Total Orders" value="12" color="bg-blue-50 text-blue-600" />
            <StatCard title="Revenue (Today)" value="45,000 F" color="bg-green-50 text-green-600" />
            <StatCard title="Low Stock" value="3 Items" color="bg-orange-50 text-orange-600" />
        </div>
    )
}

function Orders() {
    return <div>Orders Management (Coming Soon)</div>
}

function StatCard({ title, value, color }: any) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
            <p className={`text-2xl font-bold ${color.split(' ')[1]}`}>{value}</p>
        </div>
    )
}
