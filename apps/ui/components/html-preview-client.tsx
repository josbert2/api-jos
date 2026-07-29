"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTab } from "@/registry/default/ui/tabs";

interface HtmlPreviewClientProps extends React.ComponentProps<"div"> {
  html: string;
  code: React.ReactNode;
  align?: "center" | "start" | "end";
  hideCode?: boolean;
}

export function HtmlPreviewClient({
  html,
  code,
  className,
  align = "center",
  hideCode = false,
  ...props
}: HtmlPreviewClientProps) {
  const [tab, setTab] = React.useState("preview");

  return (
    <div
      className={cn("group relative mt-4 mb-12 flex flex-col gap-2 html-tabs", className)}
      {...props}
    >
      <Tabs onValueChange={setTab} value={tab}>
        <div className="flex items-center justify-between">
          {!hideCode && (
            <TabsList className="bg-transparent gap-2 p-0 *:data-[slot=tab-indicator]:rounded-lg *:data-[slot=tab-indicator]:bg-accent *:data-[slot=tab-indicator]:shadow-none">
              <TabsTab className={cn("rounded-lg text-[12px] font-Avenir", tab === "preview" && "box-shadow-ln")} value="preview">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18" className="size-[15px] text-ln-gray-500"><path fill="currentColor" d="M2.342 8.617C4.078 5.57 6.577 4.125 9 4.125s4.922 1.445 6.659 4.493l.977-.557C14.743 4.739 11.91 3 9 3S3.257 4.74 1.364 8.06zM1.364 9.94C3.257 13.261 6.091 15 9 15c2.91.001 5.743-1.738 7.636-5.06l-.977-.557C13.922 12.43 11.423 13.875 9 13.875S4.078 12.43 2.342 9.382zm0-1.878a1.9 1.9 0 0 0 0 1.878l.978-.557a.77.77 0 0 1 0-.764zm14.295.557a.77.77 0 0 1 0 .764l.977.557a1.9 1.9 0 0 0 0-1.878zM10.875 9c0 1.036-.84 1.875-1.875 1.875V12a3 3 0 0 0 3-3zM9 10.875A1.875 1.875 0 0 1 7.125 9H6a3 3 0 0 0 3 3zM7.125 9c0-1.036.84-1.875 1.875-1.875V6a3 3 0 0 0-3 3zM9 7.125c1.036 0 1.875.84 1.875 1.875H12a3 3 0 0 0-3-3z"></path></svg>
                Preview
              </TabsTab>
              <TabsTab className={cn("rounded-lg text-[12px] font-Avenir", tab === "code" && "box-shadow-ln")} value="code">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18" className="size-[15px] text-ln-gray-500"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.125" d="m7.311 15.188 3.375-12.376m3 3 2.033 2.16a1.5 1.5 0 0 1 0 2.056l-2.033 2.16m-9.375 0-2.032-2.16a1.5 1.5 0 0 1 0-2.056l2.032-2.16"></path></svg>
                Code
              </TabsTab>
            </TabsList>
          )}
        </div>
      </Tabs>
      <div
        className="relative rounded-xl border data-[tab=code]:bg-code"
        data-tab={tab}
      >
        <div
          className="invisible data-[active=true]:visible"
          data-active={tab === "preview"}
        >
          <div
            className={cn(
              "flex h-[350px] w-full overflow-hidden rounded-xl bg-background p-10",
              align === "center" && "items-center justify-center",
              align === "start" && "items-start justify-center",
              align === "end" && "items-end justify-center",
            )}
          >
            {/* flyoui-scope enables flyoui styles */}
            <div
              className="flyoui-scope"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </div>
        <div
          className="**:[figure]:!m-0 absolute inset-0 hidden overflow-hidden data-[active=true]:block **:[pre]:h-[350px]"
          data-active={tab === "code"}
          data-slot="code"
        >
          {code}
        </div>
      </div>
    </div>
  );
}
