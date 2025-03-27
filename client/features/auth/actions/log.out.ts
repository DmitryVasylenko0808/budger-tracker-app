'use server';

import { redirect } from 'next/navigation';

import { deleteSession } from '@/lib/session';

export const logOut = async () => {
  await deleteSession();

  redirect('/sign-in');
};
