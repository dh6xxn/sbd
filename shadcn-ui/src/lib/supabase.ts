// src/lib/supabase.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://apuchlajpdxbujlntleh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwdWNobGFqcGR4YnVqbG50bGVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxMDc3MjQsImV4cCI6MjA2MTY4MzcyNH0.VePvHS6jyCDXm8t8-i2sYQl0P266lptOFpuCClD1LuY';

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export type User = Awaited<ReturnType<typeof supabase.auth.getUser>>['data']['user'];

export const auth = {
  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    return data;
  },

  signUp: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });
    
    if (error) throw error;
    return data;
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  getSession: async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data;
  },

  getUser: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return data;
  },
};