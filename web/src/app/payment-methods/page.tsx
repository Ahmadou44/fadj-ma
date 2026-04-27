'use client'

import Link from 'next/link'
import { CreditCard, Smartphone, DollarSign, Check, ArrowLeft } from 'lucide-react'
import { useState } from 'react'

export default function PaymentMethodsPage() {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)

  const paymentMethods = [
    {
      id: 'wave',
      name: 'Wave',
      description: 'Paiement mobile sécurisé',
      icon: '📱',
      color: 'from-blue-400 to-blue-600',
      features: ['Paiement instantané', 'Sécurisé', 'Sans frais'],
      commission: '0%',
    },
    {
      id: 'orange-money',
      name: 'Orange Money',
      description: 'Service de paiement mobile Orange',
      icon: '🟠',
      color: 'from-orange-400 to-orange-600',
      features: ['Paiement mobile', 'Rapide', 'Fiable'],
      commission: '1%',
    },
    {
      id: 'free-money',
      name: 'Free Money',
      description: 'Paiement via Free Money',
      icon: '💳',
      color: 'from-purple-400 to-purple-600',
      features: ['Paiement sécurisé', 'Flexible', 'Support 24/7'],
      commission: '2%',
    },
    {
      id: 'card',
      name: 'Carte Bancaire',
      description: 'Visa, Mastercard',
      icon: '💰',
      color: 'from-green-400 to-green-600',
      features: ['Sécurisé', 'International', 'Protection'],
      commission: '2.5%',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 hover:bg-gray-100 rounded-lg transition">
              <ArrowLeft size={24} className="text-gray-700" />
            </Link>
            <h1 className="text-3xl font-bold gradient-text">Modes de Paiement</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Payment Methods */}
          <div>
            <h2 className="text-2xl font-bold mb-8">Choisissez votre mode de paiement</h2>
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`w-full card p-6 text-left transition-all duration-300 ${
                    selectedMethod === method.id
                      ? 'ring-2 ring-green-500 shadow-lg'
                      : 'hover:shadow-lg'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 bg-gradient-to-br ${method.color} rounded-lg flex items-center justify-center text-3xl`}>
                        {method.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{method.name}</h3>
                        <p className="text-sm text-gray-600">{method.description}</p>
                      </div>
                    </div>
                    {selectedMethod === method.id && (
                      <Check size={24} className="text-green-600" />
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {method.features.map((feature, idx) => (
                      <span key={idx} className="badge badge-success text-xs">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-700">
                    Commission: <span className="font-bold text-green-600">{method.commission}</span>
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            {selectedMethod ? (
              <div className="card p-8 sticky top-24">
                {paymentMethods.find((m) => m.id === selectedMethod) && (
                  <>
                    <h3 className="text-2xl font-bold mb-6">
                      {paymentMethods.find((m) => m.id === selectedMethod)?.name}
                    </h3>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-bold text-gray-900 mb-3">Étapes d'utilisation :</h4>
                        <ol className="space-y-3 text-gray-700">
                          <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                            <span>Sélectionnez ce mode de paiement</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                            <span>Entrez votre numéro de téléphone</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                            <span>Confirmez la transaction sur votre téléphone</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                            <span>Recevez une confirmation</span>
                          </li>
                        </ol>
                      </div>

                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <p className="text-sm text-green-800">
                          <strong>✓ Sécurisé :</strong> Tous les paiements sont chiffrés et sécurisés
                        </p>
                      </div>

                      <button className="btn btn-primary w-full">
                        Continuer avec {paymentMethods.find((m) => m.id === selectedMethod)?.name}
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="card p-8 text-center">
                <p className="text-gray-600 mb-4">Sélectionnez un mode de paiement pour voir les détails</p>
                <CreditCard size={48} className="mx-auto text-gray-300" />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
