-- =========================================================================
-- BatiLead Pro — Schéma de Base de Données Supabase (PostgreSQL)
-- Passerelle GeniusPay CI (Wave, Orange, MTN, Moov) & 12 Leads de Test
-- =========================================================================

-- 1. Table des Leads & Chantiers BTP
CREATE TABLE IF NOT EXISTS public.leads (
    id TEXT PRIMARY KEY,
    category TEXT NOT NULL CHECK (category IN ('construction', 'renovation')),
    category_label TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    budget TEXT NOT NULL,
    budget_value NUMERIC DEFAULT 0,
    surface TEXT,
    horizon TEXT,
    property_type TEXT,
    is_owner BOOLEAN DEFAULT TRUE,
    phone_verified BOOLEAN DEFAULT TRUE,
    city TEXT NOT NULL,
    commune TEXT,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    address TEXT,
    campaign TEXT DEFAULT 'Facebook Ads CI',
    base_price NUMERIC DEFAULT 25000,
    current_price NUMERIC DEFAULT 25000,
    status TEXT DEFAULT 'available' CHECK (status IN ('available', 'purchased', 'archived')),
    crm_stage TEXT DEFAULT 'new' CHECK (crm_stage IN ('new', 'contacted', 'quote_sent', 'won')),
    quote_amount NUMERIC,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Table des Utilisateurs & Entreprises
CREATE TABLE IF NOT EXISTS public.users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    role TEXT DEFAULT 'artisan' CHECK (role IN ('artisan', 'super_admin')),
    ip_address TEXT,
    purchased_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Table des Transactions & Factures GeniusPay
CREATE TABLE IF NOT EXISTS public.orders (
    id BIGSERIAL PRIMARY KEY,
    invoice_number TEXT UNIQUE NOT NULL,
    transaction_ref TEXT NOT NULL,
    lead_id TEXT REFERENCES public.leads(id) ON DELETE CASCADE,
    lead_title TEXT NOT NULL,
    user_name TEXT NOT NULL,
    user_email TEXT NOT NULL,
    amount NUMERIC NOT NULL,
    currency TEXT DEFAULT 'XOF',
    payment_method TEXT NOT NULL,
    status TEXT DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Table des Logs de Webhooks & Transactions GeniusPay
CREATE TABLE IF NOT EXISTS public.geniuspay_logs (
    id BIGSERIAL PRIMARY KEY,
    tx_ref TEXT NOT NULL,
    customer_phone TEXT,
    operator TEXT,
    amount NUMERIC,
    status TEXT,
    payload JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Sécurité Row Level Security (RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.geniuspay_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Accès public en lecture aux leads disponibles" ON public.leads FOR SELECT USING (true);
CREATE POLICY "Accès complet Super-Admin aux leads" ON public.leads FOR ALL USING (true);
CREATE POLICY "Enregistrement des utilisateurs" ON public.users FOR ALL USING (true);
CREATE POLICY "Enregistrement des paiements orders" ON public.orders FOR ALL USING (true);

-- 6. Insertion des 12 Leads de Test Réalistes en Côte d'Ivoire (FCFA)
INSERT INTO public.leads (id, category, category_label, title, description, budget, budget_value, surface, horizon, city, commune, full_name, phone, email, address, base_price, current_price, status)
VALUES 
('LEAD-CI-101', 'construction', 'Construction Neuve', 'Construction villa duplex 5 pièces avec piscine', 'Terrain de 500m² avec ACD acquis à Bingerville. Gros œuvre et second œuvre.', '48 000 000 FCFA', 48000000, '240 m²', 'Urgent (< 1 mois)', 'Abidjan - Bingerville', 'Bingerville (Feh Kessé)', 'Jean-Marc KOUAME', '+225 07 48 92 14 77', 'jm.kouame@gmail.com', 'Quartier Feh Kessé, Bingerville', 25000, 25000, 'available'),
('LEAD-CI-102', 'renovation', 'Rénovation & Réhabilitation', 'Rénovation intégrale villa basse 4 pièces + dépendance', 'Travaux complets : toiture tôle bac, étanchéité, plomberie neuve et carrelage.', '18 500 000 FCFA', 18500000, '160 m²', 'Urgent (< 1 mois)', 'Abidjan - Cocody', 'Cocody (Deux-Plateaux)', 'Mireille BAKAYOKO', '+225 05 71 33 80 12', 'm.bakayoko@yahoo.fr', 'Deux-Plateaux Vallons, Cocody', 20000, 20000, 'available'),
('LEAD-CI-103', 'construction', 'Construction Neuve', 'Construction résidence de vacances en bordure de lagune', 'Maison de vacances de plain-pied avec terrasse en bois et clôture.', '55 000 000 FCFA', 55000000, '190 m²', 'Sous 2 à 3 mois', 'Assinie', 'Assinie Mafia', 'Stéphane N''GUESSAN', '+225 07 19 84 55 20', 's.nguessan@outlook.ci', 'Assinie Km 9', 30000, 30000, 'available'),
('LEAD-CI-104', 'renovation', 'Rénovation & Réhabilitation', 'Rénovation & Aménagement bureaux commerciaux R+1', 'Transformation en bureaux : cloisons vitrées alu, faux plafonds staff et climatisation.', '22 000 000 FCFA', 22000000, '210 m²', 'Sous 2 à 3 mois', 'Abidjan - Marcory', 'Marcory (Zone 4C)', 'Christian YAO', '+225 01 88 41 29 03', 'c.yao.finance@gmail.com', 'Zone 4C, Marcory', 25000, 25000, 'available'),
('LEAD-CI-105', 'construction', 'Construction Neuve', 'Construction petit immeuble R+2 locatif (6 appartements)', 'Terrain clôturé. Élévation des murs, dalles béton armé et second œuvre.', '85 000 000 FCFA', 85000000, '380 m²', 'Urgent (< 1 mois)', 'Abidjan - Yopougon', 'Yopougon (Niangon)', 'Aïssatou DIABATE', '+225 05 55 62 10 98', 'aissatou.diabate@gmail.com', 'Yopougon Niangon Sud', 35000, 35000, 'available'),
('LEAD-CI-106', 'renovation', 'Rénovation & Réhabilitation', 'Réfection toiture, étanchéité & peinture extérieure villa', 'Charpente bois, tôles bac aluminium et peinture de façade étanche antifongique.', '14 000 000 FCFA', 14000000, '175 m²', 'Sous 2 à 3 mois', 'Grand-Bassam', 'Grand-Bassam (Quartier France)', 'Kouassi KONAN', '+225 07 33 77 15 42', 'k.konan@orange.ci', 'Quartier France, Bassam', 20000, 20000, 'available'),
('LEAD-CI-107', 'construction', 'Construction Neuve', 'Construction villa contemporaine 6 pièces à Angré', 'Fondations profondes, briques pleines, toiture dalle béton accessible.', '62 000 000 FCFA', 62000000, '220 m²', 'Urgent (< 1 mois)', 'Abidjan - Cocody', 'Cocody (Angré 8e)', 'Dr. Ibrahim CISSE', '+225 07 89 22 14 05', 'dr.cisse.sante@gmail.com', 'Angré 8e Tranche', 30000, 30000, 'available'),
('LEAD-CI-108', 'renovation', 'Rénovation & Réhabilitation', 'Rénovation plomberie, électricité & carrelage immeuble R+3', 'Remise aux normes NFC 15-100, colonnes PVC et carrelage parties communes.', '28 000 000 FCFA', 28000000, '450 m²', 'Sous 2 à 3 mois', 'Abidjan - Riviera', 'Riviera (Palmeraie)', 'Mme Salimata OUATTARA', '+225 05 44 98 12 30', 'sali.ouattara@syndic.ci', 'Riviera Palmeraie', 25000, 25000, 'available'),
('LEAD-CI-109', 'construction', 'Construction Neuve', 'Construction entrepôt de stockage métallique 500m²', 'Dallage industriel haute résistance, charpente IPN et bardage toiture bac alu.', '70 000 000 FCFA', 70000000, '500 m²', 'Urgent (< 1 mois)', 'Abidjan - Koumassi', 'Koumassi (Zone Industrielle)', 'Patrick DE SOUZA', '+225 07 10 35 66 89', 'p.desouza@logistique.ci', 'Zone Industrielle Koumassi', 35000, 35000, 'available'),
('LEAD-CI-110', 'renovation', 'Rénovation & Réhabilitation', 'Aménagement & Décoration restaurant gastronomique au Plateau', 'Bar béton ciré, faux plafonds acoustiques staff avec LED, carrelage cuisine.', '19 000 000 FCFA', 19000000, '140 m²', 'Sous 2 à 3 mois', 'Abidjan - Plateau', 'Plateau (Centre des Affaires)', 'Arnaud GAUZE', '+225 01 22 76 90 14', 'arnaud.gauze@restocotedivoire.ci', 'Avenue Chardy, Plateau', 20000, 20000, 'available'),
('LEAD-CI-111', 'construction', 'Construction Neuve', 'Construction villa 4 pièces plain-pied à Yamoussoukro', 'Fondations, élévation, toiture et clôture complète pour une villa familiale.', '32 000 000 FCFA', 32000000, '145 m²', 'Sous 2 à 3 mois', 'Yamoussoukro', 'Yamoussoukro (Millionnaire)', 'Fatou COULIBALY', '+225 01 77 12 30 45', 'fatou.coulibaly@gmail.com', 'Quartier Millionnaire', 20000, 20000, 'available'),
('LEAD-CI-112', 'construction', 'Construction Neuve', 'Construction clôture maçonnée sécurisée sur 1 200m²', 'Mur clôture 2,50m avec poteaux raidisseurs béton armé, barbelés concertina et portail.', '12 500 000 FCFA', 12500000, '1 200 m²', 'Urgent (< 1 mois)', 'San-Pédro', 'San-Pédro (Balmer)', 'Koffi ADJEI', '+225 07 65 89 23 11', 'koffi.adjei@cacao.ci', 'Quartier Balmer, San-Pédro', 15000, 15000, 'available')
ON CONFLICT (id) DO NOTHING;
