import { createBrowserClient } from '@supabase/ssr';

export const createClient = () =>
  createBrowserClient(
    'https://osyjzrjloqgmnrtgzfwf.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zeWp6cmpsb3FnbW5ydGd6ZndmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4NzM0NDksImV4cCI6MjA5NDQ0OTQ0OX0.gNbNu9LjddSgULPsFdoR2l0p0MO2DxUCELmkpwS1-U0'
  );
