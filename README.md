# 🏆 BatiLead Pro — Marketplace BTP Côte d'Ivoire & GeniusPay Mobile Money

Plateforme Full-Stack d'achat de leads qualifiés BTP en **Côte d'Ivoire (FCFA)** avec guichet de paiement sécurisé **GeniusPay (Wave, Orange Money, MTN MoMo, Moov Money)** et espace **Super-Administrateur**.

---

## 📁 Architecture des Fichiers

- `index.html` : Interface web complète (Catalogue, CRM Chantiers débloqués, Guichet de paiement GeniusPay 2 étapes, Espace Super-Admin).
- `style.css` : Design system Soft UI optimisé mobile & desktop.
- `app.js` : Moteur applicatif, API GeniusPay, gestion des rôles, factures et exports.
- `supabase_schema.sql` : Script PostgreSQL complet prêt à l'emploi pour Supabase.
- `vercel.json` : Configuration de déploiement automatique Vercel.

---

## 🚀 Guide de Déploiement en 3 Étapes

### 1. 🐙 Sauvegarde sur GitHub
1. Créez un nouveau dépôt sur [github.com/new](https://github.com/new) nommé **`BATILEAD`**.
2. Glissez-déposez l'ensemble des fichiers du dossier `batileads-pro` sur GitHub.
3. Cliquez sur **« Commit changes »**.

### 2. ⚡ Déploiement Gratuit sur Vercel
1. Rendez-vous sur [vercel.com](https://vercel.com) et connectez-vous avec votre compte GitHub.
2. Cliquez sur **« Add New... » > « Project »**.
3. Sélectionnez votre dépôt **`BATILEAD`** et cliquez sur **« Deploy »**.
4. 🎉 Votre site est en ligne en 15 secondes avec votre adresse publique (ex: `https://batilead.vercel.app`) !

### 3. 🗄️ Base de Données sur Supabase
1. Rendez-vous sur [supabase.com](https://supabase.com) et créez un projet gratuit (ex: `batilead-db`).
2. Allez dans le menu **SQL Editor** dans le menu latéral gauche.
3. Copiez-collez l'intégralité du contenu du fichier `supabase_schema.sql` et cliquez sur **« Run »**.
4. Vos tables `leads`, `users`, `orders` et `geniuspay_logs` sont créées et prêtes !

---

## 👑 Accès Super-Admin
- **Email Master** : `ray88305@gmail.com`
- **GeniusPay API Key** : `sk_sandbox_kU48PXqvgWojG0mWRc7EaKsgIf5DlC1E`
- **GeniusPay Secret Key** : `ss_sandbox_YMvxy8Q5UnLAY3T9hWJ1oiZtMQAC4bHSisv5BUhoTzwwNyf5`
