import { useState } from 'react';
import { Search, Plus, Filter, MoreVertical } from 'lucide-react';

export default function Inventory() {
    const [drugs] = useState([
        { id: 1, name: 'Doliprane 1000mg', form: 'Comprimé', stock: 154, price: 1000, status: 'In Stock' },
        { id: 2, name: 'Efferalgan 1g', form: 'Effervescent', stock: 2, price: 1200, status: 'Low Stock' },
        { id: 3, name: 'Spasfon', form: 'Comprimé', stock: 45, price: 1800, status: 'In Stock' },
        { id: 4, name: 'Augmentin 1g', form: 'Sachet', stock: 0, price: 4500, status: 'Out of Stock' },
    ]);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Inventaire</h1>
                <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-emerald-700 transition">
                    <Plus size={20} className="mr-2" />
                    Ajouter un produit
                </button>
            </div>

            {/* Filters */}
            <div className="flex gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Rechercher un médicament..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                </div>
                <button className="flex items-center px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
                    <Filter size={20} className="mr-2" />
                    Filtres
                </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Nom du produit</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Forme</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Stock</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Prix</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Statut</th>
                            <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {drugs.map((drug) => (
                            <tr key={drug.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <div className="font-medium text-gray-900">{drug.name}</div>
                                </td>
                                <td className="px-6 py-4 text-gray-600">{drug.form}</td>
                                <td className="px-6 py-4 font-medium text-gray-900">{drug.stock}</td>
                                <td className="px-6 py-4 text-gray-600">{drug.price.toLocaleString()} F</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${drug.status === 'In Stock' ? 'bg-green-100 text-green-800' :
                                            drug.status === 'Low Stock' ? 'bg-orange-100 text-orange-800' :
                                                'bg-red-100 text-red-800'
                                        }`}>
                                        {drug.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-gray-400 hover:text-gray-600">
                                        <MoreVertical size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
