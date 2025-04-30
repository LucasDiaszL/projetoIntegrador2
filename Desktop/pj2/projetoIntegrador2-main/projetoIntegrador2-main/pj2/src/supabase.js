import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://lqrhuojkpuwzqgcqmawx.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxxcmh1b2prcHV3enFnY3FtYXd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyOTg2ODgsImV4cCI6MjA1Nzg3NDY4OH0.Y0xlKR_Uwn7RMj7hg7rbQ907Dbw4Zo1EZj8TbB43wEE";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
