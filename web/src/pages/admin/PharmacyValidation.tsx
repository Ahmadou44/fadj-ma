import { useState } from 'react';
import { ShieldCheck, Check, X } from 'lucide-react';

export default function PharmacyValidation() {
    const [pending, setPending] = useState([
        { id: 'p1', name: 'Pharmacie de la Paix', address: 'Parcelles Assainies U26', owner: 'Dr. Fall', license: 'LIC-2024-001', status: 'PENDING' },
        { id: 'p2', name: 'Pharmacie Serigne Saliou', address: 'Touba', owner: 'M. Ndiaye', license: 'LIC-PENDING', status: 'PENDING' },
    ]);

    const handleVerify = (id: string, decision: 'VERIFIED' | 'REJECTED') => {
        // Mock API call
        // fetch(`/api/pharmacy/admin/${id}/verify`, { method: 'PATCH', body: ... })
        setPending(pending.filter(p => p.id !== id));
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                <ShieldCheck className="mr-2 text-blue-600" /> Validation Pharmacies
            </h1>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Pharmacie</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Propriétaire</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Licence</th>
                            <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {pending.length === 0 ? (
                            <tr><td colSpan={4} className="p-8 text-center text-gray-500">Aucune demande en attente.</td></tr>
                        ) : (
                            pending.map((p) => (
                                <tr key={p.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-gray-900">{p.name}</div>
                                        <div className="text-sm text-gray-500">{p.address}</div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-700">{p.owner}</td>
                                    <td className="px-6 py-4 text-gray-600 font-mono text-xs">{p.license}</td>
                                    <td className="px-6 py-4 text-right flex justify-end gap-2">
                                        <button
                                            onClick={() => handleVerify(p.id, 'VERIFIED')}
                                            className="bg-green-100 text-green-700 p-2 rounded-lg hover:bg-green-200"
                                            title="Valider"
                                        >
                                            <Check size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleVerify(p.id, 'REJECTED')}
                                            className="bg-red-100 text-red-700 p-2 rounded-lg hover:bg-red-200"
                                            title="Rejeter"
                                        >
                                            <X size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
