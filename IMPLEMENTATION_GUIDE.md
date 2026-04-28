# Guide d'Implémentation - Fadj Ma

## Vue d'ensemble

Fadj Ma est une application mobile complète de marketplace de pharmacies avec authentification basée sur les rôles, gestion des commandes, paiements mobiles, et notifications en temps réel.

## Architecture

### Structure du Projet

```
fadj-ma/
├── mobile/                    # Application React Native (Expo)
│   ├── src/
│   │   ├── screens/          # Écrans de l'application
│   │   ├── services/         # Services (API, notifications)
│   │   ├── contexts/         # Contextes React (Auth)
│   │   ├── hooks/            # Hooks personnalisés
│   │   └── constants/        # Constantes et configuration
│   ├── App.tsx               # Point d'entrée principal
│   └── app.json              # Configuration Expo
├── server/                    # Backend Node.js/Express
│   ├── src/
│   │   ├── routes/           # Routes API
│   │   ├── controllers/       # Contrôleurs
│   │   ├── models/           # Modèles Prisma
│   │   └── services/         # Services métier
│   ├── prisma/               # Configuration Prisma
│   └── package.json
└── web/                       # Dashboard web (optionnel)
```

## Authentification Basée sur les Rôles

### Rôles Utilisateurs

1. **Client (Patient)**
   - Accès : Recherche, panier, commandes, ordonnances
   - Écrans : ClientHomeScreen, CartScreen, OrderDetailScreen, PrescriptionsScreen

2. **Professionnel (Pharmacie/Docteur/Clinique)**
   - Accès : Gestion des commandes, inventaire, analytics, abonnement
   - Écrans : ProfessionalHomeScreen, InventoryScreen, AnalyticsScreen, SubscriptionScreen

### Flux d'Authentification

```
RoleSelectionScreen → RegisterScreen → LoginScreen → Dashboard (selon le rôle)
```

## Écrans Implémentés

### Pour les Clients

| Écran | Fichier | Fonctionnalités |
|-------|---------|-----------------|
| Accueil | `ClientHomeScreen.tsx` | Recherche, pharmacies proches, filtres |
| Panier | `CartScreen.tsx` | Gestion des articles, modes de livraison |
| Commandes | `HomeScreen.tsx` | Liste des commandes, historique |
| Détail Commande | `OrderDetailScreen.tsx` | Timeline, suivi, détails |
| Paiement | `PaymentScreen.tsx` | Wave, Orange Money, Free Money |
| Confirmation | `OrderConfirmationScreen.tsx` | Résumé, prochaines étapes |
| Ordonnances | `PrescriptionsScreen.tsx` | Upload, validation, statuts |
| Profil | `ProfileScreen.tsx` | Informations personnelles, adresses |

### Pour les Professionnels

| Écran | Fichier | Fonctionnalités |
|-------|---------|-----------------|
| Tableau de Bord | `ProfessionalHomeScreen.tsx` | Statistiques, commandes en attente |
| Gestion Commande | `ProfessionalOrderDetailScreen.tsx` | Mise à jour de statut, notes |
| Inventaire | `InventoryScreen.tsx` | Gestion des stocks, alertes |
| Analytics | `AnalyticsScreen.tsx` | Graphiques, top produits, satisfaction |
| Abonnement | `SubscriptionScreen.tsx` | Plans, renouvellement, facturation |
| Profil | `ProfessionalProfileScreen.tsx` | Informations professionnelles |

## Services

### API Service (`api.ts`)

```typescript
// Authentification
apiService.login(email, password)
apiService.register(data)
apiService.logout()

// Utilisateurs
apiService.getProfile()
apiService.updateProfile(data)

// Commandes
apiService.getOrders(filters)
apiService.createOrder(data)
apiService.updateOrder(orderId, data)

// Paiements
apiService.initiatePayment(data)
apiService.confirmPayment(paymentId)

// Abonnements
apiService.getSubscription()
apiService.upgradeSubscription(planId)
```

### Notification Service (`notification.ts`)

