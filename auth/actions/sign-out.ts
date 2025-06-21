'use server';

import { signOut as logOut } from '@/auth/utils';

export async function signOut() {
  await logOut();
}
