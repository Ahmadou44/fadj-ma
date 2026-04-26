# 🚀 Guide de Déploiement Manuel - Fadj Ma

## Déploiement sur Vercel (Recommandé)

### Étape 1 : Créer un compte Vercel
1. Aller sur https://vercel.com/signup
2. S'inscrire avec GitHub
3. Autoriser Vercel à accéder à vos repositories

### Étape 2 : Importer le Projet
1. Aller sur https://vercel.com/new
2. Cliquer sur "Import Git Repository"
3. Entrer l'URL : `https://github.com/Ahmadou44/fadj-ma`
4. Cliquer sur "Import"

### Étape 3 : Configurer le Projet
1. **Project Name** : `fadj-ma` (ou votre nom)
2. **Framework Preset** : Sélectionner "Next.js"
3. **Root Directory** : Sélectionner `web`
4. **Build Command** : `npm run build`
5. **Output Directory** : `.next`

### Étape 4 : Variables d'Environnement
Ajouter les variables suivantes :

```
NEXT_PUBLIC_API_URL=https://api.fadjma.com
NEXT_PUBLIC_APP_NAME=Fadj Ma
NODE_ENV=production
```

### Étape 5 : Déployer
1. Cliquer sur "Deploy"
2. Attendre que le build se termine
3. Cliquer sur "Visit" pour voir le site en direct

## Résultat du Déploiement

Après le déploiement, vous obtiendrez :

- **URL de Production** : `https://fadj-ma.vercel.app`
- **URL de Preview** : Générée automatiquement pour chaque PR
- **Dashboard** : https://vercel.com/dashboard

## Ajouter un Domaine Personnalisé

### Option 1 : Domaine Vercel (Gratuit)
1. Aller dans les paramètres du projet
2. Cliquer sur "Domains"
3. Ajouter un domaine `.vercel.app`

### Option 2 : Domaine Personnel
1. Acheter un domaine (ex: fadj-ma.com)
2. Dans Vercel, cliquer sur "Domains"
3. Ajouter votre domaine
4. Configurer les DNS records selon les instructions

### Configuration DNS

**Pour Namecheap :**
1. Aller dans "Manage" → "Advanced DNS"
2. Ajouter un record CNAME :
   - Type: CNAME
   - Host: www
   - Value: cname.vercel-dns.com

**Pour GoDaddy :**
1. Aller dans "DNS Management"
2. Ajouter un record CNAME :
   - Name: www
   - Type: CNAME
   - Value: cname.vercel-dns.com

## Déploiement Automatique

Chaque push sur `main` déclenche automatiquement :
1. Build du projet
2. Tests (si configurés)
3. Déploiement en staging
4. Déploiement en production

## Monitoring et Analytics

### Accéder aux Analytics
1. Aller sur https://vercel.com/dashboard
2. Sélectionner le projet "fadj-ma"
3. Cliquer sur "Analytics"

### Métriques Disponibles
- **Traffic** : Nombre de visites
- **Performance** : Temps de réponse
- **Errors** : Erreurs et exceptions
- **Real-time** : Activité en direct

## Rollback (Revenir à une Version Précédente)

1. Aller dans "Deployments"
2. Trouver le déploiement précédent
3. Cliquer sur "Promote to Production"

## Troubleshooting

### Erreur : "Build failed"
```bash
# Vérifier les logs
vercel logs --prod

# Vérifier les dépendances
npm install

# Vérifier les variables d'environnement
# S'assurer que toutes les variables sont configurées
```

### Erreur : "Domain not found"
```bash
# Vérifier la configuration DNS
nslookup fadj-ma.com

# Attendre la propagation DNS (jusqu'à 48h)
```

### Performance lente
1. Activer la compression Gzip
2. Optimiser les images
3. Utiliser la mise en cache
4. Vérifier les Core Web Vitals

## Sauvegardes et Récupération

Vercel conserve automatiquement :
- Tous les déploiements précédents
- L'historique des changements
- Les logs de build

Pour récupérer un déploiement précédent :
1. Aller dans "Deployments"
2. Sélectionner le déploiement souhaité
3. Cliquer sur "Promote to Production"

## Support et Aide

- **Documentation Vercel** : https://vercel.com/docs
- **GitHub Issues** : https://github.com/Ahmadou44/fadj-ma/issues
- **Email Support** : support@fadjma.com

## Prochaines Étapes

Après le déploiement :

1. ✅ Configurer le domaine personnalisé
2. ✅ Ajouter les variables d'environnement
3. ✅ Configurer les webhooks (optionnel)
4. ✅ Ajouter les collaborateurs
5. ✅ Configurer les notifications

---

**Félicitations ! Votre application Fadj Ma est maintenant en ligne ! 🎉**
