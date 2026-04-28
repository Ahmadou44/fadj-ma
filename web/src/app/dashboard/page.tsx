'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Home,
  ShoppingCart,
  Package,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
} from 'lucide-react'

interface User {
  email: string
  role: 'client' | 'professional'
  token: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/login')
      return
    }

    setUser(JSON.parse(userData))
    setLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-600"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const isClient = user.role === 'client'

  const clientMenuItems = [
    { icon: Home, label: 'Accueil', href: '/dashboard' },
    { icon: ShoppingCart, label: 'Panier', href: '/dashboard/cart' },
    { icon: Package, label: 'Mes Commandes', href: '/dashboard/orders' },
    { icon: BarChart3, label: 'Ordonnances', href: '/dashboard/prescriptions' },
    { icon: Settings, label: 'Paramètres', href: '/dashboard/settings' },
  ]

  const professionalMenuItems = [
    { icon: Home, label: 'Tableau de Bord', href: '/dashboard' },
    { icon: Package, label: 'Commandes', href: '/dashboard/orders' },
    { icon: BarChart3, label: 'Inventaire', href: '/dashboard/inventory' },
    { icon: BarChart3, label: 'Analytics', href: '/dashboard/analytics' },
    { icon: Settings, label: 'Paramètres', href: '/dashboard/settings' },
  ]

  const menuItems = isClient ? clientMenuItems : professionalMenuItems

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-gray-900 text-white transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-4 flex items-center justify-between">
          {sidebarOpen && (
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">💊</span>
              <span className="font-bold">Fadj Ma</span>
            </Link>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-800 rounded-lg transition"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-4 py-8 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-gray-800 transition group"
            >
              <item.icon size={20} />
              {sidebarOpen && <span className="group-hover:translate-x-1 transition">{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-gray-800 transition w-full"
          >
            <LogOut size={20} />
            {sidebarOpen && <span>Déconnexion</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            {isClient ? 'Mon Compte' : 'Tableau de Bord Professionnel'}
          </h1>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-medical-500"
              />
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-10 h-10 bg-medical-600 rounded-full flex items-center justify-center text-white font-bold">
              {user.email.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto p-8">
          {isClient ? (
            <ClientDashboard user={user} />
          ) : (
            <ProfessionalDashboard user={user} />
          )}
        </div>
      </main>
    </div>
  )
}

function ClientDashboard({ user }: { user: User }) {
  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-medical-600 to-medical-700 text-white rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-2">Bienvenue, {user.email.split('@')[0]}!</h2>
        <p>Trouvez vos médicaments et services de santé en ligne</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Commandes en cours</p>
              <p className="text-3xl font-bold text-gray-900">2</p>
            </div>
            <Package className="text-medical-600" size={40} />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Articles au panier</p>
              <p className="text-3xl font-bold text-gray-900">5</p>
            </div>
            <ShoppingCart className="text-blue-600" size={40} />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Économies réalisées</p>
              <p className="text-3xl font-bold text-gray-900">12,500 FCFA</p>
            </div>
            <BarChart3 className="text-green-600" size={40} />
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Commandes Récentes</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
              <div>
                <p className="font-semibold text-gray-900">Commande #{1000 + i}</p>
                <p className="text-sm text-gray-600">Pharmacie Centrale Dakar</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">25,000 FCFA</p>
                <p className="text-sm text-green-600">✓ Livrée</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ProfessionalDashboard({ user }: { user: User }) {
  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-medical-600 to-medical-700 text-white rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-2">Bienvenue, Professionnel!</h2>
        <p>Gérez vos commandes et votre inventaire</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Commandes en attente</p>
              <p className="text-3xl font-bold text-gray-900">8</p>
            </div>
            <Package className="text-red-600" size={40} />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Complétées aujourd'hui</p>
              <p className="text-3xl font-bold text-gray-900">24</p>
            </div>
            <Package className="text-green-600" size={40} />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Revenus du mois</p>
              <p className="text-3xl font-bold text-gray-900">2.5M FCFA</p>
            </div>
            <BarChart3 className="text-blue-600" size={40} />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Articles en stock</p>
              <p className="text-3xl font-bold text-gray-900">1,250</p>
            </div>
            <ShoppingCart className="text-yellow-600" size={40} />
          </div>
        </div>
      </div>

      {/* Pending Orders */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Commandes en Attente</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
              <div>
                <p className="font-semibold text-gray-900">Commande #{2000 + i}</p>
                <p className="text-sm text-gray-600">Client: Ahmadou Sow</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">15,000 FCFA</p>
                <button className="text-sm bg-medical-600 text-white px-4 py-1 rounded hover:bg-medical-700 transition">
                  Traiter
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
