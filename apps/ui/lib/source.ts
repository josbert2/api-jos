import { loader } from "fumadocs-core/source";
import { reactDocs, htmlDocs } from "@/.source/server";

export const reactSource = loader({
  baseUrl: "/docs/react",
  source: reactDocs.toFumadocsSource(),
});

export const htmlSource = loader({
  baseUrl: "/docs/html",
  source: htmlDocs.toFumadocsSource(),
});
