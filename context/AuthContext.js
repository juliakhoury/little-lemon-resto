import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext(undefined);

const STORAGE_KEY = 'little_lemon_user';

const DEFAULT_NOTIFICATIONS = {
  orderStatuses: true,
  passwordChanges: true,
  specialOffers: true,
  newsletter: true,
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // On app start, check whether we already have a stored user. If so, skip
  // onboarding and go straight to Home.
  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) setUser(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to load stored user', e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const completeOnboarding = async ({ firstName, email }) => {
    const newUser = {
      firstName,
      lastName: '',
      email,
      phone: '',
      notifications: DEFAULT_NOTIFICATIONS,
    };
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    setUser(newUser);
  };

  const updateUser = async (updates) => {
    const newUser = { ...user, ...updates };
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    setUser(newUser);
  };

  const logout = async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, completeOnboarding, updateUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
