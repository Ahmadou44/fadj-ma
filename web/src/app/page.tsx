'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Heart, MapPin, Clock, Star, Search, ShoppingCart, User, Pill, TrendingUp, Users, Zap } from 'lucide-react'

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

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
      color: 'from-green-400 to-green-600',
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
      color: 'from-blue-400 to-blue-600',
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
      color: 'from-purple-400 to-purple-600',
    },
  ]

  const stats = [
    { icon: Users, label: 'Patients', value: '50K+', color: 'from-green-400 to-green-600' },
    { icon: Pill, label: 'Médicaments', value: '10K+', color: 'from-blue-400 to-blue-600' },
    { icon: TrendingUp, label: 'Commandes', value: '100K+', color: 'from-purple-400 to-purple-600' },
    { icon: Zap, label: 'Livraison Rapide', value: '30 min', color: 'from-orange-400 to-orange-600' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-green-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className={`flex items-center gap-3 transition-all duration-500 ${isLoaded ? 'animate-fadeInUp' : 'opacity-0'}`}>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg hover-scale">
                <span className="text-white text-xl font-bold">💊</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">Fadj Ma</h1>
                <p className="text-xs text-gray-500">Pharmacies à Dakar</p>
              </div>
            </div>
            <nav className="flex items-center gap-6">
              <Link href="/dashboard" className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-300 hover-scale">
                <ShoppingCart size={24} className="text-gray-700" />
              </Link>
              <Link href="/login" className="btn btn-primary btn-sm">
                <User size={18} />
                Connexion
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-100/20 via-blue-100/20 to-purple-100/20 blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Texte */}
            <div className={`transition-all duration-700 ${isLoaded ? 'animate-slideInLeft' : 'opacity-0 translate-x-[-30px]'}`}>
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="gradient-text">Vos Médicaments</span>
                <br />
                <span className="text-gray-900">à Votre Porte</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Trouvez vos médicaments en ligne et recevez-les rapidement à domicile ou en pharmacie. Service fiable et sécurisé.
              </p>

              <div className="flex gap-4 flex-wrap">
                <Link href="/login?role=client" className="btn btn-primary btn-lg hover-lift">
                  <span>Je suis Patient</span>
                  <Heart size={20} />
                </Link>
                <Link href="/login?role=professional" className="btn btn-outline btn-lg hover-lift">
                  <span>Je suis Professionnel</span>
                  <Pill size={20} />
                </Link>
              </div>

              <div className="mt-12 flex gap-8">
                <div>
                  <p className="text-3xl font-bold gradient-text">50K+</p>
                  <p className="text-gray-600">Patients satisfaits</p>
                </div>
                <div>
                  <p className="text-3xl font-bold gradient-text">10K+</p>
                  <p className="text-gray-600">Médicaments</p>
                </div>
                <div>
                  <p className="text-3xl font-bold gradient-text">24/7</p>
                  <p className="text-gray-600">Support client</p>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className={`relative h-96 transition-all duration-700 delay-200 ${isLoaded ? 'animate-slideInRight' : 'opacity-0 translate-x-[30px]'}`}>
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-blue-600 rounded-3xl shadow-2xl opacity-20 blur-2xl"></div>
              <div className="relative h-full bg-gradient-to-br from-green-100 to-blue-100 rounded-3xl flex items-center justify-center shadow-xl border border-green-200/50">
                <div className="text-center">
                  <div className="text-8xl mb-4 animate-float">💊</div>
                  <p className="text-xl font-semibold text-gray-700">Livraison Rapide</p>
                  <p className="text-gray-600">30 minutes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`card p-6 text-center hover-lift transition-all duration-500 ${isLoaded ? 'animate-scaleIn' : 'opacity-0 scale-95'}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <stat.icon size={24} className="text-white" />
                </div>
                <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
                <p className="text-3xl font-bold gradient-text">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4">
              <span className="gradient-text">Pourquoi Fadj Ma ?</span>
            </h3>
            <p className="text-lg text-gray-600">Les meilleures raisons de nous choisir</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Clock, title: 'Livraison Rapide', desc: 'Livraison en 30 minutes à 2 heures', color: 'from-green-400 to-green-600' },
              { icon: MapPin, title: 'Pharmacies Proches', desc: 'Trouvez les pharmacies les plus proches', color: 'from-blue-400 to-blue-600' },
              { icon: Heart, title: 'Service Fiable', desc: 'Pharmacies vérifiées et support 24/7', color: 'from-purple-400 to-purple-600' },
            ].map((feature, index) => (
              <div
                key={index}
                className={`card p-8 text-center hover-lift transition-all duration-500 ${isLoaded ? 'animate-fadeInUp' : 'opacity-0 translate-y-[30px]'}`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                  <feature.icon size={32} className="text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h4>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pharmacies Section */}
      <section className="py-20 bg-gradient-to-b from-transparent to-green-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-4xl font-bold mb-4 gradient-text">Pharmacies Recommandées</h3>
          <p className="text-gray-600 mb-12">Découvrez nos partenaires de confiance</p>

          <div className="grid md:grid-cols-3 gap-8">
            {pharmacies.map((pharmacy, index) => (
              <Link key={pharmacy.id} href={`/pharmacy/${pharmacy.id}`}>
                <div
                  className={`card overflow-hidden hover-lift transition-all duration-500 cursor-pointer ${isLoaded ? 'animate-fadeInUp' : 'opacity-0 translate-y-[30px]'}`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className={`h-32 bg-gradient-to-br ${pharmacy.color} flex items-center justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 opacity-20 animate-pulse"></div>
                    <span className="text-6xl relative z-10 animate-float">🏥</span>
                  </div>
                  <div className="p-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{pharmacy.name}</h4>
                    <p className="text-sm text-gray-600 mb-4 flex items-center gap-2">
                      <MapPin size={16} className="text-green-600" />
                      {pharmacy.address}
                    </p>
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-1">
                        <Star size={16} className="text-yellow-400 fill-yellow-400" />
                        <span className="font-semibold text-gray-900">{pharmacy.rating}</span>
                        <span className="text-sm text-gray-600">({pharmacy.reviews})</span>
                      </div>
                      <span className="text-sm text-gray-600">{pharmacy.distance}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`badge ${pharmacy.isOpen ? 'badge-success' : 'badge-error'}`}>
                        {pharmacy.isOpen ? '✓ Ouvert' : '✗ Fermé'}
                      </span>
                      <span className="text-sm font-semibold text-gray-700">{pharmacy.medicines} produits</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h3 className="text-4xl font-bold text-white mb-4">Prêt à Commencer ?</h3>
          <p className="text-lg text-white/90 mb-8">
            Créez votre compte et accédez à des milliers de médicaments
          </p>
          <Link href="/login" className="btn bg-white text-green-600 hover:bg-gray-100 btn-lg hover-lift">
            S'inscrire Maintenant
            <Zap size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="font-bold mb-4 text-green-400">À Propos</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">À propos de Fadj Ma</a></li>
                <li><a href="#" className="hover:text-white transition">Carrières</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-blue-400">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">Centre d'aide</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
                <li><a href="#" className="hover:text-white transition">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-purple-400">Légal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">Conditions d'utilisation</a></li>
                <li><a href="#" className="hover:text-white transition">Politique de confidentialité</a></li>
                <li><a href="#" className="hover:text-white transition">Cookies</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-orange-400">Nous Suivre</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">Facebook</a></li>
                <li><a href="#" className="hover:text-white transition">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 Fadj Ma. Tous droits réservés. Fait avec ❤️ à Dakar</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
