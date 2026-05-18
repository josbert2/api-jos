export interface RegistryComponent {
  $schema?: string;
  name: string;
  title?: string;
  description?: string;
  type: string;
  author?: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files: { path: string; content: string; type: string }[];
}

export interface PublicProfile {
  username: string;
  name?: string;
  avatar?: string;
  components: ComponentSummary[];
}

export interface ComponentSummary {
  name: string;
  title?: string;
  description?: string;
  type?: string;
  tags?: string[];
  dependencies?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ManifestEntry {
  name: string;
  author: string;
  sourceUrl: string;
  registryItem?: RegistryComponent;
  addedAt: string;
}
