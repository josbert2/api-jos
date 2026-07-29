// global.d.ts
import { HSAccordion } from "flyonui/flyonui";

declare global {
  interface Window {
    HSAccordion: typeof HSAccordion;
  }
}

export {};