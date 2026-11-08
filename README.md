# ❄️ ClimPro CRM — Gestion d'Apport d'Affaires en Climatisation (Abidjan, Côte d'Ivoire)

Application CRM privée, moderne, légère et intuitive conçue spécialement pour l'activité d'apporteur d'affaires en entretien et nettoyage de climatiseurs à domicile.

---

## 💼 Modèle Économique & Calculs Automatiques

- **Prix payé par le client** : **10 000 FCFA** par climatiseur nettoyé.
- **Part reversée par le technicien** : **4 000 FCFA** par climatiseur nettoyé.
- **Votre marge nette** : **4 000 FCFA** par climatiseur nettoyé (le technicien conserve 6 000 FCFA).

> **Exemple concret :**
> Pour une maison de 3 climatiseurs :
> - Facturation client : `3 × 10 000 = 30 000 FCFA`
> - Part technicien : `3 × 6 000 = 18 000 FCFA`
> - Votre commission / bénéfice net : `3 × 4 000 = 12 000 FCFA`

---

## 🚀 Les 6 Rubriques Interconnectées

1. **📊 Tableau de Bord (Dashboard) :**
   - 8 Indicateurs KPI en temps réel (Clients, Techniciens, RDV à venir, Interventions faites, En attente, Commissions reçues, Solde restant, Bénéfice net).
   - Raccourcis d'actions rapides et widgets récents.
2. **👥 Gestion des Clients :**
   - Fiches complètes avec nom, téléphone (boutons d'appel et WhatsApp direct), commune & quartier, adresse, nb de clims, date contact et statut.
   - Bouton d'action directe pour planifier un RDV.
3. **🔧 Gestion des Techniciens :**
   - Suivi des techniciens partenaires, zones couvertes, statut (disponible/indisponible), nombre d'interventions, commissions dues, reversées et restant dues.
4. **📅 Gestion des Rendez-vous :**
   - Prise de rendez-vous avec sélection client et technicien.
   - **Double vue** : Liste détaillée + Calendrier mensuel interactif.
   - Bouton de conversion en 1 clic pour transformer un RDV effectué en fiche d'intervention.
5. **🛠️ Gestion des Interventions :**
   - Enregistrement des chantiers réalisés avec le nombre réel de climatiseurs nettoyés.
   - Calculs financiers automatiques immédiats.
   - Statuts de règlement : *Non payé*, *Partiellement payé*, *Payé*.
6. **💵 Finances & Encaissements :**
   - Tableau de bord financier global (Chiffre d'affaires brut, Part techniciens, Commissions).
   - Suivi des soldes par technicien avec bouton de relance WhatsApp personnalisé.
   - Journal chronologique des versements reçus (Wave, Orange Money, MoMo, Espèces).
   - Outils de sauvegarde et d'export JSON.

---

## 🔐 Accès Administrateur

- **Code PIN par défaut** : `1234`
- Vous pouvez déverrouiller et verrouiller la session à tout moment en cliquant sur **Quitter**.

---

## 💻 Comment Lancer et Utiliser sur votre Ordinateur

### Méthode 1 (Ultra simple) :
Double-cliquez directement sur le fichier **`index.html`** situé dans votre dossier Bureau :  
📁 `C:\Users\HP\Desktop\ClimLead-CRM\index.html`

### Méthode 2 (Serveur local PowerShell) :
Faites un clic droit sur le fichier **`server.ps1`** ➔ **Exécuter avec PowerShell**.  
L'application s'ouvrira automatiquement à l'adresse : `http://localhost:8080`.

---

## ☁️ Déploiement Gratuit sur Vercel / GitHub (Optionnel)

L'application est totalement autonome et prête à être mise en ligne :
1. Créez un dépôt GitHub et glissez-y les fichiers de `ClimLead-CRM`.
2. Connectez le dépôt sur [Vercel](https://vercel.com) pour obtenir un lien HTTPS accessible depuis votre téléphone n'importe où !
