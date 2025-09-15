
import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '@/lib/api';

interface AuthContextType {
  user: { id: string; email: string; full_name?: string } | null;
  session: any;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  setUser: (user: any) => void;
  setSession: (session: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ id: string; email: string; full_name?: string } | null>(null);
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in by verifying the token
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const response = await api.auth.verify();
          if (response.valid && response.user) {
            setUser(response.user);
            setSession({ user: response.user });
          } else {
            // Invalid token, remove it
            localStorage.removeItem('authToken');
            localStorage.removeItem('isAdminLoggedIn');
          }
        } catch (error) {
          console.error('Auth verification failed:', error);
          // Invalid token, remove it
          localStorage.removeItem('authToken');
          localStorage.removeItem('isAdminLoggedIn');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await api.auth.login({ email, password });
      
      if (response.token && response.user) {
        // Store the token
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('isAdminLoggedIn', 'true');
        
        // Update state
        setUser(response.user);
        setSession({ user: response.user });
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = () => {
    // Clear local storage
    localStorage.removeItem('authToken');
    localStorage.removeItem('isAdminLoggedIn');
    
    // Clear state
    setUser(null);
    setSession(null);
    
    // Call API logout (to handle any server-side cleanup)
    api.auth.logout();
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      loading, 
      login, 
      logout, 
      setUser, 
      setSession 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
