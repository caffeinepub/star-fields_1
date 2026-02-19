import { Button } from '@/components/ui/button';
import { LockKeyhole } from 'lucide-react';
import { usePasscodeAuth } from '../hooks/usePasscodeAuth';
import { toast } from 'sonner';

export default function AdminLogoutButton() {
  const { clearAuth } = usePasscodeAuth();

  const handleLogout = () => {
    clearAuth();
    toast.info('Admin session locked');
  };

  return (
    <Button
      onClick={handleLogout}
      variant="outline"
      size="sm"
      className="gap-2"
    >
      <LockKeyhole className="w-4 h-4" />
      Lock
    </Button>
  );
}
