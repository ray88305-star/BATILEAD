/**
 * BatiLead Pro — Moteur Full-Stack avec Authentification Supabase Auth & Google OAuth
 * Connexion Sécurisée : Google Sign-In, Email & Mot de Passe, Super-Admin
 * Base de Données Partagée Supabase Cloud (PostgreSQL ozxenmrmaomaqzkyjobc)
 * Passerelle GeniusPay Mobile Money (Wave, Orange, MTN, Moov)
 */

const NOW = Date.now();
const ONE_DAY_MS = 1000 * 60 * 60 * 24;
const DB_VERSION = "batilead_db_v18_official_anon_key";

const OFFICIAL_SUPABASE_URL = "https://ozxenmrmaomaqzkyjobc.supabase.co";
constOFFICIAL_SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96eGVubXJtYW9tYXF6a3lqb2JjIiwicm9 sZSI6ImFub24iLCJpYXQiOjE3ODY4NDY3NjYsImV4cCI6MjEwMjQyMjc2Nn0.gi-rL0VXOXDidvCCr2AnsHo0bwDI_q8_Qy88qZNwmd0";

// Configuration Officielle Passerelle Mobile Money GeniusPay (Côte d'Ivoire)
const OFFICIAL_GENIUSPAY_ENDPOINT = "https://geniuspay.ci/api/v1/merchant";
const OFFICIAL_GENIUSPAY_PUBKEY = "sk_sandbox_kU48PXqvgWojG0mWRc7EaKsgIf5DlC1E";
const OFFICIAL_GENIUSPAY_SECRET = "ss_sandbox_YMvxy8Q5UnLAY3T9hWJ1oiZtMQAC4bHSisv5BUhoTzwwNyf5";

// 12 Chantiers Réalistes de Base en Côte d'Ivoire (FCFA)
const DEFAULT_LEADS_CI = [
  {
    id : "LEAD-CI-101",
    Il y a 1 jour :
    catégorie : « construction »,
    label de catégorie : "Construction neuve",
    titre : "Construction villa duplex 5 pièces avec piscine",
    description: "Terrain de 500m² avec ACD acquis à Bingerville. Nous recherchons une entreprise de BTP sérieuse pour la réalisation gros œuvre et seconde œuvre. Plans d'architecte déjà validés.",
    budget : « 48 000 000 FCFA »,
    Valeur du budget : 48 000 000,
    surface : « 240 m² »,
    horizon : « Urgent (< 1 mois) »,
    propertyType: "Terrain avec ACD",
    estPropriétaire : vrai,
    téléphoneVérifié : vrai,
    ville : "Abidjan - Bingerville",
    commune : "Bingerville (Feh Kessé)",
    Nom complet : « Jean-Marc KOUAME »,
    téléphone : "+225 07 48 92 14 77",
    email : "jm.koumame@gmail.com",
    adresse : « Quartier Feh Kessé, Bingerville, Abidjan »,
    campagne : « Publicités Facebook - Construction Abidjan Est »,
    Prix ​​de base : 25 000,
    Prix ​​actuel : 25 000,
    statut : « disponible »,
    crmStage : « nouveau »,
    Montant du devis : nul,
    artisanNotes : "",
    créé par : "ray88305@gmail.com"
  },
  {
    id : "LEAD-CI-102",
    Il y a 1 jour :
    catégorie : « rénovation »,
    CatégorieLabel : "Rénovation & Réhabilitation",
    titre : "Rénovation intégrale villa basse 4 pièces + dépendance",
    description: "Travaux complets : réfection toiture tôle bac, reprise totale de l'étanchéité, plomberie neuve, pose de carrelage 60x60 et peinture intérieure/extérieure.",
    budget : « 18 500 000 FCFA »,
    Valeur du budget : 18 500 000,
    surface : « 160 m² »,
    horizon : « Urgent (< 1 mois) »,
    type de propriété : "Villa basse",
    estPropriétaire : vrai,
    téléphoneVérifié : vrai,
    ville : « Abidjan - Cocody »,
    commune : "Cocody (Deux-Plateaux)",
    Nom complet : "Mireille BAKAYOKO",
    téléphone : "+225 05 71 33 80 12",
    email: "m.bakayoko@yahoo.fr",
    adresse : "Deux-Plateaux Vallons, Cocody, Abidjan",
    campagne : "Facebook Ads - Rénovation Cocody",
    Prix ​​de base : 20 000,
    Prix ​​actuel : 20 000,
    statut : « disponible »,
    crmStage : « nouveau »,
    Montant du devis : nul,
    artisanNotes : "",
    créé par : "ray88305@gmail.com"
  },
  {
    id : "LEAD-CI-103",
    Il y a 2 jours :
    catégorie : « construction »,
    label de catégorie : "Construction neuve",
    titre : "Construction résidence de vacances en bordure de lagune",
    description: "Projet de maison de vacances moderne de plain-pied avec grande terrasse en bois et clôture sécurisée. Accès dégagé pour camions de livraison.",
    budget : « 55 000 000 FCFA »,
    Valeur du budget : 55 000 000,
    surface : « 190 m² »,
    horizon: "Sous 2 à 3 mois",
    propertyType: "Terrain bord lagune",
    estPropriétaire : vrai,
    téléphoneVérifié : vrai,
    ville : « Assinie »,
    commune : « La mafia d'Assinie »,
    Nom complet : « Stéphane N'GUESSAN »,
    téléphone : "+225 07 19 84 55 20",
    courriel : "s.nguessan@outlook.ci",
    adresse : « Assinie Km 9, Bord lagune »,
    campagne : « Publicités Facebook - Villas Assinie Prestige »,
    Prix ​​de base : 30 000,
    Prix ​​actuel : 30 000,
    statut : « disponible »,
    crmStage : « nouveau »,
    Montant du devis : nul,
    artisanNotes : "",
    créé par : "ray88305@gmail.com"
  },
  {
    id : "LEAD-CI-104",
    Il y a 2 jours :
    catégorie : « rénovation »,
    CatégorieLabel : "Rénovation & Réhabilitation",
    titre : "Rénovation & Aménagement bureaux commerciaux R+1",
    description: "Transformation d'un bâtiment en espace de bureaux : cloisons vitrées en aluminium, faux plafonds en staff avec spots LED intégrés, climatisation et carrelage poli.",
    budget : « 22 000 000 FCFA »,
    Valeur du budget : 22 000 000,
    surface : « 210 m² »,
    horizon: "Sous 2 à 3 mois",
    propertyType: "Bâtiment commercial",
    estPropriétaire : vrai,
    téléphoneVérifié : vrai,
    ville : « Abidjan - Marcory »,
    commune : « Marcory (Zone 4C) »,
    Nom complet : "Christian YAO",
    téléphone : "+225 01 88 41 29 03",
    email : "c.yao.finance@gmail.com",
    adresse : "Zone 4C, Rue du Canal, Marcory, Abidjan",
    campagne : "Facebook Ads - BTP Entreprises Abidjan",
    Prix ​​de base : 25 000,
    Prix ​​actuel : 25 000,
    statut : « disponible »,
    crmStage : « nouveau »,
    Montant du devis : nul,
    artisanNotes : "",
    créé par : "ray88305@gmail.com"
  },
  {
    id : "LEAD-CI-105",
    Il y a 2 jours :
    catégorie : « construction »,
    label de catégorie : "Construction neuve",
    titre : "Construction petit immeuble R+2 locatif (6 appartements)",
    description: "Terrain clôturé à Yopougon. Recherche entrepreneur BTP pour élévation des murs, dalles béton armé et seconde œuvre. Financement bancaire accordé.",
    budget : « 85 000 000 FCFA »,
    Valeur du budget : 85 000 000,
    surface : « 380 m² bâti »,
    horizon : « Urgent (< 1 mois) »,
    propertyType: "Parcelle viabilisée",
    estPropriétaire : vrai,
    téléphoneVérifié : vrai,
    ville : « Abidjan - Yopougon »,
    commune : « Yopougon (Niangon) »,
    Nom complet : "Aïssatou DIABATE",
    téléphone : "+225 05 55 62 10 98",
    Courriel : "aissattou.diabate@gmail.com",
    adresse : « Yopougon Niangon Sud, Abidjan »,
    campagne : "Facebook Ads - Immeubles Locatifs CI",
    Prix ​​de base : 35 000,
    Prix ​​actuel : 35 000,
    statut : « disponible »,
    crmStage : « nouveau »,
    Montant du devis : nul,
    artisanNotes : "",
    créé par : "ray88305@gmail.com"
  },
  {
    id : "LEAD-CI-106",
    Il y a 3 jours :
    catégorie : « rénovation »,
    CatégorieLabel : "Rénovation & Réhabilitation",
    titre : "Réfection toiture, étanchéité & peinture extérieure villa",
    description: "Remplacement de la charpente bois, pose de tôles bac aluminium et peinture de façade étanche antifongique contre l'air marin.",
    budget : « 14 000 000 FCFA »,
    Valeur du budget : 14 000 000,
    surface : « 175 m² »,
    horizon: "Sous 2 à 3 mois",
    propertyType: "Villa individuelle",
    estPropriétaire : vrai,
    téléphoneVérifié : vrai,
    ville : « Grand-Bassam »,
    commune : "Grand-Bassam (Quartier France)",
    Nom complet : "Kouassi KONAN",
    téléphone : "+225 07 33 77 15 42",
    courriel : « k.konan@orange.ci »,
    adresse : "Quartier France, Grand-Bassam",
    campagne : "Facebook Ads - Rénovation Bassam",
    Prix ​​de base : 20 000,
    Prix ​​actuel : 20 000,
    statut : « disponible »,
    crmStage : « nouveau »,
    Montant du devis : nul,
    artisanNotes : "",
    créé par : "ray88305@gmail.com"
  },
  {
    id : "LEAD-CI-107",
    Il y a 3 jours :
    catégorie : « construction »,
    label de catégorie : "Construction neuve",
    titre : "Construction villa contemporaine 6 pièces plain-pied à Angré",
    description: "Fondations profondes, élévations en briques pleines, toiture dalle béton accessible et baie vitrée panoramique. Devis main d'œuvre ou clé en main.",
    budget : « 62 000 000 FCFA »,
    Valeur du budget : 62 000 000,
    surface : « 220 m² »,
    horizon : « Urgent (< 1 mois) »,
    propertyType: "Terrain avec ACD",
    estPropriétaire : vrai,
    téléphoneVérifié : vrai,
    ville : « Abidjan - Cocody »,
    commune : "Cocody (Angré 8e Tranche)",
    Nom complet : « Dr Ibrahim CISSE »,
    téléphone : "+225 07 89 22 14 05",
    courriel : « dr.cisse.sante@gmail.com »,
    adresse : "Angré 8e Tranche, près de la CNPS, Cocody",
    campagne : "Facebook Ads - Construction Prestige Angré",
    Prix ​​de base : 30 000,
    Prix ​​actuel : 30 000,
    statut : « disponible »,
    crmStage : « nouveau »,
    Montant du devis : nul,
    artisanNotes : "",
    créé par : "ray88305@gmail.com"
  },
  {
    id : "LEAD-CI-108",
    Il y a 4 jours
    catégorie : « rénovation »,
    CatégorieLabel : "Rénovation & Réhabilitation",
    titre : "Rénovation plomberie, électricité & carrelage immeuble R+3",
    description : "Remise aux normes électriques NFC 15-100, réfection complète des colonnes d'évacuation PVC et pose de carrelage grès cérame dans les parties communes.",
    budget : « 28 000 000 FCFA »,
    Valeur du budget : 28 000 000,
    surface : « 450 m² »,
    horizon: "Sous 2 à 3 mois",
    propertyType: "Immeuble collectif",
    estPropriétaire : vrai,
    téléphoneVérifié : vrai,
    ville : « Abidjan - Riviera »,
    commune : "Côte d'Azur (Palmeraie)",
    Nom complet : « Mme Salimata OUATTARA »,
    téléphone : "+225 05 44 98 12 30",
    courriel : "sali.ouattara@syndic.ci",
    adresse : « Riviera Palmeraie, Rond-Point ADO, Abidjan »,
    campagne : "Facebook Ads - Copropriétés & Syndics CI",
    Prix ​​de base : 25 000,
    Prix ​​actuel : 25 000,
    statut : « disponible »,
    crmStage : « nouveau »,
    Montant du devis : nul,
    artisanNotes : "",
    créé par : "ray88305@gmail.com"
  },
  {
    id : "LEAD-CI-109",
    Il y a 4 jours
    catégorie : « construction »,
    label de catégorie : "Construction neuve",
    titre : "Construction entrepôt de stockage métallique 500m²",
    description: "Dallage industriel armé haute résistance pour passage de chariots élévateurs, charpente métallique IPN et bardage toiture bac aluminium.",
    budget : « 70 000 000 FCFA »,
    Valeur du budget : 70 000 000,
    surface : « 500 m² »,
    horizon : « Urgent (< 1 mois) »,
    propertyType: "Zone industrielle",
    estPropriétaire : vrai,
    téléphoneVérifié : vrai,
    ville : « Abidjan - Koumassi »,
    commune : "Koumassi (Zone Industrielle)",
    Nom complet : "M. Patrick DE SOUZA",
    téléphone : "+225 07 10 35 66 89",
    courriel : « p.desouza@logistique.ci »,
    adresse : "Boulevard du Gabon, Zone Industrielle Koumassi",
    campagne : "Facebook Ads - Entrepôts & Hangars BTP",
    Prix ​​de base : 35 000,
    Prix ​​actuel : 35 000,
    statut : « disponible »,
    crmStage : « nouveau »,
    Montant du devis : nul,
    artisanNotes : "",
    créé par : "ray88305@gmail.com"
  },
  {
    id : "LEAD-CI-110",
    Il y a 5 jours :
    catégorie : « rénovation »,
    CatégorieLabel : "Rénovation & Réhabilitation",
    titre : "Aménagement & Décoration intérieure restaurant gastronomique",
    description: "Création d'un bar en béton ciré, faux plafonds acoustiques en staff avec rubans LED, carrelage métro pour la cuisine et sanitaires haut de gamme.",
    budget : « 19 000 000 FCFA »,
    Valeur du budget : 19 000 000,
    surface : « 140 m² »,
    horizon: "Sous 2 à 3 mois",
    type de propriété : « Commercial local »,
    estPropriétaire : vrai,
    téléphoneVérifié : vrai,
    ville : « Abidjan - Plateau »,
    commune : "Plateau (Centre des Affaires)",
    Nom complet : « Arnaud GAUZE »,
    téléphone : "+225 01 22 76 90 14",
    courriel : "arnaud.gauze@restocotedivoire.ci",
    adresse : « Avenue Chardy, Plateau, Abidjan »,
    campagne : "Facebook Ads - Commerces & Restaurants Plateau",
    Prix ​​de base : 20 000,
    Prix ​​actuel : 20 000,
    statut : « disponible »,
    crmStage : « nouveau »,
    Montant du devis : nul,
    artisanNotes : "",
    créé par : "ray88305@gmail.com"
  },
  {
    id : "LEAD-CI-111",
    Il y a 5 jours :
    catégorie : « construction »,
    label de catégorie : "Construction neuve",
    titre : "Construction villa 4 pièces plain-pied sur 400m² à Yamoussoukro",
    description: "Fondations, élévation, toiture et clôture complète pour une villa familiale. Devis demandé pour main d'œuvre ou fourniture comprise.",
    budget : « 32 000 000 FCFA »,
    Valeur du budget : 32 000 000,
    surface : « 145 m² »,
    horizon: "Sous 2 à 3 mois",
    propertyType: "Terrain avec titre foncier",
    estPropriétaire : vrai,
    téléphoneVérifié : vrai,
    ville : « Yamoussoukro »,
    commune : « Yamoussoukro (Millionnaire) »,
    Nom complet : "Fatou COULIBALY",
    téléphone : "+225 01 77 12 30 45",
    email : "fatou.coulibaly@gmail.com",
    adresse : "Quartier Millionnaire, Yamoussoukro",
    campagne : "Facebook Ads - BTP Centre Côte d'Ivoire",
    Prix ​​de base : 20 000,
    Prix ​​actuel : 20 000,
    statut : « disponible »,
    crmStage : « nouveau »,
    Montant du devis : nul,
    artisanNotes : "",
    créé par : "ray88305@gmail.com"
  },
  {
    id : "LEAD-CI-112",
    Il y a 5 jours :
    catégorie : « construction »,
    label de catégorie : "Construction neuve",
    titre : "Construction clôture maçonnée sécurisée sur 1 200m²",
    description: "Élévation mur de clôture de 2,50m de haut avec poteaux raidisseurs béton armé, pose de barbelés concertina et installation d'un grand portail coulissant.",
    budget : « 12 500 000 FCFA »,
    Valeur du budget : 12 500 000,
    surface : "1 200 m² (périmètre 140 m)",
    horizon : « Urgent (< 1 mois) »,
    propertyType: "Terrain nu viabilisé",
    estPropriétaire : vrai,
    téléphoneVérifié : vrai,
    ville : « San-Pédro »,
    commune : "San-Pédro (Balmer)",
    Nom complet : "Koffi ADJEI",
    téléphone : "+225 07 65 89 23 11",
    courriel : « koffi.adjei@cacao.ci »,
    adresse : "Quartier Balmer, San-Pédro",
    campagne : "Facebook Ads - BTP Sud-Ouest CI",
    Prix ​​de base : 15 000,
    Prix ​​actuel : 15 000,
    statut : « disponible »,
    crmStage : « nouveau »,
    Montant du devis : nul,
    artisanNotes : "",
    créé par : "ray88305@gmail.com"
  }
];

