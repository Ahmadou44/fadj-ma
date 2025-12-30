import { useState, useEffect } from 'react';
import { Search, Plus } from 'lucide-react';

interface StockItem {
    id: string;
    drug: { name: string };
    quantity: number;
    price: number;
}

export default function Inventory() {
    const [items, setItems] = useState<StockItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchInventory();
    }, []);

    const fetchInventory = async () => {
        try {
            const userStr = localStorage.getItem('user');
            if (!userStr) return;

            const user = JSON.parse(userStr);
            // Assuming user has pharmacy object attached or we use pharmacy ID
            // For prototype, we might need to get pharmacy ID from user context
            // Let's assume user.pharmacy.id exists
            const pharmacyId = user.pharmacy?.id;

            if (!pharmacyId) {
                console.error("No pharmacy ID found");
                setLoading(false);
                return;
            }

            const res = await fetch(`http://localhost:3000/api/pharmacy/${pharmacyId}/inventory`);
            const data = await res.json();
            setItems(data);
        } catch (error) {
            console.error("Failed to fetch inventory", error);
        } finally {
            setLoading(false);
        }
    };

    const getStatus = (stock: number) => {
        if (stock <= 0) return "Out of Stock";
        if (stock < 50) return "Low Stock";
        return "In Stock";
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "In Stock": return "bg-green-100 text-green-700";
            case "Low Stock": return "bg-orange-100 text-orange-700";
            default: return "bg-red-100 text-red-700";
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-800">Inventory Management</h3>
                <button className="flex items-center space-x-2 bg-medical-600 text-white px-4 py-2 rounded-lg hover:bg-medical-700 transition">
                    <Plus size={18} />
                    <span>Add Product</span>
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200 flex gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search inventory..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-medical-500"
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="p-8 text-center text-gray-500">Loading inventory...</div>
                ) : (
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-600">
                            <tr>
                                <th className="px-6 py-4 font-medium">Product Name</th>
                                <th className="px-6 py-4 font-medium">Stock</th>
                                <th className="px-6 py-4 font-medium">Price (CFA)</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {items.map((item) => {
                                const status = getStatus(item.quantity);
                                return (
                                    <tr key={item.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900">{item.drug.name}</td>
                                        <td className="px-6 py-4 text-gray-600">{item.quantity}</td>
                                        <td className="px-6 py-4 text-gray-600">{item.price}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(status)}`}>
                                                {status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button className="text-blue-600 hover:underline text-sm">Edit</button>
                                        </td>
                                    </tr>
                                );
                            })}
                            {items.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-gray-500">
                                        No items found. Add products to start selling.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
