import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { ShieldCheck, Database, LogOut } from 'lucide-react';
import PharmacyValidation from './PharmacyValidation';
import GlobalDrugDatabase from './GlobalDrugDatabase';

export default function AdminDashboard() {
    const location = useLocation();

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="w-64 bg-slate-900 text-white flex flex-col">
                <div className="p-6 border-b border-slate-800">
                    <h1 className="text-xl font-bold flex items-center">
                        <span className="text-2xl mr-2">🩺</span> Fadj Ma Admin
                    </h1>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    <Link
                        to="/admin/validation"
                        className={`flex items-center px-4 py-3 rounded-lg transition-colors ${location.pathname === '/admin/validation'
                                ? 'bg-slate-800 text-blue-400 font-medium border-l-4 border-blue-400'
                                : 'text-gray-400 hover:bg-slate-800 hover:text-white'
                            }`}
                    >
                        <ShieldCheck size={20} className="mr-3" />
                        Validations
                    </Link>

                    <Link
                        to="/admin/drugs"
                        className={`flex items-center px-4 py-3 rounded-lg transition-colors ${location.pathname === '/admin/drugs'
                                ? 'bg-slate-800 text-indigo-400 font-medium border-l-4 border-indigo-400'
                                : 'text-gray-400 hover:bg-slate-800 hover:text-white'
                            }`}
                    >
                        <Database size={20} className="mr-3" />
                        Base Médicaments
                    </Link>
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <button className="flex items-center w-full px-4 py-3 text-gray-400 hover:bg-red-900/20 hover:text-red-400 rounded-lg transition-colors">
                        <LogOut size={20} className="mr-3" />
                        Déconnexion
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto p-8">
                <Routes>
                    <Route path="validation" element={<PharmacyValidation />} />
                    <Route path="drugs" element={<GlobalDrugDatabase />} />
                    <Route path="*" element={<PharmacyValidation />} />
                </Routes>
            </div>
        </div>
    );
}
