'use client';

import { createContext, useContext } from 'react';
import { AuthUser } from '@/lib/types';

// El usuario autenticado, compartido con las páginas del Studio sin re-fetch.
// Vive aparte del layout.tsx porque Next.js no admite exports extra en un layout.
export const StudioUserContext = createContext<AuthUser | null>(null);

export function useStudioUser() {
  const user = useContext(StudioUserContext);
  if (!user) throw new Error('useStudioUser fuera del StudioLayout');
  return user;
}
