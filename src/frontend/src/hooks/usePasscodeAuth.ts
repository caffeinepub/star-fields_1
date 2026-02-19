import { useState, useEffect } from 'react';

const PASSCODE = '0601632';
const STORAGE_KEY = 'admin_passcode_auth';

// Custom event for cross-component state sync
const AUTH_CHANGE_EVENT = 'passcode-auth-change';

export function usePasscodeAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // Check sessionStorage on initialization
    return sessionStorage.getItem(STORAGE_KEY) === 'true';
  });

  // Listen for auth changes from other components
  useEffect(() => {
    const handleAuthChange = () => {
      const authStatus = sessionStorage.getItem(STORAGE_KEY) === 'true';
      setIsAuthenticated(authStatus);
    };

    window.addEventListener(AUTH_CHANGE_EVENT, handleAuthChange);
    return () => window.removeEventListener(AUTH_CHANGE_EVENT, handleAuthChange);
  }, []);

  const validatePasscode = (passcode: string): boolean => {
    const isValid = passcode === PASSCODE;
    if (isValid) {
      sessionStorage.setItem(STORAGE_KEY, 'true');
      setIsAuthenticated(true);
      // Dispatch event to notify other components
      window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
    }
    return isValid;
  };

  const clearAuth = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setIsAuthenticated(false);
    // Dispatch event to notify other components
    window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
  };

  return {
    isAuthenticated,
    validatePasscode,
    clearAuth,
  };
}
