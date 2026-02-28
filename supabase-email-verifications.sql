-- Run this SQL in your Supabase SQL Editor to create the email verifications table

CREATE TABLE IF NOT EXISTS public.email_verifications (
    id BIGSERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    code TEXT NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    used BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_email_verifications_email ON public.email_verifications(email);

-- Allow the service role to read/write (RLS disabled for server-side usage)
ALTER TABLE public.email_verifications ENABLE ROW LEVEL SECURITY;

-- Policy: allow service_role full access (used by API routes)
CREATE POLICY "Service role full access" ON public.email_verifications
    FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Auto-cleanup: delete expired/used rows older than 1 hour
CREATE OR REPLACE FUNCTION delete_old_verifications()
RETURNS void LANGUAGE sql AS $$
  DELETE FROM public.email_verifications
  WHERE used = true OR expires_at < NOW() - INTERVAL '1 hour';
$$;
