import { PageHeader } from '@/components/ui/page-header';
import { ProjectForm } from '../ProjectForm';

export default function NewProjectPage() {
  return (
    <div>
      <PageHeader title="Nuevo proyecto" description="Cargá un trabajo del portfolio público." />
      <ProjectForm />
    </div>
  );
}
