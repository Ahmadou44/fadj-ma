'use client'

import Link from 'next/link'
import { ArrowLeft, Heart, Users, Zap, Target } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 hover:bg-gray-100 rounded-lg transition">
              <ArrowLeft size={24} className="text-gray-700" />
            </Link>
            <h1 className="text-3xl font-bold gradient-text">À Propos de Fadj Ma</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="card p-12 mb-12 text-center">
          <div className="text-6xl mb-4">💊</div>
          <h2 className="text-4xl font-bold mb-4 gradient-text">Fadj Ma</h2>
          <p className="text-xl text-gray-600 mb-6">
            Votre plateforme de confiance pour accéder aux médicaments à Dakar
          </p>
          <p className="text-gray-600">
            Fadj Ma signifie "Pharmacie" en wolof. Nous apportons les services de santé plus près de vous.
          </p>
        </div>

        {/* Mission */}
        <div className="card p-8 mb-8">
          <h3 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-3">
            <Target size={28} className="text-green-600" />
            Notre Mission
          </h3>
          <p className="text-gray-700 leading-relaxed">
            Fadj Ma est une plateforme digitale innovante qui connecte les patients aux pharmacies de confiance à Dakar.
            Notre mission est de rendre l'accès aux médicaments plus facile, plus rapide et plus sécurisé pour tous.
            Nous croyons que chacun mérite d'avoir accès à des services de santé de qualité, à tout moment.
          </p>
        </div>

        {/* Valeurs */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="card p-8 text-center">
            <Heart size={40} className="mx-auto text-red-500 mb-4" />
            <h4 className="text-lg font-bold mb-3 text-gray-900">Compassion</h4>
            <p className="text-gray-600">
              Nous plaçons la santé et le bien-être de nos patients au cœur de tout ce que nous faisons.
            </p>
          </div>
          <div className="card p-8 text-center">
            <Zap size={40} className="mx-auto text-yellow-500 mb-4" />
            <h4 className="text-lg font-bold mb-3 text-gray-900">Innovation</h4>
            <p className="text-gray-600">
              Nous utilisons la technologie pour améliorer l'accès aux services de santé.
            </p>
          </div>
          <div className="card p-8 text-center">
            <Users size={40} className="mx-auto text-blue-500 mb-4" />
            <h4 className="text-lg font-bold mb-3 text-gray-900">Communauté</h4>
            <p className="text-gray-600">
              Nous construisons une communauté de confiance entre patients et pharmaciens.
            </p>
          </div>
        </div>

        {/* Pourquoi nous choisir */}
        <div className="card p-8 mb-8">
          <h3 className="text-2xl font-bold mb-6 text-gray-900">Pourquoi Choisir Fadj Ma ?</h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                ✓
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Pharmacies Vérifiées</h4>
                <p className="text-gray-600">Toutes nos partenaires sont des pharmacies agréées et vérifiées.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                ✓
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Livraison Rapide</h4>
                <p className="text-gray-600">Livraison en 30 minutes à 2 heures selon votre localisation.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                ✓
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Paiement Sécurisé</h4>
                <p className="text-gray-600">Plusieurs options de paiement mobile sécurisées et fiables.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                ✓
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Support 24/7</h4>
                <p className="text-gray-600">Notre équipe est disponible pour vous aider à tout moment.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="card p-6 text-center">
            <p className="text-4xl font-bold gradient-text mb-2">50K+</p>
            <p className="text-gray-600">Patients satisfaits</p>
          </div>
          <div className="card p-6 text-center">
            <p className="text-4xl font-bold gradient-text mb-2">200+</p>
            <p className="text-gray-600">Pharmacies partenaires</p>
          </div>
          <div className="card p-6 text-center">
            <p className="text-4xl font-bold gradient-text mb-2">10K+</p>
            <p className="text-gray-600">Médicaments disponibles</p>
          </div>
          <div className="card p-6 text-center">
            <p className="text-4xl font-bold gradient-text mb-2">4.8/5</p>
            <p className="text-gray-600">Note moyenne</p>
          </div>
        </div>

        {/* CTA */}
        <div className="card p-8 bg-gradient-to-r from-green-500 to-blue-600 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Prêt à Commencer ?</h3>
          <p className="mb-6">Rejoignez des milliers de patients qui font confiance à Fadj Ma</p>
          <Link href="/login" className="btn bg-white text-green-600 hover:bg-gray-100">
            S'inscrire Maintenant
          </Link>
        </div>
      </main>
    </div>
  )
}
