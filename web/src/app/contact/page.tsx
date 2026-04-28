'use client'

import Link from 'next/link'
import { ArrowLeft, Mail, Phone, MapPin, Clock, Send } from 'lucide-react'
import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Message envoyé:', formData)
    setFormData({ name: '', email: '', subject: '', message: '' })
    alert('Votre message a été envoyé avec succès!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 hover:bg-gray-100 rounded-lg transition">
              <ArrowLeft size={24} className="text-gray-700" />
            </Link>
            <h1 className="text-3xl font-bold gradient-text">Nous Contacter</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Contactez-Nous</h2>

            <div className="space-y-6 mb-12">
              <div className="card p-6 flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Phone size={24} className="text-green-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Téléphone</h3>
                  <a href="tel:+221771234567" className="text-green-600 hover:underline">
                    +221 77 123 45 67
                  </a>
                  <p className="text-sm text-gray-600 mt-1">Lun-Dim: 24h/24</p>
                </div>
              </div>

              <div className="card p-6 flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Mail size={24} className="text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                  <a href="mailto:support@fadjma.com" className="text-blue-600 hover:underline">
                    support@fadjma.com
                  </a>
                  <p className="text-sm text-gray-600 mt-1">Réponse en moins de 2 heures</p>
                </div>
              </div>

              <div className="card p-6 flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <MapPin size={24} className="text-purple-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Adresse</h3>
                  <p className="text-gray-600">
                    45 Rue Jules Ferry<br />
                    Dakar, Sénégal
                  </p>
                </div>
              </div>

              <div className="card p-6 flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Clock size={24} className="text-orange-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Horaires</h3>
                  <p className="text-gray-600">
                    Lundi - Dimanche<br />
                    24 heures sur 24
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Suivez-Nous</h3>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center hover:bg-blue-200 transition">
                  f
                </a>
                <a href="#" className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center hover:bg-sky-200 transition">
                  𝕏
                </a>
                <a href="#" className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center hover:bg-pink-200 transition">
                  📷
                </a>
                <a href="#" className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center hover:bg-green-200 transition">
                  💬
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card p-8">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">Envoyez-Nous un Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nom complet</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
                  placeholder="Votre nom"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
                  placeholder="votre.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Sujet</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
                >
                  <option value="">Sélectionnez un sujet</option>
                  <option value="support">Support technique</option>
                  <option value="complaint">Réclamation</option>
                  <option value="partnership">Partenariat</option>
                  <option value="feedback">Retour d'expérience</option>
                  <option value="other">Autre</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-100 transition resize-none"
                  placeholder="Votre message..."
                />
              </div>

              <button type="submit" className="btn btn-primary w-full">
                <Send size={18} />
                Envoyer le Message
              </button>
            </form>

            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">
                <strong>💡 Conseil :</strong> Nous répondons généralement en moins de 2 heures pendant les heures de bureau.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
