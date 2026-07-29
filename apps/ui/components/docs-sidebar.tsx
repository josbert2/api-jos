"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { PAGES_NEW } from "@/lib/docs";
import type { reactSource } from "@/lib/source";
import { Badge } from "@/registry/default/ui/badge";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/registry/default/ui/sidebar";

type Framework = "react" | "html";

function FrameworkSwitcher({ current }: { current: Framework }) {
  const pathname = usePathname();
  
  // Extract the path after /docs/{framework}/ to maintain position when switching
  const getPathForFramework = (framework: Framework) => {
    const currentPath = pathname.replace(/^\/docs\/(react|html)/, "");
    return `/docs/${framework}${currentPath || ""}`;
  };

  return (
    <div className="flex gap-1 rounded-lg bg-muted/50 p-1">
      <Link
        href={getPathForFramework("react")}
        className={`flex-1 rounded-md px-3 py-1.5 text-center text-xs font-medium transition-colors ${
          current === "react"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        React
      </Link>
      <Link
        href={getPathForFramework("html")}
        className={`flex-1 rounded-md px-3 py-1.5 text-center text-xs font-medium transition-colors ${
          current === "html"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        HTML
      </Link>
    </div>
  );
}

export function DocsSidebar({
  tree,
  framework = "react",
  ...props
}: React.ComponentProps<typeof Sidebar> & { 
  tree: typeof reactSource.pageTree;
  framework?: Framework;
}) {
  const pathname = usePathname();

  return (
    <Sidebar
      className="sticky top-(--header-height) z-30 hidden h-[calc(100svh-var(--header-height))] bg-transparent lg:flex"
      collapsible="none"
      {...props}
    >
      <SidebarContent className="no-scrollbar px-4 py-2">
        <div className="h-(--top-spacing) shrink-0" />
        <div className="mb-4">
          <FrameworkSwitcher current={framework} />
        </div>
        {tree.children.map((item) => (
          <SidebarGroup className="gap-1" key={item.$id}>
            <SidebarGroupLabel className="h-7 px-0 text-sidebar-accent-foreground">
              {item.name}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              {item.type === "folder" && (
                <SidebarMenu className="gap-0.5">
                  {item.children.map((item) => {
                    return (
                      item.type === "page" && (
                        <SidebarMenuItem key={item.url}>
                          <SidebarMenuButton
                            className="from-secondary to-secondary/64 ps-3.5 text-sidebar-foreground/64 hover:bg-transparent active:bg-transparent data-[active=true]:bg-gradient-to-tr"
                            isActive={item.url === pathname}
                            render={<Link href={item.url} />}
                          >
                            {item.name}
                            {PAGES_NEW.includes(item.url) && (
                              <Badge variant="info">New</Badge>
                            )}
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      )
                    );
                  })}
                </SidebarMenu>
              )}
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}

