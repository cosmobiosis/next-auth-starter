import { UserCog } from 'lucide-react';

import { currentUser } from '@/lib/authentication';
import { Home } from './Home'
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import UpdateProfileForm from '@/components/auth/update-profile-form';
import UpdatePasswordForm from '@/components/auth/update-password-form';

export default async function HomePage() {
  const user = await currentUser();

  return (
    <>
      <Home />
    </>
  );
}
