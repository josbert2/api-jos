'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import { UserIcon } from '@hugeicons/core-free-icons';
import { useStudioUser } from '../studio-context';

export default function StudioProfilePage() {
  const user = useStudioUser();
  return (
    <main className="mx-auto w-full max-w-[1400px] px-4 py-8 md:px-8">
      <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border/60 py-24 text-center">
        <HugeiconsIcon icon={UserIcon} size={24} className="text-muted-foreground" />
        <p className="text-sm font-medium text-foreground">Perfil público</p>
        <p className="max-w-sm text-xs leading-relaxed text-muted-foreground">
          Tu perfil va a vivir en <span className="font-mono text-foreground">/{user.username}</span>.
          Editor de perfil y link de donación: pronto.
        </p>
      </div>
    </main>
  );
}
