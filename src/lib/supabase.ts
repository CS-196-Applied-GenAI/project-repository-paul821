import { createClient } from '@supabase/supabase-js';

// Configuration for Supabase client
// For testing purposes, we use dummy values if environment variables are not set.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://xyzcompany.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'public-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
