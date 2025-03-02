import React, { createContext, useContext, useEffect, useState } from 'react';


const apiUrl = "https://api.fishvalues.com";

export interface AuthContextType {
    user: User | null;
    token: string | null;
    settings: UserSettings | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (referer?: string) => void;
    logout: (referer?: string) => void;
    refreshUser: () => Promise<void>;
    refreshSettings: () => Promise<void>;
  }

export interface RobloxUserData {
  createdAt: string;
  displayName: string;
  picture: string;
  sub: string;
  userName: string;
}

export interface UserAccess {
  website: boolean;
  valueTeam?: boolean;
  reviewer?: boolean;
  admin?: boolean;
}

export interface UserSettings {
  aboutMe?: string;
  connections: {
    roblox?: string;
    discord?: string;
    twitter?: string;
    reddit?: string;
  };
  preferredTheme: string;
  preferredNavigation: string;
  language: string;
  version: string;
  adFrequency: string;
  marketingEmails: string;
}

export interface User {
  lastLogin: number;
  roblox: RobloxUserData;
  access: UserAccess;
}

export interface AuthResponse {
  success: boolean;
  userData?: User;
  error?: string;
}

export interface SettingsResponse {
  success: boolean;
  data?: UserSettings;
  error?: string;
}

export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('token');
}

export function storeAuthToken(token: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('auth_token', token);
}

export function retrieveAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
}

export function clearAuthData(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('auth_token');
  localStorage.removeItem('cached_user_data');
  localStorage.removeItem('cached_settings');
}

export function storeUserData(userData: User): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('cached_user_data', JSON.stringify(userData));
}

export function storeSettings(settings: UserSettings): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('cached_settings', JSON.stringify(settings));
}

export function hasAuthToken(): boolean {
  return !!retrieveAuthToken() || !!getAuthToken();
}

export function retrieveUserData(): User | null {
  if (typeof window === 'undefined') return null;
  
  const cachedData = localStorage.getItem('cached_user_data');
  if (!cachedData) return null;
  
  try {
    return JSON.parse(cachedData) as User;
  } catch (error) {
    console.error('Error parsing cached user data:', error);
    return null;
  }
}

export function retrieveSettings(): UserSettings | null {
  if (typeof window === 'undefined') return null;
  const cachedData = localStorage.getItem('cached_settings');
  if (!cachedData) return null;

  try {
    return JSON.parse(cachedData) as UserSettings;
  } catch (error) {
    console.error('Error parsing cached settings:', error);
    return null;
  }
}

export function login(referer?: string) {
  const redirectUrl = `${apiUrl}/v1/auth/roblox${referer ? `?referer=${encodeURIComponent(referer)}` : ''}`;
  window.location.href = redirectUrl;
}

export function logout(referer?: string) {
  clearAuthData();
  
  if (referer) {
    window.location.href = referer;
  } else {
    window.location.reload();
  }
}

export async function fetchSettings(): Promise<SettingsResponse> {
  try {
    const token = retrieveAuthToken();
    
    if (!token) {
      return { success: false, error: "No authentication token found" };
    }

    const response = await fetch(`${apiUrl}/v1/user/settings`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });

    if (!response.ok) {
      return { success: false, error: "Failed to fetch configurable data" };
    }

    const data = await response.json();

    if (data.success && data.data) {
      storeSettings(data.data);
    }

    return data;
  } catch (error) {
    console.error("Error fetching configurable data:", error);
    return {success: false, error: "Network error"}
  }
}

export async function getSettings(): Promise<SettingsResponse> {
  const cachedSettings = retrieveSettings();
  
  if (hasAuthToken() && cachedSettings) {
    return { success: true, data: cachedSettings };
  }
  
  return fetchSettings();
}

export async function fetchUserData(): Promise<AuthResponse> {
  try {
    const token = retrieveAuthToken();
    
    const urlToken = getAuthToken();
    if (urlToken) {
      storeAuthToken(urlToken);
      
      const url = new URL(window.location.href);
      url.searchParams.delete('token');
      window.history.replaceState({}, document.title, url.toString());
    }
    
    const authToken = token || urlToken;
    
    if (!authToken) {
      return { success: false, error: "No authentication token found" };
    }

    const response = await fetch(`${apiUrl}/v1/auth/validate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`
      },
    });

    if (!response.ok) {
      return { success: false, error: "Authentication failed" };
    }

    const data = await response.json();
    
    if (data.success && data.userData) {
      storeUserData(data.userData);
    }
    
    return data;
  } catch (error) {
    console.error("Auth validation error:", error);
    return { success: false, error: "Network error" };
  }
}

export async function validate(): Promise<AuthResponse> {
  const cachedUserData = retrieveUserData();
  
  if (hasAuthToken() && cachedUserData) {
    return { success: true, userData: cachedUserData };
  }
  
  return fetchUserData();
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  settings: null,
  isAuthenticated: false,
  isLoading: false,
  login: () => {},
  logout: () => {},
  refreshUser: async () => {},
  refreshSettings: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(retrieveAuthToken());
  const [settings, setSettings] = useState<UserSettings | null>(retrieveSettings());
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = async () => {
    setIsLoading(true);
    const { success, userData } = await validate();
    
    if (success && userData) {
      setUser(userData);
      setIsAuthenticated(true);
      setToken(retrieveAuthToken());
    } else {
      setUser(null);
      setIsAuthenticated(false);
      setToken(null);
    }
    setIsLoading(false);
  };

  const refreshSettings = async () => {
    if (!isAuthenticated) return;
    const { success, data } = await getSettings();

    if (success && data) {
      setSettings(data);
    } else {
      setSettings(null);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  useEffect(() => {
    refreshSettings();
  }, [isAuthenticated]);

  const logoutUser = (referer?: string) => {
    logout(referer);
    setUser(null);
    setToken(null);
    setSettings(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        settings,
        isAuthenticated,
        isLoading,
        login,
        logout: logoutUser,
        refreshUser,
        refreshSettings,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
