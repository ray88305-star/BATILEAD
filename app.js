/**
 * BatiLead Pro — Moteur Full-Stack & Base de Données
 * Authentification Super-Admin par Email, Registre Clients, Journal des Paiements & Téléchargements
 */

const NOW = Date.now();
const ONE_DAY_MS = 1000 * 60 * 60 * 24;

// Default initial leads dataset
const DEFAULT_LEADS = [
  {
    id: "PRO-BTP-101",
    daysAgo: 1,
    category: "construction",
    categoryLabel: "Construction Neuve",
    title: "Construction villa d'architecte 190 m² avec piscine",
    description: "Terrain viabilisé acquis avec permis de construire purgé de tout recours. Recherche entreprise générale de bâtiment ou groupement d'artisans pour la réalisation du gros œuvre, charpente et second œuvre. Étude de sol G2 disponible.",
    budget: "340 000 €",
    budgetValue: 340000,
    surface: "190 m²",
    horizon: "Démarrage sous 1 à 2 mois",
    propertyType: "Terrain à bâtir viabilisé",
    isOwner: true,
    phoneVerified: true,
    city: "Bordeaux (33)",
    commune: "Mérignac",
    fullName: "Marc DUPONT",
    phone: "06 48 92 14 77",
    email: "marc.dupont33@gmail.com",
    address: "Avenue de l'Hippodrome, 33700 Mérignac",
    campaign: "Facebook Ads - Construction Villas Sud-Ouest",
    basePrice: 59,
    status: "available",
    crmStage: "new",
    quoteAmount: null,
    artisanNotes: ""
  },
  {
    id: "PRO-BTP-102",
    daysAgo: 2,
    category: "renovation",
    categoryLabel: "Rénovation & Réhabilitation",
    title: "Rénovation globale d'une maison de ville 140 m²",
    description: "Projet complet suite à acquisition : réfection intégrale du système électrique, création de deux salles d'eau avec douches à l'italienne, ouverture d'un mur porteur avec pose d'IPN et pose de parquet massif chevron.",
    budget: "85 000 €",
    budgetValue: 85000,
    surface: "140 m²",
    horizon: "Urgent (< 1 mois)",
    propertyType: "Maison ancienne",
    isOwner: true,
    phoneVerified: true,
    city: "Lyon (69)",
    commune: "Croix-Rousse",
    fullName: "Céline MOREL",
    phone: "06 71 33 80 12",
    email: "celine.morel@orange.fr",
    address: "Rue de Cuire, 69004 Lyon",
    campaign: "Facebook Ads - Rénovation Intérieure",
    basePrice: 49,
    status: "available",
    crmStage: "new",
    quoteAmount: null,
    artisanNotes: ""
  },
  {
    id: "PRO-BTP-103",
    daysAgo: 2,
    category: "construction",
    categoryLabel: "Construction Neuve",
    title: "Construction maison contemporaine à ossature bois",
    description: "Projet de maison passive bioclimatique de plain-pied avec toiture terrasse végétalisée et grandes baies vitrées aluminium. Plan d'architecte finalisé. Recherche constructeur qualifié RGE.",
    budget: "280 000 €",
    budgetValue: 280000,
    surface: "155 m²",
    horizon: "Démarrage sous 2 à 3 mois",
    propertyType: "Terrain individuel",
    isOwner: true,
    phoneVerified: true,
    city: "Nantes (44)",
    commune: "Orvault",
    fullName: "Alexandre BLANCHARD",
    phone: "06 19 84 55 20",
    email: "a.blanchard@wanadoo.fr",
    address: "Route de Rennes, 44700 Orvault",
    campaign: "Facebook Ads - Maisons Bois Prestige",
    basePrice: 59,
    status: "available",
    crmStage: "new",
    quoteAmount: null,
    artisanNotes: ""
  },
  {
    id: "PRO-BTP-104",
    daysAgo: 4,
    category: "renovation",
    categoryLabel: "Rénovation & Réhabilitation",
    title: "Surélévation et aménagement de combles avec isolation",
    description: "Surélévation de toiture en ossature bois pour créer 45 m² habitables supplémentaires (2 chambres + 1 salle de bain). Isolation thermique en laine de bois et pose de 3 fenêtres de toit motorisées.",
    budget: "65 000 €",
    budgetValue: 65000,
    surface: "45 m² créés",
    horizon: "Démarrage sous 2 à 3 mois",
    propertyType: "Maison individuelle",
    isOwner: true,
    phoneVerified: true,
    city: "Toulouse (31)",
    commune: "Blagnac",
    fullName: "Julien VASSEUR",
    phone: "06 88 41 29 03",
    email: "j.vasseur.pro@gmail.com",
    address: "Chemin du Bélisaire, 31700 Blagnac",
    campaign: "Facebook Ads - Surélévation & Combles",
    basePrice: 49,
    status: "available",
    crmStage: "new",
    quoteAmount: null,
    artisanNotes: ""
  },
  {
    id: "PRO-BTP-105",
    daysAgo: 4,
    category: "construction",
    categoryLabel: "Construction Neuve",
    title: "Construction petit immeuble de 4 logements locatifs",
    description: "Projet d'investissement locatif : élévation R+1 en briques thermo-acoustiques avec parkings extérieurs. Dossier financier et permis de construire acceptés. Demande de chiffrage par lots ou entreprise générale.",
    budget: "490 000 €",
    budgetValue: 490000,
    surface: "260 m² bâti",
    horizon: "Démarrage sous 1 à 2 mois",
    propertyType: "Parcelle viabilisée",
    isOwner: true,
    phoneVerified: true,
    city: "Montpellier (34)",
    commune: "Castelnau-le-Lez",
    fullName: "Sophie LAMBERT",
    phone: "06 55 62 10 98",
    email: "sophie.lambert@immobilier.fr",
    address: "Avenue de l'Europe, 34170 Castelnau-le-Lez",
    campaign: "Facebook Ads - Petits Collectifs Neufs",
    basePrice: 69,
    status: "available",
    crmStage: "new",
    quoteAmount: null,
    artisanNotes: ""
  },
  {
    id: "PRO-BTP-106",
    daysAgo: 5,
    category: "renovation",
    categoryLabel: "Rénovation & Réhabilitation",
    title: "Rénovation complète appartement haussmannien 110 m²",
    description: "Restauration des moulures d'époque, ponçage et vitrification du parquet point de Hongrie, création d'une cuisine ouverte sur séjour et mise aux normes du tableau électrique.",
    budget: "75 000 €",
    budgetValue: 75000,
    surface: "110 m²",
    horizon: "Démarrage sous 1 à 2 mois",
    propertyType: "Appartement d'époque",
    isOwner: true,
    phoneVerified: true,
    city: "Paris (75)",
    commune: "Paris 11e",
    fullName: "Thomas RENAUD",
    phone: "06 33 77 15 42",
    email: "t.renaud@gmail.com",
    address: "Boulevard Voltaire, 75011 Paris",
    campaign: "Facebook Ads - Rénovation Appartements",
    basePrice: 49,
    status: "available",
    crmStage: "new",
    quoteAmount: null,
    artisanNotes: ""
  },
  {
    id: "PRO-BTP-107",
    daysAgo: 8,
    category: "construction",
    categoryLabel: "Construction Neuve",
    title: "Construction pavillon traditionnel 4 pièces de plain-pied",
    description: "Fondations sur vide sanitaire, maçonnerie brique et toiture tuiles terre cuite. Devis souhaité pour gros œuvre fermé ou clés en main.",
    budget: "195 000 €",
    budgetValue: 195000,
    surface: "115 m²",
    horizon: "Démarrage sous 3 mois",
    propertyType: "Terrain en lotissement",
    isOwner: true,
    phoneVerified: true,
    city: "Rennes (35)",
    commune: "Cesson-Sévigné",
    fullName: "Nathalie GIRAUD",
    phone: "06 77 12 30 45",
    email: "n.giraud@orange.fr",
    address: "Rue du Chêne Vert, 35510 Cesson-Sévigné",
    campaign: "Facebook Ads - Pavillons Neufs",
    basePrice: 49,
    status: "available",
    crmStage: "new",
    quoteAmount: null,
    artisanNotes: ""
  }
];

