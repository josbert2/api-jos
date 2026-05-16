'use client';

import { useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Cancel01Icon, Image01Icon, Loading03Icon, Upload01Icon } from '@hugeicons/core-free-icons';
import { Button } from '@/components/ui/button';
import { getToken } from '@/lib/api';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4001';

interface UploadResult {
  key: string;
  url: string;
  size: number;
  mimeType: string;
}

async function uploadFile(file: File, folder?: string): Promise<UploadResult> {
  const form = new FormData();
  form.append('file', file);
  const qs = folder ? `?folder=${encodeURIComponent(folder)}` : '';
  const res = await fetch(`${BASE_URL}/api/upload${qs}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${getToken()}` },
    body: form,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'upload failed');
  }
  return res.json();
}

function RemoveButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Quitar"
      className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-destructive text-destructive-foreground outline-none ring-card transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring"
    >
      <HugeiconsIcon icon={Cancel01Icon} size={11} strokeWidth={2.5} />
    </button>
  );
}

export function SingleUploader({
  value,
  onChange,
  folder,
}: {
  value?: string | null;
  onChange: (url: string) => void;
  folder?: string;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handle(file: File) {
    setLoading(true);
    setError(null);
    try {
      const r = await uploadFile(file, folder);
      onChange(r.url || `(falta R2_PUBLIC_URL) key=${r.key}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al subir');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-3">
      {value ? (
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt=""
            className="h-20 w-32 rounded-lg border border-border object-cover"
          />
          <RemoveButton onClick={() => onChange('')} />
        </div>
      ) : (
        <div className="grid h-20 w-32 place-items-center rounded-lg border border-dashed border-border text-muted-foreground">
          <HugeiconsIcon icon={Image01Icon} size={20} />
        </div>
      )}
      <div className="flex flex-col items-start gap-1">
        <input
          ref={input}
          type="file"
          accept="image/*,application/pdf"
          hidden
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handle(f);
            e.target.value = '';
          }}
        />
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => input.current?.click()}
          loading={loading}
        >
          {!loading && <HugeiconsIcon icon={Upload01Icon} size={15} />}
          {loading ? 'Subiendo…' : 'Subir'}
        </Button>
        {error && <p className="text-xs text-destructive">{error}</p>}
      </div>
    </div>
  );
}

export function MultiUploader({
  value,
  onChange,
  folder,
}: {
  value: string[];
  onChange: (urls: string[]) => void;
  folder?: string;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handle(files: FileList) {
    setLoading(true);
    setError(null);
    try {
      const urls: string[] = [];
      for (const f of Array.from(files)) {
        const r = await uploadFile(f, folder);
        if (r.url) urls.push(r.url);
      }
      onChange([...value, ...urls]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al subir');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        {value.map((url, i) => (
          <div key={i} className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={url}
              alt=""
              className="h-20 w-20 rounded-lg border border-border object-cover"
            />
            <RemoveButton onClick={() => onChange(value.filter((_, idx) => idx !== i))} />
          </div>
        ))}
        <button
          type="button"
          onClick={() => input.current?.click()}
          disabled={loading}
          aria-label="Agregar imágenes"
          className="grid h-20 w-20 place-items-center rounded-lg border border-dashed border-border text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-55"
        >
          <HugeiconsIcon
            icon={loading ? Loading03Icon : Upload01Icon}
            size={18}
            className={loading ? 'animate-spin' : undefined}
          />
        </button>
      </div>
      <input
        ref={input}
        type="file"
        multiple
        accept="image/*"
        hidden
        onChange={(e) => {
          if (e.target.files?.length) handle(e.target.files);
          e.target.value = '';
        }}
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
