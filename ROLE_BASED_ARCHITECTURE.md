# Architecture Basée sur les Rôles - Fadj Ma

## Vue d'ensemble

L'application Fadj Ma utilise une architecture basée sur les rôles pour offrir des expériences différenciées aux clients et aux professionnels de santé.

## Rôles Utilisateurs

### 1. Client (Patient)
**Accès à :**
- Recherche de médicaments
- Liste des pharmacies proches
- Panier et commandes
- Ordonnances
- Historique des commandes
- Suivi en temps réel des livraisons
- Profil personnel et adresses

**Écrans principaux :**
- `ClientHomeScreen` - Accueil avec recherche et pharmacies
- `ProfileScreen` - Profil personnel
- `HomeScreen` - Écran d'accueil (legacy)
- `MapScreen` - Carte des pharmacies
- `ProductDetailsScreen` - Détails des produits

### 2. Professionnel (Pharmacie, Docteur, Clinique)
**Accès à :**
- Tableau de bord des commandes
- Gestion des commandes (en attente, en cours, complétées)
- Gestion de l'inventaire
- Analytics et statistiques
- Gestion de l'abonnement
- Profil professionnel

**Écrans principaux :**
- `ProfessionalHomeScreen` - Tableau de bord
- `ProfessionalProfileScreen` - Profil professionnel
- Écrans supplémentaires (Inventory, Analytics, Subscription)

## Flux d'Authentification

### Sélection du Rôle
1. L'utilisateur arrive sur `RoleSelectionScreen`
2. Choisit entre "Patient" ou "Professionnel"
3. Est redirigé vers `RegisterScreen` avec le rôle sélectionné

### Inscription
1. Formulaire d'inscription adapté au rôle
2. Pour les professionnels : demande de documents (licence, attestation)
3. Création du compte avec le rôle associé

### Connexion
1. L'utilisateur se connecte avec email/téléphone et mot de passe
2. Le rôle est récupéré depuis la base de données
3. Navigation vers l'écran d'accueil approprié

## Contexte d'Authentification

### AuthContext (`src/contexts/AuthContext.tsx`)
Gère :
- État d'authentification
- Données utilisateur
- Rôle utilisateur
- Fonctions login/logout/register
- Mise à jour du profil

### Types
```typescript
export type UserRole = 'client' | 'professional' | null;
export type ProfessionalType = 'pharmacy' | 'doctor' | 'clinic' | null;

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  professionalType?: ProfessionalType;
  businessName?: string;
  licenseNumber?: string;
  address?: string;
  avatar?: string;
}
```

## Navigation Basée sur les Rôles

### App.tsx
La navigation est contrôlée par le rôle de l'utilisateur :

```typescript
{!isAuthenticated ? (
  // Auth Stack
  <RoleSelection, Login, Register>
) : user?.role === 'professional' ? (
  // Professional Stack
  <ProfessionalHome, ProfessionalProfile, ...>
) : (
  // Client Stack
  <ClientHome, Home, Map, ProductDetails, Profile, ...>
)}
```

## Stockage Persistant

### AsyncStorage
- Utilisateur : `user` (JSON)
- Token : `token` (string)
- Données locales : cache, panier, etc.

## Prochaines Étapes

1. **Intégrer les APIs backend**
   - Endpoints d'authentification
   - Endpoints de gestion des commandes
   - Endpoints de profil

2. **Ajouter les écrans manquants**
   - Écrans de commandes
   - Écrans d'inventaire
   - Écrans d'analytics

3. **Implémenter les notifications**
   - Push notifications
   - SMS notifications
   - In-app notifications

4. **Sécurité**
   - Validation des tokens JWT
   - Refresh token logic
   - Gestion des erreurs d'authentification

5. **Tests**
   - Tests unitaires des contextes
   - Tests d'intégration des écrans
   - Tests de navigation basée sur les rôles

## Fichiers Créés

```
mobile/src/
├── contexts/
│   └── AuthContext.tsx          # Contexte d'authentification
├── screens/
│   ├── RoleSelectionScreen.tsx  # Sélection du rôle
│   ├── ClientHomeScreen.tsx     # Accueil client
│   ├── ProfessionalHomeScreen.tsx # Accueil professionnel
│   ├── ProfileScreen.tsx        # Profil client
│   ├── ProfessionalProfileScreen.tsx # Profil professionnel
│   └── ... (autres écrans)
└── ...
```

## Configuration Backend Requise

### Endpoints d'Authentification
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `POST /api/auth/logout` - Déconnexion
- `POST /api/auth/refresh` - Refresh token

### Endpoints de Profil
- `GET /api/users/profile` - Récupérer le profil
- `PUT /api/users/profile` - Mettre à jour le profil
- `GET /api/professionals/profile` - Profil professionnel

### Endpoints de Commandes
- `GET /api/orders` - Liste des commandes
- `POST /api/orders` - Créer une commande
- `GET /api/orders/:id` - Détail d'une commande
- `PUT /api/orders/:id` - Mettre à jour une commande

## Notes de Développement

- Les écrans legacy (`HomeScreen`, `MapScreen`, `ProductDetailsScreen`) sont conservés pour compatibilité
- Le contexte `AuthContext` utilise `AsyncStorage` pour la persistance
- Les API calls sont en TODO et doivent être implémentées
- Les données mockées sont utilisées pour le prototype
