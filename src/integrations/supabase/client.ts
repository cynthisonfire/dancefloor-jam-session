// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://qpxdlmbzpsliwdomfrci.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFweGRsbWJ6cHNsaXdkb21mcmNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU5ODM2NjYsImV4cCI6MjA1MTU1OTY2Nn0.WHSESQ2rQAWUv2cTncdJPPIaCm-XotJrWh--kpejiWg";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);