import { createBrowserClient } from '@supabase/ssr';
import { Database } from './types';

/**
 * Creates a Supabase client for use in Client Components
 * Use this when you need real-time subscriptions or client-side data fetching
 *
 * Note: Since you're using server-side only approach, this is here for future flexibility
 */
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
