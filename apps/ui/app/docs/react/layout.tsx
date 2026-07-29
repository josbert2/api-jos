import { DocsSidebar } from "@/components/docs-sidebar";
import { reactSource } from "@/lib/source";
import { SidebarProvider } from "@/registry/default/ui/sidebar";

export default function ReactDocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-1 flex-col">
      <SidebarProvider className="container min-h-min flex-1 items-start px-0 [--sidebar-width:220px] [--top-spacing:0] lg:grid lg:grid-cols-[var(--sidebar-width)_minmax(0,1fr)] lg:[--sidebar-width:240px] lg:[--top-spacing:calc(var(--spacing)*4)]">
        <DocsSidebar tree={reactSource.pageTree} framework="react" />
        <div className="h-full w-full">{children}</div>
      </SidebarProvider>
    </main>
  );
}
