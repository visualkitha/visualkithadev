import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Warn about missing credentials in development, but don't break the build.
if (!supabaseUrl || !supabaseAnonKey) {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(
      "Supabase URL or Anon Key is missing in your .env file. Supabase features will not be available."
    );
  }
}

/**
 * The Supabase client instance.
 * 
 * It will be `null` if the environment variables `NEXT_PUBLIC_SUPABASE_URL` and
 * `NEXT_PUBLIC_SUPABASE_ANON_KEY` are not set. Components using this client
 * should handle the `null` case gracefully (e.g., by disabling the feature).
 */
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
