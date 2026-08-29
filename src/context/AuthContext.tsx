'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User, signOut as firebaseSignOut } from 'firebase/auth';
import { auth, db } from '@/lib/firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  loading: boolean;
  logout: () => Promise<void>;
  demoAuthMode: boolean;
  setDemoAuthMode: (val: boolean) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: 'admin',
  loading: true,
  logout: async () => {},
  demoAuthMode: true,
  setDemoAuthMode: () => {}
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole>('admin');
  const [loading, setLoading] = useState(true);
  const [demoAuthMode, setDemoAuthModeState] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('demoAuthMode');
      if (stored !== null) {
        setDemoAuthModeState(stored === 'true');
      } else {
        setDemoAuthModeState(true);
      }
    }

    // Resolve loading state immediately if demo mode is active
    setLoading(false);

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists()) {
            setRole((userDoc.data().role as UserRole) || 'admin');
          } else {
            setRole('admin');
          }
        } catch (e) {
          setRole('admin');
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const setDemoAuthMode = (val: boolean) => {
    setDemoAuthModeState(val);
    if (typeof window !== 'undefined') {
      localStorage.setItem('demoAuthMode', String(val));
    }
  };

  const logout = async () => {
    setDemoAuthMode(false);
    try {
      await firebaseSignOut(auth);
    } catch (e) {}
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, logout, demoAuthMode, setDemoAuthMode }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