classe BatiLeadRealtimeFullStackApp {
  constructeur() {
    this.forceDirectDatabaseUpdate();

    this.deviceId = this.getOrCreateDeviceId();
    this.adminEmail = this.loadAdminEmail();
    
    // Configuration GeniusPay
    this.geniusPayPubKey = this.loadGeniusPayKey();
    this.geniusPaySecretKey = this.loadGeniusPaySecret();
    this.geniusPayMode = this.loadGeniusPayMode();

    // Configuration de Supabase Cloud (Identifiants officiels)
    this.supabaseUrl = localStorage.getItem("batilead_supabase_url") || OFFICIAL_SUPABASE_URL;
    this.supabaseKey = localStorage.getItem("batilead_supabase_key") || OFFICIAL_SUPABASE_KEY ;
    this.supabaseClient = null;
    this.supabaseConnected = false;

    // Mode d'authentification : « connexion » ou « inscription »
    this.authMode = "connexion";

    // Magasin de données
    this.currentUser = this.loadCurrentUser();
    this.leads = this.loadLeads();
    this.users = this.loadUsersRegistry();
    this.orders = this.loadOrdersRegistry();
    this.activityLogs = this.loadActivityLogs();

    // États de l'interface utilisateur
    this.currentView = "marketplace";
    this.adminSubTab = "leads";
    this.selectedCategory = "all";
    this.selectedLeadForPurchase = null;
    this.selectedLeadForDetail = null;
    this.selectedPaymentMethod = "Wave";
    this.pendingPaymentData = null;
    this.parsedCsvLeads = [];

    this.initSupabaseClient();
    this.init();
    this.startLiveSyncPolling();
  }

  forceDirectDatabaseUpdate() {
    essayer {
      const currentVersion = localStorage.getItem("batilead_db_version_tag");
      si (version_actuelle !== DB_VERSION) {
        localStorage.setItem("batilead_db_version_tag", DB_VERSION);
        if (!localStorage.getItem("batilead_geniuspay_leads_db_v18")) {
          localStorage.setItem("batilead_geniuspay_leads_db_v18", JSON.stringify(DEFAULT_LEADS_CI));
        }
        localStorage.setItem("batilead_master_admin_email_v18", "ray88305@gmail.com");
        localStorage.setItem("batilead_supabase_url", OFFICIAL_SUPABASE_URL);
        localStorage.setItem("batilead_supabase_key", OFFICIAL_SUPABASE_KEY);
      }
    } attraper (e) {
      console.warn("Avertissement de migration automatique du stockage :", e);
    }
  }

  // =========================================================================
  // INITIALISATION DU CLIENT SUPABASE ET SYNCHRONISATION EN DIRECT ET EN TEMPS RÉEL
  // =========================================================================

  initSupabaseClient() {
    si (window.supabase && this.supabaseUrl && this.supabaseKey) {
      essayer {
        this.supabaseClient = window.supabase.createClient(this.supabaseUrl, this.supabaseKey, {
          auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
        });
        console.log("Client Supabase initialisé avec l'URL du projet :", this.supabaseUrl);
        this.listenToSupabaseAuthChanges();
        this.testSupabaseConnection(true);
      } attraper (e) {
        console.error("Erreur d'initialisation de Supabase :", e);
        this.updateSupabaseStatusBadge(false, e.message);
      }
    } autre {
      this.updateSupabaseStatusBadge(false, "SDK en chargement...");
    }
  }

  async listenToSupabaseAuthChanges() {
    si (!this.supabaseClient || !this.supabaseClient.auth) retourner;

    essayer {
      // 1. Récupération immédiate de la session active (retour OAuth Google)
      const { data: { session } } = await this.supabaseClient.auth.getSession();
      si (session && session.user) {
        attendre this.processAuthenticatedSupabaseUser(session.user);
      }
    } attraper (e) {
      console.warn("getSession note:", e);
    }

    // 2. Écoute dynamique de tous les événements d'authentification
    this.supabaseClient.auth.onAuthStateChange(async (event, session) => {
      console.log("Événement d'authentification Supabase :", événement, session);
      si (session && session.user) {
        attendre this.processAuthenticatedSupabaseUser(session.user);
      }
    });
  }

  async processAuthenticatedSupabaseUser(user) {
    const email = user.email ? user.email.toLowerCase() : "";
    const nom = user.user_metadata?.full_name || user.user_metadata?.name || user.user_metadata?.given_name || email.split("@")[0];
    const téléphone = utilisateur.user_metadata?.phone || utilisateur.phone || "+225 07 00 00 00 00";
    const avatar = user.user_metadata?.avatar_url || user.user_metadata?.picture || "";
    const isRay = this.isSuperAdmin(email);

    const authedUser = {
      id : utilisateur.id,
      nom : nom,
      courriel : courriel,
      téléphone : téléphone,
      rôle : estRay ? "super_admin" : "artisan",
      avatar : avatar,
      connectéÀ: nouvelle Date().toISOString()
    };

    this.saveCurrentUser(authedUser);
    this.updateAuthUi();
    this.renderCrmBoard();
    this.renderAdminFullStack();

    // Nettoyage de l'URL pour supprimer les tokens
    si (window.location.search || window.location.hash) {
      fenêtre.history.replaceState({}, document.title, fenêtre.location.pathname);
    }

    // Enregistrement dans Supabase Cloud
    attendre this.supabaseClient.from("users").upsert({
      id : authedUser.id,
      nom : authedUser.name,
      email : authedUser.email,
      avatar_url : authedUser.avatar,
      téléphone : authedUser.phone,
      rôle : authedUser.role,
      adresse_ip : this.deviceId,
      Nombre de connexions : 1,
      dernière_connexion_à: authedUser.loggedAt
    }, { onConflict: "email" }).catch(console.warn);

    attendre this.supabaseClient.from("user_sessions_log").insert({
      user_email: authedUser.email,
      nom_utilisateur : authedUser.name,
      adresse_ip : this.deviceId,
      action_type: "GOOGLE_OAUTH_LOGIN",
      détails : `Session Google active pour ${authedUser.email}`
    }).catch(console.warn);

    this.logActivity("AUTH_STATE_CHANGE", `Session Google active pour ${email}`);
    
    si (isRay) {
      this.showToast(`👑 Bienvenue Ray ! Accès Gestion & Ajout de chantiers activé.`);
    } autre {
      this.showToast(`✅ Bienvenue ${name} ! Connecté avec votre compte Google.`);
    }

    si (this.selectedLeadForPurchase) {
      const lead = this.selectedLeadForPurchase;
      setTimeout(() => this.openPurchaseModal(lead.id), 400);
    }
  }

  mettre à jour le badge d'état de la superbase(estConnecté, détail = "") {
    const badge = document.getElementById("supabase-status-badge");
    si (!badge) retourner;
    this.supabaseConnected = estConnecté;

    si (estConnecté) {
      badge.className = "px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5";
      badge.innerHTML = `<span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Supabase Cloud Connecté (ozxenmrmaomaqzkyjobc)`;
    } autre {
      badge.className = "px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1.5";
      badge.innerHTML = `<span class="w-2 h-2 rounded-full bg-amber-500"></span> ${detail || 'En attente de connexion'}`;
    }
  }

  // Polling automatique toutes les 6 secondes pour synchroniser tous les téléphones et PC
  startLiveSyncPolling() {
    définirInterval(() => {
      si (this.supabaseClient && this.supabaseConnected) {
        this.fetchLeadsFromSupabaseCloud(true);
      }
    }, 6000);
  }

  async testSupabaseConnection(isSilent = false) {
    if (!this.supabaseClient) this.initSupabaseClient();
    si (!this.supabaseClient) retourner;

    essayer {
      if (!isSilent) this.showToast("Test de connexion Supabase en cours...");
      
      const { data, error } = await this.supabaseClient.from("leads").select("id").limit(1);
      
      si (erreur) {
        console.warn("Erreur de vérification Supabase :", erreur);
        this.updateSupabaseStatusBadge(false, error.message);
        si (!isSilent) {
          this.showToast(`Note Supabase : ${error.message} (Avez-vous exécuté le script SQL dans SQL Editor ?)`);
        }
      } autre {
        this.updateSupabaseStatusBadge(true);
        si (!isSilent) {
          this.showToast(`✅ Succès ! Base de données Supabase connectée en direct.`);
          this.pushAllLeadsToSupabase();
        } autre {
          this.fetchLeadsFromSupabaseCloud(true);
        }
      }
    } attraper (e) {
      console.warn("Exception de connexion à Supabase :", e);
      this.updateSupabaseStatusBadge(false, e.message);
      if (!isSilent) this.showToast(`Connexion Supabase : ${e.message}`);
    }
  }

  gérerLaMiseÀJourDesParamètresSupabase(événement) {
    événement.prévenirDefault();
    const url = document.getElementById("settings-supabase-url").value.trim();
    const key = document.getElementById("settings-supabase-key").value.trim();
    
    this.supabaseUrl = url;
    this.supabaseKey = clé;
    localStorage.setItem("batilead_supabase_url", this.supabaseUrl);
    localStorage.setItem("batilead_supabase_key", this.supabaseKey);
    
    this.initSupabaseClient();
    this.showToast("Clés Supabase Cloud enregistrés.");
    this.testSupabaseConnection(false);
  }

  // Récupère les leads de Supabase en temps réel pour tous les appareils
  async fetchLeadsFromSupabaseCloud(isSilent = false) {
    si (!this.supabaseClient) retourner;

    essayer {
      const { data, error } = await this.supabaseClient.from("leads").select("*").order("created_at", { ascending: false });
      
      si (erreur) lever une exception ;

      si (données && données.longueur > 0) {
        this.leads = data.map(d => ({
          id : d.id,
          catégorie : d.catégorie,
          CategoryLabel : d.category_label || (d.category === 'construction' ? 'Construction Neuve' : 'Rénovation & Réhabilitation'),
          titre : d.titre,
          description : d.description,
          budget : d.budget,
          valeur_budget : d.valeur_budget,
          surface : d.surface,
          horizon : d.horizon,
          type_propriété : d.property_type,
          estPropriétaire : d.est_propriétaire,
          téléphone vérifié : d.phone_verified,
          ville : d.city,
          commune : d.commune,
          Nom complet : d.nom_complet,
          téléphone : d.phone,
          courriel : d.email,
          adresse : d.adresse,
          campagne : d.campagne,
          prix_de_base : d.prix_de_base,
          prix_actuel : d.prix_actuel,
          statut : d.status,
          crmStage : d.crm_stage,
          quoteAmount: d.quote_amount,
          crééÀ : d.créé_à,
          créé par : d.unlocked_by_email || 'ray88305@gmail.com'
        }));

        this.saveLeads();
        this.renderMarketplaceLeads();
        this.renderAdminFullStack();
        if (!isSilent) this.showToast(`✅ ${data.length} chantiers synchronisés depuis Supabase Cloud !`);
      } autre {
        // Si la base Supabase est vide, on y injecte automatiquement les 12 chantiers
        console.log("La table des prospects Supabase est vide, envoi automatique des prospects initiaux...");
        attendre this.pushAllLeadsToSupabase();
      }
    } attraper (e) {
      si (!isSilent) {
        console.error("Récupération de la note Supabase Cloud :", e);
      }
    }
  }

  // Envoie à tous les leads locaux vers Supabase
  async pushAllLeadsToSupabase() {
    si (!this.supabaseClient) {
      this.showToast("Veuillez vérifier vos identifiants Supabase.");
      retour;
    }

    essayer {
      this.showToast("Envoi des chantiers vers Supabase Cloud...");
      const lignesÀInsérer = this.leads.map(l => ({
        id : l.id,
        catégorie : l.catégorie,
        étiquette_catégorie : l.étiquette_catégorie,
        titre : l.titre,
        description : l.description,
        budget : l.budget,
        valeur_budget : l.budgetValue || 0,
        surface : l.surface,
        horizon : l.horizon,
        ville : l.ville,
        commune : l.commune || l.city,
        nom_complet : l.nom_complet,
        téléphone : l.phone,
        courriel : l.email,
        adresse : l.adresse,
        prix_de_base : l.prix_de_base,
        prix_actuel : l.prix_actuel,
        statut : l.statut,
        crm_stage : l.crmStage || 'nouveau'
      }));

      const { data, error } = await this.supabaseClient.from("leads").upsert(rowsToInsert, { onConflict: "id" });
      si (erreur) lever une exception ;

      this.logActivity("SYNC_PUSH_SUPABASE", `Synchronisation complète de ${rowsToInsert.length} leads vers Supabase PostgreSQL`);
      this.showToast("✅ Tous les chantiers sont synchronisés sur Supabase Cloud !");
    } attraper (e) {
      console.error(e);
      this.showToast(`Échec synchronisation Supabase : ${e.message}`);
    }
  }

  // =========================================================================
  // SYSTÈME EXHAUSTIF DE LOGGING & AUDIT (TOUTES LES ACTIVITÉS & CONNEXIONS)
  // =========================================================================

  chargerActivityLogs() {
    const saved = localStorage.getItem("batilead_activity_logs_v18");
    si (enregistré) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    retour [
      {
        id : "LOG-001",
        acteurEmail : "ray88305@gmail.com",
        acteurName: "Super-Administrateur",
        actionType: "SUPER_ADMIN_INIT",
        description : "Marketplace BatiLead Pro CI connectée à Supabase Cloud",
        adresse IP : « 197.234.42.22 »,
        horodatage : nouvelle Date(NOW - 30 * 60 * 1000).toISOString()
      }
    ];
  }

  enregistrer les journaux d'activité() {
    localStorage.setItem("batilead_activity_logs_v18", JSON.stringify(this.activityLogs));
    this.renderAdminLogsTable();
  }

  logActivity(actionType, description, métadonnées = {}) {
    const actorEmail = this.currentUser ? this.currentUser.email : "visiteur_anonyme@ci.net";
    const acteurName = this.currentUser ? this.currentUser.name : "Visiteur Appareil CI";

    const logEntry = {
      id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
      Courriel de l'acteur,
      nom de l'acteur,
      type d'action,
      description,
      adresse IP : this.deviceId,
      métadonnées,
      horodatage : nouvelle Date().toISOString()
    };

    this.activityLogs.unshift(logEntry);
    if (this.activityLogs.length > 200) this.activityLogs.pop();
    this.saveActivityLogs();

    // Synchronisation directe avec Supabase Cloud
    si (this.supabaseClient) {
      this.supabaseClient.from("audit_activity_logs").insert({
        acteur_email : acteurEmail,
        nom_acteur : nom_acteur,
        type_action : type_action,
        description : description,
        adresse_ip : this.deviceId,
        métadonnées : métadonnées
      }).then().catch(console.warn);

      si (actionType === "LOGIN" || actionType === "AUTO_SESSION") {
        this.supabaseClient.from("user_sessions_log").insert({
          user_email: actorEmail,
          nom_utilisateur : nom_acteur,
          adresse_ip : this.deviceId,
          type_action : type_action,
          détails : description
        }).then().catch(console.warn);
      }
    }
  }

  renderAdminLogsTable() {
    const tbody = document.getElementById("admin-logs-table-body");
    const countBadge = document.getElementById("admin-logs-total-count");
    si (!tbody) retourner;

    if (countBadge) countBadge.textContent = `${this.activityLogs.length} événements tracés`;

    tbody.innerHTML = this.activityLogs.map(log => {
      let badgeClass = "bg-slate-100 text-slate-700";
      if (log.actionType.includes("PAYMENT") || log.actionType.includes("ORDER")) badgeClass = "bg-emerald-100 text-emerald-800 font-bold";
      if (log.actionType.includes("LOGIN") || log.actionType.includes("ADMIN") || log.actionType.includes("GOOGLE")) badgeClass = "bg-purple-100 text-purple-800 font-bold";
      if (log.actionType.includes("LEAD") || log.actionType.includes("STAGE")) badgeClass = "bg-blue-100 text-blue-800";

      retourner `
        <tr class="hover:bg-slate-50/80 transition-colors">
          <td class="py-3 px-3 font-mono text-[11px] text-slate-500 whitespace-nowrap">${new Date(log.timestamp).toLocaleString("fr-FR")}</td>
          <td class="py-3 px-3">
            <div class="font-bold text-slate-900">${log.actorName}</div>
            <div class="text-[10px] text-slate-400 font-mono">${log.actorEmail}</div>
          </td>
          <td class="py-3 px-3 font-mono text-[11px] text-slate-600 font-semibold">${log.ipAddress || '197.234.xx.xx'}</td>
          <td class="py-3 px-3">
            <span class="text-[10px] px-2 py-0.5 rounded-full ${badgeClass}">${log.actionType}</span>
          </td>
          <td class="py-3 px-3 text-slate-700 font-medium">${log.description}</td>
        </tr>
      `;
    }).rejoindre("");
  }

  init() {
    this.syncDevicePurchasedLeads();
    this.processLeadPricing();
    this.updateAuthUi();
    this.updateCategoryCounts();
    this.renderMarketplaceLeads();
    this.renderCrmBoard();
    this.renderAdminFullStack();
    this.renderAdminLogsTable();
    this.updateNavCounts();
    this.initGoogleIdentityServices();

    this.logActivity("AUTO_SESSION", `Connexion reconnue pour l'appareil IP ${this.deviceId}`);

    si (window.lucide) lucide.createIcons();
    this.setupDragAndDrop();
  }

  // =========================================================================
  // AUTHENTIFICATION : CONNEXION GOOGLE, ADRESSE E-MAIL ET MOT DE PASSE (AUTH. SUPABASE)
  // =========================================================================

  basculerLeModeAuthentifié() {
    const nextMode = this.authMode === "signup" ? "login" : "signup";
    this.setAuthMode(nextMode);
  }

  définir le mode d'authentification(mode) {
    this.authMode = mode;
    const heading = document.getElementById("auth-modal-heading");
    const fieldName = document.getElementById("auth-field-name");
    const submitBtn = document.getElementById("auth-submit-btn");
    const switchText = document.getElementById("auth-switch-text");
    const switchBtn = document.getElementById("auth-switch-btn");

    si (mode === "signup") {
      if (heading) heading.textContent = "Créer un compte";
      si (fieldName) fieldName.classList.remove("hidden");
      if (submitBtn) submitBtn.textContent = "S'inscrire";
      if (switchText) switchText.textContent = "Vous avez déjà un compte ?";
      if (switchBtn) switchBtn.textContent = "Se connecter";
    } autre {
      if (heading) heading.textContent = "Bon retour parmi nous";
      si (fieldName) fieldName.classList.add("hidden");
      if (submitBtn) submitBtn.textContent = "Se connecter";
      if (switchText) switchText.textContent = "Vous n'avez pas de compte ?";
      if (switchBtn) switchBtn.textContent = "S'inscrire";
    }
  }

  afficher/masquer le mot de passe() {
    const pwdInput = document.getElementById("auth-password");
    const eyeIcon = document.getElementById("auth-eye-icon");
    si (!pwdInput) retourner;

    si (pwdInput.type === "password") {
      pwdInput.type = "texte";
      si (eyeIcon) eyeIcon.setAttribute("data-lucide", "eye-off");
    } autre {
      pwdInput.type = "mot de passe";
      si (eyeIcon) eyeIcon.setAttribute("data-lucide", "œil");
    }
    si (window.lucide) lucide.createIcons();
  }

  initGoogleIdentityServices() {
    const GOOGLE_CLIENT_ID = "919075699648-7io8aipions5s9fn5aijv3aqfknmr72q.apps.googleusercontent.com";

    si (window.google && window.google.accounts && window.google.accounts.oauth2) {
      essayer {
        this.googleTokenClient = window.google.accounts.oauth2.initTokenClient({
          client_id : GOOGLE_CLIENT_ID,
          portée : « https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email »,
          rappel : asynchrone (réponse du jeton) => {
            si (tokenResponse && tokenResponse.access_token) {
              attendre this.fetchGoogleUserProfile(tokenResponse.access_token);
            }
          }
        });
        console.log("Fenêtre contextuelle du client de jeton Google prête !");
      } attraper (e) {
        console.warn("Note d'initialisation du client Google Token :", e);
      }
    }
  }

  async fetchGoogleUserProfile(accessToken) {
    essayer {
      this.showToast("Récupération de votre compte Google...");
      const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        en-têtes : { Authorization: `Bearer ${accessToken}` }
      });
      const googleUser = await res.json();
      console.log("Compte Google authentifié en direct :", googleUser);

      si (googleUser && googleUser.email) {
        attendre this.processAuthenticatedGooglePayload(googleUser);
      }
    } attraper (e) {
      console.error("Erreur Google UserInfo:", e);
      this.showToast("Connexion Google effectuée.");
    }
  }

  async processAuthenticatedGooglePayload(googleUser) {
    const email = googleUser.email.toLowerCase();
    const nom = googleUser.name || googleUser.given_name || email.split("@")[0];
    const avatar = googleUser.picture || "";
    const isRay = this.isSuperAdmin(email);

    const authedUser = {
      id: googleUser.sub || `USR-GGL-${Date.now()}`,
      nom : nom,
      courriel : courriel,
      téléphone : "+225 07 00 00 00 00",
      rôle : estRay ? "super_admin" : "artisan",
      avatar : avatar,
      connectéÀ: nouvelle Date().toISOString()
    };

    // 1. Sauvegarde locale immédiate
    this.saveCurrentUser(authedUser);
    this.closeModal("authModal");
    this.updateAuthUi();
    this.renderCrmBoard();
    this.renderAdminFullStack();

    // 2. Écriture immédiate dans la base de données Supabase Cloud
    si (this.supabaseClient) {
      attendre this.supabaseClient.from("users").upsert({
        id : authedUser.id,
        nom : authedUser.name,
        email : authedUser.email,
        avatar_url : authedUser.avatar,
        téléphone : authedUser.phone,
        rôle : authedUser.role,
        adresse_ip : this.deviceId,
        Nombre de connexions : 1,
        dernière_connexion_à: authedUser.loggedAt
      }, { onConflict: "email" }).catch(console.warn);

      attendre this.supabaseClient.from("user_sessions_log").insert({
        user_email: authedUser.email,
        nom_utilisateur : authedUser.name,
        adresse_ip : this.deviceId,
        action_type: "GOOGLE_OAUTH_LOGIN",
        détails : `Connexion Google Popup réussie pour ${authedUser.email}`
      }).catch(console.warn);
    }

    this.logActivity("LOGIN_GOOGLE", `Connexion officielle Google pour ${name} (${email})`);
    si (fenêtre.confettis) confettis({ nombre de particules : 60, dispersion : 70, origine : { y : 0,6 } });

    si (isRay) {
      this.showToast(`👑 Bienvenue Ray ! Accès Gestion & Ajout de chantiers activé.`);
    } autre {
      this.showToast(`✅ Bienvenue ${name} ! Vous êtes connecté.`);
    }

    si (this.selectedLeadForPurchase) {
      const lead = this.selectedLeadForPurchase;
      setTimeout(() => this.openPurchaseModal(lead.id), 400);
    }
  }

  async signInWithRealGoogleOAuth() {
    this.logActivity("GOOGLE_OAUTH_CLICK", "Ouverture Connexion Google");

    // 1. Tentative Popup Google Native Directe (Ultra-rapide, 0 rechargement de page)
    si (this.googleTokenClient) {
      essayer {
        this.googleTokenClient.requestAccessToken({ prompt: 'select_account' });
        retour;
      } attraper (erreur) {
        console.warn("Popup Google fallback:", err);
      }
    }

    // 2. Méthode Supabase OAuth Redirection (Fallback)
    si (this.supabaseClient && this.supabaseClient.auth) {
      essayer {
        this.showToast("Ouverture de Google...");
        const redirectUrl = "https://batilead-nu.vercel.app";
        const { erreur } = await this.supabaseClient.auth.signInWithOAuth({
          fournisseur : 'google',
          options: {
            rediriger vers : URL de redirection,
            queryParams: { prompt: 'select_account' }
          }
        });
        si (erreur) lever une exception ;
      } attraper (e) {
        console.warn("Remarque d'authentification Google Supabase :", e);
        this.showToast(`Connexion Google : ${e.message}`);
      }
    }
  }

  async handleAuthSubmit(event) {
    événement.prévenirDefault();
    const email = document.getElementById("auth-email").value.trim().toLowerCase();
    const mot de passe = document.getElementById("auth-password").value;
    const name = document.getElementById("auth-name")?.value.trim() || email.split("@")[0];
    const phone = document.getElementById("auth-phone")?.value.trim() || "+225 07 00 00 00 00";

    const submitBtn = document.getElementById("auth-submit-btn");
    si (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span class="animate-spin mr-1">⏳</span> Connexion en cours...`;
    }

    const isRay = this.isSuperAdmin(email);
    const utilisateur = {
      id: `USR-${Date.now()}`,
      nom : nom,
      courriel : courriel,
      téléphone : téléphone,
      rôle : estRay ? "super_admin" : "artisan",
      connectéÀ: nouvelle Date().toISOString()
    };

    // Sauvegarde en mémoire locale & en base Supabase
    this.saveCurrentUser(user);

    si (this.supabaseClient) {
      this.supabaseClient.from("users").upsert({
        id : utilisateur.id,
        nom : nom.utilisateur,
        Courriel : user.email,
        téléphone : utilisateur.téléphone,
        rôle : utilisateur.rôle,
        adresse_ip : this.deviceId,
        Nombre de connexions : 1,
        dernière_connexion_à: utilisateur.connectéÀ
      }, { onConflict: "email" }).then().catch(console.warn);

      this.supabaseClient.from("user_sessions_log").insert({
        adresse_email de l'utilisateur : utilisateur.email,
        nom_utilisateur : nom.utilisateur,
        adresse_ip : this.deviceId,
        action_type: "CONNEXION",
        détails : `Connexion ${this.authMode === 'signup' ? 'nouvelle inscription' : 'reconnexion'} réussie`
      }).then().catch(console.warn);
    }

    this.closeModal("authModal");

    si (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = this.authMode === "inscription" ? "S'inscrire" : "Se connecter";
    }

    this.logActivity("LOGIN", `Connexion réussie pour ${name} (${email})`);
    si (fenêtre.confetti) confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });

    si (isRay) {
      this.showToast(`👑 Bienvenue Ray ! Accès Gestion & Ajout de chantiers activé.`);
    } autre {
      this.showToast(`✅ Bienvenue ${name} ! Vous êtes connecté.`);
    }
    this.updateAuthUi();

    si (this.selectedLeadForPurchase) {
      const pendingLead = this.selectedLeadForPurchase;
      setTimeout(() => {
        this.openPurchaseModal(pendingLead.id);
      }, 400);
    } autre {
      this.renderCrmBoard();
    }
  }

  // =========================================================================
  // CONFIGURATION PERSISTENCE & GENIUSPAY
  // =========================================================================

  obtenirOrCréerDeviceId() {
    let device = localStorage.getItem("batilead_device_fingerprint_v18");
    si (!device) {
      appareil = `197.234.${Math.floor(10 + Math.random() * 80)}.${Math.floor(10 + Math.random() * 80)}`;
      localStorage.setItem("batilead_device_fingerprint_v18", device);
    }
    appareil de retour ;
  }

  chargerAdminEmail() {
    return localStorage.getItem("batilead_master_admin_email_v18") || "ray88305@gmail.com";
  }

  enregistrerAdminEmail(email) {
    this.adminEmail = email.trim().toLowerCase();
    localStorage.setItem("batilead_master_admin_email_v18", this.adminEmail);
    const badge = document.getElementById("admin-active-email-badge");
    si (badge) badge.textContent = this.adminEmail ;
    const input = document.getElementById("settings-admin-email");
    si (entrée) entrée.valeur = this.adminEmail ;
  }

  chargerGeniusPayKey() {
    return localStorage.getItem("batilead_geniuspay_pubkey_v18") || OFFICIAL_GENIUSPAY_PUBKEY;
  }

  chargerGeniusPaySecret() {
    return localStorage.getItem("batilead_geniuspay_secret_v18") || OFFICIAL_GENIUSPAY_SECRET;
  }

  chargerGeniusPayMode() {
    retourner localStorage.getItem("batilead_geniuspay_mode_v18") || "sandbox";
  }

  enregistrerGeniusPayConfig(clé, secret, mode) {
    this.geniusPayPubKey = key.trim();
    this.geniusPaySecretKey = secret.trim();
    this.geniusPayMode = mode;
    localStorage.setItem("batilead_geniuspay_pubkey_v18", this.geniusPayPubKey);
    localStorage.setItem("batilead_geniuspay_secret_v18", this.geniusPaySecretKey);
    localStorage.setItem("batilead_geniuspay_mode_v18", this.geniusPayMode);
  }

  chargerUtilisateurActuel() {
    const saved = localStorage.getItem("batilead_current_user_v18");
    si (enregistré) {
      try { return JSON.parse(saved); } catch (e) { return null; }
    }
    renvoyer null ;
  }

  enregistrerUtilisateurActuel(utilisateur) {
    this.currentUser = utilisateur;
    si (utilisateur) {
      localStorage.setItem("batilead_current_user_v18", JSON.stringify(user));
      this.registerOrUpdateUserInDb(user);
    } autre {
      localStorage.removeItem("batilead_current_user_v18");
    }
    this.updateAuthUi();
  }

  chargerLeads() {
    const saved = localStorage.getItem("batilead_geniuspay_leads_db_v18");
    si (enregistré) {
      essayer {
        const parsed = JSON.parse(saved);
        si (Array.isArray(parsed) && parsed.length >= 10) {
          retour analysé ;
        }
      } catch (e) { console.error(e); }
    }
    renvoie JSON.parse(JSON.stringify(DEFAULT_LEADS_CI));
  }

  enregistrerLesProspects() {
    this.processLeadPricing();
    localStorage.setItem("batilead_geniuspay_leads_db_v18", JSON.stringify(this.leads));
    this.updateCategoryCounts();
    this.updateNavCounts();
    this.renderAdminFullStack();
  }

  chargerRegistreUtilisateurs() {
    const saved = localStorage.getItem("batilead_users_registry_v18");
    si (enregistré) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    retour [
      {
        id : "USR-CI-001",
        nom : "Société Ivoirienne de BTP & Rénovation",
        Courriel : « direction@sibtp.ci »,
        téléphone : "+225 07 48 92 14 00",
        rôle : « artisan »,
        enregistréÀ : nouvelle Date(MAINTENANT - 3 * ONE_DAY_MS).toISOString(),
        lastLoginAt: new Date(NOW - 15 * 60 * 1000).toISOString(),
        Nombre de connexions : 4,
        Adresse IP : « 197.234.55.12 »,
        Nombre d'achats : 0,
        totalSpentFcfa: 0
      },
      {
        id : "USR-CI-002",
        nom : « Entreprise Générale de Construction Abidjan (EGCA) »,
        courriel : « contact@egca-btp.ci »,
        téléphone : "+225 05 00 11 22 33",
        rôle : « artisan »,
        enregistréÀ : nouvelle Date(MAINTENANT - 1 * ONE_DAY_MS).toISOString(),
        lastLoginAt: new Date(NOW - 2 * 60 * 1000).toISOString(),
        Nombre de connexions : 2,
        Adresse IP : « 197.234.88.45 »,
        Nombre d'achats : 0,
        totalSpentFcfa: 0
      }
    ];
  }

  saveUsersRegistry() {
    localStorage.setItem("batilead_users_registry_v18", JSON.stringify(this.users));
  }

  enregistrerOuMettreÀJourUtilisateurDansLaBaseDeDonnées(utilisateur) {
    let existing = this.users.find(u => u.email.toLowerCase() === user.email.toLowerCase());
    si (!existant) {
      existant = {
        id: `USR-CI-${Math.floor(100 + Math.random() * 900)}`,
        nom : nom.utilisateur,
        Courriel : user.email,
        téléphone : utilisateur.phone || "Non renseigné",
        rôle : utilisateur.rôle || (ceci.estSuperAdmin(utilisateur.email) ? "super_admin" : "artisan"),
        enregistréÀ: nouvelle Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
        Nombre de connexions : 1,
        adresse IP : this.deviceId,
        Nombre d'achats : 0,
        totalSpentFcfa: 0
      };
      this.users.unshift(existant);
    } autre {
      nom.existant = nom.utilisateur;
      téléphone existant = téléphone de l'utilisateur || téléphone existant ;
      existant.ipAddress = this.deviceId;
      existant.lastLoginAt = new Date().toISOString();
      existant.loginCount = (existant.loginCount || 1) + 1;
    }
    this.saveUsersRegistry();

    // Supabase Cloud Async Sync
    si (this.supabaseClient) {
      this.supabaseClient.from("users").upsert({
        id : existant.id,
        nom : nom.existant,
        courriel : courriel existant,
        téléphone : téléphone existant,
        rôle : rôle existant,
        adresse_ip : adresse.ip existante,
        nombre_de_connexions : existant.loginCount,
        dernière_connexion_à : existant.dernière_connexionÀ,
        nombre_achetés : nombre_achetés_existant,
        total_spent_fcfa: existant.totalSpentFcfa
      }, { onConflict: "email" }).then().catch(console.warn);
    }
  }

  chargerRegistreDesCommandes() {
    const saved = localStorage.getItem("batilead_orders_registry_v18");
    si (enregistré) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    retour [];
  }

  saveOrdersRegistry() {
    localStorage.setItem("batilead_orders_registry_v18", JSON.stringify(this.orders));
  }

  estSuperAdmin(email) {
    si (!email) retourner faux ;
    return email.trim().toLowerCase() === this.adminEmail.toLowerCase();
  }

  mettre à jourAuthUi() {
    const container = document.getElementById("auth-header-container");
    const adminNavTab = document.getElementById("nav-tab-admin");
    const adminMobileNav = document.getElementById("mobile-nav-admin");
    const adminEmailBadge = document.getElementById("admin-active-email-badge");
    const settingsInput = document.getElementById("settings-admin-email");
    const settingsKeyInput = document.getElementById("settings-geniuspay-pubkey");
    const settingsSecretInput = document.getElementById("settings-geniuspay-secret");
    const settingsModeInput = document.getElementById("settings-geniuspay-mode");
    const settingsSupaUrl = document.getElementById("settings-supabase-url");
    const settingsSupaKey = document.getElementById("settings-supabase-key");

    si (adminEmailBadge) adminEmailBadge.textContent = this.adminEmail ;
    si (settingsInput) settingsInput.value = this.adminEmail;
    si (settingsKeyInput) settingsKeyInput.value = this.geniusPayPubKey;
    si (settingsSecretInput) settingsSecretInput.value = this.geniusPaySecretKey;
    si (settingsModeInput) settingsModeInput.value = this.geniusPayMode ;
    si (settingsSupaUrl) settingsSupaUrl.value = this.supabaseUrl;
    si (settingsSupaKey) settingsSupaKey.value = this.supabaseKey;

    const isRay = this.currentUser && this.isSuperAdmin(this.currentUser.email);

    si (isRay) {
      si (adminNavTab) adminNavTab.classList.remove("hidden");
      si (adminMobileNav) {
        adminMobileNav.classList.remove("hidden");
        adminMobileNav.classList.add("flex");
      }
    } autre {
      if (adminNavTab) adminNavTab.classList.add("caché");
      si (adminMobileNav) {
        adminMobileNav.classList.add("hidden");
        adminMobileNav.classList.remove("flex");
      }
      si (this.currentView === "admin") {
        this.navigateTo("marketplace");
      }
    }

    si (!conteneur) retourner;

    si (this.currentUser) {
      const avatarHtml = this.currentUser.avatar
        ? `<img src="${this.currentUser.avatar}" alt="${this.currentUser.name}" class="w-8 h-8 rounded-xl object-cover shadow-sm border border-sky-200" />`
        : `<div class="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-500 to-sky-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
            ${this.currentUser.name ? this.currentUser.name.charAt(0).toUpperCase() : 'G'}
           </div>`;

      container.innerHTML = `
        <div class="flex items-center gap-2.5 bg-sky-50 border border-sky-200/80 px-3.5 py-1.5 rounded-2xl cursor-pointer hover:shadow-sm transition-all" onclick="app.navigateTo('crm')">
          ${avatarHtml}
          <div class="text-left hidden sm:block">
            <span class="text-slate-900 font-bold text-xs block leading-tight flex items-center gap-1.5">
              ${this.currentUser.name || 'Compte Google'}
              ${isRay ? '<span class="text-[9px] bg-amber-200 text-amber-900 font-bold px-1.5 py-0.2 rounded-full">Admin</span>' : ''}
            </span>
            <span class="text-[10px] text-sky-700 font-medium font-mono">${this.currentUser.email}</span>
          </div>
          <button class="text-slate-400 hover:text-rose-600 p-1 ml-1" title="Se déconnecter" onclick="event.stopPropagation(); app.logoutUser()">
            <i data-lucide="log-out" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      `;
    } autre {
      container.innerHTML = `
        <button class="btn-sky-primary text-xs" onclick="app.openModal('authModal')">
          <i data-lucide="user" class="w-3.5 h-3.5"></i>
          <span>Continuer avec Google</span>
        </button>
      `;
    }
    si (window.lucide) lucide.createIcons();
  }

  déconnexionUtilisateur() {
    const email = this.currentUser ? this.currentUser.email : "Utilisateur";
    this.logActivity("LOGOUT", `Déconnexion de ${email}`);
    
    si (this.supabaseClient && this.supabaseClient.auth) {
      this.supabaseClient.auth.signOut().catch(() => {});
    }

    this.saveCurrentUser(null);
    this.updateNavCounts();
    this.renderMarketplaceLeads();
    this.renderCrmBoard();
    this.showToast("Déconnexion effectuée.");
    this.navigateTo("marketplace");
  }

  handleGeniusPaySettingsUpdate(événement) {
    événement.prévenirDefault();
    const key = document.getElementById("settings-geniuspay-pubkey").value;
    const secret = document.getElementById("settings-geniuspay-secret").value;
    const mode = document.getElementById("settings-geniuspay-mode").value;
    const email = document.getElementById("settings-admin-email").value;

    this.saveGeniusPayConfig(clé, secret, mode);
    this.saveAdminEmail(email);
    this.logActivity("SETTINGS_UPDATE", `Mise à jour des identifiants GeniusPay (${mode}) par ${email}`);
    this.showToast("Paramètres GeniusPay & Email enregistrés.");
    this.updateAuthUi();
  }

  // =========================================================================
  // PRIX ET FRAÎCHEUR (FCFA)
  // =========================================================================

  processLeadPricing() {
    this.leads.forEach(lead => {
      si (!lead.createdAt) {
        const jours = lead.daysAgo !== undefined ? lead.daysAgo : 1;
        lead.createdAt = new Date(NOW - days * ONE_DAY_MS).toISOString();
      }

      const diffDays = Math.floor((NOW - new Date(lead.createdAt).getTime()) / ONE_DAY_MS);
      lead.ageDays = Math.max(0, diffDays);

      si (lead.ageDays <= 3) {
        lead.ageCategory = "frais";
        lead.ageBadgeText = `⚡ ${lead.ageDays === 0 ? "Frais du jour" : `Disponible depuis ${lead.ageDays} jour${lead.ageDays > 1 ? "s" : ""}`}`;
        lead.ageBadgeClass = "bg-emerald-50 text-emerald-800 border-emerald-200/80";
        lead.pricingLabel = "Plein Tarif";
        lead.currentPrice = lead.basePrice || 25000;
        plomb.estExpiré = faux ;
      } sinon si (lead.ageDays <= 5) {
        lead.ageCategory = "réduit";
        lead.ageBadgeText = `🏷️ Disponible depuis ${lead.ageDays} jours • Tarif dégressif`;
        lead.ageBadgeClass = "bg-amber-50 text-amber-800 border-amber-200/80";
        lead.pricingLabel = "Tarif Dégressif (-35%)";
        lead.currentPrice = Math.max(10000, Math.round((lead.basePrice || 25000) * 0.65));
        plomb.estExpiré = faux ;
      } autre {
        lead.ageCategory = "expiré";
        lead.ageBadgeText = `⛔ Expiré (> 7 jours)`;
        lead.ageBadgeClass = "bg-slate-100 text-slate-500 border-slate-200";
        lead.pricingLabel = "Non disponible";
        prix actuel du plomb = 0 ;
        plomb.estExpiré = vrai;
      }
    });
  }

  estLeadAchetéParL'UtilisateurActuel(lead) {
    si (!this.currentUser || !this.currentUser.email) retourner faux ;
    const userEmail = this.currentUser.email.toLowerCase();
    si (lead.unlockedByEmails && Array.isArray(lead.unlockedByEmails)) {
      return lead.unlockedByEmails.map(e => e.toLowerCase()).includes(userEmail);
    }
    si (lead.unlockedByEmail && lead.unlockedByEmail.toLowerCase() === userEmail) {
      renvoyer vrai ;
    }
    renvoyer faux ;
  }

  syncDevicePurchasedLeads() {
    // Synchronisation basée sur l'utilisateur connecté
  }

  getDeviceUnlockedLeadIds() {
    retour [];
  }

  saveDeviceUnlockedLeadId(leadId) {
    // Sessions non partagées
  }

  updateNavCounts() {
    const availableCount = this.leads.filter(l => !l.isExpired && !this.isLeadPurchasedByCurrentUser(l)).length;
    const purchasedCount = this.currentUser ? this.leads.filter(l => this.isLeadPurchasedByCurrentUser(l)).length : 0;

    const navAvail = document.getElementById("nav-count-available");
    const navPurch = document.getElementById("nav-count-purchased");
    if (navAvail) navAvail.textContent = availableCount ;
    si (navPurch) navPurch.textContent = purchasedCount;
  }

  mettre à jourCategoryCounts() {
    const allCount = this.leads.filter(l => l.status === "available" && !l.isExpired).length;
    const constrCount = this.leads.filter(l => l.category === "construction" && l.status === "available" && !l.isExpired).length;
    const renoCount = this.leads.filter(l => l.category === "renovation" && l.status === "available" && !l.isExpired).length;

    const elAll = document.getElementById("count-all-leads");
    const elConstr = document.getElementById("count-construction-leads");
    const elReno = document.getElementById("count-renovation-leads");

    si (elAll) elAll.textContent = allCount;
    si (elConstr) elConstr.textContent = constrCount;
    si (elReno) elReno.textContent = renoCount;
  }

  naviguerVers(nomvue) {
    si (viewName === "admin" && (!this.currentUser || !this.isSuperAdmin(this.currentUser.email))) {
      this.openModal("authModal");
      this.showToast("Accès réservé à ray88305@gmail.com. Veuillez vous identifier.");
      retour;
    }

    this.currentView = viewName;
    document.querySelectorAll(".soft-tab").forEach(tab => tab.classList.remove("active"));
    const activeTab = document.getElementById(`nav-tab-${viewName}`);
    si (activeTab) activeTab.classList.add("active");

    document.querySelectorAll(".view-section").forEach(sec => {
      sec.classList.remove("active");
      sec.classList.add("caché");
    });

    const targetSec = document.getElementById(`view-${viewName}`);
    si (targetSec) {
      targetSec.classList.remove("hidden");
      targetSec.classList.add("active");
    }

    if (viewName === "crm") this.renderCrmBoard();
    if (viewName === "admin") this.renderAdminFullStack();
    if (viewName === "marketplace") this.renderMarketplaceLeads();

    window.scrollTo({ top: 0, behavior: "smooth" });
    si (window.lucide) lucide.createIcons();
  }

  basculerMenuMobile() {
    const menu = document.getElementById("mobile-menu");
    if (menu) menu.classList.toggle("hidden");
  }

  // =========================================================================
  // MARCHÉ
  // =========================================================================

  sélectionnerCategory(cat, btnElement) {
    this.selectedCategory = chat;
    document.querySelectorAll(".category-image-card").forEach(c => c.classList.remove("active"));
    if (btnElement) btnElement.classList.add("active");
    this.logActivity("FILTER_CATEGORY", `Filtrage du catalogue : ${cat}`);
    this.filterLeads();
  }

  filterLeads() {
    const filtered = this.leads.filter(lead => {
      si (this.selectedCategory !== "all" && lead.category !== this.selectedCategory) {
        renvoyer faux ;
      }
      renvoyer vrai ;
    });

    this.renderFilteredLeads(filtré);
  }

  réinitialiserFiltres() {
    this.selectCategory("all", document.querySelector('[data-category="all"]'));
  }

  renderMarketplaceLeads() {
    this.filterLeads();
  }

  renderFilteredLeads(leadsToRender) {
    const grid = document.getElementById("leads-grid");
    const emptyState = document.getElementById("leads-empty-state");
    const badge = document.getElementById("results-count-badge");

    si (!grid) retourner;
    if (badge) badge.textContent = `${leadsToRender.length} projet${leadsToRender.length > 1 ? "s" : ""} en ligne`;

    si (leadsToRender.length === 0) {
      grille.innerHTML = "";
      si (emptyState) emptyState.classList.remove("hidden");
      retour;
    }

    si (emptyState) emptyState.classList.add("hidden");
    grid.innerHTML = leadsToRender.map(lead => this.createHumanLeadCardHtml(lead)).join("");
    si (window.lucide) lucide.createIcons();
  }

  obtenirNomMasqué(nomcomplet) {
    const parts = fullName.trim().split(" ");
    const lastName = parts[0] || "Client";
    renvoie `M. ${lastName} ••••••••• (Client Vérifié)`;
  }

  obtenirTéléphoneMasqué(téléphone) {
    renvoie `+225 07 •• •• •• ••`;
  }

  obtenirMaskedEmail(email) {
    renvoie `••••••••@client.ci`;
  }

  créerHumanLeadCardHtml(lead) {
    const isPurchased = lead.status === "purchased";
    const isPurchasedByMe = this.isLeadPurchasedByCurrentUser(lead);
    const isExpired = lead.isExpired && !isPurchased;

    const maskedName = this.getMaskedName(lead.fullName);
    const maskedPhone = this.getMaskedPhone(lead.phone);

    retourner `
      <div class="soft-lead-card p-5 sm:p-6 flex flex-col justify-between ${isPurchased ? 'border-slate-200 bg-slate-50/50 relative overflow-hidden' : 'bg-white'}">
        
        <div class="space-y-4">
          <!-- Ligne d'en-tête -->
          <div class="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <div class="flex items-center gap-2">
                <h3 class="font-heading font-bold text-sm text-slate-900 flex items-center gap-2">
                  ${isPurchased ? '<span class="w-2.5 h-2.5 rounded-full bg-slate-400"></span>' : ''}
                  ${maskedName}
                </h3>
                ${isPurchased ? `
                  <span class="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${isPurchasedByMe ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'} uppercase tracking-wider">
                    ${isPurchasedByMe ? 'Acquis par vous' : 'Chantier Acheté'}
                  </span>
                ` : ''}
              </div>

              <!-- Informations de contact masquées -->
              <div class="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 mt-1.5">
                <span class="flex items-center gap-1.5">
                  <i data-lucide="phone" class="w-3 h-3 text-slate-400"></i>
                  <span class="font-mono text-slate-700 font-semibold">${maskedPhone}</span>
                  <span class="text-[9px] text-sky-700 font-bold bg-sky-50 px-1.5 py-0.5 rounded-full border border-sky-200/60">Vérifié CI</span>
                </span>
                <span class="flex items-center gap-1">
                  <i data-lucide="map-pin" class="w-3 h-3 text-slate-400"></i>
                  <span class="font-medium text-slate-700">${lead.city}</span>
                </span>
              </div>
            </div>

            <!-- Prix affiché en FCFA -->
            <div class="text-right shrink-0">
              ${isPurchased ? `
                <div class="text-xs font-extrabold text-slate-500 font-heading bg-slate-200/80 px-2.5 py-1 rounded-lg">Chantier Vendu</div>
              ` : est expiré ? `
                <span class="text-xs font-bold text-slate-400">Expiré</span>
              ` : lead.ageCategory === 'discounted' ? `
                <div class="text-base font-extrabold text-sky-700 font-heading leading-tight">${lead.currentPrice.toLocaleString()} FCFA</div>
                <span class="text-[10px] text-slate-400 line-through">${lead.basePrice.toLocaleString()} FCFA</span>
              ` : `
                <div class="text-base font-extrabold text-slate-900 font-heading leading-tight">${lead.currentPrice.toLocaleString()} FCFA</div>
                <span class="text-[10px] text-slate-500">Tarif plein</span>
              `}
            </div>
          </div>

          <!-- Détails du projet avec effet de flottage si acheté -->
          <div class="space-y-2.5 ${isPurchased && !isPurchasedByMe ? 'relative select-none' : ''}">
            <div class="flex items-center justify-between gap-2">
              <h4 class="font-bold text-xs text-slate-900 leading-snug">${lead.title}</h4>
              <span class="text-[10px] font-bold px-2.5 py-0.5 rounded-full shrink-0 ${isPurchased ? 'bg-slate-100 text-slate-600' : lead.category === 'construction' ? 'bg-sky-50 text-sky-900 border border-sky-200/80' : 'bg-blue-50 text-blue-900 border border-blue-200/80'}">
                ${lead.categoryLabel} ${isPurchased ? '• Acheté' : ''}
              </span>
            </div>

            <p class="text-xs text-slate-600 line-clamp-2 leading-relaxed ${isPurchased && !isPurchasedByMe ? 'blur-[1.5px] opacity-60' : ''}">
              ${lead.description}
            </p>

            <!-- Ligne de spécifications -->
            <div class="grid grid-cols-3 gap-2 pt-1 text-[11px] ${isPurchased && !isPurchasedByMe ? 'blur-[1.5px] opacity-60' : ''}">
              <div class="bg-slate-50 p-2 rounded-xl border border-slate-100">
                <span class="text-slate-400 block text-[9px] uppercase font-bold tracking-wider">Projet budgétaire</span>
                <span class="font-bold text-slate-900">${lead.budget}</span>
              </div>
              <div class="bg-slate-50 p-2 rounded-xl border border-slate-100">
                <span class="text-slate-400 block text-[9px] uppercase font-bold tracking-wider">Délai Souhaité</span>
                <span class="font-semibold text-slate-700">${lead.horizon}</span>
              </div>
              <div class="bg-slate-50 p-2 rounded-xl border border-slate-100">
                Surface
                <span class="font-semibold text-slate-700">${lead.surface || 'N/A'}</span>
              </div>
            </div>

            ${isPurchased && !isPurchasedByMe ? `
              <div class="absolute inset-0 flex items-center justify-center bg-slate-50/20 backdrop-blur-[0.5px]">
                <span class="text-[10px] font-bold bg-slate-900 text-white px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5">
                  <i data-lucide="lock" class="w-3 h-3 text-amber-400"></i> Chantier acquis en exclusivité
                </span>
              </div>
            ` : ''}
          </div>
        </div>

        <!-- PIED DE PAGE INFÉRIEUR -->
        <div class="pt-4 border-t border-slate-100 flex items-center justify-between gap-3 mt-4">
          <!-- Gauche : Étiquette d'âge et de fraîcheur -->
          <div class="flex items-center gap-1.5">
            <span class="text-[10px] font-bold px-2.5 py-1 rounded-full border ${lead.ageBadgeClass}">
              ${lead.ageBadgeText}
            </span>
          </div>

          <!-- Droite : Bouton d'action -->
          ${isPurchasedByMe ? `
            <button class="btn-sky-secondary text-xs py-2 px-3.5" onclick="app.navigateTo('crm')">
              Voir dans mon CRM
            </button>
          ` : est acheté ? `
            <button class="btn-sky-secondary text-xs py-2 px-3.5 opacity-60 cursor-not-allowed border border-slate-300 bg-slate-100 text-slate-600 font-bold" disabled>
              <i data-lucide="check-circle" class="w-3.5 h-3.5 text-slate-500"></i> Chantier déjà acheté
            </button>
          ` : est expiré ? `
            <button class="btn-sky-secondary text-xs py-2 opacity-50 cursor-not-allowed" disabled>
              Chantier expiré (> 7 jours)
            </button>
          ` : `
            <button class="btn-sky-primary text-xs py-2 px-4" onclick="app.openPurchaseModal('${lead.id}')">
              <i data-lucide="lock" class="w-3.5 h-3.5"></i> Débloquer ce chantier (${lead.currentPrice.toLocaleString()} FCFA)
            </button>
          `}
        </div>

      </div>
    `;
  }

  // =========================================================================
  // WORKFLOW DE PAIEMENT RÉEL GENIUSPAY MOBILE MONEY
  // =========================================================================

  sélectionnerPaymentMethod(radioEl) {
    this.selectedPaymentMethod = radioEl.value;
    document.querySelectorAll(".payment-method-option").forEach(o => {
      o.classList.remove("active", "border-sky-500", "bg-sky-50/60");
      o.classList.add("border-slate-200", "bg-slate-50/60");
    });
    const parentLabel = radioEl.closest("label");
    si (parentLabel) {
      parentLabel.classList.add("active", "border-sky-500", "bg-sky-50/60");
      parentLabel.classList.remove("border-slate-200", "bg-slate-50/60");
    }
  }

  ouvrirPurchaseModal(leadId) {
    si (!this.currentUser) {
      this.openModal("authModal");
      this.showToast("Veuillez vous connecter à votre compte pour débloquer ce chantier.");
      retour;
    }

    const lead = this.leads.find(l => l.id === leadId);
    si (!lead || lead.isExpired) retourner;

    this.selectedLeadForPurchase = lead;
    const container = document.getElementById("purchase-lead-details");
    const priceDisplay = document.getElementById("modal-lead-price-display");
    si (!conteneur) retourner;

    this.logActivity("OPEN_PURCHASE_MODAL", `Consultation pour déblocage du chantier #${lead.id} (${lead.title})`);

    if (priceDisplay) priceDisplay.textContent = `${lead.currentPrice.toLocaleString()} FCFA`;

    container.innerHTML = `
      <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
        <div class="flex items-center justify-between font-semibold">
          <span class="text-sky-800 font-bold text-xs">${lead.categoryLabel}</span>
          <span class="text-slate-500 text-xs">${lead.city}</span>
        </div>
        <h4 class="font-bold text-slate-900 text-sm leading-snug">${lead.title}</h4>
        <p class="text-slate-600 text-xs italic">"${lead.description}"</p>
        <div class="flex items-center justify-between border-t border-slate-200/80 pt-2 text-[11px] text-slate-600 font-medium">
          <span>Budget estimé : <strong class="text-slate-900">${lead.budget}</strong></span>
          Démarrage : ${lead.horizon}</strong></span>
        </div>
      </div>
    `;

    this.openModal("purchaseModal");
    si (window.lucide) lucide.createIcons();
  }

  // Étape 1 : Appel API vers GeniusPay et ouverture de l'écran d'autorisation USSD/App
  async initiateGeniusPayPayment() {
    si (!this.selectedLeadForPurchase) retourner;
    const lead = this.selectedLeadForPurchase;
    const rawPhone = document.getElementById("checkout-momo-phone")?.value || "";
    const digitsOnly = rawPhone.replace(/[^0-9]/g, "");

    si (digitsOnly.length < 8) {
      this.showToast("Veuillez saisir un numéro Mobile Money valide (ex: 07 48 92 14 77).");
      document.getElementById("checkout-momo-phone")?.focus();
      retour;
    }

    const cleanPhone = digitsOnly.startsWith("225") ? digitsOnly.substring(3) : digitsOnly;
    const fullPhone = `+225 ${cleanPhone}`;
    const acheteurName = this.currentUser ? this.currentUser.name : "Entreprise BTP Partenaire";
    const buyerEmail = this.currentUser ? this.currentUser.email : "artisan@momo.ci";
    const txRef = `GP-TX-${Math.floor(100000 + Math.random() * 900000)}`;

    const submitBtn = document.getElementById("geniuspay-submit-btn");
    si (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span class="animate-spin mr-1">⏳</span> Connexion GeniusPay...`;
    }

    this.logActivity("INITIATE_PAYMENT", `Initiation de paiement GeniusPay ${this.selectedPaymentMethod} (${lead.currentPrice.toLocaleString()} FCFA) pour chantier #${lead.id}`, { phone: fullPhone, txRef });

    // Préparation de la requête officielle GeniusPay
    const paymentPayload = {
      montant : lead.currentPrice,
      devise : « XOF »,
      description: `Achat Contact Client Chantier #${lead.id} (${lead.title})`,
      nom_du_client : nom_de_l'acheteur,
      customer_email: buyerEmail,
      téléphone_client : téléphone_complet,
      méthode_de_paiement : this.selectedPaymentMethod.toLowerCase().replace(/\s+/g, "_"),
      référence_marchand : txRef,
      clé_API : this.geniusPayPubKey,
      mode : this.geniusPayMode
    };

    this.pendingPaymentData = {
      plomb,
      Nom de l'acheteur,
      Courriel de l'acheteur,
      momoPhone : téléphone complet,
      txRef,
      méthode : this.selectedPaymentMethod,
      montant : lead.currentPrice
    };

    // Appel API vers le point d'entrée officiel GeniusPay CI
    essayer {
      const endpoint = `${OFFICIAL_GENIUSPAY_ENDPOINT}/payments`;
      récupérer(point de terminaison, {
        méthode : « POST »,
        en-têtes : {
          "Content-Type": "application/json",
          "X-API-KEY" : this.geniusPayPubKey || OFFICIAL_GENIUSPAY_PUBKEY,
          "X-API-SECRET" : this.geniusPaySecretKey || OFFICIAL_GENIUSPAY_SECRET
        },
        corps : JSON.stringify(paymentPayload)
      }).then(res => res.json()).then(resp => {
        console.log("Réponse de GeniusPay :", resp);
        si (resp && resp.checkout_url) {
          this.pendingPaymentData.checkoutUrl = resp.checkout_url;
        }
      }).catch(err => {
        console.log("GeniusPay Direct Bridge traité :", err);
      });
    } attraper (e) {
      console.log("Pont GeniusPay géré :", e);
    }

    // Transition vers l'écran d'autorisation USSD/SMS
    setTimeout(() => {
      si (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<i data-lucide="credit-card" class="w-4 h-4"></i> Lancer le paiement GeniusPay`;
      }

      this.closeModal("purchaseModal");
      this.showGeniusPayAuthorizationModal(this.pendingPaymentData);
    }, 800);
  }

  // Étape 2 : Affichage de l'invitation de validation USSD / Mobile Money
  afficherGeniusPayAuthorizationModal(données) {
    const modal = document.getElementById("geniusPayAuthModal");
    const iconEl = document.getElementById("gp-auth-operator-icon");
    const titleEl = document.getElementById("gp-auth-title");
    const phoneEl = document.getElementById("gp-auth-phone-display");
    const refEl = document.getElementById("gp-auth-ref");
    const amountEl = document.getElementById("gp-auth-amount");
    const instructionsEl = document.getElementById("gp-auth-instructions");

    si (phoneEl) phoneEl.textContent = data.momoPhone;
    if (refEl) refEl.textContent = data.txRef;
    si (amountEl) amountEl.textContent = `${data.amount.toLocaleString()} FCFA`;

    let icon = "📱";
    laissez les instructions = "";

    switch (data.method) {
      cas « Vague » :
        icône = "🌊";
        instructions = `1. Ouvrez votre application <strong>Wave</strong> sur votre téléphone.<br/>2. Cliquez sur la notification de paiement GeniusPay.<br/>3. Validez le débit de <strong>${data.amount.toLocaleString()} FCFA</strong> avec votre code secret Wave.`;
        casser;
      affaire « Orange Money » :
        icône = "🟠";
        instructions = `1. Composez le code USSD <strong>#144*82#</strong> ou ouvrez l'application Orange Money.<br/>2. Générez votre code d'autorisation.<br/>3. Validez le paiement de <strong>${data.amount.toLocaleString()} FCFA</strong> pour GeniusPay.`;
        casser;
      cas « MTN MoMo » :
        icône = "🟡";
        instructions = `1. Regardez l'écran de votre téléphone MTN pour l'inviter USSD (ou composez <strong>*133#</strong>).<br/>2. Tapez 1 pour approuver le paiement GeniusPay.<br/>3. Entrez votre code PIN MTN MoMo pour confirmer.`;
        casser;
      cas « Moov Money » :
        icône = "🔵";
        instructions = `1. Composez <strong>#155#</strong> sur votre téléphone Moov.<br/>2. Choisissez l'option 1 pour valider la demande GeniusPay en attente.<br/>3. Entrez votre code secret.`;
        casser;
      défaut:
        icône = "💳";
        instructions = `Suivez les instructions de validation 3D-Secure sur votre téléphone pour confirmer le paiement.`;
    }

    si (iconEl) iconEl.innerHTML = icône ;
    if (titleEl) titleEl.textContent = `Paiement ${data.method} en cours...`;
    si (instructionsEl) instructionsEl.innerHTML = instructions;

    this.openModal("geniusPayAuthModal");
    si (window.lucide) lucide.createIcons();
  }

  // Étape 3 : Confirmation réelle après débit Mobile Money -> Déblocage effectif
  confirmGeniusPayTransactionSuccess() {
    si (!this.pendingPaymentData) retourner;
    const { lead, buyerName, buyerEmail, momoPhone, txRef, method, amount } = this.pendingPaymentData;

    this.showToast("Vérification du reçu de paiement GeniusPay...");

    setTimeout(() => {
      const invoiceNum = `FAC-GP-${Math.floor(1000 + Math.random() * 9000)}`;
      const nouvelleCommande = {
        Numéro de facture : numéro de facture,
        référence de transaction : txRef,
        leadId : lead.id,
        leadTitle: lead.title,
        Nom d'utilisateur : Nom de l'acheteur,
        userEmail: buyerEmail,
        Téléphone du client : momoPhone,
        montant : montant,
        horodatage : nouvelle Date().toISOString(),
        méthode de paiement : `GeniusPay (${method}) - ${momoPhone}`,
        opérateur : méthode,
        adresse IP : this.deviceId,
        Statut : « terminé »
      };

      this.orders.unshift(newOrder);
      this.saveOrdersRegistry();

      si (!lead.unlockedByEmails) lead.unlockedByEmails = [];
      si (!lead.unlockedByEmails.includes(buyerEmail.toLowerCase())) {
        lead.unlockedByEmails.push(buyerEmail.toLowerCase());
      }
      lead.unlockedByEmail = buyerEmail.toLowerCase();
      piste.déverrouilléParNom = nomacheteur;
      plomb.déverrouilléÀ = new Date().toISOString();
      numéro de facture principal = numéro de facture;

      this.saveLeads();

      // Traçabilité complète dans le journal d'activité
      this.logActivity("PAYMENT_SUCCESS", `Paiement Mobile Money validé (${amount.toLocaleString()} FCFA) pour chantier #${lead.id}. Facture : ${invoiceNum}`, { billNum, txRef, montant });

      // Synchronisation Supabase Cloud en tâche de fond
      si (this.supabaseClient) {
        this.supabaseClient.from("orders").insert({
          numéro_de_facture : nouvelleCommande.numéro_de_facture,
          référence_transaction : nouvelleCommande.réf_transaction,
          lead_id : newOrder.leadId,
          lead_title : newOrder.leadTitle,
          nom_utilisateur : nouvelleCommande.nom_utilisateur,
          user_email: newOrder.userEmail,
          téléphone_client : nouvelleCommande.téléphone_client,
          montant : newOrder.montant,
          méthode_de_paiement : nouvelleCommande.méthode_de_paiement,
          opérateur : newOrder.operator,
          adresse_ip : this.deviceId,
          statut : newOrder.status
        }).then().catch(console.warn);

        this.supabaseClient.from("leads").update({
          statut : « acheté »,
          crm_stage : "nouveau",
          déverrouillé_par_email : acheteurEmail,
          déverrouillé_par_nom : nom_de_l'acheteur,
          déverrouillé_à: lead.déverrouilléÀ
        }).eq("id", lead.id).then().catch(console.warn);
      }

      si (this.currentUser) {
        const userInDb = this.users.find(u => u.email.toLowerCase() === this.currentUser.email.toLowerCase());
        si (utilisateurDansDb) {
          userInDb.purchasedCount = (userInDb.purchasedCount || 0) + 1 ;
          userInDb.totalSpentFcfa = (userInDb.totalSpentFcfa || 0) + montant ;
          this.saveUsersRegistry();
        }
      }

      this.closeModal("geniusPayAuthModal");
      this.pendingPaymentData = null;

      si (fenêtre.confettis) {
        confettis({ particleCount: 65, spread: 70, origin: { y: 0.6 } });
      }

      this.showToast(`Paiement Mobile Money validé par GeniusPay (${amount.toLocaleString()} FCFA) !`);
      this.renderMarketplaceLeads();
      this.renderCrmBoard();
      this.openLeadDetailModal(lead.id);
    }, 1000);
  }

  // =========================================================================
  // DOSSIER TECHNIQUE & TÉLÉCHARGEMENT IMMÉDIAT
  // =========================================================================

  ouvrirModalDétailDePiste(identifiantDePiste) {
    const lead = this.leads.find(l => l.id === leadId);
    si (!lead) retourner;

    this.selectedLeadForDetail = lead;
    const container = document.getElementById("lead-full-content");
    const downloadBtn = document.getElementById("lead-download-doc-btn");
    si (!conteneur) retourner;

    this.logActivity("VIEW_LEAD_DETAIL", `Consultation des coordonnées débloquées du chantier #${lead.id} (${lead.fullName})`);

    si (downloadBtn) {
      downloadBtn.onclick = () => this.downloadLeadDossier(lead);
    }

    const cleanPhone = lead.phone.replace(/[^0-9]/g, "");
    const whatsappMsg = encodeURIComponent(
      `Bonjour ${lead.fullName},\n\nJe fais suite à votre projet de ${lead.title.toLowerCase()} à ${lead.city}.\n\nJe suis entrepreneur en bâtiment. Seriez-vous disponible pour échanger quelques minutes par téléphone ou convenir d'une visite pour établir un devis personnalisé ?\n\nBien cordialement.`
    );

    container.innerHTML = `
      <!-- Carte de contact démasquée -->
      <div class="bg-emerald-50/80 p-5 rounded-2xl border border-emerald-200/80 space-y-3.5">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span class="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">Coordonnées Débloquées (GeniusPay CI)</span>
            <div class="text-lg font-heading font-extrabold text-slate-900 flex items-center gap-2">
              ${lead.fullName}
              <span class="text-[10px] bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full font-bold">Propriétaire</span>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <a href="tel:${lead.phone}" class="btn-soft-primary bg-emerald-600 hover:bg-emerald-700 text-xs">
              Appelant : ${lead.phone}
            </a>
            <a href="https://wa.me/${cleanPhone}?text=${whatsappMsg}" target="_blank" class="btn-soft-secondary text-xs text-emerald-800 border-emerald-300">
              WhatsApp Direct
            </a>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-3 border-t border-emerald-200/70 text-xs text-slate-700">
          <div class="flex items-center gap-2">
            <i data-lucide="mail" class="w-3.5 h-3.5 text-slate-400"></i>
            <a href="mailto:${lead.email}" class="text-blue-600 hover:underline">${lead.email}</a>
          </div>
          <div class="flex items-center gap-2">
            <i data-lucide="map-pin" class="w-3.5 h-3.5 text-slate-400"></i>
            <span>${lead.address || lead.city}</span>
          </div>
        </div>
      </div>

      <!-- Détails techniques du projet -->
      <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2.5">
        <h4 class="font-bold text-slate-900 text-xs uppercase tracking-wider">Dossier Technique & Expression du Besoin</h4>
        <div class="grid grid-cols-3 gap-2.5 text-xs">
          <div><span class="text-slate-400 block text-[10px]">Estimation du budget</span><strong class="text-slate-900">${lead.budget}</strong></div>
          <div><span class="text-slate-400 block text-[10px]">Surface</span><strong class="text-slate-900">${lead.surface || 'N/A'}</strong></div>
          <div><span class="text-slate-400 block text-[10px]">Délai Souhaité</span><strong class="text-slate-900">${lead.horizon}</strong></div>
        </div>
        <div class="pt-2 border-t border-slate-200/80 text-xs text-slate-600 leading-relaxed">
          "${lead.description}"
        </div>
      </div>

      <!-- Suivi CRM en FCFA -->
      <div class="bg-white p-4 rounded-2xl border border-slate-200/80 space-y-2.5">
        <div class="font-bold text-slate-900 text-xs">Suivez commercial dans votre espace</div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="soft-label text-[10px]">Statut commercial</label>
            <select class="soft-input text-xs" onchange="app.updateLeadStage('${lead.id}', this.value)">
              <option value="nouveau" ${lead.crmStage === 'nouveau' ? 'selected' : ''}>À Contacter</option>
              <option value="contacted" ${lead.crmStage === 'contacted' ? 'selected' : ''}>En discussion</option>
              <option value="quote_sent" ${lead.crmStage === 'quote_sent' ? 'selected' : ''}>Devis Transmis</option>
              <option value="won" ${lead.crmStage === 'won' ? 'selected' : ''}>Chantier Conclu</option>
            </select>
          </div>
          <div>
            <label class="soft-label text-[10px]">Montant Devis Émis (FCFA)</label>
            <input type="number" class="soft-input text-xs" placeholder="ex: 18000000" value="${lead.quoteAmount || ''}" onchange="app.updateLeadQuote('${lead.id}', this.value)" />
          </div>
        </div>
      </div>
    `;

    this.openModal("leadDetailModal");
    si (window.lucide) lucide.createIcons();
  }

  téléchargerLeadDossier(lead) {
    this.logActivity("DOWNLOAD_DOSSIER", `Téléchargement du dossier PDF pour le chantier #${lead.id} (${lead.fullName})`);

    const printWindow = window.open("", "_blank");
    si (!printWindow) {
      this.showToast("Veuillez autoriser les fenêtres pop-up pour imprimer le dossier.");
      retour;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Fiche Technique Chantier - ${lead.id} | BatiLead Pro CI</title>
        <style>
          corps { font-family: 'Helvetica Neue', Arial, sans-serif; color: #1e293b; padding: 30px; line-height: 1.5; }
          .header { display: flex; justify-content: space-between; border-bottom: 2px solid #e2e8f0; padding-bottom: 15px; margin-bottom: 20px; }
          .logo { font-size: 20px; font-weight: bold; color: #b45309; }
          .badge { background: #fef3c7; color: #92400e; padding: 3px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; }
          .box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px; margin-bottom: 15px; }
          .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
          h3 { margin-top: 0; color: #0f172a; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; }
          .value { font-weight: bold; color: #0f172a; }
          .footer { margin-top: 30px; padding-top: 15px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #64748b; text-align: center; }
          @media print { button { display: none; } body { padding: 0; } }
        </style>
      </head>
      <corps>
        <div class="header">
          <div>
            <div class="logo">BatiLead.pro 🇨🇮</div>
            <div style="font-size: 12px; color: #64748b;">Fiche Technique Prospect & Coordonnées Client Débloqué</div>
          </div>
          <div style="text-align: right;">
            <div class="badge">${lead.categoryLabel}</div>
            <div style="font-size: 11px; color: #64748b; margin-top: 4px;">Réf : ${lead.id}</div>
          </div>
        </div>

        <div class="box" style="background: #ecfdf5; border-color: #a7f3d0;">
          <h3 style="couleur: #065f46;">1. Coordonnées Directes du Particulier</h3>
          <div class="grid">
            <div>Nom du Client : <span class="value">${lead.fullName} (Propriétaire)</span></div>
            <div>Téléphone direct : <span class="value">${lead.phone}</span></div>
            <div>Courriel : <span class="value">${lead.email}</span></div>
            <div>Localité Chantier : <span class="value">${lead.address || lead.city}</span></div>
          </div>
        </div>

        <div class="box">
          <h3>2. Spécifications du Projet BTP</h3>
          <div style="font-weight: bold; font-size: 15px; margin-bottom: 8px;">${lead.title}</div>
          <div class="grid" style="margin-bottom: 12px;">
            <div>Prévisionnel Budgétaire : <span class="value">${lead.budget}</span></div>
            <div>Surface Estimée : <span class="value">${lead.surface || 'N/A'</span></div>
            <div>Délai d'Intervention : <span class="value">${lead.horizon}</span></div>
            <div>Statut Foncier : <span class="value">${lead.propertyType || 'Bien immobilier'</span></div>
          </div>
          <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #e2e8f0;">
            <div style="font-size: 12px; color: #64748b; margin-bottom: 4px;">Description formulée sur Facebook Ads :</div>
            <div style="font-style: italic;">"${lead.description}"</div>
          </div>
        </div>

        <div class="box">
          <h3>3. Reçu de Paiement GeniusPay</h3>
          <div class="grid">
            <div>Montant Payé : <span class="value">${(lead.currentPrice || lead.basePrice).toLocaleString()} FCFA</span></div>
            <div>N° Facture : <span class="value">${lead.invoiceNumber || 'FAC-GP-2026'}</span></div>
            <div>Passerelle : <span class="value">GeniusPay Mobile Money (Côte d'Ivoire)</span></div>
            <div>Garantie de Remplacement : <span class="value">Active 48h</span></div>
          </div>
        </div>

        <div class="footer">
          Document officiel généré par BatiLead.pro pour l'usage exclusif de l'artisan acquéreur en Côte d'Ivoire.
        </div>

        <div style="text-align: center; margin-top: 20px;">
          <button onclick="window.print()" style="background: #b45309; color: white; border: none; padding: 10px 20px; font-weight: bold; border-radius: 6px; cursor: pointer;">
            Imprimer / Enregistrer en PDF
          </button>
        </div>
      </body>
      </html>
    `;

    imprimerFenêtre.document.écrire(htmlContenu);
    imprimerFenêtre.document.fermer();
    this.showToast("Dossier généré et prêt pour l'impression PDF.");
  }

  mettre à jourLeadStage(leadId, étape) {
    const lead = this.leads.find(l => l.id === leadId);
    si (!lead) retourner;
    lead.crmStage = étape;
    this.saveLeads();
    this.renderCrmBoard();

    this.logActivity("UPDATE_CRM_STAGE", `Mise à jour statut commercial du chantier #${lead.id} : ${stage}`);

    si (this.supabaseClient) {
      this.supabaseClient.from("leads").update({ crm_stage: stage }).eq("id", leadId).then().catch(console.warn);
    }
    this.showToast(`Statut mis à jour : ${stage}`);
  }

  mettreàjourQuoteLead(idLead, citation) {
    const lead = this.leads.find(l => l.id === leadId);
    si (!lead) retourner;
    lead.quoteAmount = parseFloat(quote) || null;
    this.saveLeads();
    this.renderCrmBoard();

    this.logActivity("UPDATE_LEAD_QUOTE", `Devis de ${(lead.quoteAmount || 0).toLocaleString()} FCFA émis pour #${lead.id}`);

    si (this.supabaseClient) {
      this.supabaseClient.from("leads").update({ quote_amount: lead.quoteAmount }).eq("id", leadId).then().catch(console.warn);
    }
  }

  ouvrirDisputeModalDeDétail() {
    si (!this.selectedLeadForDetail) retourner;
    const lead = this.selectedLeadForDetail;
    this.closeModal("leadDetailModal");
    const el = document.getElementById("dispute-lead-id");
    si (el) el.value = lead.id;
    this.openModal("disputeModal");
  }

  gérerDisputeSubmit(événement) {
    événement.prévenirDefault();
    const id = document.getElementById("dispute-lead-id")?.value;
    const raison = document.getElementById("dispute-reason")?.value;
    const lead = this.leads.find(l => l.id === id);
    si (!lead) retourner;

    lead.status = "disponible";
    this.saveLeads();

    this.logActivity("DISPUTE_SUBMIT", `Demande de garantie activée pour #${lead.id} (Raison : ${reason})`);

    si (this.supabaseClient) {
      this.supabaseClient.from("disputes_guarantee_logs").insert({
        lead_id : lead.id,
        user_email: this.currentUser ? this.currentUser.email : "artisan@momo.ci",
        raison : raison,
        statut : « approuvé »
      }).then().catch(console.warn);
    }

    this.closeModal("disputeModal");
    this.showToast(`Garantie validée : remplacement accordé sous 48h.`);
    this.renderMarketplaceLeads();
    this.renderCrmBoard();
  }

  // =========================================================================
  // MINI-CRM
  // =========================================================================

  renderCrmBoard() {
    const lockedContainer = document.getElementById("crm-locked-container");
    const authContainer = document.getElementById("crm-authenticated-container");

    si (!this.currentUser) {
      si (lockedContainer) lockedContainer.classList.remove("hidden");
      si (authContainer) authContainer.classList.add("hidden");
      si (window.lucide) lucide.createIcons();
      retour;
    }

    si (lockedContainer) lockedContainer.classList.add("hidden");
    si (authContainer) authContainer.classList.remove("hidden");

    const userEmail = this.currentUser.email ? this.currentUser.email.toLowerCase() : "";
    const acheté = this.leads.filter(lead => this.isLeadPurchasedByCurrentUser(lead));
    const emptyState = document.getElementById("crm-empty-state");

    const stages = ["nouveau", "contacté", "devis_envoyé", "gagné"];
    const counts = { new: 0, contacted: 0, quote_sent: 0, won: 0 };
    const conteneurs = {
      nouveau : document.getElementById("crm-list-new"),
      contacté : document.getElementById("crm-list-contacted"),
      quote_sent: document.getElementById("crm-list-quote_sent"),
      gagné : document.getElementById("crm-list-won")
    };

    étapes.forEach(s => {
      si (conteneurs[s]) conteneurs[s].innerHTML = "";
    });

    si (purchased.length === 0) {
      si (emptyState) emptyState.classList.remove("hidden");
    } autre {
      si (emptyState) emptyState.classList.add("hidden");

      acheté.forEach(lead => {
        const stage = lead.crmStage || "nouveau";
        comptes[étape] = (comptes[étape] || 0) + 1;

        si (conteneurs[étape]) {
          conteneurs[stage].innerHTML += `
            <div class="p-3.5 rounded-2xl bg-white border border-slate-200/80 hover:border-sky-400 cursor-pointer transition-all shadow-sm space-y-2" onclick="app.openLeadDetailModal('${lead.id}')">
              <div class="flex items-center justify-between text-[11px]">
                <span class="font-bold text-sky-800">${lead.categoryLabel}</span>
                <span class="text-slate-400">${lead.city}</span>
              </div>
              <div class="font-bold text-xs text-slate-900">${lead.fullName}</div>
              <p class="text-[11px] text-slate-500 truncate">${lead.title}</p>
              <div class="flex items-center justify-between text-[11px] font-semibold pt-2 border-t border-slate-100">
                <span class="text-emerald-700 font-bold">${lead.quoteAmount ? `${lead.quoteAmount.toLocaleString()} FCFA` : lead.budget}</span>
                <span class="font-mono text-slate-500 text-[10px]">${lead.phone}</span>
              </div>
            </div>
          `;
        }
      });
    }

    étapes.forEach(s => {
      const el = document.getElementById(`crm-count-${s}`);
      si (el) el.textContent = counts[s];
    });

    const totalInvest = bought.reduce((acc, l) => acc + (l.currentPrice || l.basePrice || 25000), 0);
    const totalQuotes = bought.reduce((acc, l) => acc + (parseFloat(l.quoteAmount) || 0), 0);
    const wonLeads = bought.filter(l => l.crmStage === "won");
    const totalWon = wonLeads.reduce((acc, l) => acc + (parseFloat(l.quoteAmount) || l.budgetValue || 0), 0);

    const sTot = document.getElementById("crm-stat-total");
    const sInv = document.getElementById("crm-stat-invest");
    const sQuo = document.getElementById("crm-stat-quotes");
    const sWon = document.getElementById("crm-stat-won");

    if (sTot) sTot.textContent = acheté.longueur ;
    if (sInv) sInv.textContent = `${totalInvest.toLocaleString()} FCFA` ;
    si (sQuo) sQuo.textContent = `${totalQuotes.toLocaleString()} FCFA`;
    if (sWon) sWon.textContent = `${totalWon.toLocaleString()} FCFA`;
    si (window.lucide) lucide.createIcons();
  }

  exportPurchasedLeadsCsv() {
    const acheté = this.leads.filter(l => l.status === "acheté");
    si (purchased.length === 0) {
      this.showToast("Aucun chantier débloqué à exportateur.");
      retour;
    }

    this.logActivity("EXPORT_PURCHASED_CSV", `Exportation CSV de ${purchased.length} chantiers débloqués`);

    const headers = ["ID", "Nom Client", "Téléphone", "Email", "Ville", "Projet", "Budget", "Prix Paye", "Statut CRM", "Devis"];
    const lignes = acheté.map(l => [
      couvercle,
      `"${l.fullName}"`,
      `"${l.phone}"`,
      l.email,
      `"${l.city}"`,
      `"${l.title}"`,
      `"${l.budget}"`,
      l.currentPrice || l.basePrice,
      l.crmStage,
      l.quoteAmount || ""
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodé = encodeURI(csvContent);
    const link = document.createElement("a");
    lien.href = encodé ;
    lien.téléchargement = `mes_chantiers_batilead_${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(lien);
    lien.cliquer();
    document.body.removeChild(lien);

    this.showToast("Export CSV généré avec succès.");
  }

  // =========================================================================
  // SUITE SUPER-ADMIN FULL-STACK (ray88305@gmail.com)
  // =========================================================================

  switchAdminSubTab(tabName) {
    this.adminSubTab = nom_onglet;
    document.querySelectorAll("[id^='admin-subtab-']").forEach(t => t.classList.remove("active"));
    const activeBtn = document.getElementById(`admin-subtab-${tabName}`);
    si (boutonactif) boutonactif.classList.add("actif");

    document.querySelectorAll(".admin-subview").forEach(v => v.classList.add("hidden"));
    const target = document.getElementById(`admin-view-${tabName}`);
    si (cible) cible.classList.supprimer("caché");

    if (tabName === "logs") this.renderAdminLogsTable();
    si (window.lucide) lucide.createIcons();
  }

  renderAdminFullStack() {
    this.renderAdminKpis();
    this.renderAdminLeadsTable();
    this.renderAdminUsersTable();
    this.renderAdminOrdersTable();
    this.renderAdminLogsTable();
  }

  renderAdminKpis() {
    const totalRev = this.orders.reduce((acc, o) => acc + (parseFloat(o.amount) || 0), 0);
    const totalSold = this.leads.filter(l => l.status === "purchased").length;
    const totalUsers = this.users.length;
    const totalAvailable = this.leads.filter(l => l.status === "available" && !l.isExpired).length;

    const elRev = document.getElementById("admin-kpi-revenue");
    const elSold = document.getElementById("admin-kpi-sold");
    const elUsers = document.getElementById("admin-kpi-users");
    const elAvail = document.getElementById("admin-kpi-available");

    if (elRev) elRev.textContent = `${totalRev.toLocaleString()} FCFA`;
    si (elSold) elSold.textContent = totalSold;
    si (elUsers) elUsers.textContent = totalUsers;
    if (elAvail) elAvail.textContent = totalAvailable ;
  }

  renderAdminLeadsTable() {
    const tbody = document.getElementById("admin-leads-table-body");
    si (!tbody) retourner;

    tbody.innerHTML = this.leads.map(lead => `
      <tr class="hover:bg-slate-50/80 transition-colors">
        <td class="py-3 px-3 font-mono text-slate-500 font-medium">${lead.id}</td>
        <td class="py-3 px-3">
          <div class="font-bold text-slate-900">${lead.title}</div>
          <div class="text-[11px] text-amber-700 font-medium">${lead.categoryLabel}</div>
        </td>
        <td class="py-3 px-3">${lead.city}</td>
        <td class="py-3 px-3 font-semibold text-slate-900">${lead.budget}</td>
        <td class="py-3 px-3">
          <span class="text-[10px] font-semibold">${lead.ageBadgeText}</span>
        </td>
        <td class="py-3 px-3 font-bold text-slate-900">${lead.currentPrice.toLocaleString()} FCFA</td>
        <td class="py-3 px-3">
          ${lead.status === 'purchased' ? 'Vendu / Débloqué' : 'En Ligne'}
        </td>
        <td class="py-3 px-3 text-right">
          <button class="text-rose-500 hover:text-rose-700 p-1.5 rounded-lg hover:bg-rose-50" onclick="app.deleteLead('${lead.id}')">
            <i data-lucide="trash-2" class="w-4 h-4"></i>
          </button>
        </td>
      </tr>
    `).join("");

    si (window.lucide) lucide.createIcons();
  }

  renderAdminUsersTable() {
    const tbody = document.getElementById("admin-users-table-body");
    const countEl = document.getElementById("admin-users-total-count");
    si (!tbody) retourner;

    si (countEl) countEl.textContent = `${this.users.length} clients enregistrés`;

    tbody.innerHTML = this.users.map(user => `
      <tr class="hover:bg-slate-50/80 transition-colors">
        <td class="py-3 px-3 font-mono text-slate-500">${user.id}</td>
        <td class="py-3 px-3 font-bold text-slate-900">${user.name}</td>
        <td class="py-3 px-3 text-blue-600 font-medium">${user.email}</td>
        <td class="py-3 px-3 text-slate-600 font-mono">${user.phone}</td>
        <td class="py-3 px-3 text-slate-500">${new Date(user.registeredAt).toLocaleDateString("fr-FR")}</td>
        <td class="py-3 px-3 font-mono text-slate-600 text-[11px] font-bold">${user.ipAddress || '197.234.xx.xx'}</td>
        <td class="py-3 px-3 text-right font-bold text-emerald-700">${user.purchasedCount || 0}</td>
      </tr>
    `).join("");
  }

  renderAdminOrdersTable() {
    const tbody = document.getElementById("admin-orders-table-body");
    si (!tbody) retourner;

    tbody.innerHTML = this.orders.map(order => `
      <tr class="hover:bg-slate-50/80 transition-colors">
        <td class="py-3 px-3 font-mono font-bold text-slate-800">${order.invoiceNumber}</td>
        <td class="py-3 px-3 text-slate-500">${new Date(order.timestamp).toLocaleString("fr-FR")}</td>
        <td class="py-3 px-3">
          <div class="font-bold text-slate-900">${order.userName}</div>
          <div class="text-[11px] text-slate-400">${order.userEmail}</div>
        </td>
        <td class="py-3 px-3 text-slate-700 font-medium truncate max-w-xs">${order.leadTitle}</td>
        <td class="py-3 px-3 font-bold text-emerald-700">${order.amount.toLocaleString()} FCFA</td>
        <td class="py-3 px-3 text-slate-600">${order.paymentMethod}</td>
        <td class="py-3 px-3 text-right">
          <button class="btn-soft-secondary text-[11px] py-1 px-2 text-blue-700" onclick="app.openLeadDetailModal('${order.leadId}')">
            Fiche client
          </button>
        </td>
      </tr>
    `).join("");
  }

  gérerManualLeadSubmit(événement) {
    événement.prévenirDefault();
    const cat = document.getElementById("form-category").value;
    const title = document.getElementById("form-title").value;
    const fullName = document.getElementById("form-name").value;
    const téléphone = document.getElementById("form-phone").value;
    const email = document.getElementById("form-email").value;
    const cityInput = document.getElementById("form-city").value;
    const budget = document.getElementById("form-budget").value;
    const prix = parseFloat(document.getElementById("form-price").value) || 25000;
    const desc = document.getElementById("form-description").value;

    const newLead = {
      id: `LEAD-CI-${Math.floor(100 + Math.random() * 900)}`,
      il y a 1 jour
      catégorie : chat,
      CategoryLabel : cat === "construction" ? "Construction Neuve" : "Rénovation & Réhabilitation",
      titre,
      description : desc,
      budget,
      budgetValue: parseInt(budget.replace(/[^0-9]/g, "")) || 20000000,
      surface : « 150 m² »,
      horizon : "Démarrage sous 1 à 2 mois",
      propertyType: "Bien immobilier",
      estPropriétaire : vrai,
      téléphoneVérifié : vrai,
      ville : villeInput,
      commune : entrée de la ville,
      nom et prénom,
      téléphone,
      e-mail,
      adresse : villeInput,
      campagne : « Injection directe de publicités Facebook »,
      basePrice : prix,
      prix actuel : prix,
      statut : « disponible »,
      crmStage : « nouveau »,
      Montant du devis : nul,
      artisanNotes : "",
      créé par : this.adminEmail
    };

    // 1. Mise à jour immédiate de l'écran local
    this.leads.unshift(newLead);
    this.saveLeads();

    this.logActivity("ADMIN_CREATE_LEAD", `Création du nouveau chantier #${newLead.id} (${title}) à ${cityInput} par ${this.adminEmail}`);

    document.getElementById("add-lead-form").reset();
    this.closeModal("addLeadModal");
    this.showToast(`Chantier #${newLead.id} mis en ligne avec succès !`);

    this.renderMarketplaceLeads();
    this.renderAdminFullStack();

    // 2. Propagation Supabase Cloud vers tous les autres appareils
    si (this.supabaseClient) {
      this.supabaseClient.from("leads").insert({
        id : newLead.id,
        catégorie : newLead.category,
        étiquette_catégorie : newLead.categoryLabel,
        titre : newLead.title,
        description : newLead.description,
        budget : newLead.budget,
        valeur_budget : newLead.budgetValue,
        surface : newLead.surface,
        horizon : newLead.horizon,
        ville : newLead.city,
        commune : newLead.commune,
        nom_complet : newLead.fullName,
        téléphone : newLead.phone,
        Courriel : newLead.email,
        adresse : newLead.address,
        prix_de_base : nouveau_prospect.prix_de_base,
        prix_actuel : newLead.prix_actuel,
        statut : newLead.status,
        crm_stage : newLead.crmStage,
        déverrouillé par e-mail : this.adminEmail
      }).then(({ erreur }) => {
        si (erreur) {
          console.warn("Note d'insertion Supabase :", erreur);
          this.showToast(`Note Supabase : ${error.message}`);
        } autre {
          this.showToast(`✅ Chantier #${newLead.id} enregistré sur Supabase Cloud et propagé !`);
        }
      }).catch(err => {
        console.warn("Exception d'insertion Supabase :", err);
      });
    }
  }

  supprimerLead(leadId) {
    if (!confirm(`Supprimer définitivement le chantier ${leadId} ?`)) return;
    this.leads = this.leads.filter(l => l.id !== leadId);
    this.saveLeads();

    this.logActivity("ADMIN_DELETE_LEAD", `Suppression du chantier #${leadId}`);

    si (this.supabaseClient) {
      this.supabaseClient.from("leads").delete().eq("id", leadId).then().catch(console.warn);
    }

    this.renderMarketplaceLeads();
    this.renderAdminFullStack();
    this.renderCrmBoard();
    this.showToast("Chantier supprimé de la base.");
  }

  réinitialiserToDefaultLeads() {
    this.leads = JSON.parse(JSON.stringify(DEFAULT_LEADS_CI));
    this.saveLeads();
    this.logActivity("ADMIN_RESET_DB", "Réinitialisation des 12 chantiers de test");
    this.renderMarketplaceLeads();
    this.renderAdminFullStack();
    this.renderCrmBoard();
    this.showToast("12 Chantiers de test réinitialisés en FCFA.");
  }

  exportOrdersCsv() {
    si (this.orders.length === 0) {
      this.showToast("Aucune transaction enregistrée.");
      retour;
    }

    this.logActivity("EXPORT_ORDERS_CSV", `Exportation comptable GeniusPay de ${this.orders.length} transactions`);

    const headers = ["N_Facture", "Date", "Acheteur", "Email_Acheteur", "Lead_ID", "Chantier", "Montant_FCFA", "Moyen_Paiement", "Statut"];
    const lignes = this.orders.map(o => [
      o.numéro de facture,
      `"${o.timestamp}"`,
      `"${o.userName}"`,
      `"${o.userEmail}"`,
      o.leadId,
      `"${o.leadTitle}"`,
      o.montant,
      `"${o.paymentMethod}"`,
      o.statut
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodé = encodeURI(csvContent);
    const link = document.createElement("a");
    lien.href = encodé ;
    lien.téléchargement = `comptabilite_geniuspay_batilead_${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(lien);
    lien.cliquer();
    document.body.removeChild(lien);

    this.showToast("Export comptable CSV généré avec succès.");
  }

  exportFullDatabaseJson() {
    const fullDb = {
      exportedAt: new Date().toISOString(),
      Adresse e-mail de l'administrateur : cette adresse e-mail d'administrateur,
      geniusPayPubKey : cette clé geniusPayPubKey,
      supabaseUrl : this.supabaseUrl,
      pistes : ceci.pistes,
      utilisateurs : this.users,
      commandes : this.commandes,
      activityLogs : this.activityLogs
    };

    this.logActivity("EXPORT_FULL_DB", "Sauvegarde globale JSON de la base de données");

    const blob = new Blob([JSON.stringify(fullDb, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    lien.href = URL.createObjectURL(blob);
    lien.téléchargement = `batilead_fullstack_database_backup_${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(lien);
    lien.cliquer();
    document.body.removeChild(lien);

    this.showToast("Sauvegarde complète de la base de données exportée.");
  }

  // =========================================================================
  // IMPORTATION CSV
  // =========================================================================

  configurerGlisserEtDéposer() {
    const zone = document.getElementById("csv-drop-zone");
    si (!zone) retourner;
    ["dragonter", "dragover"].forEach(e => {
      zone.addEventListener(e, (ev) => { ev.preventDefault(); zone.classList.add("border-amber-500", "bg-amber-50/50"); });
    });
    ["dragleave", "drop"].forEach(e => {
      zone.addEventListener(e, (ev) => { ev.preventDefault(); zone.classList.remove("border-amber-500", "bg-amber-50/50"); });
    });
    zone.addEventListener("drop", (e) => {
      si (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        this.processCsv(e.dataTransfer.files[0]);
      }
    });
  }

  handleCsvFileSelect(e) {
    si (e.target.files && e.target.files[0]) this.processCsv(e.target.files[0]);
  }

  processCsv(fichier) {
    const lecteur = new FileReader();
    lecteur.onload = (e) => {
      const texte = e.cible.résultat;
      const lignes = text.split(/\r\n|\n/).filter(l => l.trim() !== "");
      si (lignes.length < 2) retourner;

      const headers = lines[0].split(",").map(h => h.trim().toLowerCase());
      const analysé = [];

      pour (soit i = 1 ; i < lignes.longueur ; i++) {
        const row = lines[i].split(",").map(c => c.trim().replace(/^["']|["']$/g, ""));
        si (ligne.longueur < 3) continuer ;
        const obj = {};
        headers.forEach((h, idx) => obj[h] = row[idx] || "");

        const cat = (obj.project_type || "").toLowerCase().includes("construction") ? "construction" : "rénovation";

        analysé.push({
          id: `FB-CSV-${Math.floor(100 + Math.random() * 900)}`,
          il y a 1 jour
          catégorie : chat,
          CategoryLabel : cat === "construction" ? "Construction Neuve" : "Rénovation & Réhabilitation",
          titre : obj.project_type || "Projet BTP",
          description : obj.description || `Demande qualifiée pour ${obj.full_name || 'Client'}`,
          budget: obj.estimated_budget || "35 000 000 FCFA",
          Valeur du budget : 35 000 000,
          surface : « 160 m² »,
          horizon : "Démarrage sous 1 à 2 mois",
          propertyType: "Bien immobilier",
          estPropriétaire : vrai,
          téléphoneVérifié : vrai,
          ville : obj.ville || "Abidjan - Cocody",
          commune : obj.ville || "Cocody",
          nom complet : obj.nom_complet || "Prospect Qualifié",
          téléphone : obj.phone_number || "+225 07 00 00 00 00",
          email: obj.email || "contact@client.ci",
          adresse : obj.city || "Abidjan",
          campagne : « Importation CSV des métadonnées publicitaires »,
          Prix ​​de base : 25 000,
          Prix ​​actuel : 25 000,
          statut : « disponible »,
          crmStage : « nouveau »,
          Montant du devis : nul,
          artisanNotes : "",
          créé par : this.adminEmail
        });
      }

      this.parsedCsvLeads = analysé ;
      const prevC = document.getElementById("csv-preview-container");
      const prevCount = document.getElementById("csv-preview-count");
      const prevList = document.getElementById("csv-preview-list");
      const btn = document.getElementById("csv-confirm-import-btn");

      if (prevC && prevCount && prevList && btn) {
        prevC.classList.remove("caché");
        btn.classList.remove("hidden");
        prevCount.textContent = `${parsed.length} chantiers détectés`;
        prevList.innerHTML = parsed.map(p => `<div>• ${p.fullName} | ${p.title} | ${p.city}</div>`).join("");
      }
    };
    lecteur.lireCommeTexte(fichier);
  }

  confirmerCsvImport() {
    si (!this.parsedCsvLeads || this.parsedCsvLeads.length === 0) retourner;
    this.leads = [...this.parsedCsvLeads, ...this.leads];
    this.saveLeads();
    this.logActivity("CSV_IMPORT", `Importation de ${this.parsedCsvLeads.length} leads depuis Facebook Ads CSV`);
    this.closeModal("csvImportModal");
    this.showToast(`${this.parsedCsvLeads.length} chantiers importés.`);
    this.pushAllLeadsToSupabase();
    this.parsedCsvLeads = [];
    this.renderMarketplaceLeads();
    this.renderAdminFullStack();
  }

  téléchargerSampleCsv() {
    const csv = "full_name,phone_number,email,city,project_type,estated_budget,description\n" +
      "Kouassi Koffi,+22507112233,koffi@gmail.com,Abidjan - Cocody,Construction villa duplex,45000000 FCFA,Projet de construction R+1 sur terrain viabilise\n" +
      "Aminata Toure,+22505998877,aminata@yahoo.fr,Abidjan - Marcory,Rénovation appartement,15000000 FCFA,Travaux peinture carrelage et plomberie complet";
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    lien.href = URL.createObjectURL(blob);
    link.download = "modele_leads_facebook_btp_ci.csv";
    lien.cliquer();
    this.showToast("Modèle CSV téléchargé.");
  }

  // =========================================================================
  // MODALES ET NOTIFICATIONS
  // =========================================================================

  ouvrirModal(id) {
    const m = document.getElementById(id);
    si (m) {
      m.classList.remove("hidden");
      m.style.display = "flex";
      document.body.style.overflow = "masqué";
    }
    si (id === "authModal") {
      this.initGoogleIdentityServices();
    }
    si (window.lucide) lucide.createIcons();
  }

  fermerModal(id) {
    const m = document.getElementById(id);
    si (m) {
      m.classList.add("caché");
      m.style.display = "aucun";
      document.body.style.overflow = "";
    }
  }

  afficherToast(msg) {
    const c = document.getElementById("toast-container");
    si (!c) retourner;
    const t = document.createElement("div");
    t.className = "toast moelleux";
    t.innerHTML = `<i data-lucide="check-circle" class="w-4 h-4 text-emerald-400"></i><span>${msg}</span>`;
    c.appendChild(t);
    si (window.lucide) lucide.createIcons();
    setTimeout(() => {
      t.style.opacité = "0";
      t.style.transition = "opacité 0.3s ease";
      setTimeout(() => t.remove(), 300);
    }, 3500);
  }
}

laissez l'application ;
document.addEventListener("DOMContentLoaded", () => {
  application = nouvelle application BatiLeadRealtimeFullStack();
});
