'use client'

import Link from 'next/link'
import { ArrowLeft, MapPin, Clock, Phone, Star, Navigation } from 'lucide-react'
import { useState, useEffect } from 'react'

interface Pharmacy {
  id: number
  name: string
  address: string
  phone: string
  distance: number
  rating: number
  reviews: number
  isOpen: boolean
  hours: string
  latitude: number
  longitude: number
  medicines: number
}

export default function PharmaciesGardePage() {
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([])
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simuler la géolocalisation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        () => {
          // Localisation par défaut (Dakar)
          setUserLocation({ lat: 14.6928, lng: -17.0469 })
        }
      )
    }

    // Pharmacies de garde simulées
    const mockPharmacies: Pharmacy[] = [
      {
        id: 1,
        name: 'Pharmacie Centrale Dakar',
        address: '45 Rue Jules Ferry, Dakar',
        phone: '+221 77 123 45 67',
        distance: 2.3,
        rating: 4.8,
        reviews: 234,
        isOpen: true,
        hours: '24h/24',
        latitude: 14.6895,
        longitude: -17.0432,
        medicines: 1250,
      },
      {
        id: 2,
        name: 'Pharmacie du Plateau',
        address: '12 Avenue Cheikh Anta Diop, Dakar',
        phone: '+221 77 234 56 78',
        distance: 1.5,
        rating: 4.6,
        reviews: 189,
        isOpen: true,
        hours: '24h/24',
        latitude: 14.6950,
        longitude: -17.0520,
        medicines: 980,
      },
      {
        id: 3,
        name: 'Pharmacie Medic+',
        address: '78 Boulevard de la République, Dakar',
        phone: '+221 77 345 67 89',
        distance: 3.1,
        rating: 4.7,
        reviews: 312,
        isOpen: true,
        hours: '24h/24',
        latitude: 14.6750,
        longitude: -17.0350,
        medicines: 1540,
      },
      {
        id: 4,
        name: 'Pharmacie Ngor',
        address: '23 Rue de Ngor, Dakar',
        phone: '+221 77 456 78 90',
        distance: 5.2,
        rating: 4.5,
        reviews: 156,
        isOpen: true,
        hours: '24h/24',
        latitude: 14.7450,
        longitude: -17.1250,
        medicines: 850,
      },
    ]

    setPharmacies(mockPharmacies)
    setSelectedPharmacy(mockPharmacies[0])
    setLoading(false)
  }, [])

  const calculateDistance = (lat: number, lng: number) => {
    if (!userLocation) return 0
    const R = 6371 // Rayon de la Terre en km
    const dLat = ((lat - userLocation.lat) * Math.PI) / 180
    const dLng = ((lng - userLocation.lng) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((userLocation.lat * Math.PI) / 180) *
        Math.cos((lat * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return Math.round(R * c * 10) / 10
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
            <h1 className="text-3xl font-bold gradient-text">Pharmacies de Garde 24h/24</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="text-center py-20">
            <p className="text-gray-600">Chargement des pharmacies...</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Liste des pharmacies */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold mb-6">Pharmacies Disponibles</h2>
              <div className="space-y-4">
                {pharmacies.map((pharmacy) => (
                  <button
                    key={pharmacy.id}
                    onClick={() => setSelectedPharmacy(pharmacy)}
                    className={`w-full card p-4 text-left transition-all duration-300 cursor-pointer ${
                      selectedPharmacy?.id === pharmacy.id
                        ? 'ring-2 ring-green-500 shadow-lg'
                        : 'hover:shadow-lg'
                    }`}
                  >
                    <h3 className="font-bold text-gray-900 mb-2">{pharmacy.name}</h3>
                    <p className="text-sm text-gray-600 mb-3 flex items-center gap-2">
                      <MapPin size={14} className="text-green-600" />
                      {calculateDistance(pharmacy.latitude, pharmacy.longitude)} km
                    </p>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1">
                        <Star size={14} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-semibold">{pharmacy.rating}</span>
                        <span className="text-xs text-gray-600">({pharmacy.reviews})</span>
                      </div>
                      <span className="badge badge-success text-xs">Ouvert 24h</span>
                    </div>
                    <p className="text-xs text-gray-600">{pharmacy.medicines} produits</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Détails et Carte */}
            <div className="lg:col-span-2 space-y-6">
              {selectedPharmacy && (
                <>
                  {/* Carte */}
                  <div className="card overflow-hidden h-96">
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center relative">
                      {/* Simuler une carte */}
                      <div className="text-center">
                        <MapPin size={48} className="mx-auto text-green-600 mb-4" />
                        <p className="text-gray-600 font-semibold">{selectedPharmacy.name}</p>
                        <p className="text-sm text-gray-500">
                          {selectedPharmacy.latitude.toFixed(4)}, {selectedPharmacy.longitude.toFixed(4)}
                        </p>
                        <p className="text-sm text-green-600 mt-2 font-semibold">
                          Distance: {calculateDistance(selectedPharmacy.latitude, selectedPharmacy.longitude)} km
                        </p>
                        <a
                          href={`https://maps.google.com/?q=${selectedPharmacy.latitude},${selectedPharmacy.longitude}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary btn-sm mt-4"
                        >
                          <Navigation size={16} />
                          Ouvrir dans Google Maps
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Détails */}
                  <div className="card p-8">
                    <h2 className="text-3xl font-bold mb-6 text-gray-900">{selectedPharmacy.name}</h2>

                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                      {/* Informations */}
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-bold text-gray-900 mb-2">Adresse</h3>
                          <p className="text-gray-600 flex items-start gap-2">
                            <MapPin size={18} className="text-green-600 flex-shrink-0 mt-1" />
                            {selectedPharmacy.address}
                          </p>
                        </div>

                        <div>
                          <h3 className="font-bold text-gray-900 mb-2">Téléphone</h3>
                          <a
                            href={`tel:${selectedPharmacy.phone}`}
                            className="text-green-600 font-semibold hover:underline flex items-center gap-2"
                          >
                            <Phone size={18} />
                            {selectedPharmacy.phone}
                          </a>
                        </div>

                        <div>
                          <h3 className="font-bold text-gray-900 mb-2">Horaires</h3>
                          <p className="text-gray-600 flex items-center gap-2">
                            <Clock size={18} className="text-green-600" />
                            {selectedPharmacy.hours}
                          </p>
                        </div>
                      </div>

                      {/* Statistiques */}
                      <div className="space-y-4">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <p className="text-sm text-gray-600 mb-2">Note</p>
                          <div className="flex items-center gap-2">
                            <div className="flex gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  size={20}
                                  className={`${
                                    i < Math.floor(selectedPharmacy.rating)
                                      ? 'text-yellow-400 fill-yellow-400'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="font-bold text-gray-900">{selectedPharmacy.rating}</span>
                            <span className="text-sm text-gray-600">({selectedPharmacy.reviews} avis)</span>
                          </div>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <p className="text-sm text-gray-600 mb-2">Produits disponibles</p>
                          <p className="text-3xl font-bold text-blue-600">{selectedPharmacy.medicines}+</p>
                        </div>

                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                          <p className="text-sm text-gray-600 mb-2">Distance</p>
                          <p className="text-3xl font-bold text-purple-600">
                            {calculateDistance(selectedPharmacy.latitude, selectedPharmacy.longitude)} km
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4 flex-wrap">
                      <button className="btn btn-primary flex-1">
                        <span>Commander</span>
                      </button>
                      <a
                        href={`https://maps.google.com/?q=${selectedPharmacy.latitude},${selectedPharmacy.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary flex-1"
                      >
                        <Navigation size={18} />
                        <span>Itinéraire</span>
                      </a>
                      <a
                        href={`tel:${selectedPharmacy.phone}`}
                        className="btn btn-outline flex-1"
                      >
                        <Phone size={18} />
                        <span>Appeler</span>
                      </a>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
