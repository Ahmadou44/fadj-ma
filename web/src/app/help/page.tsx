'use client'

import Link from 'next/link'
import { ArrowLeft, Search, ChevronDown, MessageCircle, Phone, Mail } from 'lucide-react'
import { useState } from 'react'

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const faqs = [
    {
      id: 1,
      category: 'Commandes',
      question: 'Comment passer une commande ?',
      answer: 'Pour passer une commande, connectez-vous à votre compte, recherchez le médicament, sélectionnez la pharmacie, ajoutez au panier et procédez au paiement. La livraison se fera en 30 minutes à 2 heures.',
    },
    {
      id: 2,
      category: 'Commandes',
      question: 'Puis-je modifier ma commande après l\'avoir passée ?',
      answer: 'Vous pouvez modifier votre commande dans les 5 minutes suivant sa création. Après ce délai, contactez notre support pour assistance.',
    },
    {
      id: 3,
      category: 'Paiement',
      question: 'Quels modes de paiement sont acceptés ?',
      answer: 'Nous acceptons Wave, Orange Money, Free Money et les cartes bancaires (Visa, Mastercard). Tous les paiements sont sécurisés et chiffrés.',
    },
    {
      id: 4,
      category: 'Paiement',
      question: 'Est-ce que mes données de paiement sont sécurisées ?',
      answer: 'Oui, nous utilisons le chiffrement SSL/TLS et respectons les normes PCI-DSS pour protéger vos données bancaires.',
    },
    {
      id: 5,
      category: 'Livraison',
      question: 'Quel est le délai de livraison ?',
      answer: 'La livraison standard est de 30 minutes à 2 heures selon votre localisation. Vous pouvez suivre votre livraison en temps réel sur l\'application.',
    },
    {
      id: 6,
      category: 'Livraison',
      question: 'Y a-t-il des frais de livraison ?',
      answer: 'Les frais de livraison dépendent de la distance et du pharmacien. Ils vous seront affichés avant de confirmer votre commande.',
    },
    {
      id: 7,
      category: 'Compte',
      question: 'Comment créer un compte ?',
      answer: 'Cliquez sur "S\'inscrire", remplissez vos informations personnelles, vérifiez votre email et vous êtes prêt à commander!',
    },
    {
      id: 8,
      category: 'Compte',
      question: 'Comment réinitialiser mon mot de passe ?',
      answer: 'Sur la page de connexion, cliquez sur "Mot de passe oublié", entrez votre email et suivez les instructions reçues.',
    },
  ]

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const categories = ['Tous', ...new Set(faqs.map((faq) => faq.category))]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 hover:bg-gray-100 rounded-lg transition">
              <ArrowLeft size={24} className="text-gray-700" />
            </Link>
            <h1 className="text-3xl font-bold gradient-text">Centre d'Aide</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Search */}
        <div className="mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Recherchez une réponse..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-100 transition text-lg"
            />
          </div>
        </div>

        {/* FAQs */}
        <div className="space-y-4 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Questions Fréquemment Posées</h2>
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => (
              <div key={faq.id} className="card overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
                >
                  <div className="text-left">
                    <span className="inline-block badge badge-info text-xs mb-2">{faq.category}</span>
                    <h3 className="font-bold text-gray-900">{faq.question}</h3>
                  </div>
                  <ChevronDown
                    size={20}
                    className={`text-gray-400 transition-transform ${expandedFaq === faq.id ? 'rotate-180' : ''}`}
                  />
                </button>
                {expandedFaq === faq.id && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="card p-8 text-center">
              <p className="text-gray-600">Aucune question trouvée. Essayez une autre recherche.</p>
            </div>
          )}
        </div>

        {/* Contact Support */}
        <div className="card p-8 bg-gradient-to-r from-green-500 to-blue-600 text-white">
          <h3 className="text-2xl font-bold mb-4">Vous n'avez pas trouvé la réponse ?</h3>
          <p className="mb-6">Notre équipe de support est disponible 24/7 pour vous aider.</p>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="tel:+221771234567" className="btn bg-white text-green-600 hover:bg-gray-100 flex items-center justify-center gap-2">
              <Phone size={18} />
              Appeler
            </a>
            <a href="mailto:support@fadjma.com" className="btn bg-white text-green-600 hover:bg-gray-100 flex items-center justify-center gap-2">
              <Mail size={18} />
              Email
            </a>
            <Link href="/contact" className="btn bg-white text-green-600 hover:bg-gray-100 flex items-center justify-center gap-2">
              <MessageCircle size={18} />
              Chat
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Liens Utiles</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/about" className="card p-6 hover:shadow-lg transition">
              <h4 className="font-bold text-gray-900 mb-2">À Propos de Fadj Ma</h4>
              <p className="text-sm text-gray-600">Découvrez notre histoire et nos valeurs</p>
            </Link>
            <Link href="/payment-methods" className="card p-6 hover:shadow-lg transition">
              <h4 className="font-bold text-gray-900 mb-2">Modes de Paiement</h4>
              <p className="text-sm text-gray-600">Explorez nos options de paiement</p>
            </Link>
            <Link href="/pharmacies-garde" className="card p-6 hover:shadow-lg transition">
              <h4 className="font-bold text-gray-900 mb-2">Pharmacies de Garde</h4>
              <p className="text-sm text-gray-600">Trouvez les pharmacies ouvertes 24h/24</p>
            </Link>
            <Link href="/contact" className="card p-6 hover:shadow-lg transition">
              <h4 className="font-bold text-gray-900 mb-2">Nous Contacter</h4>
              <p className="text-sm text-gray-600">Envoyez-nous vos commentaires</p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
