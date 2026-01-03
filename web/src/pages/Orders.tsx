import { useState } from 'react';
import { Clock, CheckCircle, XCircle, Truck } from 'lucide-react';

export default function Orders() {
    const [orders, setOrders] = useState([
        { id: '#ORD-001', customer: 'Moussa Diop', items: 3, total: 4500, time: '10 min', status: 'PENDING', type: 'PICKUP' },
        { id: '#ORD-002', customer: 'Fatou Ndiaye', items: 1, total: 12000, time: '25 min', status: 'READY', type: 'DELIVERY' },
        { id: '#ORD-003', customer: 'Seydou Ba', items: 2, total: 3200, time: '1h', status: 'COMPLETED', type: 'PICKUP' },
    ]);

    const handleStatusUpdate = (id: string, newStatus: string) => {
        setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Gestion des Commandes</h1>

            {/* Kanban / List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* PENDING */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 h-full">
                    <div className="flex items-center mb-4">
                        <Clock className="text-orange-500 mr-2" size={20} />
                        <h2 className="font-bold text-gray-700">En Attente (Nouvelles)</h2>
                        <span className="ml-auto bg-white px-2 py-0.5 rounded-full text-xs font-bold border border-gray-200">
                            {orders.filter(o => o.status === 'PENDING').length}
                        </span>
                    </div>

                    <div className="space-y-4">
                        {orders.filter(o => o.status === 'PENDING').map(order => (
                            <div key={order.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="font-bold text-gray-900">{order.id}</span>
                                    <span className="text-xs text-gray-500">{order.time}</span>
                                </div>
                                <div className="text-sm font-medium text-gray-800 mb-1">{order.customer}</div>
                                <div className="text-sm text-gray-500 mb-3">{order.items} articles • {order.total} F</div>

                                <div className="flex text-xs space-x-2 mb-3">
                                    <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded">
                                        {order.type === 'DELIVERY' ? 'Livraison 🛵' : 'Retrait 🏪'}
                                    </span>
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        className="flex-1 bg-green-50 text-green-700 py-2 rounded-lg text-sm font-medium hover:bg-green-100"
                                        onClick={() => handleStatusUpdate(order.id, 'READY')}
                                    >
                                        Accepter
                                    </button>
                                    <button
                                        className="flex-1 bg-red-50 text-red-700 py-2 rounded-lg text-sm font-medium hover:bg-red-100"
                                        onClick={() => handleStatusUpdate(order.id, 'CANCELLED')}
                                    >
                                        Refuser
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* READY / PROCESSING */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 h-full">
                    <div className="flex items-center mb-4">
                        <Truck className="text-blue-500 mr-2" size={20} />
                        <h2 className="font-bold text-gray-700">Prêt / En Livraison</h2>
                        <span className="ml-auto bg-white px-2 py-0.5 rounded-full text-xs font-bold border border-gray-200">
                            {orders.filter(o => o.status === 'READY').length}
                        </span>
                    </div>

                    <div className="space-y-4">
                        {orders.filter(o => o.status === 'READY').map(order => (
                            <div key={order.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="font-bold text-gray-900">{order.id}</span>
                                    <span className="text-xs text-gray-500">{order.time}</span>
                                </div>
                                <div className="text-sm font-medium text-gray-800 mb-2">{order.customer}</div>
                                <div className="flex items-center text-xs text-yellow-600 bg-yellow-50 p-2 rounded mb-3">
                                    ⚠ En attente du {order.type === 'DELIVERY' ? 'livreur' : 'client'}
                                </div>

                                <button
                                    className="w-full bg-gray-900 text-white py-2 rounded-lg text-sm font-medium hover:bg-gray-800"
                                    onClick={() => handleStatusUpdate(order.id, 'COMPLETED')}
                                >
                                    Terminer la commande
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* COMPLETED */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 h-full">
                    <div className="flex items-center mb-4">
                        <CheckCircle className="text-green-500 mr-2" size={20} />
                        <h2 className="font-bold text-gray-700">Terminé</h2>
                        <span className="ml-auto bg-white px-2 py-0.5 rounded-full text-xs font-bold border border-gray-200">
                            {orders.filter(o => o.status === 'COMPLETED').length}
                        </span>
                    </div>

                    <div className="space-y-4 opacity-75">
                        {orders.filter(o => o.status === 'COMPLETED').map(order => (
                            <div key={order.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                                <div className="flex justify-between items-start">
                                    <span className="font-bold text-gray-900 line-through">{order.id}</span>
                                    <span className="text-green-600 text-xs font-bold">PAYÉ</span>
                                </div>
                                <div className="text-sm text-gray-500">{order.customer}</div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
