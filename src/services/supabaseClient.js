import { createClient } from '@supabase/supabase-js';

const rawUrl = import.meta.env.VITE_SUPABASE_URL;
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isRealSupabaseConfigured = Boolean(
  rawUrl && 
  rawKey &&
  !rawUrl.includes('xyzcompany') &&
  rawUrl.startsWith('https://')
);

export const supabase = isRealSupabaseConfigured
  ? createClient(rawUrl, rawKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      }
    })
  : {
      auth: {
        signInWithPassword: async () => ({ data: null, error: new Error('Supabase project credentials not configured.') }),
        signUp: async () => ({ data: null, error: new Error('Supabase project credentials not configured.') }),
        signInWithOAuth: async () => ({ data: null, error: new Error('Supabase project credentials not configured.') }),
        signOut: async () => ({ error: null }),
        getUser: async () => ({ data: { user: null }, error: null }),
        getSession: async () => ({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
      }
    };
