"use client";

import { useEffect, useState } from "react";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "/ui";
const THEMES_HREF = `${BASE_PATH}/css/themes-scoped.css`;
const CSS_HREF = `${BASE_PATH}/css/flyonui.css`;

export function FlyonuiStyles() {
  const [version, setVersion] = useState(Date.now());

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      const interval = setInterval(() => {
        fetch(CSS_HREF, { cache: "no-store", method: "HEAD" })
          .then((res) => {
            const lastModified = res.headers.get("last-modified");
            if (lastModified) {
              const newVersion = new Date(lastModified).getTime();
              setVersion((prev) => {
                if (prev !== newVersion) {
                  console.log("🔄 FlyonUI CSS updated");
                  return newVersion;
                }
                return prev;
              });
            }
          })
          .catch(() => {});
      }, 1000);
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <>
      <link href={`${THEMES_HREF}?v=${version}`} rel="stylesheet" />
      <link href={`${CSS_HREF}?v=${version}`} rel="stylesheet" />
    </>
  );
}
