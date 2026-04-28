# Fadj Ma - Deployment Guide

## 🚀 Déploiement sur Vercel

### Prérequis
- Compte Vercel (https://vercel.com)
- Repository GitHub avec le code
- Variables d'environnement configurées

### Étapes de Déploiement

#### 1. Préparer le Repository
```bash
cd /home/ubuntu/fadj-ma

# Créer un .gitignore pour exclure node_modules
echo "node_modules/" >> .gitignore
echo ".next/" >> .gitignore
echo ".env.local" >> .gitignore

# Pousser le code sur GitHub
git add -A
git commit -m "feat: Add Fadj Ma web application"
git push origin main
```

#### 2. Déployer sur Vercel

**Option A : Via Vercel CLI**
```bash
npm install -g vercel
cd /home/ubuntu/fadj-ma/web
vercel --prod
```

**Option B : Via Dashboard Vercel**
1. Aller sur https://vercel.com/new
2. Importer le repository GitHub "fadj-ma"
3. Sélectionner le dossier "web" comme root directory
4. Configurer les variables d'environnement
5. Cliquer sur "Deploy"

#### 3. Variables d'Environnement

Ajouter dans les paramètres Vercel :
```
NEXT_PUBLIC_API_URL=https://api.fadjma.com
NEXT_PUBLIC_APP_NAME=Fadj Ma
NODE_ENV=production
```

### Architecture de Déploiement

```
┌─────────────────────────────────────────────────────────┐
│                    Vercel (Frontend)                     │
│                  https://fadj-ma.vercel.app              │
│  ┌──────────────────────────────────────────────────┐   │
│  │  Next.js Application                             │   │
│  │  - Authentication (Role-based)                   │   │
│  │  - Client Dashboard                              │   │
│  │  - Professional Dashboard                        │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│              Backend API (Node.js/Express)               │
│  ┌──────────────────────────────────────────────────┐   │
│  │  - Authentication & Authorization                │   │
│  │  - Order Management                              │   │
│  │  - Payment Processing                            │   │
│  │  - Notifications                                 │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│              PostgreSQL Database                         │
│  - Users (Patients, Professionals, Admins)              │
│  - Orders & Transactions                                │
│  - Medicines & Inventory                                │
│  - Subscriptions & Payments                             │
└─────────────────────────────────────────────────────────┘
```

### Domaines Personnalisés

Pour ajouter un domaine personnalisé :
1. Aller dans les paramètres du projet Vercel
2. Cliquer sur "Domains"
3. Ajouter votre domaine (ex: fadj-ma.com)
4. Configurer les DNS records

### Monitoring & Analytics

Vercel fournit :
- **Real-time Analytics** : Trafic, performances, erreurs
- **Performance Insights** : Core Web Vitals, temps de chargement
- **Error Tracking** : Logs et stack traces
- **Deployment History** : Historique des déploiements

### CI/CD Automatique

Chaque push sur `main` déclenche automatiquement :
1. Build du projet
2. Tests (si configurés)
3. Déploiement en production

### Rollback

Pour revenir à une version précédente :
1. Aller dans "Deployments" sur Vercel
2. Sélectionner le déploiement précédent
3. Cliquer sur "Promote to Production"

### Troubleshooting

**Erreur : "Large files detected"**
```bash
# Ajouter .gitignore et pousser
echo "node_modules/" >> .gitignore
git rm -r --cached node_modules
git add .gitignore
git commit -m "Remove node_modules from git"
git push
```

**Erreur : "Build failed"**
- Vérifier les logs de build sur Vercel
- S'assurer que toutes les dépendances sont dans package.json
- Vérifier les variables d'environnement

**Performance lente**
- Activer la compression Gzip
- Optimiser les images
- Utiliser la mise en cache
- Vérifier les Core Web Vitals

### Support

Pour plus d'aide :
- Documentation Vercel : https://vercel.com/docs
- GitHub Issues : https://github.com/Ahmadou44/fadj-ma/issues
- Email : support@fadjma.com
