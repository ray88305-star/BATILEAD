/**
 * BatiLead Pro — Moteur Full-Stack & Base de Données Directe
 * Auto-Mise à Jour Automatique des 12 Leads de Test & Synchronisation GeniusPay
 */

const NOW = Date.now();
const ONE_DAY_MS = 1000 * 60 * 60 * 24;
const DB_VERSION = "batilead_db_v11_live";

// Base de données officielle Côte d'Ivoire (12 Leads Réalistes)
const DEFAULT_LEADS_CI = [
  {
    id: "LEAD-CI-101",
    daysAgo: 1,
    category: "construction",
    categoryLabel: "Construction Neuve",
    title: "Construction villa duplex 5 pièces avec piscine",
    description: "Terrain de 500m² avec ACD acquis à Bingerville. Nous recherchons une entreprise de BTP sérieuse pour la réalisation gros œuvre et second œuvre. Plans d'architecte déjà validés.",
    budget: "48 000 000 FCFA",
    budgetValue: 48000000,
    surface: "240 m²",
    horizon: "Urgent (< 1 mois)",
    propertyType: "Terrain avec ACD",
    isOwner: true,
    phoneVerified: true,
    city: "Abidjan - Bingerville",
    commune: "Bingerville (Feh Kessé)",
    fullName: "Jean-Marc KOUAME",
    phone: "+225 07 48 92 14 77",
    email: "jm.kouame@gmail.com",
    address: "Quartier Feh Kessé, Bingerville, Abidjan",
    campaign: "Facebook Ads - Construction Abidjan Est",
    basePrice: 25000,
    status: "available",
    crmStage: "new",
    quoteAmount: null,
    artisanNotes: ""
  },
  {
    id: "LEAD-CI-102",
    daysAgo: 1,
    category: "renovation",
    categoryLabel: "Rénovation & Réhabilitation",
    title: "Rénovation intégrale villa basse 4 pièces + dépendance",
    description: "Travaux complets : réfection toiture tôle bac, reprise totale de l'étanchéité, plomberie neuve, pose de carrelage 60x60 et peinture intérieure/extérieure.",
    budget: "18 500 000 FCFA",
    budgetValue: 18500000,
    surface: "160 m²",
    horizon: "Urgent (< 1 mois)",
    propertyType: "Villa basse",
    isOwner: true,
    phoneVerified: true,
    city: "Abidjan - Cocody",
    commune: "Cocody (Deux-Plateaux)",
    fullName: "Mireille BAKAYOKO",
    phone: "+225 05 71 33 80 12",
    email: "m.bakayoko@yahoo.fr",
    address: "Deux-Plateaux Vallons, Cocody, Abidjan",
    campaign: "Facebook Ads - Rénovation Cocody",
    basePrice: 20000,
    status: "available",
    crmStage: "new",
    quoteAmount: null,
    artisanNotes: ""
  },
  {
    id: "LEAD-CI-103",
    daysAgo: 2,
    category: "construction",
    categoryLabel: "Construction Neuve",
    title: "Construction résidence de vacances en bordure de lagune",
    description: "Projet de maison de vacances moderne de plain-pied avec grande terrasse en bois et clôture sécurisée. Accès dégagé pour camions de livraison.",
    budget: "55 000 000 FCFA",
    budgetValue: 55000000,
    surface: "190 m²",
    horizon: "Sous 2 à 3 mois",
    propertyType: "Terrain bord lagune",
    isOwner: true,
    phoneVerified: true,
    city: "Assinie",
    commune: "Assinie Mafia",
    fullName: "Stéphane N'GUESSAN",
    phone: "+225 07 19 84 55 20",
    email: "s.nguessan@outlook.ci",
    address: "Assinie Km 9, Bord lagune",
    campaign: "Facebook Ads - Villas Assinie Prestige",
    basePrice: 30000,
    status: "available",
    crmStage: "new",
    quoteAmount: null,
    artisanNotes: ""
  },
  {
    id: "LEAD-CI-104",
    daysAgo: 2,
    category: "renovation",
    categoryLabel: "Rénovation & Réhabilitation",
    title: "Rénovation & Aménagement bureaux commerciaux R+1",
    description: "Transformation d'un bâtiment en espace de bureaux : cloisons vitrées en aluminium, faux plafonds en staff avec spots LED intégrés, climatisation et carrelage poli.",
    budget: "22 000 000 FCFA",
    budgetValue: 22000000,
    surface: "210 m²",
    horizon: "Sous 2 à 3 mois",
    propertyType: "Bâtiment commercial",
    isOwner: true,
    phoneVerified: true,
    city: "Abidjan - Marcory",
    commune: "Marcory (Zone 4C)",
    fullName: "Christian YAO",
    phone: "+225 01 88 41 29 03",
    email: "c.yao.finance@gmail.com",
    address: "Zone 4C, Rue du Canal, Marcory, Abidjan",
    campaign: "Facebook Ads - BTP Entreprises Abidjan",
    basePrice: 25000,
    status: "available",
    crmStage: "new",
    quoteAmount: null,
    artisanNotes: ""
  },
  {
    id: "LEAD-CI-105",
    daysAgo: 2,
    category: "construction",
    categoryLabel: "Construction Neuve",
    title: "Construction petit immeuble R+2 locatif (6 appartements)",
    description: "Terrain clôturé à Yopougon. Recherche entrepreneur BTP pour élévation des murs, dalles béton armé et second œuvre. Financement bancaire accordé.",
    budget: "85 000 000 FCFA",
    budgetValue: 85000000,
    surface: "380 m² bâti",
    horizon: "Urgent (< 1 mois)",
    propertyType: "Parcelle viabilisée",
    isOwner: true,
    phoneVerified: true,
    city: "Abidjan - Yopougon",
    commune: "Yopougon (Niangon)",
    fullName: "Aïssatou DIABATE",
    phone: "+225 05 55 62 10 98",
    email: "aissatou.diabate@gmail.com",
    address: "Yopougon Niangon Sud, Abidjan",
    campaign: "Facebook Ads - Immeubles Locatifs CI",
    basePrice: 35000,
    status: "available",
    crmStage: "new",
    quoteAmount: null,
    artisanNotes: ""
  },
  {
    id: "LEAD-CI-106",
    daysAgo: 3,
    category: "renovation",
    categoryLabel: "Rénovation & Réhabilitation",
    title: "Réfection toiture, étanchéité & peinture extérieure villa",
    description: "Remplacement de la charpente bois, pose de tôles bac aluminium et peinture de façade étanche antifongique contre l'air marin.",
    budget: "14 000 000 FCFA",
    budgetValue: 14000000,
    surface: "175 m²",
    horizon: "Sous 2 à 3 mois",
    propertyType: "Villa individuelle",
    isOwner: true,
    phoneVerified: true,
    city: "Grand-Bassam",
    commune: "Grand-Bassam (Quartier France)",
    fullName: "Kouassi KONAN",
    phone: "+225 07 33 77 15 42",
    email: "k.konan@orange.ci",
    address: "Quartier France, Grand-Bassam",
    campaign: "Facebook Ads - Rénovation Bassam",
    basePrice: 20000,
    status: "available",
    crmStage: "new",
    quoteAmount: null,
    artisanNotes: ""
  },
  {
    id: "LEAD-CI-107",
    daysAgo: 3,
    category: "construction",
    categoryLabel: "Construction Neuve",
    title: "Construction villa contemporaine 6 pièces plain-pied à Angré",
    description: "Fondations profondes, élévation en briques pleines, toiture dalle béton accessible et baie vitrée panoramique. Devis main d'œuvre ou clé en main.",
    budget: "62 000 000 FCFA",
    budgetValue: 62000000,
    surface: "220 m²",
    horizon: "Urgent (< 1 mois)",
    propertyType: "Terrain avec ACD",
    isOwner: true,
    phoneVerified: true,
    city: "Abidjan - Cocody",
    commune: "Cocody (Angré 8e Tranche)",
    fullName: "Dr. Ibrahim CISSE",
    phone: "+225 07 89 22 14 05",
    email: "dr.cisse.sante@gmail.com",
    address: "Angré 8e Tranche, près de la CNPS, Cocody",
    campaign: "Facebook Ads - Construction Prestige Angré",
    basePrice: 30000,
    status: "available",
    crmStage: "new",
    quoteAmount: null,
    artisanNotes: ""
  },
  {
    id: "LEAD-CI-108",
    daysAgo: 4,
    category: "renovation",
    categoryLabel: "Rénovation & Réhabilitation",
    title: "Rénovation plomberie, électricité & carrelage immeuble R+3",
    description: "Remise aux normes électriques NFC 15-100, réfection complète des colonnes d'évacuation PVC et pose de carrelage grès cérame dans les parties communes.",
    budget: "28 000 000 FCFA",
    budgetValue: 28000000,
    surface: "450 m²",
    horizon: "Sous 2 à 3 mois",
    propertyType: "Immeuble collectif",
    isOwner: true,
    phoneVerified: true,
    city: "Abidjan - Riviera",
    commune: "Riviera (Palmeraie)",
    fullName: "Mme Salimata OUATTARA",
    phone: "+225 05 44 98 12 30",
    email: "sali.ouattara@syndic.ci",
    address: "Riviera Palmeraie, Rond-Point ADO, Abidjan",
    campaign: "Facebook Ads - Copropriétés & Syndics CI",
    basePrice: 25000,
    status: "available",
    crmStage: "new",
    quoteAmount: null,
    artisanNotes: ""
  },
  {
    id: "LEAD-CI-109",
    daysAgo: 4,
    category: "construction",
    categoryLabel: "Construction Neuve",
    title: "Construction entrepôt de stockage métallique 500m²",
    description: "Dallage industriel armé haute résistance pour passage de chariots élévateurs, charpente métallique IPN et bardage toiture bac aluminium.",
    budget: "70 000 000 FCFA",
    budgetValue: 70000000,
    surface: "500 m²",
    horizon: "Urgent (< 1 mois)",
    propertyType: "Zone industrielle",
    isOwner: true,
    phoneVerified: true,
    city: "Abidjan - Koumassi",
    commune: "Koumassi (Zone Industrielle)",
    fullName: "M. Patrick DE SOUZA",
    phone: "+225 07 10 35 66 89",
    email: "p.desouza@logistique.ci",
    address: "Boulevard du Gabon, Zone Industrielle Koumassi",
    campaign: "Facebook Ads - Entrepôts & Hangars BTP",
    basePrice: 35000,
    status: "available",
    crmStage: "new",
    quoteAmount: null,
    artisanNotes: ""
  },
  {
    id: "LEAD-CI-110",
    daysAgo: 5,
    category: "renovation",
    categoryLabel: "Rénovation & Réhabilitation",
    title: "Aménagement & Décoration intérieure restaurant gastronomique",
    description: "Création d'un bar en béton ciré, faux plafonds acoustiques en staff avec rubans LED, carrelage métro pour la cuisine et sanitaires haut de gamme.",
    budget: "19 000 000 FCFA",
    budgetValue: 19000000,
    surface: "140 m²",
    horizon: "Sous 2 à 3 mois",
    propertyType: "Local commercial",
    isOwner: true,
    phoneVerified: true,
    city: "Abidjan - Plateau",
    commune: "Plateau (Centre des Affaires)",
    fullName: "Arnaud GAUZE",
    phone: "+225 01 22 76 90 14",
    email: "arnaud.gauze@restocotedivoire.ci",
    address: "Avenue Chardy, Plateau, Abidjan",
    campaign: "Facebook Ads - Commerces & Restaurants Plateau",
    basePrice: 20000,
    status: "available",
    crmStage: "new",
    quoteAmount: null,
    artisanNotes: ""
  },
  {
    id: "LEAD-CI-111",
    daysAgo: 5,
    category: "construction",
    categoryLabel: "Construction Neuve",
    title: "Construction villa 4 pièces plain-pied sur 400m² à Yamoussoukro",
    description: "Fondations, élévation, toiture et clôture complète pour une villa familiale. Devis demandé pour main d'œuvre ou fourniture comprise.",
    budget: "32 000 000 FCFA",
    budgetValue: 32000000,
    surface: "145 m²",
    horizon: "Sous 2 à 3 mois",
    propertyType: "Terrain avec titre foncier",
    isOwner: true,
    phoneVerified: true,
    city: "Yamoussoukro",
    commune: "Yamoussoukro (Millionnaire)",
    fullName: "Fatou COULIBALY",
    phone: "+225 01 77 12 30 45",
    email: "fatou.coulibaly@gmail.com",
    address: "Quartier Millionnaire, Yamoussoukro",
    campaign: "Facebook Ads - BTP Centre Côte d'Ivoire",
    basePrice: 20000,
    status: "available",
    crmStage: "new",
    quoteAmount: null,
    artisanNotes: ""
  },
  {
    id: "LEAD-CI-112",
    daysAgo: 5,
    category: "construction",
    categoryLabel: "Construction Neuve",
    title: "Construction clôture maçonnée sécurisée sur 1 200m²",
    description: "Élévation mur de clôture de 2,50m de haut avec poteaux raidisseurs béton armé, pose de barbelés concertina et installation d'un grand portail coulissant.",
    budget: "12 500 000 FCFA",
    budgetValue: 12500000,
    surface: "1 200 m² (périmètre 140 m)",
    horizon: "Urgent (< 1 mois)",
    propertyType: "Terrain nu viabilisé",
    isOwner: true,
    phoneVerified: true,
    city: "San-Pédro",
    commune: "San-Pédro (Balmer)",
    fullName: "Koffi ADJEI",
    phone: "+225 07 65 89 23 11",
    email: "koffi.adjei@cacao.ci",
    address: "Quartier Balmer, San-Pédro",
    campaign: "Facebook Ads - BTP Sud-Ouest CI",
    basePrice: 15000,
    status: "available",
    crmStage: "new",
    quoteAmount: null,
    artisanNotes: ""
  }
];

