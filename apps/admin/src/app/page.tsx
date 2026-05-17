'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { apiGet, clearToken, getToken } from '@/lib/api';
import { AuthUser } from '@/lib/types';

export default function Index() {
  const router = useRouter();
  useEffect(() => {
    if (!getToken()) {
      router.replace('/login');
      return;
    }
    apiGet<AuthUser>('/auth/me')
      .then((u) => router.replace(u.role === 'admin' ? '/projects' : `/studio/${u.username}`))
      .catch(() => {
        clearToken();
        router.replace('/login');
      });
  }, [router]);
  return null;
}
