'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AlertCircleIcon } from '@hugeicons/core-free-icons';
import { apiGet } from '@/lib/api';
import { Project } from '@/lib/types';
import { ProjectForm } from '../ProjectForm';
import { PageHeader } from '@/components/ui/page-header';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { Button } from '@/components/ui/button';

export default function EditProjectPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    apiGet<Project>(`/projects/${params.id}`)
      .then((p) => active && setProject(p))
      .catch(() => active && setError(true));
    return () => {
      active = false;
    };
  }, [params.id]);

  if (error) {
    return (
      <div>
        <PageHeader title="Editar proyecto" />
        <EmptyState
          icon={AlertCircleIcon}
          title="Proyecto no encontrado"
          description="No se pudo cargar este proyecto. Puede que haya sido eliminado."
          action={
            <Button variant="outline" onClick={() => router.push('/projects')}>
              Volver a proyectos
            </Button>
          }
        />
      </div>
    );
  }

  if (!project) {
    return (
      <div>
        <PageHeader title="Editar proyecto" />
        <div className="max-w-3xl space-y-3">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-28 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Editar proyecto" description={project.title} />
      <ProjectForm initial={project} />
    </div>
  );
}
