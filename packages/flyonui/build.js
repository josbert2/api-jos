import fs from "node:fs";
import { copyFile } from "./functions/copyFile.js";
import { extractClasses } from "./functions/extractClasses.js";
import { generateChunks } from "./functions/generateChunks.js";
import { generateColorRules } from "./functions/generateColorRules.js";
import { generateImports } from "./functions/generateImports.js";
import { generatePlugins } from "./functions/generatePlugins.js";
import { generateRawStyles } from "./functions/generateRawStyles.js";
import { generateThemeFiles } from "./functions/generateThemeFiles.js";
import { generateThemes } from "./functions/generateThemes.js";
import { generateThemesObject } from "./functions/generateThemesObject.js";
import { minify, minifyCssInDirectory } from "./functions/minify.js";
import { packCss } from "./functions/packCss.js";
import { removeFiles } from "./functions/removeFiles.js";
import { report } from "./functions/report.js";
import { version } from "./package.json";

const isDev = process.argv.includes("--dev");

async function generateFiles() {
  await Promise.all([
    copyFile(
      "./functions/themePlugin.js",
      "./theme/themePlugin.js",
      "index.js",
    ),

    !isDev &&
      generateColorRules({
        breakpoints: ["sm", "md", "lg", "xl", "2xl"],
        distDir: "../colors",
        opacities: {
          properties: ["10", "20", "30", "40", "50", "60", "70", "80", "90"],
          responsive: [],
          states: [],
        },
        outputFiles: {
          properties: "properties.css",
          responsive: "responsive.css",
          states: "states.css",
        },
        properties: ["bg", "text", "border"],
        states: ["hover"],
      }),

    !isDev &&
      generateColorRules({
        breakpoints: [],
        distDir: "../colors",
        outputFiles: {
          states: "states-extended.css",
        },
        properties: ["bg", "text", "border"],
        states: ["focus", "active"],
      }),

    !isDev &&
      generateColorRules({
        breakpoints: ["max-sm", "max-md", "max-lg", "max-xl", "max-2xl"],
        distDir: "../colors",
        outputFiles: {
          responsive: "responsive-extended.css",
        },
        properties: ["bg", "text", "border"],
        states: [],
      }),

    !isDev &&
      generateColorRules({
        breakpoints: [],
        distDir: "../colors",
        outputFiles: {
          properties: "properties-extended.css",
        },
        properties: [
          "from",
          "via",
          "to",
          "ring",
          // "ring-offset",
          "fill",
          "stroke",
          // "caret",
          // "divide",
          // "accent",
          "shadow",
          "outline",
          // "decoration",
          // "placeholder",
        ],
        states: [],
      }),

    !isDev && generateThemeFiles({ distDir: "theme", srcDir: "src/themes" }),

    !isDev &&
      generateRawStyles({
        distDir: "../base",
        layer: "base",
        srcDir: "../src/base",
      }),

    !isDev &&
      generateRawStyles({
        distDir: "../components",
        exclude: ["loading", "filter", "mask", "mockup", "skeleton", "swap"],
        layer: "utilities",
        responsive: true,
        srcDir: "../src/components",
      }),

    !isDev &&
      generateRawStyles({
        distDir: "../utilities",
        exclude: ["typography", "glass"],
        layer: "utilities",
        responsive: true,
        srcDir: "../src/utilities",
      }),
    generatePlugins({ distDir: "theme", srcDir: "src/themes", type: "base" }),
    generatePlugins({
      distDir: "base",
      exclude: ["reset"],
      srcDir: "src/base",
      type: "base",
    }),
    generatePlugins({
      distDir: "components",
      srcDir: "src/components",
      type: "component",
    }),
    generatePlugins({
      distDir: "utilities",
      srcDir: "src/utilities",
      type: "utility",
    }),
  ]);
  await Promise.all([
    generateImports("imports.js"),

    !isDev && generateChunks("chunks.css"),

    !isDev &&
      packCss({
        exclude: {
          colors: [
            "properties-extended",
            "responsive-extended",
            "states-extended",
          ],
          components: [],
          utilities: [],
        },
        outputFile: "flyonui.css",
      }),

    !isDev && generateThemes("themes.css"),
    generateThemesObject("./theme/object.js"),
  ]);
  await Promise.all([
    extractClasses({ srcDir: "components" }),
    !isDev &&
      minifyCssInDirectory(["colors", "base", "components", "utilities"]),
    !isDev && minify("themes.css"),
    !isDev && minify("flyonui.css"),
  ]);
}

function patchMinifiedCss(filePath) {
  if (!fs.existsSync(filePath)) return;
  const css = fs.readFileSync(filePath, "utf8");
  // lightningcss minify drops the `;` between a `var(...)` value and a nested `&:` selector.
  // Re-insert it so PostCSS / Turbopack can parse the file.
  const patched = css.replace(/\)&:/g, ");&:");
  if (patched !== css) {
    fs.writeFileSync(filePath, patched);
  }
}

async function build() {
  try {
    !isDev &&
      (await removeFiles([
        "base",
        "colors",
        "components",
        "theme",
        "utilities",
        "chunks.css",
        "flyonui.css",
        "imports.js",
        "themes.css",
      ]));
    console.time(
      `${decodeURIComponent("%F0%9F%9A%80")} ${atob("Zmx5b251aQ==")} ${version}`,
    );
    await generateFiles();
    !isDev && patchMinifiedCss("flyonui.css");
    console.timeEnd(
      `${decodeURIComponent("%F0%9F%9A%80")} ${atob("Zmx5b251aQ==")} ${version}`,
    );
    !isDev &&
      (await report([
        "base",
        "components",
        "utilities",
        "colors",
        "chunks.css",
        "themes.css",
        "flyonui.css",
      ]));
  } catch (error) {
    throw new Error("Build error: " + error.message);
  }
}

build(/* 🚀 */);
