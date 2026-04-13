import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ilhahczmhbauqdsyiafv.supabase.co";

const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlsaGFoY3ptaGJhdXFkc3lpYWZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4MjE0ODIsImV4cCI6MjA5MTM5NzQ4Mn0.9fGpUeqnrUCaYlhajNKzDqNPWE5K_Cql8QzOoufyky8";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);