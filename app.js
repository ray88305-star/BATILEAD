/**
 * ==============================================================================
 * CLIMPRO CRM — APPLICATION DE GESTION D'APPORT D'AFFAIRES EN CLIMATISATION
 * Moteur complet : Gestion d'état, Calculs financiers, CRUD, Calendrier & Stockage
 * Modèle économique : 10 000 FCFA / clim (Client) | 4 000 FCFA / clim (Commission)
 * ==============================================================================
 */

// Données initiales de démonstration (Abidjan & Communes)
const SEED_DATA = {
  adminPin: "1234",
  clients: [
    {
      id: "CLI-001",
      nom: "KOUASSI",
      prenom: "Jean-Luc",
      telephone: "0707123456",
      commune: "Cocody",
      quartier: "Angré 8e Tranche",
      adresse: "Villa 42, non loin du Terminus 81/82",
      nbClimatiseurs: 3,
      dateContact: "2026-11-01",
      statut: "confirmé"
    },
    {
      id: "CLI-002",
      nom: "DIABATE",
      prenom: "Fatou",
      telephone: "0505876543",
      commune: "Marcory",
      quartier: "Zone 4",
      adresse: "Résidence Tropicale, Rue du Canal, Appt B3",
      nbClimatiseurs: 4,
      dateContact: "2026-11-03",
      statut: "confirmé"
    },
    {
      id: "CLI-003",
      nom: "KOUAME",
      prenom: "Alain",
      telephone: "0101456789",
      commune: "Yopougon",
      quartier: "Maroc",
      adresse: "Cité CIE, Pavillon 15",
      nbClimatiseurs: 2,
      dateContact: "2026-11-04",
      statut: "nouveau"
    },
    {
      id: "CLI-004",
      nom: "KONE",
      prenom: "Salimata",
      telephone: "0758963214",
      commune: "Cocody",
      quartier: "Riviera Palmeraie",
      adresse: "Rue Ministre, Résidence Les Perles",
      nbClimatiseurs: 5,
      dateContact: "2026-11-05",
      statut: "terminé"
    },
    {
      id: "CLI-005",
      nom: "ESSIS",
      prenom: "Franck",
      telephone: "0749128734",
      commune: "Bingerville",
      quartier: "Feh Kessé",
      adresse: "Cité Lauriers 2, Villa 108",
      nbClimatiseurs: 3,
      dateContact: "2026-11-06",
      statut: "intéressé"
    }
  ],
  techniciens: [
    {
      id: "TEC-001",
      nom: "BAKAYOKO",
      prenom: "Amadou",
      telephone: "0708991122",
      commune: "Cocody",
      zoneIntervention: "Cocody, Riviera, Bingerville, Plateau",
      statut: "disponible"
    },
    {
      id: "TEC-002",
      nom: "TOURE",
      prenom: "Souleymane",
      telephone: "0554332211",
      commune: "Marcory",
      zoneIntervention: "Marcory, Koumassi, Treichville, Port-Bouët",
      statut: "disponible"
    },
    {
      id: "TEC-003",
      nom: "YAO",
      prenom: "Koffi",
      telephone: "0142887766",
      commune: "Yopougon",
      zoneIntervention: "Yopougon, Attécoubé, Abobo",
      statut: "disponible"
    },
    {
      id: "TEC-004",
      nom: "SANOGO",
      prenom: "Ibrahim",
      telephone: "0787654321",
      commune: "Abobo",
      zoneIntervention: "Abobo, Anyama, Adjamé",
      statut: "indisponible"
    }
  ],
  rendezvous: [
    {
      id: "RDV-001",
      clientId: "CLI-001",
      technicienId: "TEC-001",
      dateHeure: "2026-11-09T10:00",
      nbClimatiseurs: 3,
      adresse: "Cocody Angré 8e Tranche, Villa 42",
      telephone: "0707123456",
      statut: "confirmé",
      note: "Accès facile, client prévenu la veille"
    },
    {
      id: "RDV-002",
      clientId: "CLI-002",
      technicienId: "TEC-002",
      dateHeure: "2026-11-10T14:30",
      nbClimatiseurs: 4,
      adresse: "Marcory Zone 4, Résidence Tropicale Appt B3",
      telephone: "0505876543",
      statut: "programmé",
      note: "Clims split salon + 3 chambres"
    },
    {
      id: "RDV-003",
      clientId: "CLI-003",
      technicienId: "TEC-003",
      dateHeure: "2026-11-12T09:00",
      nbClimatiseurs: 2,
      adresse: "Yopougon Maroc, Cité CIE",
      telephone: "0101456789",
      statut: "à programmer",
      note: "Le client souhaite confirmer après 18h"
    },
    {
      id: "RDV-004",
      clientId: "CLI-004",
      technicienId: "TEC-001",
      dateHeure: "2026-11-05T11:00",
      nbClimatiseurs: 5,
      adresse: "Cocody Riviera Palmeraie, Rue Ministre",
      telephone: "0758963214",
      statut: "intervention effectuée",
      note: "Terminé avec succès"
    }
  ],
  interventions: [
    {
      id: "INT-001",
      rdvId: "RDV-004",
      clientId: "CLI-004",
      technicienId: "TEC-001",
      nbClimsReel: 5,
      dateRealisation: "2026-11-05",
      montantClient: 50000,
      commissionDue: 20000,
      montantRecu: 20000,
      soldeRestant: 0,
      statutPaiement: "payé",
      commentaire: "Nettoyage complet 5 splits. Client très satisfait."
    },
    {
      id: "INT-002",
      rdvId: null,
      clientId: "CLI-002",
      technicienId: "TEC-002",
      nbClimsReel: 3,
      dateRealisation: "2026-11-04",
      montantClient: 30000,
      commissionDue: 12000,
      montantRecu: 6000,
      soldeRestant: 6000,
      statutPaiement: "partiellement payé",
      commentaire: "Acompte de 6 000 F reçu via Wave. Reste 6 000 F."
    },
    {
      id: "INT-003",
      rdvId: null,
      clientId: "CLI-001",
      technicienId: "TEC-003",
      nbClimsReel: 2,
      dateRealisation: "2026-11-06",
      montantClient: 20000,
      commissionDue: 8000,
      montantRecu: 0,
      soldeRestant: 8000,
      statutPaiement: "non payé",
      commentaire: "En attente du virement de Koffi Yao."
    }
  ],
  paiements: [
    {
      id: "PAY-001",
      interventionId: "INT-001",
      technicienId: "TEC-001",
      montant: 20000,
      datePaiement: "2026-11-05",
      modePaiement: "Wave",
      reference: "WAV-98124",
      note: "Paiement intégral commission intervention 5 clims"
    },
    {
      id: "PAY-002",
      interventionId: "INT-002",
      technicienId: "TEC-002",
      montant: 6000,
      datePaiement: "2026-11-04",
      modePaiement: "Orange Money",
      reference: "OM-44321",
      note: "Acompte versement commission"
    }
  ]
};

class ClimCRMApp {
  constructor() {
    this.storageKey = "climpro_crm_db_v1";
    this.authKey = "climpro_crm_auth_session";
    this.data = this.loadData();
    this.currentView = "dashboard";
    this.calendarCurrentDate = new Date();
    this.filters = {
      dashboard: { dateStart: "", dateEnd: "" },
      clients: { search: "", statut: "all", commune: "all", dateStart: "", dateEnd: "" },
      techniciens: { search: "", statut: "all", dateStart: "", dateEnd: "" },
      rendezvous: { search: "", statut: "all", viewMode: "list", dateStart: "", dateEnd: "" },
      interventions: { search: "", statutPaiement: "all", dateStart: "", dateEnd: "" },
      finances: { search: "", dateStart: "", dateEnd: "" }
    };
    this.activeModal = null;
    this.init();
  }

  // ==========================================
  // FILTRAGE PAR DATE & PÉRIODES
  // ==========================================
  isDateInRange(dateStr, start, end) {
    if (!dateStr) return false;
    if (!start && !end) return true;
    const d = dateStr.includes("T") ? dateStr.split("T")[0] : dateStr.substring(0, 10);
    if (start && end) return d >= start && d <= end;
    if (start) return d >= start;
    if (end) return d <= end;
    return true;
  }

