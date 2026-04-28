'use client'

import Link from 'next/link'
import { ArrowLeft, Edit2, MapPin, Phone, Mail, LogOut, Heart, Package, Settings } from 'lucide-react'
import { useState } from 'react'

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [user, setUser] = useState({
    name: 'Ahmed Diallo',
    email: 'ahmed.diallo@example.com',
    phone: '+221 77 123 45 67',
    avatar: '👤',
  })

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      label: 'Domicile',
      address: '45 Rue Jules Ferry, Dakar',
      isDefault: true,
    },
    {
      id: 2,
      label: 'Bureau',
      address: '12 Avenue Cheikh Anta Diop, Dakar',
      isDefault: false,
    },
  ])

  const [orders, setOrders] = useState([
    {
      id: 1,
      date: '2025-01-15',
      pharmacy: 'Pharmacie Centrale Dakar',
      total: '15 000 FCFA',
      status: 'Livré',
      items: 3,
    },
    {
      id: 2,
      date: '2025-01-10',
      pharmacy: 'Pharmacie du Plateau',
      total: '8 500 FCFA',
      status: 'Livré',
      items: 2,
    },
  ])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 hover:bg-gray-100 rounded-lg transition">
              <ArrowLeft size={24} className="text-gray-700" />
            </Link>
            <h1 className="text-3xl font-bold gradient-text">Mon Profil</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Profile Card */}
            <div className="card p-8 text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-600 rounded-full flex items-center justify-center text-5xl mx-auto mb-4 shadow-lg">
                {user.avatar}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{user.name}</h2>
              <p className="text-gray-600 mb-6">{user.email}</p>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="btn btn-primary w-full mb-3"
              >
                <Edit2 size={18} />
                Modifier le profil
              </button>
              <button className="btn btn-outline w-full">
                <LogOut size={18} />
                Déconnexion
              </button>
            </div>

            {/* Menu rapide */}
            <div className="space-y-2">
              <Link href="/payment-methods" className="card p-4 hover:shadow-lg transition cursor-pointer flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  💳
                </div>
                <span className="font-semibold text-gray-900">Modes de paiement</span>
              </Link>
              <Link href="/addresses" className="card p-4 hover:shadow-lg transition cursor-pointer flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <MapPin size={20} className="text-green-600" />
                </div>
                <span className="font-semibold text-gray-900">Mes adresses</span>
              </Link>
              <Link href="/settings" className="card p-4 hover:shadow-lg transition cursor-pointer flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Settings size={20} className="text-purple-600" />
                </div>
                <span className="font-semibold text-gray-900">Paramètres</span>
              </Link>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Informations personnelles */}
            <div className="card p-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Informations Personnelles</h3>
              {isEditing ? (
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nom complet</label>
                    <input
                      type="text"
                      value={user.name}
                      onChange={(e) => setUser({ ...user, name: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={user.email}
                      onChange={(e) => setUser({ ...user, email: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Téléphone</label>
                    <input
                      type="tel"
                      value={user.phone}
                      onChange={(e) => setUser({ ...user, phone: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-100"
                    />
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="btn btn-primary flex-1"
                    >
                      Enregistrer
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="btn btn-outline flex-1"
                    >
                      Annuler
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                    <div>
                      <p className="text-sm text-gray-600">Nom complet</p>
                      <p className="font-semibold text-gray-900">{user.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                    <div>
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <Mail size={16} /> Email
                      </p>
                      <p className="font-semibold text-gray-900">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <Phone size={16} /> Téléphone
                      </p>
                      <p className="font-semibold text-gray-900">{user.phone}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Adresses sauvegardées */}
            <div className="card p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Adresses Sauvegardées</h3>
                <Link href="/addresses" className="btn btn-primary btn-sm">
                  + Ajouter
                </Link>
              </div>
              <div className="space-y-4">
                {addresses.map((addr) => (
                  <div key={addr.id} className="border-l-4 border-green-500 pl-4 py-2">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-gray-900">{addr.label}</h4>
                      {addr.isDefault && <span className="badge badge-success">Par défaut</span>}
                    </div>
                    <p className="text-gray-600 flex items-center gap-2">
                      <MapPin size={16} className="text-green-600" />
                      {addr.address}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Commandes récentes */}
            <div className="card p-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Commandes Récentes</h3>
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-sm text-gray-600">{order.date}</p>
                        <p className="font-bold text-gray-900">{order.pharmacy}</p>
                      </div>
                      <span className="badge badge-success">{order.status}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{order.items} article(s)</span>
                      <span className="font-bold text-green-600">{order.total}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/orders" className="btn btn-outline w-full mt-6">
                <Package size={18} />
                Voir toutes les commandes
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
