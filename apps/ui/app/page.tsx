import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { componentCategories } from "@/registry/registry-categories";

export const metadata: Metadata = {
  title: "coss ui – A new, modern UI component library built on top of Base UI.",
  description: "A new, modern UI component library built on top of Base UI. Built for developers and AI.",
};

export default function HomePage() {
  const totalComponents = componentCategories.length;

  return (
    <main className="container flex flex-1 flex-col pb-20">
      <section className="flex flex-col items-start gap-6 py-16 md:py-24">
        <div className="flex flex-col gap-4 max-w-2xl">
          <h1 className="font-heading text-4xl leading-tight tracking-tight md:text-5xl lg:text-6xl">
            A new, modern UI component{" "}
            <span className="text-muted-foreground">library built on top of Base UI.</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Built for developers and AI. Accessible, composable components styled with Tailwind CSS.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <Link
            href="/docs/react"
            className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Get started
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/particles"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
          >
            Browse particles
          </Link>
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="font-heading text-2xl tracking-tight">
          Components <span className="text-muted-foreground text-lg">({totalComponents})</span>
        </h2>

        <div className="grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3 rounded-xl overflow-hidden">
          {componentCategories.map((category) => (
            <Link
              key={category}
              href={`/particles?tags=${encodeURIComponent(category)}`}
              className="group flex items-center justify-between bg-sidebar px-5 py-4 transition-colors hover:bg-muted"
            >
              <span className="font-medium capitalize text-foreground">
                {category}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
