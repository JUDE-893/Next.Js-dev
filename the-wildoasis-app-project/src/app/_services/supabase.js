import { createClient } from '@supabase/supabase-js'

const secret = process.env.SUPABASE_SECRET
const url = process.env.SUPABASE_URL
const supabaseClient = createClient(url, secret);

export default supabaseClient;
