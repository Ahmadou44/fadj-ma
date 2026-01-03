import { useState } from 'react';
import { Database, Plus } from 'lucide-react';

export default function GlobalDrugDatabase() {
    const [drugs] = useState([
        { id: 1, name: 'Doliprane 1000mg', form: 'Comprimé', class: 'Antalgique' },
        { id: 2, name: 'Efferalgan 1g', form: 'Effervescent', class: 'Antalgique' },
        { id: 3, name: 'Spasfon', form: 'Comprimé', class: 'Antispasmodique' },
    ]);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                    <Database className="mr-2 text-indigo-600" /> Base Médicaments
                </h1>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-indigo-700">
                    <Plus size={20} className="mr-2" />
                    Ajouter Fiche
                </button>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Nom Commercial</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Forme</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Classe Thérapeutique</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {drugs.map((d) => (
                            <tr key={d.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 font-bold text-gray-900">{d.name}</td>
                                <td className="px-6 py-4 text-gray-600">{d.form}</td>
                                <td className="px-6 py-4">
                                    <span className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full text-xs font-semibold">
                                        {d.class}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
