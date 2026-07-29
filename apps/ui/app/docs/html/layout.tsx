import {
  DM_Sans,
  Fredoka,
  Inter,
  Outfit,
  Plus_Jakarta_Sans,
} from "next/font/google";
import localFont from "next/font/local";
import { DocsSidebar } from "@/components/docs-sidebar";
import { htmlSource } from "@/lib/source";
import { SidebarProvider } from "@/registry/default/ui/sidebar";
import FlyonuiScript from "./FlyonuiScript";
import { FlyonuiStyles } from "./FlyonuiStyles";

import "@/styles/flyoui.css";

// Google Fonts
const inter = Inter({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-inter",
});

const plusJakarta = Plus_Jakarta_Sans({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-jakarta",
});

const dmSans = DM_Sans({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-dm",
});

const outfit = Outfit({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-outfit",
});

const fredoka = Fredoka({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-fredoka",
  weight: ["300", "400", "500", "600", "700"],
});

// Local Fonts
const avenir = localFont({
  display: "swap",
  src: [
    {
      path: "../../../public/fonts/Aveni/AvenirRegular.otf",
      style: "normal",
      weight: "400",
    },
    {
      path: "../../../public/fonts/Aveni/AvenirProIt.otf",
      style: "italic",
      weight: "400",
    },
  ],
  variable: "--font-avenir",
});

const pangram = localFont({
  display: "swap",
  src: [
    { path: "../../../public/fonts/Pangram-ExtraLight.otf", weight: "200" },
    { path: "../../../public/fonts/Pangram-Light.otf", weight: "300" },
    { path: "../../../public/fonts/Pangram-Regular.otf", weight: "400" },
    { path: "../../../public/fonts/Pangram-Medium.otf", weight: "500" },
    { path: "../../../public/fonts/Pangram-Bold.otf", weight: "700" },
    { path: "../../../public/fonts/Pangram-ExtraBold.otf", weight: "800" },
    { path: "../../../public/fonts/Pangram-Black.otf", weight: "900" },
  ],
  variable: "--font-pangram",
});

// Available fonts configuration
// Set active: true to enable a font
export const fonts = {
  avenir: { active: true, name: "Avenir", variable: "--font-avenir" },
  dm: { active: false, name: "DM Sans", variable: "--font-dm" },
  fredoka: { active: true, name: "Fredoka", variable: "--font-fredoka" },
  inter: { active: false, name: "Inter", variable: "--font-inter" },
  jakarta: {
    active: false,
    name: "Plus Jakarta Sans",
    variable: "--font-jakarta",
  },
  outfit: { active: false, name: "Outfit", variable: "--font-outfit" },
  pangram: { active: true, name: "Pangram", variable: "--font-pangram" },
};

export default function HtmlDocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const fontClasses = `${inter.variable} ${plusJakarta.variable} ${dmSans.variable} ${outfit.variable} ${avenir.variable} ${pangram.variable} ${fredoka.variable}`;

  // Change font-family here to use different font:
  // var(--font-inter) | var(--font-jakarta) | var(--font-dm) | var(--font-outfit) | var(--font-avenir) | var(--font-pangram)
  const activeFont = "var(--font-fredoka)";

  return (
    <div
      className={`${fontClasses} cozy-layout`}
      style={{ fontFamily: activeFont }}
    >
      <main className="flex flex-1 flex-col">
        <SidebarProvider className="container min-h-min flex-1 items-start px-0 [--sidebar-width:260px] [--top-spacing:0] lg:grid lg:grid-cols-[var(--sidebar-width)_minmax(0,1fr)] lg:[--sidebar-width:280px] lg:[--top-spacing:calc(var(--spacing)*4)]">
          <DocsSidebar framework="html" tree={htmlSource.pageTree} />
          <div className="cozy-content h-full w-full">{children}</div>
        </SidebarProvider>
      </main>
      <FlyonuiStyles />
      <FlyonuiScript />
    </div>
  );
}
