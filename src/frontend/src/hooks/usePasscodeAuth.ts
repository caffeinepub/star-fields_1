import { useState, useEffect } from 'react';
import { useInternetIdentity } from './useInternetIdentity';

const PASSCODE = '0601632';
const STORAGE_KEY = 'admin_passcode_auth';

// Custom event for cross-component state sync
const AUTH_CHANGE_EVENT = 'passcode-auth-change';

export function usePasscodeAuth() {
  const { identity, login: iiLogin, loginStatus } = useInternetIdentity();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // Check sessionStorage on initialization
    return sessionStorage.getItem(STORAGE_KEY) === 'true';
  });
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Listen for auth changes from other components
  useEffect(() => {
    const handleAuthChange = () => {
      const authStatus = sessionStorage.getItem(STORAGE_KEY) === 'true';
      setIsAuthenticated(authStatus);
    };

    window.addEventListener(AUTH_CHANGE_EVENT, handleAuthChange);
    return () => window.removeEventListener(AUTH_CHANGE_EVENT, handleAuthChange);
  }, []);

  // Check if Internet Identity is authenticated when passcode is validated
  useEffect(() => {
    const passcodeValid = sessionStorage.getItem(STORAGE_KEY) === 'true';
    const iiAuthenticated = identity && !identity.getPrincipal().isAnonymous();
    
    if (passcodeValid && iiAuthenticated) {
      setIsAuthenticated(true);
      setIsAuthenticating(false);
    }
  }, [identity]);

  const validatePasscode = async (passcode: string): Promise<boolean> => {
    const isValid = passcode === PASSCODE;
    if (isValid) {
      sessionStorage.setItem(STORAGE_KEY, 'true');
      
      // Check if already authenticated with Internet Identity
      const iiAuthenticated = identity && !identity.getPrincipal().isAnonymous();
      
      if (!iiAuthenticated) {
        // Need to authenticate with Internet Identity
        setIsAuthenticating(true);
        try {
          iiLogin();
          // The useEffect above will set isAuthenticated when II login completes
        } catch (error) {
          console.error('Internet Identity login failed:', error);
          sessionStorage.removeItem(STORAGE_KEY);
          setIsAuthenticating(false);
          return false;
        }
      } else {
        // Already authenticated with II
        setIsAuthenticated(true);
        window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
      }
    }
    return isValid;
  };

  const clearAuth = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setIsAuthenticated(false);
    setIsAuthenticating(false);
    // Dispatch event to notify other components
    window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
  };

  return {
    isAuthenticated: isAuthenticated && identity && !identity.getPrincipal().isAnonymous(),
    isAuthenticating: isAuthenticating || loginStatus === 'logging-in',
    validatePasscode,
    clearAuth,
  };
}
