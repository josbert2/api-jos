import { transformers } from "@coss/ui/lib/highlight-code";
import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
} from "fumadocs-mdx/config";
import rehypePrettyCode from "rehype-pretty-code";
import { z } from "zod";

export default defineConfig({
  mdxOptions: {
    rehypePlugins: (plugins) => {
      plugins.shift();
      plugins.push([
        // biome-ignore lint/suspicious/noExplicitAny: known
        rehypePrettyCode as any,
        {
          theme: {
            dark: "github-dark",
            light: "github-light-default",
          },
          transformers,
        },
      ]);

      return plugins;
    },
  },
});

const docsSchema = frontmatterSchema.extend({
  links: z
    .object({
      api: z.string().optional(),
      doc: z.string().optional(),
    })
    .optional(),
});

export const reactDocs = defineDocs({
  dir: "content/docs/react",
  docs: {
    schema: docsSchema,
  },
});

export const htmlDocs = defineDocs({
  dir: "content/docs/html",
  docs: {
    schema: docsSchema,
  },
});
