'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import { Compass01Icon } from '@hugeicons/core-free-icons';

export default function StudioExplorePage() {
  return (
    <main className="mx-auto w-full max-w-[1400px] px-4 py-8 md:px-8">
      <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border/60 py-24 text-center">
        <HugeiconsIcon icon={Compass01Icon} size={24} className="text-muted-foreground" />
        <p className="text-sm font-medium text-foreground">Explore</p>
        <p className="max-w-sm text-xs leading-relaxed text-muted-foreground">
          Pronto vas a poder descubrir componentes de otros creadores acá.
        </p>
      </div>
    </main>
  );
}
