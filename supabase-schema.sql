-- ═══════════════════════════════════════════════════════════════
--   NOVA STORE — Complete Database Schema
--   Run this entire script in Supabase SQL Editor
--   Project: jwgcfnyfxjkiftcyjiyg.supabase.co
-- ═══════════════════════════════════════════════════════════════

-- ──────────────────────────────────────────
-- 1. USERS TABLE
--    Stores all registered user profiles
-- ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT,
    role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'owner')),
    avatar TEXT DEFAULT '0',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-update updated_at on any row change
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS users_updated_at ON public.users;
CREATE TRIGGER users_updated_at
    BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ──────────────────────────────────────────
-- 2. ORDERS TABLE
--    Stores every purchase made on the site
-- ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.orders (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    item_name TEXT NOT NULL,
    item_type TEXT NOT NULL DEFAULT 'service' CHECK (item_type IN ('service', 'digital')),
    amount NUMERIC(10, 2) NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'processing', 'completed', 'cancelled', 'failed')),
    payment_id TEXT,           -- PayPal order/transaction ID
    -- Order details (from checkout form)
    website_type TEXT,         -- e.g. "Corporate", "E-commerce", "Portfolio"
    description TEXT,          -- What the client wants
    colors TEXT,               -- Preferred colors
    preferred_language TEXT,   -- "ar" or "en"
    has_logo BOOLEAN DEFAULT FALSE,
    additional_details TEXT,
    -- Admin notes
    admin_notes TEXT,
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

DROP TRIGGER IF EXISTS orders_updated_at ON public.orders;
CREATE TRIGGER orders_updated_at
    BEFORE UPDATE ON public.orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ──────────────────────────────────────────
-- 3. EMAIL VERIFICATIONS TABLE
--    For OTP email verification on signup
-- ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.email_verifications (
    id BIGSERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    code TEXT NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    used BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ──────────────────────────────────────────
-- 4. CONTACT MESSAGES TABLE
--    Stores messages from the contact form
-- ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ──────────────────────────────────────────
-- 5. SITE SETTINGS TABLE
--    Key–value config for the site (admin)
-- ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.site_settings (
    key TEXT PRIMARY KEY,
    value TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed default values
INSERT INTO public.site_settings (key, value) VALUES
    ('maintenance_mode', 'false'),
    ('basic_price', '99'),
    ('standard_price', '249'),
    ('premium_price', '499'),
    ('digital_price', '19.99'),
    ('owner_email', 'admin@novastore.app')
ON CONFLICT (key) DO NOTHING;


-- ═══════════════════════════════════════════════════════════════
--   ROW LEVEL SECURITY (RLS) POLICIES
-- ═══════════════════════════════════════════════════════════════

-- ─── users ───────────────────────────────
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Anyone can create their own user row on signup
CREATE POLICY "users: insert own" ON public.users
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Users can only read their own profile
CREATE POLICY "users: select own" ON public.users
    FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "users: update own" ON public.users
    FOR UPDATE USING (auth.uid() = id);

-- Service role has full access (used by server-side API routes)
CREATE POLICY "users: service role full" ON public.users
    FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Owners can read ALL users (for admin panel)
CREATE POLICY "users: owner can read all" ON public.users
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users u
            WHERE u.id = auth.uid() AND u.role = 'owner'
        )
    );

-- ─── orders ──────────────────────────────
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Users can insert their own orders
CREATE POLICY "orders: insert own" ON public.orders
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can read their own orders
CREATE POLICY "orders: select own" ON public.orders
    FOR SELECT USING (auth.uid() = user_id);

-- Service role has full access
CREATE POLICY "orders: service role full" ON public.orders
    FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Owners can read and update ALL orders (admin panel)
CREATE POLICY "orders: owner can read all" ON public.orders
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users u
            WHERE u.id = auth.uid() AND u.role = 'owner'
        )
    );

CREATE POLICY "orders: owner can update all" ON public.orders
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.users u
            WHERE u.id = auth.uid() AND u.role = 'owner'
        )
    );

-- ─── email_verifications ─────────────────
ALTER TABLE public.email_verifications ENABLE ROW LEVEL SECURITY;

-- Only service role can touch this table (API routes only)
CREATE POLICY "email_verifications: service role full" ON public.email_verifications
    FOR ALL TO service_role USING (true) WITH CHECK (true);

-- ─── contact_messages ────────────────────
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Anyone (even guests) can insert a message
CREATE POLICY "contact_messages: public insert" ON public.contact_messages
    FOR INSERT WITH CHECK (true);

-- Only owners can read messages
CREATE POLICY "contact_messages: owner select" ON public.contact_messages
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users u
            WHERE u.id = auth.uid() AND u.role = 'owner'
        )
    );

-- Service role full
CREATE POLICY "contact_messages: service role full" ON public.contact_messages
    FOR ALL TO service_role USING (true) WITH CHECK (true);

-- ─── site_settings ───────────────────────
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Owners can read and update settings
CREATE POLICY "site_settings: owner full" ON public.site_settings
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users u
            WHERE u.id = auth.uid() AND u.role = 'owner'
        )
    );

-- Service role full
CREATE POLICY "site_settings: service role full" ON public.site_settings
    FOR ALL TO service_role USING (true) WITH CHECK (true);


-- ═══════════════════════════════════════════════════════════════
--   INDEXES (Performance)
-- ═══════════════════════════════════════════════════════════════
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);
CREATE INDEX IF NOT EXISTS idx_email_verifications_email ON public.email_verifications(email);


-- ═══════════════════════════════════════════════════════════════
--   ADMIN VIEW — Useful for the admin panel queries
-- ═══════════════════════════════════════════════════════════════
CREATE OR REPLACE VIEW public.admin_orders_view AS
    SELECT
        o.id,
        o.item_name,
        o.item_type,
        o.amount,
        o.status,
        o.payment_id,
        o.website_type,
        o.description,
        o.colors,
        o.has_logo,
        o.additional_details,
        o.admin_notes,
        o.created_at,
        o.updated_at,
        u.name  AS user_name,
        u.email AS user_email,
        u.phone AS user_phone
    FROM public.orders o
    JOIN public.users u ON u.id = o.user_id
    ORDER BY o.created_at DESC;


-- ═══════════════════════════════════════════════════════════════
--   CLEANUP FUNCTION — Remove stale verifications
-- ═══════════════════════════════════════════════════════════════
CREATE OR REPLACE FUNCTION public.cleanup_old_verifications()
RETURNS void LANGUAGE sql AS $$
    DELETE FROM public.email_verifications
    WHERE used = TRUE OR expires_at < NOW() - INTERVAL '1 hour';
$$;

-- ═══════════════════════════════════════════════════════════════
--   DONE ✓  All tables, policies, indexes, and views are ready.
-- ═══════════════════════════════════════════════════════════════
