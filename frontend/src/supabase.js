
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://johfsmvefdzgdnajkofj.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvaGZzbXZlZmR6Z2RuYWprb2ZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM5NDQzNDgsImV4cCI6MjA0OTUyMDM0OH0.a8DVmALj5ZI90Py_5IDLrm07TY8yp_GeA1oi1gBxLZ8';

export const supabase = createClient(supabaseUrl, supabaseKey)