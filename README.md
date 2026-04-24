# 🏥 Fadj Ma - Marketplace Pharmacies Dakar

**Fadj Ma** est une plateforme de mise en relation entre pharmacies et patients à Dakar, permettant la recherche de médicaments, la gestion de commandes et la livraison rapide.

## 🌟 Fonctionnalités

### Pour les Patients
- 🔍 Recherche de médicaments et pharmacies
- 📍 Géolocalisation et pharmacies proches
- 🛒 Panier et gestion des commandes
- 💳 Paiement mobile (Wave, Orange Money, Free Money)
- 📦 Suivi en temps réel des livraisons
- 💊 Gestion des ordonnances

### Pour les Professionnels
- 📊 Tableau de bord avec statistiques
- 📋 Gestion des commandes
- 📦 Inventaire et stocks
- 📈 Analytics et rapports
- 💳 Gestion des abonnements
- 👥 Gestion des clients

## 📱 Applications

### Mobile (React Native + Expo)
- Application patient avec interface complète
- Application livreur avec GPS en temps réel
- Support iOS et Android

### Web (Next.js)
- Interface responsive pour patients et professionnels
- Dashboard avec authentification basée sur les rôles
- Déployée sur Vercel

### Backend (Node.js + Express)
- APIs RESTful complètes
- WebSocket pour le temps réel
- PostgreSQL pour la base de données
- Authentification JWT + OAuth

## 🚀 Déploiement

### Déployer sur Vercel

```bash
# 1. Installer Vercel CLI
npm install -g vercel

# 2. Authentifier avec Vercel
vercel login

# 3. Déployer
cd web
vercel --prod
```

Ou utiliser le script de déploiement :
```bash
chmod +x deploy.sh
./deploy.sh
```

### Domaine Personnalisé

1. Aller sur https://vercel.com/dashboard
2. Sélectionner le projet "fadj-ma"
3. Aller dans "Settings" → "Domains"
4. Ajouter votre domaine (ex: fadj-ma.com)
5. Configurer les DNS records

## 📁 Structure du Projet

```
fadj-ma/
├── mobile/                 # Application React Native
│   ├── src/
│   │   ├── screens/       # Écrans de l'application
│   │   ├── services/      # Services API
│   │   └── contexts/      # Contextes React
│   └── App.tsx
├── web/                    # Application Next.js
│   ├── src/
│   │   ├── app/           # Pages Next.js
│   │   ├── components/    # Composants React
│   │   └── styles/        # Styles CSS
│   ├── package.json
│   └── next.config.js
├── server/                 # Backend Node.js
│   ├── src/
│   │   ├── routes/        # Routes API
│   │   ├── services/      # Services métier
│   │   └── middleware/    # Middlewares
│   ├── prisma/            # Schéma DB
│   └── package.json
└── README.md
```

## 🛠️ Stack Technique

### Frontend
- **React 18** - UI library
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **Socket.io** - Real-time communication
- **Prisma** - ORM
- **PostgreSQL** - Database

### Mobile
- **React Native** - Cross-platform
- **Expo** - Development platform
- **Expo Router** - Navigation

### APIs Tierces
- **Google Maps** - Géolocalisation
- **Wave** - Paiement mobile
- **Orange Money** - Paiement mobile
- **Twilio** - SMS notifications

## 🔐 Authentification

L'application utilise une authentification basée sur les rôles :

- **Patient** : Accès à la recherche, panier, commandes
- **Professionnel** : Accès au dashboard, gestion des commandes
- **Admin** : Accès complet au système

## 📊 Statistiques

- ✅ 12+ écrans développés
- ✅ 3 applications (Mobile Patient, Mobile Livreur, Web)
- ✅ 8 modules API
- ✅ Authentification JWT + OAuth
- ✅ Paiements mobiles intégrés
- ✅ Notifications en temps réel

## 📝 Documentation

- [Architecture](./ARCHITECTURE.md)
- [Déploiement](./DEPLOYMENT.md)
- [Guide d'Implémentation](./IMPLEMENTATION_GUIDE.md)
- [Architecture Basée sur les Rôles](./ROLE_BASED_ARCHITECTURE.md)

## 🤝 Contribution

Les contributions sont bienvenues ! Veuillez :

1. Fork le repository
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📞 Support

Pour toute question ou problème :
- Email : support@fadjma.com
- GitHub Issues : https://github.com/Ahmadou44/fadj-ma/issues
- Documentation : https://docs.fadjma.com

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🙏 Remerciements

Merci à tous les contributeurs et à la communauté Dakar pour leur soutien !

---

**Fait avec ❤️ à Dakar**

Visitez notre site : [https://fadj-ma.vercel.app](https://fadj-ma.vercel.app)