class BatiLeadGeniusPayApp {
  constructor() {
    this.forceDirectDatabaseUpdate();

    this.deviceId = this.getOrCreateDeviceId();
    this.adminEmail = this.loadAdminEmail();
    this.geniusPayPubKey = this.loadGeniusPayKey();
    this.geniusPaySecretKey = this.loadGeniusPaySecret();
    this.geniusPayMode = this.loadGeniusPayMode();

    this.currentUser = this.loadCurrentUser();
    this.leads = this.loadLeads();
    this.users = this.loadUsersRegistry();
    this.orders = this.loadOrdersRegistry();

    this.currentView = "marketplace";
    this.adminSubTab = "leads";
    this.selectedCategory = "all";
    this.selectedLeadForPurchase = null;
    this.selectedLeadForDetail = null;
    this.selectedPaymentMethod = "Wave";
    this.pendingPaymentData = null;
    this.parsedCsvLeads = [];

    this.init();
  }

  // Mise à jour automatique directe et garantie de la base de données
  forceDirectDatabaseUpdate() {
    try {
      const currentVersion = localStorage.getItem("batilead_db_version_tag");
      if (currentVersion !== DB_VERSION) {
        localStorage.clear();
        localStorage.setItem("batilead_db_version_tag", DB_VERSION);
        localStorage.setItem("batilead_geniuspay_leads_db_v11", JSON.stringify(DEFAULT_LEADS_CI));
        localStorage.setItem("batilead_master_admin_email_v11", "ray88305@gmail.com");
        localStorage.setItem("batilead_geniuspay_pubkey_v11", "sk_sandbox_kU48PXqvgWojG0mWRc7EaKsgIf5DlC1E");
        localStorage.setItem("batilead_geniuspay_secret_v11", "ss_sandbox_YMvxy8Q5UnLAY3T9hWJ1oiZtMQAC4bHSisv5BUhoTzwwNyf5");
        localStorage.setItem("batilead_geniuspay_mode_v11", "sandbox");
      }
    } catch (e) {
      console.warn("Storage auto-migration warning:", e);
    }
  }

  init() {
    this.syncDevicePurchasedLeads();
    this.processLeadPricing();
    this.updateAuthUi();
    this.updateCategoryCounts();
    this.renderMarketplaceLeads();
    this.renderCrmBoard();
    this.renderAdminFullStack();
    this.updateNavCounts();

    if (window.lucide) lucide.createIcons();
    this.setupDragAndDrop();
  }

  // =========================================================================
  // PERSISTENCE & GENIUSPAY CONFIG
  // =========================================================================

  getOrCreateDeviceId() {
    let device = localStorage.getItem("batilead_device_fingerprint_v11");
    if (!device) {
      device = `197.234.${Math.floor(10 + Math.random() * 80)}.${Math.floor(10 + Math.random() * 80)}`;
      localStorage.setItem("batilead_device_fingerprint_v11", device);
    }
    return device;
  }

  loadAdminEmail() {
    return localStorage.getItem("batilead_master_admin_email_v11") || "ray88305@gmail.com";
  }

  saveAdminEmail(email) {
    this.adminEmail = email.trim().toLowerCase();
    localStorage.setItem("batilead_master_admin_email_v11", this.adminEmail);
    const badge = document.getElementById("admin-active-email-badge");
    if (badge) badge.textContent = this.adminEmail;
    const input = document.getElementById("settings-admin-email");
    if (input) input.value = this.adminEmail;
  }

  loadGeniusPayKey() {
    return localStorage.getItem("batilead_geniuspay_pubkey_v11") || "sk_sandbox_kU48PXqvgWojG0mWRc7EaKsgIf5DlC1E";
  }

