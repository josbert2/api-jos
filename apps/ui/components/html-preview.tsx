import { CodeBlock } from "@coss/ui/components/code-block";

import { cn } from "@/lib/utils";
import { HtmlIndex } from "@/registry/html";
import { HtmlPreviewClient } from "./html-preview-client";

interface HtmlPreviewProps extends React.ComponentProps<"div"> {
  name: string;
  align?: "center" | "start" | "end";
  hideCode?: boolean;
}

export async function HtmlPreview({
  name,
  className,
  align = "center",
  hideCode = false,
  ...props
}: HtmlPreviewProps) {
  const example = HtmlIndex[name];
  
  if (!example) {
    return (
      <p className="text-muted-foreground text-sm">
        HTML example{" "}
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
          {name}
        </code>{" "}
        not found in registry.
      </p>
    );
  }

  const { html } = example;

  return (
    <HtmlPreviewClient
      align={align}
      className={className}
      code={<CodeBlock code={html} language="html" showLineNumbers={true} />}
      hideCode={hideCode}
      html={html}
      {...props}
    />
  );
}