  getDatePresetRange(preset) {
    const now = new Date();
    const formatYMD = (d) => {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    if (preset === "today") {
      const today = formatYMD(now);
      return { start: today, end: today };
    } else if (preset === "week") {
      const dayOfWeek = now.getDay();
      const diffToMon = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
      const mon = new Date(now);
      mon.setDate(now.getDate() + diffToMon);
      const sun = new Date(mon);
      sun.setDate(mon.getDate() + 6);
      return { start: formatYMD(mon), end: formatYMD(sun) };
    } else if (preset === "month") {
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      return { start: formatYMD(start), end: formatYMD(end) };
    }
    return { start: "", end: "" };
  }

  setDashboardDateRange(start, end) {
    this.filters.dashboard.dateStart = start || "";
    this.filters.dashboard.dateEnd = end || "";
    const sInput = document.getElementById("dashboard-date-start");
    const eInput = document.getElementById("dashboard-date-end");
    if (sInput) sInput.value = this.filters.dashboard.dateStart;
    if (eInput) eInput.value = this.filters.dashboard.dateEnd;
    this.renderDashboard();
  }

  resetDashboardDateRange() {
    this.setDashboardDateRange("", "");
  }

  setDashboardPreset(preset) {
    const range = this.getDatePresetRange(preset);
    this.setDashboardDateRange(range.start, range.end);
  }

  setFinancesDateRange(start, end) {
    this.filters.finances.dateStart = start || "";
    this.filters.finances.dateEnd = end || "";
    const sInput = document.getElementById("filter-fin-date-start");
    const eInput = document.getElementById("filter-fin-date-end");
    if (sInput) sInput.value = this.filters.finances.dateStart;
    if (eInput) eInput.value = this.filters.finances.dateEnd;
    this.renderFinances();
  }

  resetFinancesDateRange() {
    this.setFinancesDateRange("", "");
  }

  setFinancesPreset(preset) {
    const range = this.getDatePresetRange(preset);
    this.setFinancesDateRange(range.start, range.end);
  }

  // ==========================================
  // PERSISTANCE & STOCKAGE LOCAL
  // ==========================================
  loadData() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && Array.isArray(parsed.clients) && Array.isArray(parsed.techniciens)) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Erreur chargement données:", e);
    }
    // Si pas de données valides, initialiser avec SEED_DATA
    this.saveData(SEED_DATA);
    return JSON.parse(JSON.stringify(SEED_DATA));
  }

  saveData(data = this.data) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    } catch (e) {
      console.error("Erreur sauvegarde données:", e);
      this.showToast("Erreur lors de la sauvegarde locale", "error");
    }
  }

  resetToSeedData() {
    if (confirm("⚠️ Voulez-vous réinitialiser toutes les données avec les exemples d'Abidjan ? Les données actuelles seront remplacées.")) {
      this.data = JSON.parse(JSON.stringify(SEED_DATA));
      this.saveData();
      this.refreshCurrentView();
      this.showToast("✅ Données réinitialisées avec succès !", "success");
    }
  }

  clearAllData() {
    if (confirm("⛔ ATTENTION : Voulez-vous TOUT effacer (Clients, Techniciens, RDV, Finances) pour démarrer à zéro ?")) {
      this.data = {
        adminPin: "1234",
        clients: [],
        techniciens: [],
        rendezvous: [],
        interventions: [],
        paiements: []
      };
      this.saveData();
      this.refreshCurrentView();
      this.showToast("🗑️ Toutes les données ont été effacées. Base vierge prête !", "info");
    }
  }

  // ==========================================
  // AUTHENTIFICATION ADMIN
  // ==========================================
  isAuthenticated() {
    return localStorage.getItem(this.authKey) === "authenticated";
  }

  login(pin) {
    const validPin = this.data.adminPin || "1234";
    if (pin === validPin) {
      localStorage.setItem(this.authKey, "authenticated");
      this.checkAuthUi();
      this.showToast("🔐 Connexion Administrateur réussie !", "success");
      return true;
    } else {
      this.showToast("❌ Code PIN incorrect (Par défaut : 1234)", "error");
      return false;
    }
  }

  logout() {
    localStorage.removeItem(this.authKey);
    this.checkAuthUi();
    this.showToast("🔒 Déconnexion effectuée.", "info");
  }

  checkAuthUi() {
    const isAuth = this.isAuthenticated();
    const lockScreen = document.getElementById("admin-lock-screen");
    const appContainer = document.getElementById("main-app-container");

    if (lockScreen && appContainer) {
      if (isAuth) {
        lockScreen.classList.add("hidden");
        appContainer.classList.remove("hidden");
        this.refreshCurrentView();
      } else {
        lockScreen.classList.remove("hidden");
        appContainer.classList.add("hidden");
        const pinInput = document.getElementById("admin-pin-input");
        if (pinInput) {
          pinInput.value = "";
          pinInput.focus();
        }
      }
    }
  }

  // ==========================================
  // INITIALISATION
  // ==========================================
  init() {
    this.checkAuthUi();
    this.setupEventListeners();
    if (this.isAuthenticated()) {
      this.navigateTo("dashboard");
    }
    if (window.lucide) lucide.createIcons();
  }

  setupEventListeners() {
    // PIN Login Form
    const loginForm = document.getElementById("admin-login-form");
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const pin = document.getElementById("admin-pin-input").value.trim();
        this.login(pin);
      });
    }

    // Navigation Tabs
    document.querySelectorAll("[data-nav-target]").forEach(btn => {
      btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-nav-target");
        this.navigateTo(target);
        this.closeMobileDrawer();
      });
    });

    // Mobile drawer toggle
    const openDrawerBtn = document.getElementById("btn-open-mobile-drawer");
    const closeDrawerBtn = document.getElementById("btn-close-mobile-drawer");
    const backdrop = document.getElementById("mobile-drawer-backdrop");

    if (openDrawerBtn) openDrawerBtn.addEventListener("click", () => this.openMobileDrawer());
    if (closeDrawerBtn) closeDrawerBtn.addEventListener("click", () => this.closeMobileDrawer());
    if (backdrop) backdrop.addEventListener("click", () => this.closeMobileDrawer());

    // Fermeture des modales lors du clic sur l'arrière-plan
    document.querySelectorAll(".modal-overlay").forEach(overlay => {
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
          this.closeModal(overlay.id);
        }
      });
    });
  }

  openMobileDrawer() {
    const drawer = document.getElementById("mobile-drawer");
    const backdrop = document.getElementById("mobile-drawer-backdrop");
    if (drawer) drawer.classList.remove("-translate-x-full");
    if (backdrop) backdrop.classList.remove("hidden");
  }

  closeMobileDrawer() {
    const drawer = document.getElementById("mobile-drawer");
    const backdrop = document.getElementById("mobile-drawer-backdrop");
    if (drawer) drawer.classList.add("-translate-x-full");
    if (backdrop) backdrop.classList.add("hidden");
  }

  // ==========================================
  // NAVIGATION ENTRE RUBRIQUES
  // ==========================================
  navigateTo(viewName) {
    this.currentView = viewName;

    // Masquer toutes les vues
    document.querySelectorAll(".view-section").forEach(sec => {
      sec.classList.add("hidden");
    });

    // Afficher la vue demandée
    const activeSec = document.getElementById(`view-${viewName}`);
    if (activeSec) {
      activeSec.classList.remove("hidden");
    }

    // Mettre à jour les onglets actifs dans la sidebar desktop & mobile
    document.querySelectorAll("[data-nav-target]").forEach(btn => {
      if (btn.getAttribute("data-nav-target") === viewName) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    // Actualiser le contenu spécifique
    this.renderView(viewName);
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (window.lucide) lucide.createIcons();
  }

  refreshCurrentView() {
    this.renderView(this.currentView);
    if (window.lucide) lucide.createIcons();
  }

  renderView(viewName) {
    switch (viewName) {
      case "dashboard":
        this.renderDashboard();
        break;
      case "clients":
        this.renderClients();
        break;
      case "techniciens":
        this.renderTechniciens();
        break;
      case "rendezvous":
        this.renderRendezVous();
        break;
      case "interventions":
        this.renderInterventions();
        break;
      case "finances":
        this.renderFinances();
        break;
    }
  }

  // ==========================================
  // 1. TABLEAU DE BORD (DASHBOARD)
  // ==========================================
  renderDashboard() {
    const { dateStart, dateEnd } = this.filters.dashboard;
    const isFiltered = Boolean(dateStart || dateEnd);

    // Mise à jour du badge de période
    const badge = document.getElementById("dashboard-date-range-badge");
    if (badge) {
      if (isFiltered) {
        if (dateStart && dateEnd) {
          badge.textContent = `Du ${this.formatDateFR(dateStart)} au ${this.formatDateFR(dateEnd)}`;
        } else if (dateStart) {
          badge.textContent = `Depuis le ${this.formatDateFR(dateStart)}`;
        } else {
          badge.textContent = `Jusqu'au ${this.formatDateFR(dateEnd)}`;
        }
        badge.className = "text-[11px] font-bold text-sky-700 bg-sky-100 px-2.5 py-0.5 rounded-full border border-sky-300";
      } else {
        badge.textContent = "Toutes les dates";
        badge.className = "text-[11px] font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200";
      }
    }

    // Données filtrées selon la période sélectionnée
    const clientsInPeriod = isFiltered
      ? this.data.clients.filter(c => this.isDateInRange(c.dateContact, dateStart, dateEnd))
      : this.data.clients;

    const rdvInPeriod = isFiltered
      ? this.data.rendezvous.filter(r => this.isDateInRange(r.dateHeure, dateStart, dateEnd))
      : this.data.rendezvous;

    const interventionsInPeriod = isFiltered
      ? this.data.interventions.filter(i => this.isDateInRange(i.dateRealisation, dateStart, dateEnd))
      : this.data.interventions;

    // Calculs indicateurs
    const totalClients = clientsInPeriod.length;

    let totalTechs = this.data.techniciens.length;
    if (isFiltered) {
      const activeTechIds = new Set();
      interventionsInPeriod.forEach(inv => activeTechIds.add(inv.technicienId));
      rdvInPeriod.forEach(r => { if (r.technicienId) activeTechIds.add(r.technicienId); });
      totalTechs = activeTechIds.size;
    }

    // RDV à venir : programmés, confirmés, ou à programmer
    const rdvAVenir = rdvInPeriod.filter(r =>
      ["programmé", "confirmé", "à programmer"].includes(r.statut)
    ).length;

    const interventionsRealisees = interventionsInPeriod.length;

    // Interventions en attente (RDV confirmés/programmés non encore convertis en intervention)
    const interventionsEnAttente = rdvInPeriod.filter(r =>
      ["confirmé", "programmé"].includes(r.statut)
    ).length;

    // Commissions encaissées et restant à recevoir
    let commissionsRecues = 0;
    let commissionsRestantes = 0;
    let chiffreAffairesClients = 0;

    interventionsInPeriod.forEach(inv => {
      commissionsRecues += Number(inv.montantRecu || 0);
      commissionsRestantes += Number(inv.soldeRestant || 0);
      chiffreAffairesClients += Number(inv.montantClient || 0);
    });

    const beneficeTotal = commissionsRecues;

    // Mise à jour des cartes KPI
    document.getElementById("kpi-clients-count").textContent = totalClients;
    document.getElementById("kpi-techs-count").textContent = isFiltered ? `${totalTechs} actif${totalTechs > 1 ? 's' : ''}` : totalTechs;
    document.getElementById("kpi-rdv-count").textContent = rdvAVenir;
    document.getElementById("kpi-interventions-count").textContent = interventionsRealisees;
    document.getElementById("kpi-attente-count").textContent = interventionsEnAttente;
    document.getElementById("kpi-commissions-recues").textContent = this.formatFCFA(commissionsRecues);
    document.getElementById("kpi-commissions-restantes").textContent = this.formatFCFA(commissionsRestantes);
    document.getElementById("kpi-benefice-total").textContent = this.formatFCFA(beneficeTotal);

    // Widget : Prochains Rendez-vous
    this.renderDashboardUpcomingRdv(rdvInPeriod);

    // Widget : Dernières Interventions
    this.renderDashboardRecentInterventions(interventionsInPeriod);
  }

  renderDashboardUpcomingRdv(sourceRdv = null) {
    const container = document.getElementById("dashboard-upcoming-rdv-list");
    if (!container) return;

    const list = sourceRdv || this.data.rendezvous;
    const upcoming = list
      .filter(r => ["programmé", "confirmé", "à programmer"].includes(r.statut))
      .sort((a, b) => new Date(a.dateHeure) - new Date(b.dateHeure))
      .slice(0, 5);

    if (upcoming.length === 0) {
      container.innerHTML = `
        <div class="text-center py-8 text-slate-400">
          <i data-lucide="calendar-check" class="w-10 h-10 mx-auto mb-2 text-slate-300"></i>
          <p class="text-xs">Aucun rendez-vous pour cette période.</p>
          <button class="btn-primary text-xs py-1.5 px-3 rounded-lg mt-3 inline-flex items-center gap-1.5" onclick="app.openModalRdv()">
            <i data-lucide="plus" class="w-3.5 h-3.5"></i> Programmer un RDV
          </button>
        </div>
      `;
      return;
    }

    container.innerHTML = upcoming.map(rdv => {
      const client = this.getClientById(rdv.clientId);
      const tech = this.getTechnicienById(rdv.technicienId);
      const clientName = client ? `${client.prenom} ${client.nom}` : "Client non spécifié";
      const techName = tech ? `${tech.prenom} ${tech.nom}` : "Non affecté";

      return `
        <div class="p-3 bg-white border border-slate-200/80 rounded-xl hover:border-sky-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <span class="font-bold text-xs text-slate-900">${clientName}</span>
              ${this.renderBadgeRdvStatut(rdv.statut)}
            </div>
            <div class="text-[11px] text-slate-500 flex items-center gap-3 flex-wrap">
              <span>📅 ${this.formatDateTimeFR(rdv.dateHeure)}</span>
              <span>📍 ${rdv.adresse || (client ? `${client.commune}, ${client.quartier}` : '')}</span>
              <span>❄️ <strong>${rdv.nbClimatiseurs}</strong> clims</span>
            </div>
            <div class="text-[11px] text-sky-800 font-medium">
              🔧 Technicien : <strong>${techName}</strong>
            </div>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <button class="px-2.5 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg text-xs font-bold flex items-center gap-1 border border-emerald-200 transition-colors" title="Convertir en intervention réalisée" onclick="app.convertRdvToIntervention('${rdv.id}')">
              <i data-lucide="check-circle" class="w-3.5 h-3.5"></i> Effectué
            </button>
            <button class="p-1.5 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-lg text-xs" title="Modifier" onclick="app.openModalRdv('${rdv.id}')">
              <i data-lucide="edit-3" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </div>
      `;
    }).join("");
  }

  renderDashboardRecentInterventions(sourceInterventions = null) {
    const container = document.getElementById("dashboard-recent-interventions-list");
    if (!container) return;

    const list = sourceInterventions || this.data.interventions;
    const recent = [...list]
      .sort((a, b) => new Date(b.dateRealisation) - new Date(a.dateRealisation))
      .slice(0, 5);

    if (recent.length === 0) {
      container.innerHTML = `
        <div class="text-center py-8 text-slate-400">
          <i data-lucide="check-square" class="w-10 h-10 mx-auto mb-2 text-slate-300"></i>
          <p class="text-xs">Aucune intervention enregistrée pour cette période.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = recent.map(inv => {
      const client = this.getClientById(inv.clientId);
      const tech = this.getTechnicienById(inv.technicienId);
      const clientName = client ? `${client.prenom} ${client.nom}` : "Client";
      const techName = tech ? `${tech.prenom} ${tech.nom}` : "Technicien";

      return `
        <div class="p-3 bg-white border border-slate-200/80 rounded-xl hover:border-sky-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <span class="font-bold text-xs text-slate-900">${clientName}</span>
              <span class="text-[10px] text-slate-400">• ${techName}</span>
              ${this.renderBadgePaiementStatut(inv.statutPaiement)}
            </div>
            <div class="text-[11px] text-slate-500 flex items-center gap-3">
              <span>🗓️ ${this.formatDateFR(inv.dateRealisation)}</span>
              <span>❄️ <strong>${inv.nbClimsReel}</strong> clims nettoyés</span>
              <span class="font-mono text-slate-700 font-bold">Client : ${this.formatFCFA(inv.montantClient)}</span>
            </div>
          </div>
          <div class="text-right shrink-0">
            <div class="text-xs font-bold text-sky-700 font-mono">Commission : ${this.formatFCFA(inv.commissionDue)}</div>
            <div class="text-[11px] ${inv.soldeRestant > 0 ? 'text-amber-600 font-bold' : 'text-emerald-600'}">
              ${inv.soldeRestant > 0 ? `Reste : ${this.formatFCFA(inv.soldeRestant)}` : '✅ Intégralement Payé'}
            </div>
          </div>
        </div>
      `;
    }).join("");
  }

  // ==========================================
  // 2. GESTION DES CLIENTS
  // ==========================================
  renderClients() {
    const listContainer = document.getElementById("clients-table-body");
    const countBadge = document.getElementById("clients-count-badge");
    if (!listContainer) return;

    let filtered = [...this.data.clients];

    // Recherche
    const searchVal = this.filters.clients.search.toLowerCase().trim();
    if (searchVal) {
      filtered = filtered.filter(c =>
        c.nom.toLowerCase().includes(searchVal) ||
        c.prenom.toLowerCase().includes(searchVal) ||
        c.telephone.includes(searchVal) ||
        c.commune.toLowerCase().includes(searchVal) ||
        c.quartier.toLowerCase().includes(searchVal)
      );
    }

    // Filtre statut
    if (this.filters.clients.statut !== "all") {
      filtered = filtered.filter(c => c.statut === this.filters.clients.statut);
    }

    // Filtre commune
    if (this.filters.clients.commune !== "all") {
      filtered = filtered.filter(c => c.commune.toLowerCase() === this.filters.clients.commune.toLowerCase());
    }

    // Filtre date contact
    if (this.filters.clients.dateStart || this.filters.clients.dateEnd) {
      filtered = filtered.filter(c =>
        this.isDateInRange(c.dateContact, this.filters.clients.dateStart, this.filters.clients.dateEnd)
      );
    }

    if (countBadge) countBadge.textContent = `${filtered.length} client${filtered.length > 1 ? 's' : ''}`;

    if (filtered.length === 0) {
      listContainer.innerHTML = `
        <tr>
          <td colspan="7" class="text-center py-12 text-slate-400">
            <i data-lucide="users" class="w-10 h-10 mx-auto mb-2 text-slate-300"></i>
            <p class="text-xs">Aucun client trouvé avec ces filtres.</p>
          </td>
        </tr>
      `;
      return;
    }

    listContainer.innerHTML = filtered.map(client => {
      const waLink = this.getWhatsAppLink(client.telephone, `Bonjour ${client.prenom}, je vous contacte concernant le nettoyage de vos climatiseurs.`);

      return `
        <tr class="hover:bg-slate-50/80 transition-colors border-b border-slate-100">
          <td class="py-3 px-4">
            <div class="font-bold text-xs text-slate-900">${client.prenom} ${client.nom}</div>
            <div class="text-[10px] text-slate-400">Contacté le ${this.formatDateFR(client.dateContact)}</div>
          </td>
          <td class="py-3 px-4">
            <div class="flex items-center gap-2">
              <span class="font-mono text-xs font-semibold text-slate-800">${client.telephone}</span>
              <a href="tel:${client.telephone}" class="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600" title="Appeler">
                <i data-lucide="phone" class="w-3 h-3"></i>
              </a>
              <a href="${waLink}" target="_blank" class="p-1 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-700" title="WhatsApp">
                <i data-lucide="message-circle" class="w-3 h-3"></i>
              </a>
            </div>
          </td>
          <td class="py-3 px-4">
            <div class="text-xs font-medium text-slate-800">${client.commune}</div>
            <div class="text-[11px] text-slate-500">${client.quartier}</div>
          </td>
          <td class="py-3 px-4">
            <div class="text-xs text-slate-600 max-w-xs truncate" title="${client.adresse}">${client.adresse}</div>
          </td>
          <td class="py-3 px-4 text-center">
            <span class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-sky-50 text-sky-800 font-bold text-xs font-mono">
              ${client.nbClimatiseurs}
            </span>
          </td>
          <td class="py-3 px-4">
            ${this.renderBadgeClientStatut(client.statut)}
          </td>
          <td class="py-3 px-4 text-right">
            <div class="flex items-center justify-end gap-1.5">
              <button class="px-2.5 py-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-bold flex items-center gap-1 border border-sky-200" title="Planifier un rendez-vous" onclick="app.quickScheduleRdvForClient('${client.id}')">
                <i data-lucide="calendar-plus" class="w-3.5 h-3.5"></i> Planifier RDV
              </button>
              <button class="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600" title="Modifier" onclick="app.openModalClient('${client.id}')">
                <i data-lucide="edit-3" class="w-3.5 h-3.5"></i>
              </button>
              <button class="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600" title="Supprimer" onclick="app.deleteClient('${client.id}')">
                <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join("");
  }

  // ==========================================
  // 3. GESTION DES TECHNICIENS
  // ==========================================
  renderTechniciens() {
    const tableBody = document.getElementById("techniciens-table-body");
    const countBadge = document.getElementById("techniciens-count-badge");
    if (!tableBody) return;

    let filtered = [...this.data.techniciens];

    // Recherche
    const searchVal = this.filters.techniciens.search.toLowerCase().trim();
    if (searchVal) {
      filtered = filtered.filter(t =>
        t.nom.toLowerCase().includes(searchVal) ||
        t.prenom.toLowerCase().includes(searchVal) ||
        t.telephone.includes(searchVal) ||
        t.commune.toLowerCase().includes(searchVal) ||
        t.zoneIntervention.toLowerCase().includes(searchVal)
      );
    }

    // Filtre statut
    if (this.filters.techniciens.statut !== "all") {
      filtered = filtered.filter(t => t.statut === this.filters.techniciens.statut);
    }

    if (countBadge) countBadge.textContent = `${filtered.length} technicien${filtered.length > 1 ? 's' : ''}`;

    if (filtered.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="7" class="text-center py-12 text-slate-400">
            <i data-lucide="wrench" class="w-10 h-10 mx-auto mb-2 text-slate-300"></i>
            <p class="text-xs">Aucun technicien trouvé.</p>
          </td>
        </tr>
      `;
      return;
    }

    tableBody.innerHTML = filtered.map(tech => {
      // Statistiques dynamiques du technicien (filtrées par date si sélectionnée)
      const techInvs = this.data.interventions.filter(i => {
        if (i.technicienId !== tech.id) return false;
        return this.isDateInRange(i.dateRealisation, this.filters.techniciens.dateStart, this.filters.techniciens.dateEnd);
      });
      const nbInterventions = techInvs.length;

      let totalCommissionDue = 0;
      let totalMontantRecu = 0;
      techInvs.forEach(i => {
        totalCommissionDue += Number(i.commissionDue || 0);
        totalMontantRecu += Number(i.montantRecu || 0);
      });
      const soldeRestantDu = totalCommissionDue - totalMontantRecu;

      const waReminder = this.getWhatsAppLink(
        tech.telephone,
        `Bonjour ${tech.prenom}, point sur nos interventions : tu as un solde de commissions de ${this.formatFCFA(soldeRestantDu)} à reverser. Merci de faire le versement Wave / Orange Money dès que possible.`
      );

      return `
        <tr class="hover:bg-slate-50/80 transition-colors border-b border-slate-100">
          <td class="py-3 px-4">
            <div class="font-bold text-xs text-slate-900">${tech.prenom} ${tech.nom}</div>
            <div class="text-[11px] text-slate-500">Commune de base : ${tech.commune}</div>
          </td>
          <td class="py-3 px-4">
            <div class="flex items-center gap-2">
              <span class="font-mono text-xs font-semibold text-slate-800">${tech.telephone}</span>
              <a href="tel:${tech.telephone}" class="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600" title="Appeler">
                <i data-lucide="phone" class="w-3 h-3"></i>
              </a>
              <a href="${waReminder}" target="_blank" class="p-1 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-700" title="Contacter / Relancer WhatsApp">
                <i data-lucide="message-circle" class="w-3 h-3"></i>
              </a>
            </div>
          </td>
          <td class="py-3 px-4">
            <div class="text-xs text-slate-700 max-w-xs truncate" title="${tech.zoneIntervention}">${tech.zoneIntervention}</div>
          </td>
          <td class="py-3 px-4">
            <button onclick="app.toggleTechnicienStatut('${tech.id}')" class="badge-status cursor-pointer ${tech.statut === 'disponible' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-600 border border-slate-200'}" title="Cliquer pour changer la disponibilité">
              <span class="w-1.5 h-1.5 rounded-full ${tech.statut === 'disponible' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}"></span>
              ${tech.statut === 'disponible' ? 'Disponible' : 'Indisponible'}
            </button>
          </td>
          <td class="py-3 px-4 text-center">
            <span class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-100 text-slate-800 font-bold text-xs font-mono">
              ${nbInterventions}
            </span>
          </td>
          <td class="py-3 px-4 font-mono text-xs text-right">
            <div class="font-bold text-slate-900">Total : ${this.formatFCFA(totalCommissionDue)}</div>
            <div class="text-emerald-700 text-[11px]">Reversé : ${this.formatFCFA(totalMontantRecu)}</div>
            <div class="text-[11px] font-bold ${soldeRestantDu > 0 ? 'text-amber-600' : 'text-slate-400'}">
              Reste dû : ${this.formatFCFA(soldeRestantDu)}
            </div>
          </td>
          <td class="py-3 px-4 text-right">
            <div class="flex items-center justify-end gap-1.5">
              ${soldeRestantDu > 0 ? `
                <button class="px-2 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold border border-emerald-200 flex items-center gap-1" title="Enregistrer un versement reçu" onclick="app.openModalPaiementForTech('${tech.id}')">
                  <i data-lucide="hand-coins" class="w-3.5 h-3.5"></i> Encaisser
                </button>
              ` : ''}
              <button class="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600" title="Modifier" onclick="app.openModalTechnicien('${tech.id}')">
                <i data-lucide="edit-3" class="w-3.5 h-3.5"></i>
              </button>
              <button class="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600" title="Supprimer" onclick="app.deleteTechnicien('${tech.id}')">
                <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join("");
  }

  toggleTechnicienStatut(techId) {
    const tech = this.getTechnicienById(techId);
    if (!tech) return;
    tech.statut = tech.statut === "disponible" ? "indisponible" : "disponible";
    this.saveData();
    this.renderTechniciens();
    this.showToast(`Statut de ${tech.prenom} mis à jour : ${tech.statut}`, "info");
  }

  // ==========================================
  // 4. GESTION DES RENDEZ-VOUS (LISTE + CALENDRIER)
  // ==========================================
  renderRendezVous() {
    const viewMode = this.filters.rendezvous.viewMode;
    const listSection = document.getElementById("rdv-view-list");
    const calendarSection = document.getElementById("rdv-view-calendar");
    const tabListBtn = document.getElementById("btn-rdv-toggle-list");
    const tabCalBtn = document.getElementById("btn-rdv-toggle-calendar");

    if (viewMode === "calendar") {
      if (listSection) listSection.classList.add("hidden");
      if (calendarSection) calendarSection.classList.remove("hidden");
      if (tabListBtn) tabListBtn.classList.remove("bg-white", "shadow-sm", "text-sky-700");
      if (tabCalBtn) tabCalBtn.classList.add("bg-white", "shadow-sm", "text-sky-700");
      this.renderCalendar();
    } else {
      if (listSection) listSection.classList.remove("hidden");
      if (calendarSection) calendarSection.classList.add("hidden");
      if (tabListBtn) tabListBtn.classList.add("bg-white", "shadow-sm", "text-sky-700");
      if (tabCalBtn) tabCalBtn.classList.remove("bg-white", "shadow-sm", "text-sky-700");
      this.renderRdvTable();
    }
  }

  setRdvViewMode(mode) {
    this.filters.rendezvous.viewMode = mode;
    this.renderRendezVous();
  }

  renderRdvTable() {
    const tableBody = document.getElementById("rdv-table-body");
    const countBadge = document.getElementById("rdv-count-badge");
    if (!tableBody) return;

    let filtered = [...this.data.rendezvous];

    // Recherche
    const searchVal = this.filters.rendezvous.search.toLowerCase().trim();
    if (searchVal) {
      filtered = filtered.filter(r => {
        const client = this.getClientById(r.clientId);
        const tech = this.getTechnicienById(r.technicienId);
        const clientStr = client ? `${client.nom} ${client.prenom} ${client.telephone}`.toLowerCase() : "";
        const techStr = tech ? `${tech.nom} ${tech.prenom}`.toLowerCase() : "";
        return clientStr.includes(searchVal) || techStr.includes(searchVal) || (r.adresse || "").toLowerCase().includes(searchVal);
      });
    }

    // Filtre statut
    if (this.filters.rendezvous.statut !== "all") {
      filtered = filtered.filter(r => r.statut === this.filters.rendezvous.statut);
    }

    // Filtre date
    if (this.filters.rendezvous.dateStart || this.filters.rendezvous.dateEnd) {
      filtered = filtered.filter(r =>
        this.isDateInRange(r.dateHeure, this.filters.rendezvous.dateStart, this.filters.rendezvous.dateEnd)
      );
    }

    // Tri par date
    filtered.sort((a, b) => new Date(b.dateHeure) - new Date(a.dateHeure));

    if (countBadge) countBadge.textContent = `${filtered.length} rendez-vous`;

    if (filtered.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="7" class="text-center py-12 text-slate-400">
            <i data-lucide="calendar" class="w-10 h-10 mx-auto mb-2 text-slate-300"></i>
            <p class="text-xs">Aucun rendez-vous trouvé.</p>
          </td>
        </tr>
      `;
      return;
    }

    tableBody.innerHTML = filtered.map(rdv => {
      const client = this.getClientById(rdv.clientId);
      const tech = this.getTechnicienById(rdv.technicienId);
      const clientName = client ? `${client.prenom} ${client.nom}` : "Client inconnu";
      const techName = tech ? `${tech.prenom} ${tech.nom}` : `<span class="text-amber-600 font-bold">Non affecté</span>`;
      const phone = rdv.telephone || (client ? client.telephone : "");

      return `
        <tr class="hover:bg-slate-50/80 transition-colors border-b border-slate-100">
          <td class="py-3 px-4">
            <div class="font-bold text-xs text-slate-900">${this.formatDateTimeFR(rdv.dateHeure)}</div>
            <div class="text-[10px] text-slate-400 font-mono">${rdv.id}</div>
          </td>
          <td class="py-3 px-4">
            <div class="font-bold text-xs text-slate-900">${clientName}</div>
            <div class="text-[11px] text-slate-500 font-mono flex items-center gap-1.5">
              <span>${phone}</span>
              <a href="tel:${phone}" class="text-slate-400 hover:text-slate-600"><i data-lucide="phone" class="w-3 h-3"></i></a>
            </div>
          </td>
          <td class="py-3 px-4">
            <div class="text-xs text-slate-700 max-w-xs truncate" title="${rdv.adresse}">${rdv.adresse || "—"}</div>
          </td>
          <td class="py-3 px-4 text-center">
            <span class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-sky-50 text-sky-800 font-bold text-xs font-mono">
              ${rdv.nbClimatiseurs}
            </span>
          </td>
          <td class="py-3 px-4">
            <div class="text-xs font-semibold text-slate-800">${techName}</div>
          </td>
          <td class="py-3 px-4">
            ${this.renderBadgeRdvStatut(rdv.statut)}
          </td>
          <td class="py-3 px-4 text-right">
            <div class="flex items-center justify-end gap-1.5">
              ${rdv.statut !== "intervention effectuée" && rdv.statut !== "annulé" ? `
                <button class="px-2 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold border border-emerald-200 flex items-center gap-1" title="Valider et enregistrer l'intervention réalisée" onclick="app.convertRdvToIntervention('${rdv.id}')">
                  <i data-lucide="check-circle" class="w-3.5 h-3.5"></i> Effectué
                </button>
              ` : ''}
              <button class="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600" title="Modifier" onclick="app.openModalRdv('${rdv.id}')">
                <i data-lucide="edit-3" class="w-3.5 h-3.5"></i>
              </button>
              <button class="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600" title="Supprimer" onclick="app.deleteRdv('${rdv.id}')">
                <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join("");
  }

  // CALENDRIER MENSUEL INTERACTIF
  renderCalendar() {
    const calendarTitle = document.getElementById("calendar-month-title");
    const calendarGrid = document.getElementById("calendar-grid-days");
    if (!calendarGrid) return;

    const year = this.calendarCurrentDate.getFullYear();
    const month = this.calendarCurrentDate.getMonth();

    const monthNames = [
      "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
      "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ];

    if (calendarTitle) {
      calendarTitle.textContent = `${monthNames[month]} ${year}`;
    }

    // Premier jour du mois et nombre de jours
    const firstDayIndex = new Date(year, month, 1).getDay(); // 0 = Dimanche
    // Adapter au format Lundi = 0, Dimanche = 6
    const startingDay = (firstDayIndex === 0) ? 6 : firstDayIndex - 1;
    const totalDays = new Date(year, month + 1, 0).getDate();
    const prevMonthTotalDays = new Date(year, month, 0).getDate();

    const today = new Date();
    const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

    let html = "";

    // Jours du mois précédent (inactifs)
    for (let i = startingDay; i > 0; i--) {
      const dayNum = prevMonthTotalDays - i + 1;
      html += `
        <div class="calendar-day-cell p-2 bg-slate-50/50 border border-slate-100 text-slate-300 opacity-60">
          <span class="text-xs font-bold">${dayNum}</span>
        </div>
      `;
    }

    // Jours du mois actuel
    for (let day = 1; day <= totalDays; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const isToday = isCurrentMonth && today.getDate() === day;

      // Filtrer les RDV de ce jour
      const dayRdv = this.data.rendezvous.filter(r => {
        return (r.dateHeure || "").startsWith(dateStr);
      });

      html += `
        <div class="calendar-day-cell p-2 bg-white border border-slate-200/80 ${isToday ? 'calendar-day-today' : ''} flex flex-col justify-between cursor-pointer hover:border-sky-400 group" onclick="app.showDayRdvModal('${dateStr}')">
          <div class="flex items-center justify-between mb-1">
            <span class="text-xs font-extrabold ${isToday ? 'text-sky-600 bg-sky-100 px-1.5 py-0.5 rounded-full' : 'text-slate-700'}">${day}</span>
            ${dayRdv.length > 0 ? `<span class="w-2 h-2 rounded-full bg-sky-500"></span>` : ''}
          </div>
          <div class="space-y-1 overflow-y-auto max-h-16">
            ${dayRdv.map(r => {
              const client = this.getClientById(r.clientId);
              const name = client ? client.nom : "RDV";
              return `
                <div class="text-[10px] p-1 rounded bg-sky-50 text-sky-800 font-bold truncate border border-sky-100" title="${name} - ${r.nbClimatiseurs} clims">
                  ${r.dateHeure.split('T')[1] || ''} ${name} (${r.nbClimatiseurs}c)
                </div>
              `;
            }).join("")}
          </div>
        </div>
      `;
    }

    calendarGrid.innerHTML = html;
  }

  calendarPrevMonth() {
    this.calendarCurrentDate.setMonth(this.calendarCurrentDate.getMonth() - 1);
    this.renderCalendar();
  }

  calendarNextMonth() {
    this.calendarCurrentDate.setMonth(this.calendarCurrentDate.getMonth() + 1);
    this.renderCalendar();
  }

  calendarToday() {
    this.calendarCurrentDate = new Date();
    this.renderCalendar();
  }

  showDayRdvModal(dateStr) {
    const dayRdv = this.data.rendezvous.filter(r => (r.dateHeure || "").startsWith(dateStr));
    if (dayRdv.length === 0) {
      if (confirm(`Aucun rendez-vous le ${this.formatDateFR(dateStr)}. Souhaitez-vous en planifier un pour cette date ?`)) {
        this.openModalRdv(null, { dateHeure: `${dateStr}T10:00` });
      }
      return;
    }

    // Ouvrir la vue liste filtrée ou proposer la gestion
    this.filters.rendezvous.search = dateStr;
    this.setRdvViewMode("list");
  }

  // ==========================================
  // 5. GESTION DES INTERVENTIONS
  // ==========================================
  renderInterventions() {
    const tableBody = document.getElementById("interventions-table-body");
    const countBadge = document.getElementById("interventions-count-badge");
    if (!tableBody) return;

    let filtered = [...this.data.interventions];

    // Recherche
    const searchVal = this.filters.interventions.search.toLowerCase().trim();
    if (searchVal) {
      filtered = filtered.filter(i => {
        const client = this.getClientById(i.clientId);
        const tech = this.getTechnicienById(i.technicienId);
        const clientStr = client ? `${client.nom} ${client.prenom}`.toLowerCase() : "";
        const techStr = tech ? `${tech.nom} ${tech.prenom}`.toLowerCase() : "";
        return clientStr.includes(searchVal) || techStr.includes(searchVal) || (i.commentaire || "").toLowerCase().includes(searchVal);
      });
    }

    // Filtre statut paiement
    if (this.filters.interventions.statutPaiement !== "all") {
      filtered = filtered.filter(i => i.statutPaiement === this.filters.interventions.statutPaiement);
    }

    // Filtre date intervention
    if (this.filters.interventions.dateStart || this.filters.interventions.dateEnd) {
      filtered = filtered.filter(i =>
        this.isDateInRange(i.dateRealisation, this.filters.interventions.dateStart, this.filters.interventions.dateEnd)
      );
    }

    // Tri par date
    filtered.sort((a, b) => new Date(b.dateRealisation) - new Date(a.dateRealisation));

    if (countBadge) countBadge.textContent = `${filtered.length} intervention${filtered.length > 1 ? 's' : ''}`;

    if (filtered.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="8" class="text-center py-12 text-slate-400">
            <i data-lucide="check-square" class="w-10 h-10 mx-auto mb-2 text-slate-300"></i>
            <p class="text-xs">Aucune intervention enregistrée.</p>
          </td>
        </tr>
      `;
      return;
    }

    tableBody.innerHTML = filtered.map(inv => {
      const client = this.getClientById(inv.clientId);
      const tech = this.getTechnicienById(inv.technicienId);
      const clientName = client ? `${client.prenom} ${client.nom}` : "Client";
      const techName = tech ? `${tech.prenom} ${tech.nom}` : "Technicien";

      return `
        <tr class="hover:bg-slate-50/80 transition-colors border-b border-slate-100">
          <td class="py-3 px-4">
            <div class="font-bold text-xs text-slate-900">${this.formatDateFR(inv.dateRealisation)}</div>
            <div class="text-[10px] text-slate-400 font-mono">${inv.id}</div>
          </td>
          <td class="py-3 px-4">
            <div class="font-bold text-xs text-slate-900">${clientName}</div>
            <div class="text-[11px] text-slate-500">${client ? client.commune : ''}</div>
          </td>
          <td class="py-3 px-4">
            <div class="text-xs font-semibold text-slate-800">${techName}</div>
          </td>
          <td class="py-3 px-4 text-center">
            <span class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-sky-50 text-sky-800 font-bold text-xs font-mono">
              ${inv.nbClimsReel}
            </span>
          </td>
          <td class="py-3 px-4 font-mono text-xs text-slate-800 font-bold">
            ${this.formatFCFA(inv.montantClient)}
          </td>
          <td class="py-3 px-4 font-mono text-xs text-sky-800 font-extrabold">
            ${this.formatFCFA(inv.commissionDue)}
          </td>
          <td class="py-3 px-4 font-mono text-xs">
            <div class="text-emerald-700 font-bold">Reçu : ${this.formatFCFA(inv.montantRecu)}</div>
            <div class="${inv.soldeRestant > 0 ? 'text-amber-600 font-bold' : 'text-slate-400 text-[11px]'}">
              Reste : ${this.formatFCFA(inv.soldeRestant)}
            </div>
          </td>
          <td class="py-3 px-4">
            ${this.renderBadgePaiementStatut(inv.statutPaiement)}
          </td>
          <td class="py-3 px-4 text-right">
            <div class="flex items-center justify-end gap-1.5">
              ${inv.soldeRestant > 0 ? `
                <button class="px-2 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold border border-emerald-200 flex items-center gap-1" title="Encaisser un versement sur cette intervention" onclick="app.openModalPaiementForIntervention('${inv.id}')">
                  <i data-lucide="hand-coins" class="w-3.5 h-3.5"></i> Encaisser
                </button>
              ` : ''}
              <button class="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600" title="Modifier" onclick="app.openModalIntervention('${inv.id}')">
                <i data-lucide="edit-3" class="w-3.5 h-3.5"></i>
              </button>
              <button class="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600" title="Supprimer" onclick="app.deleteIntervention('${inv.id}')">
                <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join("");
  }

  // ==========================================
  // 6. GESTION FINANCIÈRE AUTOMATIQUE
  // ==========================================
  renderFinances() {
    const { dateStart, dateEnd } = this.filters.finances;
    const isFiltered = Boolean(dateStart || dateEnd);

    // Mise à jour du badge de période financière
    const badge = document.getElementById("finances-date-badge");
    if (badge) {
      if (isFiltered) {
        if (dateStart && dateEnd) {
          badge.textContent = `Du ${this.formatDateFR(dateStart)} au ${this.formatDateFR(dateEnd)}`;
        } else if (dateStart) {
          badge.textContent = `Depuis le ${this.formatDateFR(dateStart)}`;
        } else {
          badge.textContent = `Jusqu'au ${this.formatDateFR(dateEnd)}`;
        }
        badge.className = "text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300";
      } else {
        badge.textContent = "Toutes les dates";
        badge.className = "text-[11px] font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200";
      }
    }

    const filteredInterventions = isFiltered
      ? this.data.interventions.filter(i => this.isDateInRange(i.dateRealisation, dateStart, dateEnd))
      : this.data.interventions;

    let totalClientCA = 0;
    let totalCommissionsDues = 0;
    let totalCommissionsEncaissees = 0;
    let totalSoldeRestant = 0;

    filteredInterventions.forEach(inv => {
      totalClientCA += Number(inv.montantClient || 0);
      totalCommissionsDues += Number(inv.commissionDue || 0);
      totalCommissionsEncaissees += Number(inv.montantRecu || 0);
      totalSoldeRestant += Number(inv.soldeRestant || 0);
    });

    const totalPartTechniciens = totalClientCA - totalCommissionsDues;

    // Cartes financières
    document.getElementById("fin-total-ca").textContent = this.formatFCFA(totalClientCA);
    document.getElementById("fin-part-techs").textContent = this.formatFCFA(totalPartTechniciens);
    document.getElementById("fin-commissions-dues").textContent = this.formatFCFA(totalCommissionsDues);
    document.getElementById("fin-commissions-recues").textContent = this.formatFCFA(totalCommissionsEncaissees);
    document.getElementById("fin-solde-restant").textContent = this.formatFCFA(totalSoldeRestant);

    // Tableau : Suivi par Technicien
    this.renderFinancesTechSummary(filteredInterventions);

    // Tableau : Journal des Règlements
    this.renderFinancesPaymentJournal(dateStart, dateEnd);
  }

  renderFinancesTechSummary(sourceInterventions = null) {
    const tableBody = document.getElementById("finances-tech-table-body");
    if (!tableBody) return;

    if (this.data.techniciens.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="6" class="text-center py-6 text-slate-400 text-xs">Aucun technicien.</td></tr>`;
      return;
    }

    const interventionsList = sourceInterventions || this.data.interventions;

    tableBody.innerHTML = this.data.techniciens.map(tech => {
      const techInvs = interventionsList.filter(i => i.technicienId === tech.id);
      let dues = 0;
      let recu = 0;
      techInvs.forEach(i => {
        dues += Number(i.commissionDue || 0);
        recu += Number(i.montantRecu || 0);
      });
      const restant = dues - recu;

      const waMsg = this.getWhatsAppLink(
        tech.telephone,
        `Bonjour ${tech.prenom}, voici ton point financier sur Bativo/ClimPro : Tu as ${this.formatFCFA(restant)} de commissions en attente. Merci de régulariser par Wave ou Orange Money.`
      );

      return `
        <tr class="hover:bg-slate-50 border-b border-slate-100">
          <td class="py-2.5 px-3">
            <div class="font-bold text-xs text-slate-900">${tech.prenom} ${tech.nom}</div>
            <div class="text-[10px] text-slate-400 font-mono">${tech.telephone}</div>
          </td>
          <td class="py-2.5 px-3 text-center font-mono text-xs">${techInvs.length}</td>
          <td class="py-2.5 px-3 text-right font-mono text-xs font-bold text-slate-900">${this.formatFCFA(dues)}</td>
          <td class="py-2.5 px-3 text-right font-mono text-xs font-bold text-emerald-700">${this.formatFCFA(recu)}</td>
          <td class="py-2.5 px-3 text-right font-mono text-xs font-extrabold ${restant > 0 ? 'text-amber-600' : 'text-slate-400'}">
            ${this.formatFCFA(restant)}
          </td>
          <td class="py-2.5 px-3 text-right">
            <div class="flex items-center justify-end gap-1.5">
              ${restant > 0 ? `
                <a href="${waMsg}" target="_blank" class="px-2 py-1 rounded bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-[11px] font-bold border border-emerald-200 flex items-center gap-1" title="Relancer sur WhatsApp">
                  <i data-lucide="message-circle" class="w-3 h-3"></i> Relancer
                </a>
                <button class="px-2 py-1 rounded bg-sky-50 text-sky-700 hover:bg-sky-100 text-[11px] font-bold border border-sky-200 flex items-center gap-1" onclick="app.openModalPaiementForTech('${tech.id}')">
                  <i data-lucide="plus" class="w-3.5 h-3.5"></i> Encaisser
                </button>
              ` : `
                <span class="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">À jour ✅</span>
              `}
            </div>
          </td>
        </tr>
      `;
    }).join("");
  }

  renderFinancesPaymentJournal(dateStart = "", dateEnd = "") {
    const tableBody = document.getElementById("finances-journal-table-body");
    if (!tableBody) return;

    let payments = [...this.data.paiements];
    if (dateStart || dateEnd) {
      payments = payments.filter(p => this.isDateInRange(p.datePaiement, dateStart, dateEnd));
    }
    payments.sort((a, b) => new Date(b.datePaiement) - new Date(a.datePaiement));

    if (payments.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="6" class="text-center py-8 text-slate-400 text-xs">Aucun versement enregistré pour cette période.</td></tr>`;
      return;
    }

    tableBody.innerHTML = payments.map(pay => {
      const tech = this.getTechnicienById(pay.technicienId);
      const techName = tech ? `${tech.prenom} ${tech.nom}` : "Technicien";

      return `
        <tr class="hover:bg-slate-50 border-b border-slate-100">
          <td class="py-2.5 px-3 text-xs font-bold text-slate-800">${this.formatDateFR(pay.datePaiement)}</td>
          <td class="py-2.5 px-3 text-xs font-semibold text-slate-900">${techName}</td>
          <td class="py-2.5 px-3 font-mono text-xs font-extrabold text-emerald-700">${this.formatFCFA(pay.montant)}</td>
          <td class="py-2.5 px-3 text-xs">
            <span class="px-2 py-0.5 rounded-md bg-slate-100 font-bold text-slate-700 text-[10px]">${pay.modePaiement}</span>
          </td>
          <td class="py-2.5 px-3 text-xs text-slate-500 max-w-xs truncate">${pay.note || "Versement commission"}</td>
          <td class="py-2.5 px-3 text-right">
            <button class="p-1 rounded text-rose-500 hover:bg-rose-50" title="Supprimer ce versement" onclick="app.deletePaiement('${pay.id}')">
              <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
            </button>
          </td>
        </tr>
      `;
    }).join("");
  }

  // ==========================================
  // MODALES & ACTIONS CRUD
  // ==========================================
  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove("hidden");
      this.activeModal = modalId;
    }
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add("hidden");
      if (this.activeModal === modalId) this.activeModal = null;
    }
  }

  // CLIENT CRUD
  openModalClient(clientId = null) {
    const form = document.getElementById("form-client");
    if (!form) return;
    form.reset();

    const titleEl = document.getElementById("modal-client-title");
    document.getElementById("client-id-field").value = clientId || "";

    if (clientId) {
      const client = this.getClientById(clientId);
      if (client) {
        if (titleEl) titleEl.textContent = "Modifier le Client";
        document.getElementById("client-nom").value = client.nom || "";
        document.getElementById("client-prenom").value = client.prenom || "";
        document.getElementById("client-telephone").value = client.telephone || "";
        document.getElementById("client-commune").value = client.commune || "";
        document.getElementById("client-quartier").value = client.quartier || "";
        document.getElementById("client-adresse").value = client.adresse || "";
        document.getElementById("client-nb-clims").value = client.nbClimatiseurs || 1;
        document.getElementById("client-date-contact").value = client.dateContact || new Date().toISOString().split('T')[0];
        document.getElementById("client-statut").value = client.statut || "nouveau";
      }
    } else {
      if (titleEl) titleEl.textContent = "Nouveau Client";
      document.getElementById("client-date-contact").value = new Date().toISOString().split('T')[0];
    }

    this.openModal("modal-client");
  }

  saveClient(e) {
    e.preventDefault();
    const id = document.getElementById("client-id-field").value;
    const clientData = {
      nom: document.getElementById("client-nom").value.trim().toUpperCase(),
      prenom: document.getElementById("client-prenom").value.trim(),
      telephone: document.getElementById("client-telephone").value.trim(),
      commune: document.getElementById("client-commune").value.trim(),
      quartier: document.getElementById("client-quartier").value.trim(),
      adresse: document.getElementById("client-adresse").value.trim(),
      nbClimatiseurs: Number(document.getElementById("client-nb-clims").value) || 1,
      dateContact: document.getElementById("client-date-contact").value || new Date().toISOString().split('T')[0],
      statut: document.getElementById("client-statut").value
    };

    if (id) {
      const idx = this.data.clients.findIndex(c => c.id === id);
      if (idx !== -1) {
        this.data.clients[idx] = { ...this.data.clients[idx], ...clientData };
        this.showToast("Client modifié avec succès !", "success");
      }
    } else {
      const newId = `CLI-${String(Date.now()).slice(-4)}`;
      this.data.clients.unshift({ id: newId, ...clientData });
      this.showToast("Nouveau client ajouté !", "success");
    }

    this.saveData();
    this.closeModal("modal-client");
    this.refreshCurrentView();
  }

  deleteClient(clientId) {
    const client = this.getClientById(clientId);
    if (!client) return;
    if (confirm(`Voulez-vous supprimer le client ${client.prenom} ${client.nom} ?`)) {
      this.data.clients = this.data.clients.filter(c => c.id !== clientId);
      this.saveData();
      this.refreshCurrentView();
      this.showToast("Client supprimé.", "info");
    }
  }

  quickScheduleRdvForClient(clientId) {
    const client = this.getClientById(clientId);
    if (!client) return;
    this.openModalRdv(null, {
      clientId: client.id,
      nbClimatiseurs: client.nbClimatiseurs,
      adresse: `${client.commune}, ${client.quartier} - ${client.adresse}`,
      telephone: client.telephone
    });
  }

  // TECHNICIEN CRUD
  openModalTechnicien(techId = null) {
    const form = document.getElementById("form-technicien");
    if (!form) return;
    form.reset();

    const titleEl = document.getElementById("modal-technicien-title");
    document.getElementById("technicien-id-field").value = techId || "";

    if (techId) {
      const tech = this.getTechnicienById(techId);
      if (tech) {
        if (titleEl) titleEl.textContent = "Modifier le Technicien";
        document.getElementById("tech-nom").value = tech.nom || "";
        document.getElementById("tech-prenom").value = tech.prenom || "";
        document.getElementById("tech-telephone").value = tech.telephone || "";
        document.getElementById("tech-commune").value = tech.commune || "";
        document.getElementById("tech-zone").value = tech.zoneIntervention || "";
        document.getElementById("tech-statut").value = tech.statut || "disponible";
      }
    } else {
      if (titleEl) titleEl.textContent = "Nouveau Technicien Partenaire";
    }

    this.openModal("modal-technicien");
  }

  saveTechnicien(e) {
    e.preventDefault();
    const id = document.getElementById("technicien-id-field").value;
    const techData = {
      nom: document.getElementById("tech-nom").value.trim().toUpperCase(),
      prenom: document.getElementById("tech-prenom").value.trim(),
      telephone: document.getElementById("tech-telephone").value.trim(),
      commune: document.getElementById("tech-commune").value.trim(),
      zoneIntervention: document.getElementById("tech-zone").value.trim(),
      statut: document.getElementById("tech-statut").value
    };

    if (id) {
      const idx = this.data.techniciens.findIndex(t => t.id === id);
      if (idx !== -1) {
        this.data.techniciens[idx] = { ...this.data.techniciens[idx], ...techData };
        this.showToast("Technicien modifié avec succès !", "success");
      }
    } else {
      const newId = `TEC-${String(Date.now()).slice(-4)}`;
      this.data.techniciens.unshift({ id: newId, ...techData });
      this.showToast("Nouveau technicien enregistré !", "success");
    }

    this.saveData();
    this.closeModal("modal-technicien");
    this.refreshCurrentView();
  }

  deleteTechnicien(techId) {
    const tech = this.getTechnicienById(techId);
    if (!tech) return;
    if (confirm(`Voulez-vous supprimer le technicien ${tech.prenom} ${tech.nom} ?`)) {
      this.data.techniciens = this.data.techniciens.filter(t => t.id !== techId);
      this.saveData();
      this.refreshCurrentView();
      this.showToast("Technicien supprimé.", "info");
    }
  }

  // RENDEZ-VOUS CRUD
  openModalRdv(rdvId = null, prefill = null) {
    const form = document.getElementById("form-rdv");
    if (!form) return;
    form.reset();

    // Remplir les menus déroulants Clients & Techniciens
    this.populateClientSelect("rdv-client-select");
    this.populateTechnicienSelect("rdv-technicien-select");

    const titleEl = document.getElementById("modal-rdv-title");
    document.getElementById("rdv-id-field").value = rdvId || "";

    if (rdvId) {
      const rdv = this.getRdvById(rdvId);
      if (rdv) {
        if (titleEl) titleEl.textContent = "Modifier le Rendez-vous";
        document.getElementById("rdv-client-select").value = rdv.clientId || "";
        document.getElementById("rdv-technicien-select").value = rdv.technicienId || "";
        document.getElementById("rdv-date-heure").value = rdv.dateHeure || "";
        document.getElementById("rdv-nb-clims").value = rdv.nbClimatiseurs || 1;
        document.getElementById("rdv-adresse").value = rdv.adresse || "";
        document.getElementById("rdv-telephone").value = rdv.telephone || "";
        document.getElementById("rdv-statut").value = rdv.statut || "programmé";
        document.getElementById("rdv-note").value = rdv.note || "";
      }
    } else {
      if (titleEl) titleEl.textContent = "Programmer un Rendez-vous";
      // Définir date par défaut : demain à 10h
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(10, 0, 0, 0);
      document.getElementById("rdv-date-heure").value = tomorrow.toISOString().slice(0, 16);

      if (prefill) {
        if (prefill.clientId) document.getElementById("rdv-client-select").value = prefill.clientId;
        if (prefill.nbClimatiseurs) document.getElementById("rdv-nb-clims").value = prefill.nbClimatiseurs;
        if (prefill.adresse) document.getElementById("rdv-adresse").value = prefill.adresse;
        if (prefill.telephone) document.getElementById("rdv-telephone").value = prefill.telephone;
        if (prefill.dateHeure) document.getElementById("rdv-date-heure").value = prefill.dateHeure;
      }
    }

    this.openModal("modal-rdv");
  }

  onRdvClientSelected() {
    const clientId = document.getElementById("rdv-client-select").value;
    const client = this.getClientById(clientId);
    if (client) {
      document.getElementById("rdv-telephone").value = client.telephone || "";
      document.getElementById("rdv-adresse").value = `${client.commune}, ${client.quartier} - ${client.adresse}`;
      document.getElementById("rdv-nb-clims").value = client.nbClimatiseurs || 1;
    }
  }

  saveRdv(e) {
    e.preventDefault();
    const id = document.getElementById("rdv-id-field").value;
    const rdvData = {
      clientId: document.getElementById("rdv-client-select").value,
      technicienId: document.getElementById("rdv-technicien-select").value,
      dateHeure: document.getElementById("rdv-date-heure").value,
      nbClimatiseurs: Number(document.getElementById("rdv-nb-clims").value) || 1,
      adresse: document.getElementById("rdv-adresse").value.trim(),
      telephone: document.getElementById("rdv-telephone").value.trim(),
      statut: document.getElementById("rdv-statut").value,
      note: document.getElementById("rdv-note").value.trim()
    };

    if (id) {
      const idx = this.data.rendezvous.findIndex(r => r.id === id);
      if (idx !== -1) {
        this.data.rendezvous[idx] = { ...this.data.rendezvous[idx], ...rdvData };
        this.showToast("Rendez-vous mis à jour !", "success");
      }
    } else {
      const newId = `RDV-${String(Date.now()).slice(-4)}`;
      this.data.rendezvous.unshift({ id: newId, ...rdvData });
      this.showToast("Rendez-vous programmé avec succès !", "success");
    }

    this.saveData();
    this.closeModal("modal-rdv");
    this.refreshCurrentView();
  }

  deleteRdv(rdvId) {
    if (confirm("Voulez-vous supprimer ce rendez-vous ?")) {
      this.data.rendezvous = this.data.rendezvous.filter(r => r.id !== rdvId);
      this.saveData();
      this.refreshCurrentView();
      this.showToast("Rendez-vous supprimé.", "info");
    }
  }

  convertRdvToIntervention(rdvId) {
    const rdv = this.getRdvById(rdvId);
    if (!rdv) return;

    // Mettre à jour le statut du RDV
    rdv.statut = "intervention effectuée";
    this.saveData();

    // Ouvrir immédiatement la modale d'intervention avec préremplissage
    this.openModalIntervention(null, {
      rdvId: rdv.id,
      clientId: rdv.clientId,
      technicienId: rdv.technicienId,
      nbClimsReel: rdv.nbClimatiseurs,
      dateRealisation: rdv.dateHeure.split('T')[0] || new Date().toISOString().split('T')[0]
    });
  }

  // INTERVENTION CRUD & CALCULS AUTOMATIQUES
  openModalIntervention(invId = null, prefill = null) {
    const form = document.getElementById("form-intervention");
    if (!form) return;
    form.reset();

    this.populateClientSelect("inv-client-select");
    this.populateTechnicienSelect("inv-technicien-select");

    const titleEl = document.getElementById("modal-intervention-title");
    document.getElementById("inv-id-field").value = invId || "";
    document.getElementById("inv-rdv-id-field").value = prefill ? prefill.rdvId || "" : "";

    if (invId) {
      const inv = this.getInterventionById(invId);
      if (inv) {
        if (titleEl) titleEl.textContent = "Modifier l'Intervention";
        document.getElementById("inv-client-select").value = inv.clientId || "";
        document.getElementById("inv-technicien-select").value = inv.technicienId || "";
        document.getElementById("inv-nb-clims").value = inv.nbClimsReel || 1;
        document.getElementById("inv-date-realisation").value = inv.dateRealisation || "";
        document.getElementById("inv-montant-client").value = inv.montantClient || 10000;
        document.getElementById("inv-commission-due").value = inv.commissionDue || 4000;
        document.getElementById("inv-montant-recu").value = inv.montantRecu || 0;
        document.getElementById("inv-commentaire").value = inv.commentaire || "";
        document.getElementById("inv-rdv-id-field").value = inv.rdvId || "";
      }
    } else {
      if (titleEl) titleEl.textContent = "Enregistrer une Intervention Réalisée";
      document.getElementById("inv-date-realisation").value = new Date().toISOString().split('T')[0];

      if (prefill) {
        if (prefill.clientId) document.getElementById("inv-client-select").value = prefill.clientId;
        if (prefill.technicienId) document.getElementById("inv-technicien-select").value = prefill.technicienId;
        if (prefill.nbClimsReel) document.getElementById("inv-nb-clims").value = prefill.nbClimsReel;
        if (prefill.dateRealisation) document.getElementById("inv-date-realisation").value = prefill.dateRealisation;
      }
    }

    this.calculateInterventionFinancials();
    this.openModal("modal-intervention");
  }

  // Calcul automatique des montants : 10 000 FCFA / clim pour le client, 4 000 FCFA / clim pour l'apporteur
  calculateInterventionFinancials() {
    const nbClims = Number(document.getElementById("inv-nb-clims").value) || 0;
    const montantClientInput = document.getElementById("inv-montant-client");
    const commissionDueInput = document.getElementById("inv-commission-due");
    const montantRecuInput = document.getElementById("inv-montant-recu");
    const soldeRestantPreview = document.getElementById("inv-solde-preview");
    const partTechPreview = document.getElementById("inv-part-tech-preview");

    // Calcul automatique standard
    const montantClient = nbClims * 10000;
    const commissionDue = nbClims * 4000;
    const partTech = montantClient - commissionDue;

    if (montantClientInput && (!montantClientInput.value || montantClientInput.dataset.auto !== "false")) {
      montantClientInput.value = montantClient;
    }
    if (commissionDueInput && (!commissionDueInput.value || commissionDueInput.dataset.auto !== "false")) {
      commissionDueInput.value = commissionDue;
    }

    const currentCommission = Number(commissionDueInput.value) || commissionDue;
    const recu = Number(montantRecuInput.value) || 0;
    const soldeRestant = Math.max(0, currentCommission - recu);

    if (soldeRestantPreview) {
      soldeRestantPreview.textContent = this.formatFCFA(soldeRestant);
    }
    if (partTechPreview) {
      partTechPreview.textContent = this.formatFCFA(partTech);
    }
  }

  saveIntervention(e) {
    e.preventDefault();
    const id = document.getElementById("inv-id-field").value;
    const rdvId = document.getElementById("inv-rdv-id-field").value;

    const nbClimsReel = Number(document.getElementById("inv-nb-clims").value) || 1;
    const montantClient = Number(document.getElementById("inv-montant-client").value) || (nbClimsReel * 10000);
    const commissionDue = Number(document.getElementById("inv-commission-due").value) || (nbClimsReel * 4000);
    const montantRecu = Number(document.getElementById("inv-montant-recu").value) || 0;
    const soldeRestant = Math.max(0, commissionDue - montantRecu);

    let statutPaiement = "non payé";
    if (soldeRestant === 0 && commissionDue > 0) statutPaiement = "payé";
    else if (montantRecu > 0) statutPaiement = "partiellement payé";

    const invData = {
      rdvId: rdvId || null,
      clientId: document.getElementById("inv-client-select").value,
      technicienId: document.getElementById("inv-technicien-select").value,
      nbClimsReel,
      dateRealisation: document.getElementById("inv-date-realisation").value,
      montantClient,
      commissionDue,
      montantRecu,
      soldeRestant,
      statutPaiement,
      commentaire: document.getElementById("inv-commentaire").value.trim()
    };

    if (id) {
      const idx = this.data.interventions.findIndex(i => i.id === id);
      if (idx !== -1) {
        this.data.interventions[idx] = { ...this.data.interventions[idx], ...invData };
        this.showToast("Intervention mise à jour !", "success");
      }
    } else {
      const newId = `INT-${String(Date.now()).slice(-4)}`;
      this.data.interventions.unshift({ id: newId, ...invData });

      // Si un versement initial a été saisi immédiatement
      if (montantRecu > 0) {
        this.data.paiements.unshift({
          id: `PAY-${String(Date.now()).slice(-4)}`,
          interventionId: newId,
          technicienId: invData.technicienId,
          montant: montantRecu,
          datePaiement: invData.dateRealisation,
          modePaiement: "Wave",
          reference: "Paiement direct à la saisie",
          note: "Enregistré lors de la clôture d'intervention"
        });
      }

      this.showToast("Intervention enregistrée avec succès !", "success");
    }

    this.saveData();
    this.closeModal("modal-intervention");
    this.refreshCurrentView();
  }

  deleteIntervention(invId) {
    if (confirm("Voulez-vous supprimer cette fiche d'intervention ?")) {
      this.data.interventions = this.data.interventions.filter(i => i.id !== invId);
      this.saveData();
      this.refreshCurrentView();
      this.showToast("Intervention supprimée.", "info");
    }
  }

  // ENCAISSEMENT & RÈGLEMENT DES COMMISSIONS
  openModalPaiementForTech(techId) {
    const tech = this.getTechnicienById(techId);
    if (!tech) return;

    this.openModalPaiement({
      technicienId: tech.id,
      montant: this.getTechSoldeRestant(tech.id)
    });
  }

  openModalPaiementForIntervention(invId) {
    const inv = this.getInterventionById(invId);
    if (!inv) return;

    this.openModalPaiement({
      interventionId: inv.id,
      technicienId: inv.technicienId,
      montant: inv.soldeRestant
    });
  }

  openModalPaiement(prefill = null) {
    const form = document.getElementById("form-paiement");
    if (!form) return;
    form.reset();

    this.populateTechnicienSelect("pay-technicien-select");
    document.getElementById("pay-date").value = new Date().toISOString().split('T')[0];
    document.getElementById("pay-inv-id-field").value = prefill ? prefill.interventionId || "" : "";

    if (prefill) {
      if (prefill.technicienId) document.getElementById("pay-technicien-select").value = prefill.technicienId;
      if (prefill.montant) document.getElementById("pay-montant").value = prefill.montant;
    }

    this.openModal("modal-paiement");
  }

  savePaiement(e) {
    e.preventDefault();
    const techId = document.getElementById("pay-technicien-select").value;
    const montant = Number(document.getElementById("pay-montant").value) || 0;
    const invId = document.getElementById("pay-inv-id-field").value;
    const modePaiement = document.getElementById("pay-mode").value;
    const ref = document.getElementById("pay-reference").value.trim();
    const note = document.getElementById("pay-note").value.trim();
    const datePaiement = document.getElementById("pay-date").value || new Date().toISOString().split('T')[0];

    if (montant <= 0) {
      alert("Veuillez saisir un montant supérieur à 0 FCFA.");
      return;
    }

    // 1. Enregistrer le paiement dans le journal
    const newPayId = `PAY-${String(Date.now()).slice(-4)}`;
    this.data.paiements.unshift({
      id: newPayId,
      interventionId: invId || null,
      technicienId: techId,
      montant,
      datePaiement,
      modePaiement,
      reference: ref,
      note
    });

    // 2. Mettre à jour les interventions associées (réduire le solde)
    let montantRestantAImputer = montant;

    if (invId) {
      const targetInv = this.getInterventionById(invId);
      if (targetInv) {
        targetInv.montantRecu = Number(targetInv.montantRecu || 0) + montant;
        targetInv.soldeRestant = Math.max(0, targetInv.commissionDue - targetInv.montantRecu);
        targetInv.statutPaiement = targetInv.soldeRestant <= 0 ? "payé" : "partiellement payé";
        montantRestantAImputer = 0;
      }
    }

    // Si c'est un versement global pour le technicien, apurer ses interventions les plus anciennes
    if (montantRestantAImputer > 0) {
      const unpaidInvs = this.data.interventions
        .filter(i => i.technicienId === techId && i.soldeRestant > 0)
        .sort((a, b) => new Date(a.dateRealisation) - new Date(b.dateRealisation));

      for (const inv of unpaidInvs) {
        if (montantRestantAImputer <= 0) break;
        const besoin = inv.soldeRestant;
        const versementSurCetteInv = Math.min(montantRestantAImputer, besoin);
        inv.montantRecu += versementSurCetteInv;
        inv.soldeRestant = Math.max(0, inv.commissionDue - inv.montantRecu);
        inv.statutPaiement = inv.soldeRestant <= 0 ? "payé" : "partiellement payé";
        montantRestantAImputer -= versementSurCetteInv;
      }
    }

    this.saveData();
    this.closeModal("modal-paiement");
    this.refreshCurrentView();
    this.showToast(`✅ Versement de ${this.formatFCFA(montant)} enregistré avec succès !`, "success");
  }

  deletePaiement(payId) {
    if (confirm("Voulez-vous supprimer ce versement du journal ? (Attention, cela n'annule pas les imputations d'interventions)")) {
      this.data.paiements = this.data.paiements.filter(p => p.id !== payId);
      this.saveData();
      this.refreshCurrentView();
      this.showToast("Versement supprimé.", "info");
    }
  }

  // ==========================================
  // HELPERS ET OUTILS
  // ==========================================
  getClientById(id) {
    return this.data.clients.find(c => c.id === id);
  }

  getTechnicienById(id) {
    return this.data.techniciens.find(t => t.id === id);
  }

  getRdvById(id) {
    return this.data.rendezvous.find(r => r.id === id);
  }

  getInterventionById(id) {
    return this.data.interventions.find(i => i.id === id);
  }

  getTechSoldeRestant(techId) {
    const techInvs = this.data.interventions.filter(i => i.technicienId === techId);
    let dues = 0;
    let recu = 0;
    techInvs.forEach(i => {
      dues += Number(i.commissionDue || 0);
      recu += Number(i.montantRecu || 0);
    });
    return Math.max(0, dues - recu);
  }

  populateClientSelect(selectId) {
    const sel = document.getElementById(selectId);
    if (!sel) return;
    sel.innerHTML = '<option value="">-- Sélectionner un client --</option>' +
      this.data.clients.map(c => `
        <option value="${c.id}">${c.prenom} ${c.nom} (${c.commune} - ${c.nbClimatiseurs} clims)</option>
      `).join("");
  }

  populateTechnicienSelect(selectId) {
    const sel = document.getElementById(selectId);
    if (!sel) return;
    sel.innerHTML = '<option value="">-- Sélectionner un technicien --</option>' +
      this.data.techniciens.map(t => `
        <option value="${t.id}">${t.prenom} ${t.nom} (${t.statut === 'disponible' ? '🟢 Dispo' : '⚪ Indispo'} - ${t.commune})</option>
      `).join("");
  }

  formatFCFA(montant) {
    return new Intl.NumberFormat("fr-FR").format(Number(montant) || 0) + " FCFA";
  }

  formatDateFR(dateStr) {
    if (!dateStr) return "—";
    try {
      const parts = dateStr.split("-");
      if (parts.length === 3) {
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
      }
      return new Date(dateStr).toLocaleDateString("fr-FR");
    } catch (e) {
      return dateStr;
    }
  }

  formatDateTimeFR(dateTimeStr) {
    if (!dateTimeStr) return "—";
    try {
      const [d, t] = dateTimeStr.split("T");
      const parts = d.split("-");
      const dateFormatee = `${parts[2]}/${parts[1]}/${parts[0]}`;
      return `${dateFormatee} à ${t || '00:00'}`;
    } catch (e) {
      return dateTimeStr;
    }
  }

  getWhatsAppLink(phone, message = "") {
    if (!phone) return "#";
    // Nettoyer les espaces et caractères
    let clean = phone.replace(/[\s\-\(\)\.]/g, "");
    if (!clean.startsWith("+") && !clean.startsWith("225")) {
      clean = "225" + clean;
    } else if (clean.startsWith("+")) {
      clean = clean.replace("+", "");
    }
    return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;
  }

  // Badges de statuts
  renderBadgeClientStatut(statut) {
    const map = {
      nouveau: { label: "Nouveau", cls: "bg-blue-50 text-blue-700 border-blue-200" },
      intéressé: { label: "Intéressé", cls: "bg-amber-50 text-amber-700 border-amber-200" },
      confirmé: { label: "Confirmé", cls: "bg-emerald-50 text-emerald-700 border-emerald-200" },
      terminé: { label: "Terminé", cls: "bg-slate-100 text-slate-700 border-slate-200" },
      annulé: { label: "Annulé", cls: "bg-rose-50 text-rose-700 border-rose-200" }
    };
    const s = map[statut] || { label: statut, cls: "bg-slate-100 text-slate-700 border-slate-200" };
    return `<span class="badge-status border ${s.cls}">${s.label}</span>`;
  }

  renderBadgeRdvStatut(statut) {
    const map = {
      "à programmer": { label: "À programmer", cls: "bg-amber-50 text-amber-700 border-amber-200" },
      "programmé": { label: "Programmé", cls: "bg-sky-50 text-sky-700 border-sky-200" },
      "confirmé": { label: "Confirmé", cls: "bg-emerald-50 text-emerald-700 border-emerald-200" },
      "intervention effectuée": { label: "Effectué ✅", cls: "bg-emerald-100 text-emerald-800 border-emerald-300" },
      "reporté": { label: "Reporté", cls: "bg-purple-50 text-purple-700 border-purple-200" },
      "annulé": { label: "Annulé", cls: "bg-rose-50 text-rose-700 border-rose-200" }
    };
    const s = map[statut] || { label: statut, cls: "bg-slate-100 text-slate-700 border-slate-200" };
    return `<span class="badge-status border ${s.cls}">${s.label}</span>`;
  }

  renderBadgePaiementStatut(statut) {
    const map = {
      "non payé": { label: "Non payé", cls: "bg-rose-50 text-rose-700 border-rose-200" },
      "partiellement payé": { label: "Partiel", cls: "bg-amber-50 text-amber-700 border-amber-200" },
      "payé": { label: "Payé ✅", cls: "bg-emerald-50 text-emerald-700 border-emerald-200" }
    };
    const s = map[statut] || { label: statut, cls: "bg-slate-100 text-slate-700 border-slate-200" };
    return `<span class="badge-status border ${s.cls}">${s.label}</span>`;
  }

  // Toasts
  showToast(message, type = "info") {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    const colors = {
      success: "bg-emerald-900/90 text-white border-emerald-700",
      error: "bg-rose-900/90 text-white border-rose-700",
      info: "bg-slate-900/90 text-white border-slate-700"
    };

    toast.className = `toast-msg px-4 py-3 rounded-xl border shadow-xl flex items-center gap-2 text-xs font-semibold backdrop-blur-md ${colors[type] || colors.info}`;
    toast.innerHTML = `<span>${message}</span>`;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px)";
      toast.style.transition = "all 0.2s ease";
      setTimeout(() => toast.remove(), 250);
    }, 3200);
  }

  // SAUVEGARDE & RESTAURATION JSON
  exportDataJson() {
    const jsonStr = JSON.stringify(this.data, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sauvegarde_climpro_crm_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    this.showToast("📁 Fichier de sauvegarde téléchargé !", "success");
  }

  importDataJson(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        if (parsed && Array.isArray(parsed.clients) && Array.isArray(parsed.techniciens)) {
          this.data = parsed;
          this.saveData();
          this.refreshCurrentView();
          this.showToast("🎉 Données restaurées avec succès !", "success");
        } else {
          alert("Fichier de sauvegarde non conforme.");
        }
      } catch (err) {
        alert("Erreur lors de la lecture du fichier JSON.");
      }
    };
    reader.readAsText(file);
  }
}

// Lancement global
window.app = new ClimCRMApp();
