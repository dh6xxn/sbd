// src/providers/AuthProvider.tsx
import React, { createContext, useContext, useEffect } from 'react';
import { auth } from '@/lib/supabase';
import { useStore } from '@/store';
import type { User } from '@/lib/supabase';

interface AuthContextType {
  user: User | null;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  logout: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, setUser } = useStore();

  useEffect(() => {
    // Check for existing session
    auth.getUser().then((user) => {
      setUser(user);
    });

    // Subscribe to auth changes
    const { data: authListener } = auth.onAuthStateChange((user) => {
      setUser(user);
    });

    return () => {
      authListener?.unsubscribe();
    };
  }, [setUser]);

  const logout = async () => {
    await auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);