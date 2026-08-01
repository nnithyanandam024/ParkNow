import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// TODO: Replace these with your actual Supabase URL and Anon Key from project settings: API
const SUPABASE_URL = 'https://ijhtldrpbvqueginouid.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlqaHRsZHJwYnZxdWVnaW5vdWlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU1MzA1NDgsImV4cCI6MjEwMTEwNjU0OH0.qzuegzOhiyb3LOxLX18AwBYx9ramPhcGBr5DhGhzeXI';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
