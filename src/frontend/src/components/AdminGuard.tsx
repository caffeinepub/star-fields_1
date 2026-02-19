import { ReactNode } from 'react';
import { usePasscodeAuth } from '../hooks/usePasscodeAuth';
import PasscodeEntry from './PasscodeEntry';

interface AdminGuardProps {
  children: ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const { isAuthenticated } = usePasscodeAuth();

  if (!isAuthenticated) {
    return <PasscodeEntry />;
  }

  return <>{children}</>;
}
