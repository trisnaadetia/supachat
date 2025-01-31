import { createClient } from '@supabase/supabase-js';

const supabaseUrl: any = process.env.SUPABASE_URL;
const supabaseKey: any = process.env.SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
