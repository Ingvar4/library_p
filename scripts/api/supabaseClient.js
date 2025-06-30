import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://dftxrmlepmufduwxtwxr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmdHhybWxlcG11ZmR1d3h0d3hyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwMTM3NzYsImV4cCI6MjA2NjU4OTc3Nn0.E5CDsvpDNzWhVATuqEcflQGtRH6jH3J1imtGKO3yX70';
export const supabase = createClient(supabaseUrl, supabaseKey);