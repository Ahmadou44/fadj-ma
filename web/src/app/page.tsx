'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Heart, MapPin, Clock, Star, Search, ShoppingCart, User } from 'lucide-react'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [userRole, setUserRole] = useState<'client' | 'professional' | null>(null)

  const pharmacies = [
    {
      id: 1,
      name: 'Pharmacie Centrale Dakar',
      address: '45 Rue Jules Ferry, Dakar',
      distance: '2.3 km',
      rating: 4.8,
      reviews: 234,
      isOpen: true,
      medicines: 1250,
    },
    {
      id: 2,
      name: 'Pharmacie du Plateau',
      address: '12 Avenue Cheikh Anta Diop, Dakar',
      distance: '1.5 km',
      rating: 4.6,
      reviews: 189,
      isOpen: true,
      medicines: 980,
    },
    {
      id: 3,
      name: 'Pharmacie Medic+',
      address: '78 Boulevard de la République, Dakar',
      distance: '3.1 km',
      rating: 4.7,
      reviews: 312,
      isOpen: false,
      medicines: 1540,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-medical-600 to-medical-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-medical-600 font-bold text-lg">💊</span>
              </div>
              <h1 className="text-2xl font-bold">Fadj Ma</h1>
            </div>
            <nav className="flex items-center gap-4">
              <Link href="/dashboard" className="hover:opacity-80 transition">
                <ShoppingCart size={24} />
              </Link>
              <Link href="/login" className="hover:opacity-80 transition">
                <User size={24} />
              </Link>
            </nav>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Rechercher un médicament..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-medical-500"
            />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-medical-50 to-blue-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trouvez vos médicaments en ligne
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Livraison rapide à domicile ou retrait en pharmacie
            </p>

            {!userRole ? (
              <div className="flex gap-4 justify-center">
                <Link
                  href="/login?role=client"
                  className="bg-medical-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-medical-700 transition"
                >
                  Je suis Patient
                </Link>
                <Link
                  href="/login?role=professional"
                  className="bg-white text-medical-600 px-8 py-3 rounded-lg font-semibold border-2 border-medical-600 hover:bg-medical-50 transition"
                >
                  Je suis Professionnel
                </Link>
              </div>
            ) : (
              <Link
                href="/dashboard"
                className="bg-medical-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-medical-700 transition inline-block"
              >
                Accéder au Dashboard
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Pourquoi choisir Fadj Ma ?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-medical-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="text-medical-600" size={32} />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Livraison Rapide</h4>
              <p className="text-gray-600">Livraison en 30 minutes à 2 heures selon votre localisation</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-medical-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-medical-600" size={32} />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Pharmacies Proches</h4>
              <p className="text-gray-600">Trouvez les pharmacies les plus proches de votre localisation</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-medical-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-medical-600" size={32} />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Service Fiable</h4>
              <p className="text-gray-600">Pharmacies vérifiées et service client 24/7</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pharmacies Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Pharmacies Recommandées</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pharmacies.map((pharmacy) => (
              <Link key={pharmacy.id} href={`/pharmacy/${pharmacy.id}`}>
                <div className="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer overflow-hidden">
                  <div className="h-40 bg-gradient-to-br from-medical-100 to-blue-100 flex items-center justify-center">
                    <span className="text-5xl">🏥</span>
                  </div>
                  <div className="p-4">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{pharmacy.name}</h4>
                    <p className="text-sm text-gray-600 mb-3 flex items-center gap-1">
                      <MapPin size={16} />
                      {pharmacy.address}
                    </p>
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-1">
                        <Star size={16} className="text-yellow-400 fill-yellow-400" />
                        <span className="font-semibold text-gray-900">{pharmacy.rating}</span>
                        <span className="text-sm text-gray-600">({pharmacy.reviews})</span>
                      </div>
                      <span className="text-sm text-gray-600">{pharmacy.distance}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-semibold ${pharmacy.isOpen ? 'text-green-600' : 'text-red-600'}`}>
                        {pharmacy.isOpen ? '✓ Ouvert' : '✗ Fermé'}
                      </span>
                      <span className="text-sm text-gray-600">{pharmacy.medicines} médicaments</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-medical-600 to-medical-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold mb-4">Prêt à commencer ?</h3>
          <p className="text-lg mb-8 opacity-90">
            Créez votre compte et accédez à des milliers de médicaments
          </p>
          <Link
            href="/register"
            className="bg-white text-medical-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block"
          >
            S'inscrire Maintenant
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">À Propos</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">À propos de Fadj Ma</a></li>
                <li><a href="#" className="hover:text-white transition">Carrières</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">Centre d'aide</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
                <li><a href="#" className="hover:text-white transition">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Légal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">Conditions d'utilisation</a></li>
                <li><a href="#" className="hover:text-white transition">Politique de confidentialité</a></li>
                <li><a href="#" className="hover:text-white transition">Cookies</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Nous Suivre</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">Facebook</a></li>
                <li><a href="#" className="hover:text-white transition">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 Fadj Ma. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
