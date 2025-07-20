'use client';
import api from '@/lib/axios';
import { createContext, useContext, useEffect, useState } from 'react';

interface ContextType {
  user: UserAuth;
  updateUser: (update: Partial<UserAuth>) => void;
}

const UserAuthContext = createContext<ContextType | null>(null);
const defaultUser: UserAuth = {
  is_logged_in: false,
  id: '',
  email: '',
  username: '',
  last_name: '',
  first_name: '',
  phone: null,
  image_uri: null,
  followers_count: 0,
  status: 0,
};

export const UserAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserAuth>(defaultUser);

  const updateUser = (updates: Partial<UserAuth>) => {
    const newUser = { ...user, ...updates };
    setUser(newUser);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        const userRes = await api.get(`auth/user`);
        if (userRes) updateUser({ ...userRes.data.user, is_logged_in: true });
      }
    };

    fetchUserData();
  }, []);

  return (
    <UserAuthContext.Provider value={{ user, updateUser }}>{children}</UserAuthContext.Provider>
  );
};

export const useUserAuth = () => {
  const ctx = useContext(UserAuthContext);
  if (!ctx) {
    throw new Error('useUserAuth must be used within a UserAuthContextProvider');
  }

  return ctx;
};
