import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';
import { usePasscodeAuth } from '../hooks/usePasscodeAuth';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

export default function AdminLogoutButton() {
  const { clearAuth } = usePasscodeAuth();
  const { clear: clearII } = useInternetIdentity();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    clearAuth();
    await clearII();
    queryClient.clear();
    toast.success('Logged out successfully');
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleLogout}
      className="gap-2"
    >
      <Lock className="w-4 h-4" />
      Logout
    </Button>
  );
}