```typescript
// Notifications push
notificationService.registerForPushNotifications()
notificationService.sendLocalNotification(title, body)

// Notifications métier
notificationService.notifyOrderConfirmed(orderNumber)
notificationService.notifyOrderInDelivery(orderNumber, driverName)
notificationService.notifyPrescriptionApproved(prescriptionName)
notificationService.notifyLowStock(medicineName, quantity)
```

## Contexte d'Authentification

### AuthContext

```typescript
interface User {
  id: string
  name: string
  email: string
  phone: string
  role: 'client' | 'professional'
  professionalType?: 'pharmacy' | 'doctor' | 'clinic'
}

// Utilisation
const { user, isAuthenticated, login, logout, register } = useContext(AuthContext)
```

## Intégrations Tierces

### Paiements Mobiles

- **Wave** : Paiement mobile sécurisé
- **Orange Money** : Paiement par Orange Money
- **Free Money** : Paiement par Free Money

### Notifications

- **Expo Notifications** : Push notifications
- **Twilio** : SMS (à implémenter)

### Localisation

- **Google Maps** : Géolocalisation et itinéraires

## Plans d'Abonnement

### Tarifs Professionnels

| Type | Mensuel | 3 mois (-5%) | 6 mois (-10%) | 12 mois (-20%) |
|------|---------|-------------|--------------|----------------|
| Petite Pharmacie | 15 000 FCFA | 42 750 FCFA | 81 000 FCFA | 144 000 FCFA |
| Clinique/Labo | 30 000 FCFA | 85 500 FCFA | 162 000 FCFA | 288 000 FCFA |
| Médecin (Cabinet) | 10 000 FCFA | 28 500 FCFA | 54 000 FCFA | 96 000 FCFA |

## Configuration Backend Requise

### Variables d'Environnement

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/fadjma

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRY=24h

# Paiements
WAVE_API_KEY=your-wave-key
ORANGE_MONEY_API_KEY=your-orange-key
FREE_MONEY_API_KEY=your-free-key

# SMS
TWILIO_ACCOUNT_SID=your-account-sid
TWILIO_AUTH_TOKEN=your-auth-token
TWILIO_PHONE_NUMBER=+1234567890

# Google Maps
GOOGLE_MAPS_API_KEY=your-api-key

# Notifications
EXPO_ACCESS_TOKEN=your-expo-token
```

## Prochaines Étapes

### Phase 1 : Intégration Backend
- [ ] Connecter les APIs d'authentification
- [ ] Implémenter les endpoints de commandes
- [ ] Intégrer les paiements mobiles
- [ ] Configurer les notifications

### Phase 2 : Optimisations
- [ ] Ajouter les tests unitaires
- [ ] Implémenter le caching
- [ ] Optimiser les performances
- [ ] Ajouter l'offline mode

### Phase 3 : Déploiement
- [ ] Build et déploiement iOS
- [ ] Build et déploiement Android
- [ ] Configuration des stores (App Store, Play Store)
- [ ] Monitoring et analytics

## Commandes Utiles

```bash
# Installation des dépendances
npm install

# Démarrer le serveur de développement
npm start

# Build pour iOS
eas build --platform ios

# Build pour Android
eas build --platform android

# Tests
npm test

# Linting
npm run lint
```

## Support et Ressources

- **Documentation Expo** : https://docs.expo.dev
- **React Native** : https://reactnative.dev
- **Prisma** : https://www.prisma.io/docs
- **Express** : https://expressjs.com

## Notes Importantes

1. **Sécurité** : Toutes les données sensibles doivent être chiffrées
2. **Conformité** : Respecter les normes HIPAA pour les données médicales
3. **Performance** : Utiliser le caching et l'optimisation des images
4. **Accessibilité** : Assurer la compatibilité avec les lecteurs d'écran

## Troubleshooting

### Erreurs Courantes

**Erreur : "Token expiré"**
- Solution : Implémenter le refresh token logic

**Erreur : "Notifications non reçues"**
- Solution : Vérifier les permissions et la configuration Expo

**Erreur : "Paiement échoué"**
- Solution : Vérifier les clés API et la configuration du serveur

## Contact

Pour toute question ou assistance, veuillez contacter l'équipe de support.