class BatiLeadFullStackApp {
  constructor() {
    this.deviceId = this.getOrCreateDeviceId();
    this.adminEmail = this.loadAdminEmail();
    this.currentUser = this.loadCurrentUser();
    this.leads = this.loadLeads();
    this.users = this.loadUsersRegistry();
    this.orders = this.loadOrdersRegistry();

    this.currentView = "marketplace";
    this.adminSubTab = "leads";
    this.selectedCategory = "all";
    this.selectedLeadForPurchase = null;
    this.selectedLeadForDetail = null;
    this.parsedCsvLeads = [];

    this.init();
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
  // PERSISTENT STORAGE (FULL-STACK LOCAL DATABASE)
  // =========================================================================

  getOrCreateDeviceId() {
    let device = localStorage.getItem("batilead_device_fingerprint_v5");
    if (!device) {
      device = `197.234.${Math.floor(10 + Math.random() * 80)}.${Math.floor(10 + Math.random() * 80)}`;
      localStorage.setItem("batilead_device_fingerprint_v5", device);
    }
    const el = document.getElementById("device-ip-display");
    if (el) el.textContent = `IP ${device}`;
    return device;
  }

  loadAdminEmail() {
    const saved = localStorage.getItem("batilead_master_admin_email_v5");
    return saved || "admin@batilead.pro";
  }

  saveAdminEmail(email) {
    this.adminEmail = email.trim().toLowerCase();
    localStorage.setItem("batilead_master_admin_email_v5", this.adminEmail);
    const badge = document.getElementById("admin-active-email-badge");
    if (badge) badge.textContent = this.adminEmail;
    const input = document.getElementById("settings-admin-email");
    if (input) input.value = this.adminEmail;
  }

  loadCurrentUser() {
    const saved = localStorage.getItem("batilead_current_user_v5");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return null; }
    }
    return null;
  }

  saveCurrentUser(user) {
    this.currentUser = user;
    if (user) {
      localStorage.setItem("batilead_current_user_v5", JSON.stringify(user));
      this.registerOrUpdateUserInDb(user);
    } else {
      localStorage.removeItem("batilead_current_user_v5");
    }
    this.updateAuthUi();
  }

  loadLeads() {
    const saved = localStorage.getItem("batilead_fullstack_leads_db_v5");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [...DEFAULT_LEADS];
  }

  saveLeads() {
    this.processLeadPricing();
    localStorage.setItem("batilead_fullstack_leads_db_v5", JSON.stringify(this.leads));
    this.updateCategoryCounts();
    this.updateNavCounts();
    this.renderAdminFullStack();
  }

  loadUsersRegistry() {
    const saved = localStorage.getItem("batilead_users_registry_v5");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    return [
      {
        id: "USR-001",
        name: "Entreprise BTP Martin",
        email: "contact@martin-btp.fr",
        phone: "06 12 34 56 78",
        role: "artisan",
        registeredAt: new Date(NOW - 3 * ONE_DAY_MS).toISOString(),
        ipAddress: "197.234.55.12",
        purchasedCount: 2
      }
    ];
  }

  saveUsersRegistry() {
    localStorage.setItem("batilead_users_registry_v5", JSON.stringify(this.users));
  }

  registerOrUpdateUserInDb(user) {
    let existing = this.users.find(u => u.email.toLowerCase() === user.email.toLowerCase());
    if (!existing) {
      existing = {
        id: `USR-${Math.floor(100 + Math.random() * 900)}`,
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
    const saved = localStorage.getItem("batilead_orders_registry_v5");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    return [
      {
        invoiceNumber: "FAC-2026-081",
        leadId: "PRO-BTP-101",
        leadTitle: "Construction villa d'architecte 190 m² avec piscine",
        userName: "Entreprise BTP Martin",
        userEmail: "contact@martin-btp.fr",
        amount: 59,
        timestamp: new Date(NOW - 2 * ONE_DAY_MS).toISOString(),
        paymentMethod: "Carte Bancaire (Stripe Direct)",
        status: "completed"
      }
    ];
  }

  saveOrdersRegistry() {
    localStorage.setItem("batilead_orders_registry_v5", JSON.stringify(this.orders));
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

    if (adminEmailBadge) adminEmailBadge.textContent = this.adminEmail;
    if (settingsInput) settingsInput.value = this.adminEmail;

    const isAdmin = this.currentUser && this.isSuperAdmin(this.currentUser.email);

    // Show/Hide Super-Admin tabs based on active user role
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
            <span class="text-[10px] ${isAdmin ? 'text-purple-700 font-bold' : 'text-amber-800 font-medium'}">${isAdmin ? 'Super-Administrateur' : 'Compte Pro Connecté'}</span>
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
      this.showToast(`👑 Accès Super-Admin validé pour ${email} !`);
      this.navigateTo("admin");
    } else {
      this.showToast(`Bienvenue ${name} ! Votre espace est synchronisé.`);
      this.navigateTo("crm");
    }
  }

  quickAdminLogin() {
    const user = {
      name: "Super Administrateur BatiLead",
      email: this.adminEmail,
      phone: "06 00 00 00 00",
      role: "super_admin",
      loggedAt: new Date().toISOString()
    };
    this.saveCurrentUser(user);
    this.closeModal("authModal");
    this.showToast("👑 Connexion Super-Admin réussie !");
    this.navigateTo("admin");
  }

  logoutUser() {
    this.saveCurrentUser(null);
    this.showToast("Déconnexion effectuée.");
    this.navigateTo("marketplace");
  }

  handleAdminEmailUpdate(event) {
    event.preventDefault();
    const newEmail = document.getElementById("settings-admin-email").value;
    if (!newEmail) return;
    this.saveAdminEmail(newEmail);
    this.showToast(`Adresse email Super-Admin mise à jour : ${newEmail}`);
    this.updateAuthUi();
  }

  // =========================================================================
  // PRICING & FRESHNESS
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
        lead.currentPrice = lead.basePrice || 49;
        lead.isExpired = false;
      } else if (lead.ageDays <= 5) {
        lead.ageCategory = "discounted";
        lead.ageBadgeText = `🏷️ Disponible depuis ${lead.ageDays} jours • Tarif dégressif`;
        lead.ageBadgeClass = "bg-amber-50 text-amber-800 border-amber-200/80";
        lead.pricingLabel = "Tarif Dégressif (-35%)";
        lead.currentPrice = Math.max(25, Math.round((lead.basePrice || 49) * 0.65));
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
    const saved = localStorage.getItem("batilead_unlocked_lead_ids_v5");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    return [];
  }

  saveDeviceUnlockedLeadId(leadId) {
    const ids = this.getDeviceUnlockedLeadIds();
    if (!ids.includes(leadId)) {
      ids.push(leadId);
      localStorage.setItem("batilead_unlocked_lead_ids_v5", JSON.stringify(ids));
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
      this.showToast("Accès réservé au Super-Administrateur. Veuillez vous identifier.");
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
    const first = parts[0] || "M.";
    const initial = parts[1] ? parts[1].charAt(0) : "D";
    return `${first} ${initial}. (XXXXXX)`;
  }

  getMaskedPhone(phone, isPurchased) {
    if (isPurchased) return phone;
    return "06 •• •• •• 45";
  }

  getMaskedEmail(email, isPurchased) {
    if (isPurchased) return email;
    const parts = email.split("@");
    return `${parts[0].substring(0, 3)}***@XXXXXX.com`;
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
              ${isPurchased ? '<span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">Débloqué</span>' : ''}
            </div>

            <!-- Contact masked info -->
            <div class="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 mt-1.5">
              <span class="flex items-center gap-1.5">
                <i data-lucide="phone" class="w-3 h-3 text-slate-400"></i>
                <span class="font-mono text-slate-700 font-semibold">${maskedPhone}</span>
                <span class="text-[9px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200/60">Numéro vérifié</span>
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

          <!-- Price Badge -->
          <div class="text-right shrink-0">
            ${isPurchased ? `
              <span class="text-xs font-bold text-emerald-700 font-heading">Coordonnées acquises</span>
            ` : isExpired ? `
              <span class="text-xs font-bold text-slate-400">Expiré</span>
            ` : lead.ageCategory === 'discounted' ? `
              <div class="text-base font-extrabold text-amber-700 font-heading leading-tight">${lead.currentPrice} €</div>
              <span class="text-[10px] text-slate-400 line-through">${lead.basePrice} €</span>
            ` : `
              <div class="text-base font-extrabold text-slate-900 font-heading leading-tight">${lead.currentPrice} €</div>
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

          <!-- Right: Action Button -->
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
              <i data-lucide="unlock" class="w-3.5 h-3.5"></i> Débloquer ce chantier (${lead.currentPrice} €)
            </button>
          `}
        </div>

      </div>
    `;
  }

  // =========================================================================
  // PURCHASE WORKFLOW & INVOICE / ORDER RECORDING
  // =========================================================================

  openPurchaseModal(leadId) {
    const lead = this.leads.find(l => l.id === leadId);
    if (!lead || lead.isExpired) return;

    this.selectedLeadForPurchase = lead;
    const container = document.getElementById("purchase-lead-details");
    const priceDisplay = document.getElementById("modal-lead-price-display");
    if (!container) return;

    if (priceDisplay) priceDisplay.textContent = `${lead.currentPrice} €`;

    container.innerHTML = `
      <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2.5">
        <div class="flex items-center justify-between font-semibold">
          <span class="text-amber-800 font-bold">${lead.categoryLabel}</span>
          <span class="text-slate-500">${lead.city}</span>
        </div>
        <h4 class="font-bold text-slate-900 text-sm">${lead.title}</h4>
        <p class="text-slate-600 text-xs italic">"${lead.description}"</p>
        <div class="flex items-center justify-between border-t border-slate-200/80 pt-2 text-[11px] text-slate-500">
          <span>Budget estimé : <strong class="text-slate-800">${lead.budget}</strong></span>
          <span>Démarrage : <strong class="text-slate-800">${lead.horizon}</strong></span>
        </div>
      </div>
    `;

    this.openModal("purchaseModal");
    if (window.lucide) lucide.createIcons();
  }

  confirmPurchaseLead() {
    if (!this.selectedLeadForPurchase) return;
    const lead = this.selectedLeadForPurchase;

    const buyerName = this.currentUser ? this.currentUser.name : "Artisan Partenaire";
    const buyerEmail = this.currentUser ? this.currentUser.email : "non-renseigne@client.fr";

    // Enregistrement Transaction / Commande dans la base Full-Stack
    const invoiceNum = `FAC-2026-${Math.floor(100 + Math.random() * 900)}`;
    const newOrder = {
      invoiceNumber: invoiceNum,
      leadId: lead.id,
      leadTitle: lead.title,
      userName: buyerName,
      userEmail: buyerEmail,
      amount: lead.currentPrice,
      timestamp: new Date().toISOString(),
      paymentMethod: "Carte Bancaire (Déblocage Direct)",
      status: "completed"
    };

    this.orders.unshift(newOrder);
    this.saveOrdersRegistry();

    // Enregistrement Déblocage Lead
    lead.status = "purchased";
    lead.crmStage = "new";
    lead.purchasedAt = new Date().toISOString();
    lead.invoiceNumber = invoiceNum;

    this.saveDeviceUnlockedLeadId(lead.id);
    this.saveLeads();

    // Mise à jour compteur client
    if (this.currentUser) {
      const userInDb = this.users.find(u => u.email.toLowerCase() === this.currentUser.email.toLowerCase());
      if (userInDb) {
        userInDb.purchasedCount = (userInDb.purchasedCount || 0) + 1;
        this.saveUsersRegistry();
      }
    }

    this.closeModal("purchaseModal");

    if (window.confetti) {
      confetti({ particleCount: 55, spread: 60, origin: { y: 0.6 } });
    }

    this.showToast(`Chantier #${lead.id} débloqué ! Fiche technique disponible.`);
    this.renderMarketplaceLeads();
    this.renderCrmBoard();
    this.openLeadDetailModal(lead.id);
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
            <span class="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">Coordonnées Complètes Débloquées</span>
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

      <!-- CRM Tracking -->
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
            <label class="soft-label text-[10px]">Montant Devis Émis (€)</label>
            <input type="number" class="soft-input text-xs" placeholder="ex: 45000" value="${lead.quoteAmount || ''}" onchange="app.updateLeadQuote('${lead.id}', this.value)" />
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
        <title>Fiche Technique Chantier - ${lead.id} | BatiLead Pro</title>
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
            <div class="logo">BatiLead.pro</div>
            <div style="font-size: 12px; color: #64748b;">Fiche Technique Prospect & Coordonnées Propriétaire</div>
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
            <div>Adresse Chantier : <span class="value">${lead.address || lead.city}</span></div>
          </div>
        </div>

        <div class="box">
          <h3>2. Spécifications du Projet</h3>
          <div style="font-weight: bold; font-size: 15px; margin-bottom: 8px;">${lead.title}</div>
          <div class="grid" style="margin-bottom: 12px;">
            <div>Budget Prévisionnel : <span class="value">${lead.budget}</span></div>
            <div>Surface Estimée : <span class="value">${lead.surface || 'N/A'}</span></div>
            <div>Délai d'Intervention : <span class="value">${lead.horizon}</span></div>
            <div>Type de Bien : <span class="value">${lead.propertyType || 'Bien immobilier'}</span></div>
          </div>
          <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #e2e8f0;">
            <div style="font-size: 12px; color: #64748b; margin-bottom: 4px;">Description formulée par le client :</div>
            <div style="font-style: italic;">"${lead.description}"</div>
          </div>
        </div>

        <div class="box">
          <h3>3. Reçu de Transaction & Garantie</h3>
          <div class="grid">
            <div>Montant Acquitté : <span class="value">${lead.currentPrice || lead.basePrice} € TTC</span></div>
            <div>N° Facture : <span class="value">${lead.invoiceNumber || 'FAC-2026-BTP'}</span></div>
            <div>Garantie Remplacement : <span class="value">Active 48h</span></div>
            <div>Source : <span class="value">Facebook Ads Qualifié</span></div>
          </div>
        </div>

        <div class="footer">
          Document officiel généré par BatiLead.pro pour l'usage exclusif de l'artisan acquéreur. Reproduction interdite.
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
                <span class="text-emerald-700">${lead.quoteAmount ? `${lead.quoteAmount.toLocaleString()} €` : lead.budget}</span>
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

    const totalInvest = purchased.reduce((acc, l) => acc + (l.currentPrice || l.basePrice || 49), 0);
    const totalQuotes = purchased.reduce((acc, l) => acc + (parseFloat(l.quoteAmount) || 0), 0);
    const wonLeads = purchased.filter(l => l.crmStage === "won");
    const totalWon = wonLeads.reduce((acc, l) => acc + (parseFloat(l.quoteAmount) || l.budgetValue || 0), 0);

    const sTot = document.getElementById("crm-stat-total");
    const sInv = document.getElementById("crm-stat-invest");
    const sQuo = document.getElementById("crm-stat-quotes");
    const sWon = document.getElementById("crm-stat-won");

    if (sTot) sTot.textContent = purchased.length;
    if (sInv) sInv.textContent = `${totalInvest.toLocaleString()} €`;
    if (sQuo) sQuo.textContent = `${totalQuotes.toLocaleString()} €`;
    if (sWon) sWon.textContent = `${totalWon.toLocaleString()} €`;
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
  // SUPER-ADMIN FULL-STACK SUITE
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

    if (elRev) elRev.textContent = `${totalRev.toLocaleString()} €`;
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
        <td class="py-3 px-3 font-bold text-slate-900">${lead.currentPrice} €</td>
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
        <td class="py-3 px-3 font-bold text-emerald-700">${order.amount} €</td>
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
    const price = parseFloat(document.getElementById("form-price").value) || 49;
    const desc = document.getElementById("form-description").value;

    const newLead = {
      id: `PRO-BTP-${Math.floor(100 + Math.random() * 900)}`,
      daysAgo: 1,
      category: cat,
      categoryLabel: cat === "construction" ? "Construction Neuve" : "Rénovation & Réhabilitation",
      title,
      description: desc,
      budget,
      budgetValue: parseInt(budget.replace(/[^0-9]/g, "")) || 50000,
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
    this.leads = [...DEFAULT_LEADS];
    this.saveLeads();
    this.renderMarketplaceLeads();
    this.renderAdminFullStack();
    this.renderCrmBoard();
    this.showToast("Chantiers réinitialisés.");
  }

  exportOrdersCsv() {
    if (this.orders.length === 0) {
      this.showToast("Aucune transaction enregistrée.");
      return;
    }

    const headers = ["N_Facture", "Date", "Acheteur", "Email_Acheteur", "Lead_ID", "Chantier", "Montant_EUR", "Moyen_Paiement", "Statut"];
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
    link.download = `comptabilite_batilead_${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    this.showToast("Export comptable CSV généré avec succès.");
  }

  exportFullDatabaseJson() {
    const fullDb = {
      exportedAt: new Date().toISOString(),
      adminEmail: this.adminEmail,
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
  // CSV IMPORT (FACEBOOK ADS META)
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
          budget: obj.estimated_budget || "60 000 €",
          budgetValue: 60000,
          surface: "140 m²",
          horizon: "Démarrage sous 1 à 2 mois",
          propertyType: "Bien immobilier",
          isOwner: true,
          phoneVerified: true,
          city: obj.city || "Lyon (69)",
          commune: obj.city || "Lyon",
          fullName: obj.full_name || "Prospect Qualifié",
          phone: obj.phone_number || "06 00 00 00 00",
          email: obj.email || "contact@client.fr",
          address: obj.city || "France",
          campaign: "Meta Ads CSV Import",
          basePrice: 49,
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
      "Pierre Martin,0611223344,pierre.martin@gmail.com,Bordeaux,Construction villa individuelle,280000 €,Projet de construction de maison neuve sur terrain viabilise\n" +
      "Isabelle Bernard,0699887766,isabelle.b@yahoo.fr,Lyon,Renovation maison de ville,75000 €,Travaux complets de plomberie electricite et ouverture mur porteur";
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "modele_leads_facebook_btp.csv";
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
  app = new BatiLeadFullStackApp();
});
