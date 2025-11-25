import { createClient } from '@supabase/supabase-js';

// Instructions for the user:
// 1. Go to https://supabase.com and create a new project.
// 2. In your project dashboard, go to Project Settings -> API.
// 3. Copy the "Project URL" and "anon public" key.
// 4. Create a file named `.env` in the root of your project (next to package.json).
// 5. Add the following lines to `.env`:
//    VITE_SUPABASE_URL=your_project_url_here
//    VITE_SUPABASE_ANON_KEY=your_anon_key_here

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials missing! Persistence will not work until you set up .env');
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder'
);