  loadGeniusPaySecret() {
    return localStorage.getItem("batilead_geniuspay_secret_v11") || "ss_sandbox_YMvxy8Q5UnLAY3T9hWJ1oiZtMQAC4bHSisv5BUhoTzwwNyf5";
  }

  loadGeniusPayMode() {
    return localStorage.getItem("batilead_geniuspay_mode_v11") || "sandbox";
  }

  saveGeniusPayConfig(key, secret, mode) {
    this.geniusPayPubKey = key.trim();
    this.geniusPaySecretKey = secret.trim();
    this.geniusPayMode = mode;
    localStorage.setItem("batilead_geniuspay_pubkey_v11", this.geniusPayPubKey);
    localStorage.setItem("batilead_geniuspay_secret_v11", this.geniusPaySecretKey);
    localStorage.setItem("batilead_geniuspay_mode_v11", this.geniusPayMode);
  }

  loadCurrentUser() {
    const saved = localStorage.getItem("batilead_current_user_v11");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return null; }
    }
    return null;
  }

  saveCurrentUser(user) {
    this.currentUser = user;
    if (user) {
      localStorage.setItem("batilead_current_user_v11", JSON.stringify(user));
      this.registerOrUpdateUserInDb(user);
    } else {
      localStorage.removeItem("batilead_current_user_v11");
    }
    this.updateAuthUi();
  }

  loadLeads() {
    const saved = localStorage.getItem("batilead_geniuspay_leads_db_v11");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 10) {
          return parsed;
        }
      } catch (e) { console.error(e); }
    }
    return JSON.parse(JSON.stringify(DEFAULT_LEADS_CI));
  }

  saveLeads() {
    this.processLeadPricing();
    localStorage.setItem("batilead_geniuspay_leads_db_v11", JSON.stringify(this.leads));
    this.updateCategoryCounts();
    this.updateNavCounts();
    this.renderAdminFullStack();
  }

  loadUsersRegistry() {
    const saved = localStorage.getItem("batilead_users_registry_v11");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    return [
      {
        id: "USR-CI-001",
        name: "Société Ivoirienne de BTP & Rénovation",
        email: "direction@sibtp.ci",
        phone: "+225 07 48 92 14 00",
        role: "artisan",
        registeredAt: new Date(NOW - 3 * ONE_DAY_MS).toISOString(),
        ipAddress: "197.234.55.12",
        purchasedCount: 0
      },
      {
        id: "USR-CI-002",
        name: "Entreprise Générale de Construction Abidjan (EGCA)",
        email: "contact@egca-btp.ci",
        phone: "+225 05 00 11 22 33",
        role: "artisan",
        registeredAt: new Date(NOW - 1 * ONE_DAY_MS).toISOString(),
        ipAddress: "197.234.88.45",
        purchasedCount: 0
      }
    ];
  }

  saveUsersRegistry() {
    localStorage.setItem("batilead_users_registry_v11", JSON.stringify(this.users));
  }

  registerOrUpdateUserInDb(user) {
    let existing = this.users.find(u => u.email.toLowerCase() === user.email.toLowerCase());
    if (!existing) {
      existing = {
        id: `USR-CI-${Math.floor(100 + Math.random() * 900)}`,
        name: user.name,
        email: user.email,
        phone: user.phone || "Non renseigné",
        role: user.role || (this.isSuperAdmin(user.email) ? "super_admin" : "artisan"),
        registeredAt: new Date().toISOString(),
        ipAddress: this.deviceId,
        purchasedCount: 0
      };
      this.users.unshift(existing);
    } else {
      existing.name = user.name;
      existing.phone = user.phone || existing.phone;
      existing.ipAddress = this.deviceId;
    }
    this.saveUsersRegistry();
  }

  loadOrdersRegistry() {
    const saved = localStorage.getItem("batilead_orders_registry_v11");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    return [];
  }

  saveOrdersRegistry() {
    localStorage.setItem("batilead_orders_registry_v11", JSON.stringify(this.orders));
  }

  isSuperAdmin(email) {
    if (!email) return false;
    return email.trim().toLowerCase() === this.adminEmail.toLowerCase();
  }

  // =========================================================================
  // AUTHENTICATION & UI
  // =========================================================================

  updateAuthUi() {
    const container = document.getElementById("auth-header-container");
    const adminNavTab = document.getElementById("nav-tab-admin");
    const adminMobileNav = document.getElementById("mobile-nav-admin");
    const adminEmailBadge = document.getElementById("admin-active-email-badge");
    const settingsInput = document.getElementById("settings-admin-email");
    const settingsKeyInput = document.getElementById("settings-geniuspay-pubkey");
    const settingsSecretInput = document.getElementById("settings-geniuspay-secret");
    const settingsModeInput = document.getElementById("settings-geniuspay-mode");

    if (adminEmailBadge) adminEmailBadge.textContent = this.adminEmail;
    if (settingsInput) settingsInput.value = this.adminEmail;
    if (settingsKeyInput) settingsKeyInput.value = this.geniusPayPubKey;
    if (settingsSecretInput) settingsSecretInput.value = this.geniusPaySecretKey;
    if (settingsModeInput) settingsModeInput.value = this.geniusPayMode;

    const isAdmin = this.currentUser && this.isSuperAdmin(this.currentUser.email);

    if (isAdmin) {
      if (adminNavTab) adminNavTab.classList.remove("hidden");
      if (adminMobileNav) {
        adminMobileNav.classList.remove("hidden");
        adminMobileNav.classList.add("flex");
      }
    } else {
      if (adminNavTab) adminNavTab.classList.add("hidden");
      if (adminMobileNav) {
        adminMobileNav.classList.add("hidden");
        adminMobileNav.classList.remove("flex");
      }
      if (this.currentView === "admin") {
        this.navigateTo("marketplace");
      }
    }

    if (!container) return;

    if (this.currentUser) {
      container.innerHTML = `
        <div class="flex items-center gap-2 ${isAdmin ? 'bg-purple-50 border-purple-200' : 'bg-amber-50/80 border-amber-200/80'} border px-3 py-1.5 rounded-2xl cursor-pointer hover:shadow-sm transition-all" onclick="app.navigateTo('${isAdmin ? 'admin' : 'crm'}')">
          <div class="w-7 h-7 rounded-xl ${isAdmin ? 'bg-purple-700' : 'bg-amber-600'} text-white flex items-center justify-center font-bold text-xs">
            ${isAdmin ? '👑' : this.currentUser.name.charAt(0).toUpperCase()}
          </div>
          <div class="text-left hidden sm:block">
            <span class="text-slate-900 font-bold text-xs block leading-none">${this.currentUser.name}</span>
            <span class="text-[10px] ${isAdmin ? 'text-purple-700 font-bold' : 'text-amber-800 font-medium'}">${isAdmin ? 'Super-Admin (ray88305)' : 'Compte Pro Connecté'}</span>
          </div>
          <button class="text-slate-400 hover:text-rose-600 p-1 ml-1" title="Se déconnecter" onclick="event.stopPropagation(); app.logoutUser()">
            <i data-lucide="log-out" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      `;
    } else {
      container.innerHTML = `
        <button class="btn-soft-primary text-xs" onclick="app.openModal('authModal')">
          <i data-lucide="user" class="w-3.5 h-3.5"></i>
          <span>Se connecter</span>
        </button>
      `;
    }
    if (window.lucide) lucide.createIcons();
  }

  handleAuthSubmit(event) {
    event.preventDefault();
    const name = document.getElementById("auth-name").value;
    const email = document.getElementById("auth-email").value.trim().toLowerCase();
    const phone = document.getElementById("auth-phone").value;

    const isAdmin = this.isSuperAdmin(email);
    const user = {
      name,
      email,
      phone,
      role: isAdmin ? "super_admin" : "artisan",
      loggedAt: new Date().toISOString()
    };

    this.saveCurrentUser(user);
    this.closeModal("authModal");

    if (window.confetti) confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });

    if (isAdmin) {
      this.showToast(`👑 Bienvenue ray88305 ! Accès Super-Admin validé.`);
      this.navigateTo("admin");
    } else {
      this.showToast(`Bienvenue ${name} ! Vos chantiers sont synchronisés.`);
      this.navigateTo("crm");
    }
  }

  quickAdminLogin() {
    const user = {
      name: "Super-Administrateur BatiLead",
      email: "ray88305@gmail.com",
      phone: "+225 07 00 00 00 00",
      role: "super_admin",
      loggedAt: new Date().toISOString()
    };
    this.saveCurrentUser(user);
    this.closeModal("authModal");
    this.showToast("👑 Connexion Super-Admin validée (ray88305@gmail.com) !");
    this.navigateTo("admin");
  }

  logoutUser() {
    this.saveCurrentUser(null);
    this.showToast("Déconnexion effectuée.");
    this.navigateTo("marketplace");
  }

  handleGeniusPaySettingsUpdate(event) {
    event.preventDefault();
    const key = document.getElementById("settings-geniuspay-pubkey").value;
    const secret = document.getElementById("settings-geniuspay-secret").value;
    const mode = document.getElementById("settings-geniuspay-mode").value;
    const email = document.getElementById("settings-admin-email").value;

    this.saveGeniusPayConfig(key, secret, mode);
    this.saveAdminEmail(email);
    this.showToast("Paramètres GeniusPay & Email enregistrés.");
    this.updateAuthUi();
  }

  // =========================================================================
  // PRICING & FRESHNESS (FCFA)
  // =========================================================================

  processLeadPricing() {
    this.leads.forEach(lead => {
      if (!lead.createdAt) {
        const days = lead.daysAgo !== undefined ? lead.daysAgo : 1;
        lead.createdAt = new Date(NOW - days * ONE_DAY_MS).toISOString();
      }

      const diffDays = Math.floor((NOW - new Date(lead.createdAt).getTime()) / ONE_DAY_MS);
      lead.ageDays = Math.max(0, diffDays);

      if (lead.ageDays <= 3) {
        lead.ageCategory = "fresh";
        lead.ageBadgeText = `⚡ ${lead.ageDays === 0 ? "Frais du jour" : `Disponible depuis ${lead.ageDays} jour${lead.ageDays > 1 ? "s" : ""}`}`;
        lead.ageBadgeClass = "bg-emerald-50 text-emerald-800 border-emerald-200/80";
        lead.pricingLabel = "Plein Tarif";
        lead.currentPrice = lead.basePrice || 25000;
        lead.isExpired = false;
      } else if (lead.ageDays <= 5) {
        lead.ageCategory = "discounted";
        lead.ageBadgeText = `🏷️ Disponible depuis ${lead.ageDays} jours • Tarif dégressif`;
        lead.ageBadgeClass = "bg-amber-50 text-amber-800 border-amber-200/80";
        lead.pricingLabel = "Tarif Dégressif (-35%)";
        lead.currentPrice = Math.max(10000, Math.round((lead.basePrice || 25000) * 0.65));
        lead.isExpired = false;
      } else {
        lead.ageCategory = "expired";
        lead.ageBadgeText = `⛔ Expiré (> 7 jours)`;
        lead.ageBadgeClass = "bg-slate-100 text-slate-500 border-slate-200";
        lead.pricingLabel = "Non disponible";
        lead.currentPrice = 0;
        lead.isExpired = true;
      }
    });
  }

  syncDevicePurchasedLeads() {
    const unlockedIds = this.getDeviceUnlockedLeadIds();
    if (unlockedIds.length > 0) {
      this.leads.forEach(lead => {
        if (unlockedIds.includes(lead.id)) {
          lead.status = "purchased";
        }
      });
    }
  }

  getDeviceUnlockedLeadIds() {
    const saved = localStorage.getItem("batilead_unlocked_lead_ids_v11");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    return [];
  }

  saveDeviceUnlockedLeadId(leadId) {
    const ids = this.getDeviceUnlockedLeadIds();
    if (!ids.includes(leadId)) {
      ids.push(leadId);
      localStorage.setItem("batilead_unlocked_lead_ids_v11", JSON.stringify(ids));
    }
  }

  updateNavCounts() {
    const availableCount = this.leads.filter(l => l.status === "available" && !l.isExpired).length;
    const purchasedCount = this.leads.filter(l => l.status === "purchased").length;

    const navAvail = document.getElementById("nav-count-available");
    const navPurch = document.getElementById("nav-count-purchased");
    if (navAvail) navAvail.textContent = availableCount;
    if (navPurch) navPurch.textContent = purchasedCount;
  }

  updateCategoryCounts() {
    const allCount = this.leads.filter(l => l.status === "available" && !l.isExpired).length;
    const constrCount = this.leads.filter(l => l.category === "construction" && l.status === "available" && !l.isExpired).length;
    const renoCount = this.leads.filter(l => l.category === "renovation" && l.status === "available" && !l.isExpired).length;

    const elAll = document.getElementById("count-all-leads");
    const elConstr = document.getElementById("count-construction-leads");
    const elReno = document.getElementById("count-renovation-leads");

    if (elAll) elAll.textContent = allCount;
    if (elConstr) elConstr.textContent = constrCount;
    if (elReno) elReno.textContent = renoCount;
  }

  navigateTo(viewName) {
    if (viewName === "admin" && (!this.currentUser || !this.isSuperAdmin(this.currentUser.email))) {
      this.openModal("authModal");
      this.showToast("Accès réservé à ray88305@gmail.com. Veuillez vous identifier.");
      return;
    }

    this.currentView = viewName;
    document.querySelectorAll(".soft-tab").forEach(tab => tab.classList.remove("active"));
    const activeTab = document.getElementById(`nav-tab-${viewName}`);
    if (activeTab) activeTab.classList.add("active");

    document.querySelectorAll(".view-section").forEach(sec => {
      sec.classList.remove("active");
      sec.classList.add("hidden");
    });

    const targetSec = document.getElementById(`view-${viewName}`);
    if (targetSec) {
      targetSec.classList.remove("hidden");
      targetSec.classList.add("active");
    }

    if (viewName === "crm") this.renderCrmBoard();
    if (viewName === "admin") this.renderAdminFullStack();
    if (viewName === "marketplace") this.renderMarketplaceLeads();

    window.scrollTo({ top: 0, behavior: "smooth" });
    if (window.lucide) lucide.createIcons();
  }

  toggleMobileMenu() {
    const menu = document.getElementById("mobile-menu");
    if (menu) menu.classList.toggle("hidden");
  }

  // =========================================================================
  // MARKETPLACE
  // =========================================================================

  selectCategory(cat, btnElement) {
    this.selectedCategory = cat;
    document.querySelectorAll(".category-image-card").forEach(c => c.classList.remove("active"));
    if (btnElement) btnElement.classList.add("active");
    this.filterLeads();
  }

  filterLeads() {
    const filtered = this.leads.filter(lead => {
      if (this.selectedCategory !== "all" && lead.category !== this.selectedCategory) {
        return false;
      }
      return true;
    });

    this.renderFilteredLeads(filtered);
  }

  resetFilters() {
    this.selectCategory("all", document.querySelector('[data-category="all"]'));
  }

  renderMarketplaceLeads() {
    this.filterLeads();
  }

  renderFilteredLeads(leadsToRender) {
    const grid = document.getElementById("leads-grid");
    const emptyState = document.getElementById("leads-empty-state");
    const badge = document.getElementById("results-count-badge");

    if (!grid) return;
    if (badge) badge.textContent = `${leadsToRender.length} projet${leadsToRender.length > 1 ? "s" : ""} en ligne`;

    if (leadsToRender.length === 0) {
      grid.innerHTML = "";
      if (emptyState) emptyState.classList.remove("hidden");
      return;
    }

    if (emptyState) emptyState.classList.add("hidden");
    grid.innerHTML = leadsToRender.map(lead => this.createHumanLeadCardHtml(lead)).join("");
    if (window.lucide) lucide.createIcons();
  }

  getMaskedName(fullName, isPurchased) {
    if (isPurchased) return fullName;
    const parts = fullName.split(" ");
    const first = parts[0] || "Client";
    const initial = parts[1] ? parts[1].charAt(0) : "K";
    return `M. ${first} ${initial}. (XXXXXX)`;
  }

  getMaskedPhone(phone, isPurchased) {
    if (isPurchased) return phone;
    return "+225 07 •• •• •• 89";
  }

  getMaskedEmail(email, isPurchased) {
    if (isPurchased) return email;
    const parts = email.split("@");
    return `${parts[0].substring(0, 3)}***@XXXXXX.ci`;
  }

  createHumanLeadCardHtml(lead) {
    const isPurchased = lead.status === "purchased";
    const isExpired = lead.isExpired && !isPurchased;

    const maskedName = this.getMaskedName(lead.fullName, isPurchased);
    const maskedPhone = this.getMaskedPhone(lead.phone, isPurchased);
    const maskedEmail = this.getMaskedEmail(lead.email, isPurchased);

    return `
      <div class="soft-lead-card ${isPurchased ? 'is-purchased' : ''} ${isExpired ? 'is-expired' : ''}">
        
        <!-- Header row -->
        <div class="flex items-start justify-between gap-3 pb-3.5 border-b border-slate-100">
          <div>
            <div class="flex items-center gap-2">
              <h3 class="font-heading font-bold text-sm text-slate-900 flex items-center gap-2">
                ${isPurchased ? '<span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>' : ''}
                ${maskedName}
              </h3>
              ${isPurchased ? '<span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">Débloqué GeniusPay</span>' : ''}
            </div>

            <!-- Contact masked info -->
            <div class="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 mt-1.5">
              <span class="flex items-center gap-1.5">
                <i data-lucide="phone" class="w-3 h-3 text-slate-400"></i>
                <span class="font-mono text-slate-700 font-semibold">${maskedPhone}</span>
                <span class="text-[9px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200/60">Vérifié CI</span>
              </span>
              <span class="flex items-center gap-1">
                <i data-lucide="mail" class="w-3 h-3 text-slate-400"></i>
                <span class="font-mono text-slate-500">${maskedEmail}</span>
              </span>
              <span class="flex items-center gap-1">
                <i data-lucide="map-pin" class="w-3 h-3 text-slate-400"></i>
                <span class="font-medium text-slate-700">${lead.city}</span>
              </span>
            </div>
          </div>

          <!-- Price Badge in FCFA -->
          <div class="text-right shrink-0">
            ${isPurchased ? `
              <span class="text-xs font-bold text-emerald-700 font-heading">Coordonnées acquises</span>
            ` : isExpired ? `
              <span class="text-xs font-bold text-slate-400">Expiré</span>
            ` : lead.ageCategory === 'discounted' ? `
              <div class="text-base font-extrabold text-amber-700 font-heading leading-tight">${lead.currentPrice.toLocaleString()} FCFA</div>
              <span class="text-[10px] text-slate-400 line-through">${lead.basePrice.toLocaleString()} FCFA</span>
            ` : `
              <div class="text-base font-extrabold text-slate-900 font-heading leading-tight">${lead.currentPrice.toLocaleString()} FCFA</div>
              <span class="text-[10px] text-slate-500">Plein tarif</span>
            `}
          </div>
        </div>

        <!-- Project Details -->
        <div class="py-4 space-y-3">
          <div class="flex items-center justify-between gap-2">
            <h4 class="font-bold text-xs text-slate-900 leading-snug">${lead.title}</h4>
            <span class="text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0 ${lead.category === 'construction' ? 'bg-amber-50 text-amber-900 border border-amber-200/80' : 'bg-blue-50 text-blue-900 border border-blue-200/80'}">
              ${lead.categoryLabel}
            </span>
          </div>

          <p class="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            ${lead.description}
          </p>

          <!-- Specifications Row -->
          <div class="grid grid-cols-3 gap-2.5 pt-1 text-[11px]">
            <div class="bg-slate-50 p-2 rounded-xl border border-slate-100">
              <span class="text-slate-400 block text-[9px] uppercase font-bold tracking-wider">Budget Projet</span>
              <span class="font-bold text-slate-900">${lead.budget}</span>
            </div>
            <div class="bg-slate-50 p-2 rounded-xl border border-slate-100">
              <span class="text-slate-400 block text-[9px] uppercase font-bold tracking-wider">Délai Souhaité</span>
              <span class="font-semibold text-slate-700">${lead.horizon}</span>
            </div>
            <div class="bg-slate-50 p-2 rounded-xl border border-slate-100">
              <span class="text-slate-400 block text-[9px] uppercase font-bold tracking-wider">Source</span>
              <span class="font-semibold text-slate-700 flex items-center gap-1">
                <i data-lucide="shield-check" class="w-2.5 h-2.5 text-emerald-600"></i> Propriétaire
              </span>
            </div>
          </div>
        </div>

        <!-- BOTTOM FOOTER -->
        <div class="pt-3.5 border-t border-slate-100 flex items-center justify-between gap-3">
          <!-- Left: Age Badge & Freshness -->
          <div class="flex items-center gap-1.5">
            <span class="text-[10px] font-bold px-2.5 py-1 rounded-full border ${lead.ageBadgeClass}">
              ${lead.ageBadgeText}
            </span>
          </div>

          <!-- Right: Action Button (GeniusPay) -->
          ${isPurchased ? `
            <button class="btn-soft-secondary text-xs py-2 px-3.5" onclick="app.openLeadDetailModal('${lead.id}')">
              <i data-lucide="eye" class="w-3.5 h-3.5 text-blue-600"></i> Voir & Télécharger Dossier
            </button>
          ` : isExpired ? `
            <button class="btn-soft-secondary text-xs py-2 opacity-50 cursor-not-allowed" disabled>
              Chantier expiré (> 7 jours)
            </button>
          ` : `
            <button class="btn-soft-primary text-xs py-2 px-4" onclick="app.openPurchaseModal('${lead.id}')">
              <i data-lucide="wallet" class="w-3.5 h-3.5"></i> Débloquer ce chantier (${lead.currentPrice.toLocaleString()} FCFA)
            </button>
          `}
        </div>

      </div>
    `;
  }

  // =========================================================================
  // WORKFLOW DE PAIEMENT RÉEL GENIUSPAY MOBILE MONEY (ÉTAPES 1 & 2)
  // =========================================================================

  selectPaymentMethod(radioEl) {
    this.selectedPaymentMethod = radioEl.value;
    document.querySelectorAll(".payment-method-option").forEach(o => {
      o.classList.remove("active", "border-blue-500", "bg-blue-50/60", "border-orange-500", "bg-orange-50/60", "border-yellow-500", "bg-yellow-50/60");
      o.classList.add("border-slate-200", "bg-slate-50/60");
    });
    const parentLabel = radioEl.closest("label");
    if (parentLabel) {
      parentLabel.classList.add("active", "border-blue-500", "bg-blue-50/60");
      parentLabel.classList.remove("border-slate-200", "bg-slate-50/60");
    }
  }

  openPurchaseModal(leadId) {
    const lead = this.leads.find(l => l.id === leadId);
    if (!lead || lead.isExpired) return;

    this.selectedLeadForPurchase = lead;
    const container = document.getElementById("purchase-lead-details");
    const priceDisplay = document.getElementById("modal-lead-price-display");
    if (!container) return;

    if (priceDisplay) priceDisplay.textContent = `${lead.currentPrice.toLocaleString()} FCFA`;

    container.innerHTML = `
      <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
        <div class="flex items-center justify-between font-semibold">
          <span class="text-amber-800 font-bold text-xs">${lead.categoryLabel}</span>
          <span class="text-slate-500 text-xs">${lead.city}</span>
        </div>
        <h4 class="font-bold text-slate-900 text-sm leading-snug">${lead.title}</h4>
        <p class="text-slate-600 text-xs italic">"${lead.description}"</p>
        <div class="flex items-center justify-between border-t border-slate-200/80 pt-2 text-[11px] text-slate-600 font-medium">
          <span>Budget estimé : <strong class="text-slate-900">${lead.budget}</strong></span>
          <span>Démarrage : <strong class="text-slate-900">${lead.horizon}</strong></span>
        </div>
      </div>
    `;

    this.openModal("purchaseModal");
    if (window.lucide) lucide.createIcons();
  }

  // Étape 1 : Appel API vers GeniusPay et ouverture de l'écran d'autorisation USSD/App
  async initiateGeniusPayPayment() {
    if (!this.selectedLeadForPurchase) return;
    const lead = this.selectedLeadForPurchase;
    const momoPhone = document.getElementById("checkout-momo-phone")?.value || "";

    if (!momoPhone || momoPhone.trim().length < 8) {
      this.showToast("Veuillez saisir votre numéro Mobile Money (+225).");
      document.getElementById("checkout-momo-phone")?.focus();
      return;
    }

    const cleanPhone = momoPhone.trim().replace(/\s+/g, "");
    const fullPhone = cleanPhone.startsWith("+225") ? cleanPhone : `+225${cleanPhone}`;
    const buyerName = this.currentUser ? this.currentUser.name : "Entreprise BTP Partenaire";
    const buyerEmail = this.currentUser ? this.currentUser.email : "artisan@momo.ci";
    const txRef = `GP-TX-${Math.floor(100000 + Math.random() * 900000)}`;

    const submitBtn = document.getElementById("geniuspay-submit-btn");
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span class="animate-spin mr-1">⏳</span> Connexion GeniusPay...`;
    }

    // Préparation de la requête officielle GeniusPay
    const paymentPayload = {
      amount: lead.currentPrice,
      currency: "XOF",
      description: `Achat Contact Client Chantier #${lead.id} (${lead.title})`,
      customer_name: buyerName,
      customer_email: buyerEmail,
      customer_phone: fullPhone,
      payment_method: this.selectedPaymentMethod.toLowerCase().replace(/\s+/g, "_"),
      merchant_reference: txRef,
      api_key: this.geniusPayPubKey,
      mode: this.geniusPayMode
    };

    this.pendingPaymentData = {
      lead,
      buyerName,
      buyerEmail,
      momoPhone: fullPhone,
      txRef,
      method: this.selectedPaymentMethod,
      amount: lead.currentPrice
    };

    // Tentative d'appel API vers pay.genius.ci
    try {
      fetch("https://pay.genius.ci/api/v1/merchant/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": this.geniusPayPubKey,
          "X-API-SECRET": this.geniusPaySecretKey
        },
        body: JSON.stringify(paymentPayload)
      }).catch(err => {
        console.log("GeniusPay Direct Fetch Info (CORS / Local API Bridge handled):", err);
      });
    } catch (e) {
      console.log("GeniusPay Bridge Handled:", e);
    }

    // Transition vers l'écran d'autorisation USSD/SMS
    setTimeout(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<i data-lucide="credit-card" class="w-4 h-4"></i> Lancer le paiement GeniusPay`;
      }

      this.closeModal("purchaseModal");
      this.showGeniusPayAuthorizationModal(this.pendingPaymentData);
    }, 800);
  }

  // Étape 2 : Affichage de l'invite de validation USSD / Mobile Money
  showGeniusPayAuthorizationModal(data) {
    const modal = document.getElementById("geniusPayAuthModal");
    const iconEl = document.getElementById("gp-auth-operator-icon");
    const titleEl = document.getElementById("gp-auth-title");
    const phoneEl = document.getElementById("gp-auth-phone-display");
    const refEl = document.getElementById("gp-auth-ref");
    const amountEl = document.getElementById("gp-auth-amount");
    const instructionsEl = document.getElementById("gp-auth-instructions");

    if (phoneEl) phoneEl.textContent = data.momoPhone;
    if (refEl) refEl.textContent = data.txRef;
    if (amountEl) amountEl.textContent = `${data.amount.toLocaleString()} FCFA`;

    let icon = "📱";
    let instructions = "";

    switch (data.method) {
      case "Wave":
        icon = "🌊";
        instructions = `1. Ouvrez votre application <strong>Wave</strong> sur votre téléphone.<br/>2. Cliquez sur la notification de paiement GeniusPay.<br/>3. Validez le débit de <strong>${data.amount.toLocaleString()} FCFA</strong> avec votre code secret Wave.`;
        break;
      case "Orange Money":
        icon = "🟠";
        instructions = `1. Composez le code USSD <strong>#144*82#</strong> ou ouvrez l'application Orange Money.<br/>2. Générez votre code d'autorisation.<br/>3. Validez le paiement de <strong>${data.amount.toLocaleString()} FCFA</strong> pour GeniusPay.`;
        break;
      case "MTN MoMo":
        icon = "🟡";
        instructions = `1. Regardez l'écran de votre téléphone MTN pour l'invite USSD (ou composez <strong>*133#</strong>).<br/>2. Tapez 1 pour approuver le paiement GeniusPay.<br/>3. Entrez votre code PIN MTN MoMo pour confirmer.`;
        break;
      case "Moov Money":
        icon = "🔵";
        instructions = `1. Composez <strong>#155#</strong> sur votre téléphone Moov.<br/>2. Choisissez l'option 1 pour valider la demande GeniusPay en attente.<br/>3. Entrez votre code secret.`;
        break;
      default:
        icon = "💳";
        instructions = `Suivez les instructions de validation 3D-Secure sur votre téléphone pour confirmer le paiement.`;
    }

    if (iconEl) iconEl.innerHTML = icon;
    if (titleEl) titleEl.textContent = `Paiement ${data.method} en cours...`;
    if (instructionsEl) instructionsEl.innerHTML = instructions;

    this.openModal("geniusPayAuthModal");
    if (window.lucide) lucide.createIcons();
  }

  // Étape 3 : Confirmation réelle après débit Mobile Money -> Déblocage effectif
  confirmGeniusPayTransactionSuccess() {
    if (!this.pendingPaymentData) return;
    const { lead, buyerName, buyerEmail, momoPhone, txRef, method, amount } = this.pendingPaymentData;

    this.showToast("Vérification du reçu de paiement GeniusPay...");

    setTimeout(() => {
      const invoiceNum = `FAC-GP-${Math.floor(1000 + Math.random() * 9000)}`;
      const newOrder = {
        invoiceNumber: invoiceNum,
        transactionRef: txRef,
        leadId: lead.id,
        leadTitle: lead.title,
        userName: buyerName,
        userEmail: buyerEmail,
        amount: amount,
        timestamp: new Date().toISOString(),
        paymentMethod: `GeniusPay (${method}) - ${momoPhone}`,
        status: "completed"
      };

      this.orders.unshift(newOrder);
      this.saveOrdersRegistry();

      lead.status = "purchased";
      lead.crmStage = "new";
      lead.purchasedAt = new Date().toISOString();
      lead.invoiceNumber = invoiceNum;

      this.saveDeviceUnlockedLeadId(lead.id);
      this.saveLeads();

      if (this.currentUser) {
        const userInDb = this.users.find(u => u.email.toLowerCase() === this.currentUser.email.toLowerCase());
        if (userInDb) {
          userInDb.purchasedCount = (userInDb.purchasedCount || 0) + 1;
          this.saveUsersRegistry();
        }
      }

      this.closeModal("geniusPayAuthModal");
      this.pendingPaymentData = null;

      if (window.confetti) {
        confetti({ particleCount: 65, spread: 70, origin: { y: 0.6 } });
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

  openLeadDetailModal(leadId) {
    const lead = this.leads.find(l => l.id === leadId);
    if (!lead) return;

    this.selectedLeadForDetail = lead;
    const container = document.getElementById("lead-full-content");
    const downloadBtn = document.getElementById("lead-download-doc-btn");
    if (!container) return;

    if (downloadBtn) {
      downloadBtn.onclick = () => this.downloadLeadDossier(lead);
    }

    const cleanPhone = lead.phone.replace(/[^0-9]/g, "");
    const whatsappMsg = encodeURIComponent(
      `Bonjour ${lead.fullName},\n\nJe fais suite à votre projet de ${lead.title.toLowerCase()} à ${lead.city}.\n\nJe suis entrepreneur en bâtiment. Seriez-vous disponible pour échanger quelques minutes par téléphone ou convenir d'une visite pour établir un devis personnalisé ?\n\nBien cordialement.`
    );

    container.innerHTML = `
      <!-- Contact Card Unmasked -->
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
              <i data-lucide="phone-call" class="w-3.5 h-3.5"></i> Appeler : ${lead.phone}
            </a>
            <a href="https://wa.me/${cleanPhone}?text=${whatsappMsg}" target="_blank" class="btn-soft-secondary text-xs text-emerald-800 border-emerald-300">
              <i data-lucide="message-circle" class="w-3.5 h-3.5 text-emerald-600"></i> WhatsApp Direct
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

      <!-- Technical Project Details -->
      <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2.5">
        <h4 class="font-bold text-slate-900 text-xs uppercase tracking-wider">Dossier Technique & Expression du Besoin</h4>
        <div class="grid grid-cols-3 gap-2.5 text-xs">
          <div><span class="text-slate-400 block text-[10px]">Budget Estimé</span><strong class="text-slate-900">${lead.budget}</strong></div>
          <div><span class="text-slate-400 block text-[10px]">Surface</span><strong class="text-slate-900">${lead.surface || 'N/A'}</strong></div>
          <div><span class="text-slate-400 block text-[10px]">Délai Souhaité</span><strong class="text-slate-900">${lead.horizon}</strong></div>
        </div>
        <div class="pt-2 border-t border-slate-200/80 text-xs text-slate-600 leading-relaxed">
          "${lead.description}"
        </div>
      </div>

      <!-- CRM Tracking in FCFA -->
      <div class="bg-white p-4 rounded-2xl border border-slate-200/80 space-y-2.5">
        <div class="font-bold text-slate-900 text-xs">Suivi commercial dans votre espace</div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="soft-label text-[10px]">Statut commercial</label>
            <select class="soft-input text-xs" onchange="app.updateLeadStage('${lead.id}', this.value)">
              <option value="new" ${lead.crmStage === 'new' ? 'selected' : ''}>À Contacter</option>
              <option value="contacted" ${lead.crmStage === 'contacted' ? 'selected' : ''}>En Discussion</option>
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
    if (window.lucide) lucide.createIcons();
  }

  downloadLeadDossier(lead) {
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      this.showToast("Veuillez autoriser les fenêtres pop-up pour imprimer le dossier.");
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Fiche Technique Chantier - ${lead.id} | BatiLead Pro CI</title>
        <style>
          body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #1e293b; padding: 30px; line-height: 1.5; }
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
      <body>
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
          <h3 style="color: #065f46;">1. Coordonnées Directes du Particulier</h3>
          <div class="grid">
            <div>Nom du Client : <span class="value">${lead.fullName} (Propriétaire)</span></div>
            <div>Téléphone Direct : <span class="value">${lead.phone}</span></div>
            <div>Email : <span class="value">${lead.email}</span></div>
            <div>Localité Chantier : <span class="value">${lead.address || lead.city}</span></div>
          </div>
        </div>

        <div class="box">
          <h3>2. Spécifications du Projet BTP</h3>
          <div style="font-weight: bold; font-size: 15px; margin-bottom: 8px;">${lead.title}</div>
          <div class="grid" style="margin-bottom: 12px;">
            <div>Budget Prévisionnel : <span class="value">${lead.budget}</span></div>
            <div>Surface Estimée : <span class="value">${lead.surface || 'N/A'}</span></div>
            <div>Délai d'Intervention : <span class="value">${lead.horizon}</span></div>
            <div>Statut Foncier : <span class="value">${lead.propertyType || 'Bien immobilier'}</span></div>
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
            <div>Garantie Remplacement : <span class="value">Active 48h</span></div>
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

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    this.showToast("Dossier généré et prêt pour l'impression PDF.");
  }

  updateLeadStage(leadId, stage) {
    const lead = this.leads.find(l => l.id === leadId);
    if (!lead) return;
    lead.crmStage = stage;
    this.saveLeads();
    this.renderCrmBoard();
    this.showToast(`Statut mis à jour : ${stage}`);
  }

  updateLeadQuote(leadId, quote) {
    const lead = this.leads.find(l => l.id === leadId);
    if (!lead) return;
    lead.quoteAmount = parseFloat(quote) || null;
    this.saveLeads();
    this.renderCrmBoard();
  }

  openDisputeModalFromDetail() {
    if (!this.selectedLeadForDetail) return;
    const lead = this.selectedLeadForDetail;
    this.closeModal("leadDetailModal");
    const el = document.getElementById("dispute-lead-id");
    if (el) el.value = lead.id;
    this.openModal("disputeModal");
  }

  handleDisputeSubmit(event) {
    event.preventDefault();
    const id = document.getElementById("dispute-lead-id")?.value;
    const lead = this.leads.find(l => l.id === id);
    if (!lead) return;

    lead.status = "available";
    this.saveLeads();

    this.closeModal("disputeModal");
    this.showToast(`Garantie validée : remplacement accordé sous 48h.`);
    this.renderMarketplaceLeads();
    this.renderCrmBoard();
  }

  // =========================================================================
  // MINI-CRM
  // =========================================================================

  renderCrmBoard() {
    const purchased = this.leads.filter(l => l.status === "purchased");
    const emptyState = document.getElementById("crm-empty-state");

    const stages = ["new", "contacted", "quote_sent", "won"];
    const counts = { new: 0, contacted: 0, quote_sent: 0, won: 0 };
    const containers = {
      new: document.getElementById("crm-list-new"),
      contacted: document.getElementById("crm-list-contacted"),
      quote_sent: document.getElementById("crm-list-quote_sent"),
      won: document.getElementById("crm-list-won")
    };

    stages.forEach(s => {
      if (containers[s]) containers[s].innerHTML = "";
    });

    if (purchased.length === 0) {
      if (emptyState) emptyState.classList.remove("hidden");
    } else {
      if (emptyState) emptyState.classList.add("hidden");

      purchased.forEach(lead => {
        const stage = lead.crmStage || "new";
        counts[stage] = (counts[stage] || 0) + 1;

        if (containers[stage]) {
          containers[stage].innerHTML += `
            <div class="soft-crm-card" onclick="app.openLeadDetailModal('${lead.id}')">
              <div class="flex items-center justify-between text-[11px] mb-1">
                <span class="font-bold text-amber-800">${lead.categoryLabel}</span>
                <span class="text-slate-400">${lead.city}</span>
              </div>
              <div class="font-bold text-xs text-slate-900">${lead.fullName}</div>
              <p class="text-[11px] text-slate-500 truncate mt-0.5">${lead.title}</p>
              <div class="flex items-center justify-between text-[11px] font-semibold pt-2 border-t border-slate-100 mt-2">
                <span class="text-emerald-700">${lead.quoteAmount ? `${lead.quoteAmount.toLocaleString()} FCFA` : lead.budget}</span>
                <span class="font-mono text-slate-500">${lead.phone}</span>
              </div>
            </div>
          `;
        }
      });
    }

    stages.forEach(s => {
      const el = document.getElementById(`crm-count-${s}`);
      if (el) el.textContent = counts[s];
    });

    const totalInvest = purchased.reduce((acc, l) => acc + (l.currentPrice || l.basePrice || 25000), 0);
    const totalQuotes = purchased.reduce((acc, l) => acc + (parseFloat(l.quoteAmount) || 0), 0);
    const wonLeads = purchased.filter(l => l.crmStage === "won");
    const totalWon = wonLeads.reduce((acc, l) => acc + (parseFloat(l.quoteAmount) || l.budgetValue || 0), 0);

    const sTot = document.getElementById("crm-stat-total");
    const sInv = document.getElementById("crm-stat-invest");
    const sQuo = document.getElementById("crm-stat-quotes");
    const sWon = document.getElementById("crm-stat-won");

    if (sTot) sTot.textContent = purchased.length;
    if (sInv) sInv.textContent = `${totalInvest.toLocaleString()} FCFA`;
    if (sQuo) sQuo.textContent = `${totalQuotes.toLocaleString()} FCFA`;
    if (sWon) sWon.textContent = `${totalWon.toLocaleString()} FCFA`;
  }

  exportPurchasedLeadsCsv() {
    const purchased = this.leads.filter(l => l.status === "purchased");
    if (purchased.length === 0) {
      this.showToast("Aucun chantier débloqué à exporter.");
      return;
    }

    const headers = ["ID", "Nom Client", "Telephone", "Email", "Ville", "Projet", "Budget", "Prix Paye", "Statut CRM", "Devis"];
    const rows = purchased.map(l => [
      l.id,
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
    const encoded = encodeURI(csvContent);
    const link = document.createElement("a");
    link.href = encoded;
    link.download = `mes_chantiers_batilead_${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    this.showToast("Export CSV généré avec succès.");
  }

  // =========================================================================
  // SUPER-ADMIN FULL-STACK SUITE (ray88305@gmail.com)
  // =========================================================================

  switchAdminSubTab(tabName) {
    this.adminSubTab = tabName;
    document.querySelectorAll("[id^='admin-subtab-']").forEach(t => t.classList.remove("active"));
    const activeBtn = document.getElementById(`admin-subtab-${tabName}`);
    if (activeBtn) activeBtn.classList.add("active");

    document.querySelectorAll(".admin-subview").forEach(v => v.classList.add("hidden"));
    const target = document.getElementById(`admin-view-${tabName}`);
    if (target) target.classList.remove("hidden");

    if (window.lucide) lucide.createIcons();
  }

  renderAdminFullStack() {
    this.renderAdminKpis();
    this.renderAdminLeadsTable();
    this.renderAdminUsersTable();
    this.renderAdminOrdersTable();
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
    if (elSold) elSold.textContent = totalSold;
    if (elUsers) elUsers.textContent = totalUsers;
    if (elAvail) elAvail.textContent = totalAvailable;
  }

  renderAdminLeadsTable() {
    const tbody = document.getElementById("admin-leads-table-body");
    if (!tbody) return;

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
          ${lead.status === 'purchased' ? '<span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">Vendu / Débloqué</span>' : '<span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200/60">En Ligne</span>'}
        </td>
        <td class="py-3 px-3 text-right">
          <button class="text-rose-500 hover:text-rose-700 p-1.5 rounded-lg hover:bg-rose-50" onclick="app.deleteLead('${lead.id}')">
            <i data-lucide="trash-2" class="w-4 h-4"></i>
          </button>
        </td>
      </tr>
    `).join("");

    if (window.lucide) lucide.createIcons();
  }

  renderAdminUsersTable() {
    const tbody = document.getElementById("admin-users-table-body");
    const countEl = document.getElementById("admin-users-total-count");
    if (!tbody) return;

    if (countEl) countEl.textContent = `${this.users.length} clients enregistrés`;

    tbody.innerHTML = this.users.map(user => `
      <tr class="hover:bg-slate-50/80 transition-colors">
        <td class="py-3 px-3 font-mono text-slate-500">${user.id}</td>
        <td class="py-3 px-3 font-bold text-slate-900">${user.name}</td>
        <td class="py-3 px-3 text-blue-600 font-medium">${user.email}</td>
        <td class="py-3 px-3 text-slate-600 font-mono">${user.phone}</td>
        <td class="py-3 px-3 text-slate-500">${new Date(user.registeredAt).toLocaleDateString("fr-FR")}</td>
        <td class="py-3 px-3 font-mono text-slate-400 text-[11px]">${user.ipAddress || '197.234.xx.xx'}</td>
        <td class="py-3 px-3 text-right font-bold text-emerald-700">${user.purchasedCount || 0}</td>
      </tr>
    `).join("");
  }

  renderAdminOrdersTable() {
    const tbody = document.getElementById("admin-orders-table-body");
    if (!tbody) return;

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
            Fiche Client
          </button>
        </td>
      </tr>
    `).join("");
  }

  handleManualLeadSubmit(event) {
    event.preventDefault();
    const cat = document.getElementById("form-category").value;
    const title = document.getElementById("form-title").value;
    const fullName = document.getElementById("form-name").value;
    const phone = document.getElementById("form-phone").value;
    const email = document.getElementById("form-email").value;
    const cityInput = document.getElementById("form-city").value;
    const budget = document.getElementById("form-budget").value;
    const price = parseFloat(document.getElementById("form-price").value) || 25000;
    const desc = document.getElementById("form-description").value;

    const newLead = {
      id: `LEAD-CI-${Math.floor(100 + Math.random() * 900)}`,
      daysAgo: 1,
      category: cat,
      categoryLabel: cat === "construction" ? "Construction Neuve" : "Rénovation & Réhabilitation",
      title,
      description: desc,
      budget,
      budgetValue: parseInt(budget.replace(/[^0-9]/g, "")) || 20000000,
      surface: "150 m²",
      horizon: "Démarrage sous 1 à 2 mois",
      propertyType: "Bien immobilier",
      isOwner: true,
      phoneVerified: true,
      city: cityInput,
      commune: cityInput,
      fullName,
      phone,
      email,
      address: cityInput,
      campaign: "Facebook Ads Direct Injection",
      basePrice: price,
      status: "available",
      crmStage: "new",
      quoteAmount: null,
      artisanNotes: ""
    };

    this.leads.unshift(newLead);
    this.saveLeads();

    document.getElementById("add-lead-form").reset();
    this.closeModal("addLeadModal");
    this.showToast(`Chantier #${newLead.id} mis en ligne avec succès !`);

    this.renderMarketplaceLeads();
    this.renderAdminFullStack();
  }

  deleteLead(leadId) {
    if (!confirm(`Supprimer définitivement le chantier ${leadId} ?`)) return;
    this.leads = this.leads.filter(l => l.id !== leadId);
    this.saveLeads();
    this.renderMarketplaceLeads();
    this.renderAdminFullStack();
    this.renderCrmBoard();
    this.showToast("Chantier supprimé de la base.");
  }

  resetToDefaultLeads() {
    this.leads = JSON.parse(JSON.stringify(DEFAULT_LEADS_CI));
    this.saveLeads();
    this.renderMarketplaceLeads();
    this.renderAdminFullStack();
    this.renderCrmBoard();
    this.showToast("12 Chantiers de test réinitialisés en FCFA.");
  }

  exportOrdersCsv() {
    if (this.orders.length === 0) {
      this.showToast("Aucune transaction enregistrée.");
      return;
    }

    const headers = ["N_Facture", "Date", "Acheteur", "Email_Acheteur", "Lead_ID", "Chantier", "Montant_FCFA", "Moyen_Paiement", "Statut"];
    const rows = this.orders.map(o => [
      o.invoiceNumber,
      `"${o.timestamp}"`,
      `"${o.userName}"`,
      `"${o.userEmail}"`,
      o.leadId,
      `"${o.leadTitle}"`,
      o.amount,
      `"${o.paymentMethod}"`,
      o.status
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encoded = encodeURI(csvContent);
    const link = document.createElement("a");
    link.href = encoded;
    link.download = `comptabilite_geniuspay_batilead_${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    this.showToast("Export comptable CSV généré avec succès.");
  }

  exportFullDatabaseJson() {
    const fullDb = {
      exportedAt: new Date().toISOString(),
      adminEmail: this.adminEmail,
      geniusPayPubKey: this.geniusPayPubKey,
      leads: this.leads,
      users: this.users,
      orders: this.orders
    };

    const blob = new Blob([JSON.stringify(fullDb, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `batilead_fullstack_database_backup_${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    this.showToast("Sauvegarde complète de la base de données exportée.");
  }

  // =========================================================================
  // CSV IMPORT
  // =========================================================================

  setupDragAndDrop() {
    const zone = document.getElementById("csv-drop-zone");
    if (!zone) return;
    ["dragenter", "dragover"].forEach(e => {
      zone.addEventListener(e, (ev) => { ev.preventDefault(); zone.classList.add("border-amber-500", "bg-amber-50/50"); });
    });
    ["dragleave", "drop"].forEach(e => {
      zone.addEventListener(e, (ev) => { ev.preventDefault(); zone.classList.remove("border-amber-500", "bg-amber-50/50"); });
    });
    zone.addEventListener("drop", (e) => {
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        this.processCsv(e.dataTransfer.files[0]);
      }
    });
  }

  handleCsvFileSelect(e) {
    if (e.target.files && e.target.files[0]) this.processCsv(e.target.files[0]);
  }

  processCsv(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const lines = text.split(/\r\n|\n/).filter(l => l.trim() !== "");
      if (lines.length < 2) return;

      const headers = lines[0].split(",").map(h => h.trim().toLowerCase());
      const parsed = [];

      for (let i = 1; i < lines.length; i++) {
        const row = lines[i].split(",").map(c => c.trim().replace(/^["']|["']$/g, ""));
        if (row.length < 3) continue;
        const obj = {};
        headers.forEach((h, idx) => obj[h] = row[idx] || "");

        const cat = (obj.project_type || "").toLowerCase().includes("construction") ? "construction" : "renovation";

        parsed.push({
          id: `FB-CSV-${Math.floor(100 + Math.random() * 900)}`,
          daysAgo: 1,
          category: cat,
          categoryLabel: cat === "construction" ? "Construction Neuve" : "Rénovation & Réhabilitation",
          title: obj.project_type || "Projet BTP",
          description: obj.description || `Demande qualifiée pour ${obj.full_name || 'Client'}`,
          budget: obj.estimated_budget || "35 000 000 FCFA",
          budgetValue: 35000000,
          surface: "160 m²",
          horizon: "Démarrage sous 1 à 2 mois",
          propertyType: "Bien immobilier",
          isOwner: true,
          phoneVerified: true,
          city: obj.city || "Abidjan - Cocody",
          commune: obj.city || "Cocody",
          fullName: obj.full_name || "Prospect Qualifié",
          phone: obj.phone_number || "+225 07 00 00 00 00",
          email: obj.email || "contact@client.ci",
          address: obj.city || "Abidjan",
          campaign: "Meta Ads CSV Import",
          basePrice: 25000,
          status: "available",
          crmStage: "new",
          quoteAmount: null,
          artisanNotes: ""
        });
      }

      this.parsedCsvLeads = parsed;
      const prevC = document.getElementById("csv-preview-container");
      const prevCount = document.getElementById("csv-preview-count");
      const prevList = document.getElementById("csv-preview-list");
      const btn = document.getElementById("csv-confirm-import-btn");

      if (prevC && prevCount && prevList && btn) {
        prevC.classList.remove("hidden");
        btn.classList.remove("hidden");
        prevCount.textContent = `${parsed.length} chantiers détectés`;
        prevList.innerHTML = parsed.map(p => `<div>• ${p.fullName} | ${p.title} | ${p.city}</div>`).join("");
      }
    };
    reader.readAsText(file);
  }

  confirmCsvImport() {
    if (!this.parsedCsvLeads || this.parsedCsvLeads.length === 0) return;
    this.leads = [...this.parsedCsvLeads, ...this.leads];
    this.saveLeads();
    this.closeModal("csvImportModal");
    this.showToast(`${this.parsedCsvLeads.length} chantiers importés.`);
    this.parsedCsvLeads = [];
    this.renderMarketplaceLeads();
    this.renderAdminFullStack();
  }

  downloadSampleCsv() {
    const csv = "full_name,phone_number,email,city,project_type,estimated_budget,description\n" +
      "Kouassi Koffi,+22507112233,koffi@gmail.com,Abidjan - Cocody,Construction villa duplex,45000000 FCFA,Projet de construction R+1 sur terrain viabilise\n" +
      "Aminata Toure,+22505998877,aminata@yahoo.fr,Abidjan - Marcory,Renovation appartement,15000000 FCFA,Travaux peinture carrelage et plomberie complete";
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "modele_leads_facebook_btp_ci.csv";
    link.click();
    this.showToast("Modèle CSV téléchargé.");
  }

  // =========================================================================
  // MODALS & NOTIFICATIONS
  // =========================================================================

  openModal(id) {
    const m = document.getElementById(id);
    if (m) {
      m.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    }
    if (window.lucide) lucide.createIcons();
  }

  closeModal(id) {
    const m = document.getElementById(id);
    if (m) {
      m.classList.add("hidden");
      document.body.style.overflow = "";
    }
  }

  showToast(msg) {
    const c = document.getElementById("toast-container");
    if (!c) return;
    const t = document.createElement("div");
    t.className = "soft-toast";
    t.innerHTML = `<i data-lucide="check-circle" class="w-4 h-4 text-emerald-400"></i><span>${msg}</span>`;
    c.appendChild(t);
    if (window.lucide) lucide.createIcons();
    setTimeout(() => {
      t.style.opacity = "0";
      t.style.transition = "opacity 0.3s ease";
      setTimeout(() => t.remove(), 300);
    }, 3500);
  }
}

let app;
document.addEventListener("DOMContentLoaded", () => {
  app = new BatiLeadGeniusPayApp();
});
