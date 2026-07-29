"use client";

import { useState } from "react";

type ClassType =
  | "component"
  | "color"
  | "style"
  | "behavior"
  | "size"
  | "modifier";

interface ClassInfo {
  name: string;
  type: ClassType;
  description: string;
}

interface ClassesTableProps {
  classes: ClassInfo[];
  componentName?: string;
}

const typeConfig: Record<
  ClassType,
  { label: string; badgeClass: string; icon: React.ReactNode }
> = {
  behavior: {
    badgeClass: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400",
    icon: (
      <svg
        className="size-3"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        >
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
          <circle cx="12" cy="12" r="3" />
        </g>
      </svg>
    ),
    label: "Behavior",
  },
  color: {
    badgeClass:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    icon: (
      <svg
        className="size-3"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        >
          <path d="m19 11-8-8-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0L19 11Z" />
          <path d="m5 2 5 5" />
          <path d="M2 13h15" />
          <path d="M22 20a2 2 0 1 1-4 0c0-1.6 1.7-2.4 2-4 .3 1.6 2 2.4 2 4Z" />
        </g>
      </svg>
    ),
    label: "Color",
  },
  component: {
    badgeClass: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
    icon: null,
    label: "Component",
  },
  modifier: {
    badgeClass:
      "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
    icon: (
      <svg
        className="size-3"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        >
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </g>
      </svg>
    ),
    label: "Modifier",
  },
  size: {
    badgeClass:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    icon: (
      <svg
        className="size-3"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        >
          <path d="M12 19.875c0 .621 -.512 1.125 -1.143 1.125h-5.714a1.134 1.134 0 0 1 -1.143 -1.125v-15.875a1 1 0 0 1 1 -1h5.857c.631 0 1.143 .504 1.143 1.125z" />
          <path d="M12 9h-2" />
          <path d="M12 6h-3" />
          <path d="M12 12h-3" />
          <path d="M12 18h-3" />
          <path d="M12 15h-2" />
          <path d="M21 3h-4" />
          <path d="M19 3v18" />
          <path d="M21 21h-4" />
        </g>
      </svg>
    ),
    label: "Size",
  },
  style: {
    badgeClass:
      "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
    icon: (
      <svg
        className="size-3"
        viewBox="0 0 18 18"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="currentColor">
          <circle
            cx="13.5"
            cy="6"
            fill="none"
            r="3.25"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <rect
            fill="none"
            height="5.5"
            rx="1"
            ry="1"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            width="5.5"
            x="4.75"
            y="10.75"
          />
          <path
            d="M3.818,1.99L1.189,6.498c-.194,.333,.046,.752,.432,.752H6.879c.386,0,.626-.419,.432-.752L4.682,1.99c-.193-.331-.671-.331-.864,0Z"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </g>
      </svg>
    ),
    label: "Style",
  },
};

export function ClassesTable({
  classes,
  componentName = "",
}: ClassesTableProps) {
  const [prefix, setPrefix] = useState("");

  const formatClassName = (name: string) => {
    return prefix ? `${prefix}-${name}` : name;
  };

  return (
    <div className="not-prose my-6 overflow-x-auto">
      <div className="max-h-[400px] overflow-y-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
        <table className="w-full text-sm">
          <thead className="sticky top-0 z-10">
            <tr className="border-b-0">
              <th className="bg-zinc-100 dark:bg-zinc-800 rounded-l-lg flex items-center gap-2 px-4 py-3 text-left font-medium">
                <div className="relative">
                  <input
                    autoComplete="off"
                    className="w-20 rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 px-2 py-1 text-xs font-normal placeholder:text-zinc-400"
                    maxLength={12}
                    minLength={0}
                    name="prefix"
                    onChange={(e) => setPrefix(e.target.value)}
                    pattern="[a-z]*[a-z-]{0,11}"
                    placeholder="prefix–"
                    type="text"
                    value={prefix}
                  />
                </div>
                <span>Class name</span>
              </th>
              <th className="bg-zinc-100 dark:bg-zinc-800 px-4 py-3 text-left font-medium">
                Type
              </th>
              <th className="bg-zinc-100 dark:bg-zinc-800 rounded-r-lg px-4 py-3 text-left font-medium" />
            </tr>
          </thead>
          <tbody>
            {classes.map((classInfo, index) => {
              const config = typeConfig[classInfo.type];
              return (
                <tr
                  className="border-b border-zinc-200 dark:border-zinc-800"
                  key={index}
                >
                  <td className="w-3/12 px-4 py-3">
                    <code className="font-mono text-sm lowercase whitespace-nowrap">
                      {formatClassName(classInfo.name)}
                    </code>
                  </td>
                  <td className="w-2/12 px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium whitespace-nowrap ${config.badgeClass}`}
                    >
                      {config.icon}
                      {config.label}
                    </span>
                  </td>
                  <td className="w-7/12 min-w-[12rem] px-4 py-3 text-zinc-600 dark:text-zinc-400">
                    {classInfo.description}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Pre-defined class sets for common components
export const buttonClasses: ClassInfo[] = [
  // Component
  { description: "Button", name: "btn", type: "component" },
  // Colors
  { description: "neutral color", name: "btn-neutral", type: "color" },
  { description: "primary color", name: "btn-primary", type: "color" },
  { description: "secondary color", name: "btn-secondary", type: "color" },
  { description: "accent color", name: "btn-accent", type: "color" },
  { description: "info color", name: "btn-info", type: "color" },
  { description: "success color", name: "btn-success", type: "color" },
  { description: "warning color", name: "btn-warning", type: "color" },
  { description: "error color", name: "btn-error", type: "color" },
  // Styles
  { description: "outline style", name: "btn-outline", type: "style" },
  { description: "soft style", name: "btn-soft", type: "style" },
  { description: "text only style", name: "btn-text", type: "style" },
  { description: "gradient style", name: "btn-gradient", type: "style" },
  { description: "ghost style", name: "btn-ghost", type: "style" },
  // Behavior
  { description: "looks active", name: "btn-active", type: "behavior" },
  { description: "looks disabled", name: "btn-disabled", type: "behavior" },
  // Sizes
  { description: "Extra small size", name: "btn-xs", type: "size" },
  { description: "Small size", name: "btn-sm", type: "size" },
  { description: "Medium size (default)", name: "btn-md", type: "size" },
  { description: "Large size", name: "btn-lg", type: "size" },
  { description: "Extra large size", name: "btn-xl", type: "size" },
  // Modifiers
  {
    description: "more horizontal padding",
    name: "btn-wide",
    type: "modifier",
  },
  { description: "Full width", name: "btn-block", type: "modifier" },
  { description: "1:1 ratio", name: "btn-square", type: "modifier" },
  {
    description: "1:1 ratio with rounded corners",
    name: "btn-circle",
    type: "modifier",
  },
];

export default ClassesTable;

// Pre-configured table for Button component
export function ButtonClassesTable() {
  return <ClassesTable classes={buttonClasses} />;
}

// Pre-defined class set for Alert component
export const alertClasses: ClassInfo[] = [
  // Component
  { description: "Alert", name: "alert", type: "component" },
  // Colors
  { description: "primary color", name: "alert-primary", type: "color" },
  { description: "info color", name: "alert-info", type: "color" },
  { description: "success color", name: "alert-success", type: "color" },
  { description: "warning color", name: "alert-warning", type: "color" },
  { description: "error color", name: "alert-error", type: "color" },
  // Styles
  { description: "soft style", name: "alert-soft", type: "style" },
  { description: "outline style", name: "alert-outline", type: "style" },
];

// Pre-configured table for Alert component
export function AlertClassesTable() {
  return <ClassesTable classes={alertClasses} />;
}

// Pre-defined class set for Accordion component
export const accordionClasses: ClassInfo[] = [
  // Component
  { description: "Accordion wrapper", name: "accordion", type: "component" },
  {
    description: "Accordion item / panel",
    name: "accordion-item",
    type: "component",
  },
  {
    description: "Accordion toggle button",
    name: "accordion-toggle",
    type: "component",
  },
  // Styles
  { description: "bordered style", name: "accordion-bordered", type: "style" },
  {
    description: "shadowed cards style",
    name: "accordion-shadow",
    type: "style",
  },
];

export function AccordionClassesTable() {
  return <ClassesTable classes={accordionClasses} />;
}

// Pre-defined class set for AdvanceSelect component
export const advanceSelectClasses: ClassInfo[] = [
  // Component
  {
    description: "AdvanceSelect toggle / control",
    name: "advance-select-toggle",
    type: "component",
  },
  {
    description: "AdvanceSelect dropdown menu",
    name: "advance-select-menu",
    type: "component",
  },
  {
    description: "AdvanceSelect option item",
    name: "advance-select-option",
    type: "component",
  },
  {
    description: "AdvanceSelect selected tag",
    name: "advance-select-tag",
    type: "component",
  },
  // Behavior
  {
    description: "marks active / selected option",
    name: "select-active",
    type: "behavior",
  },
  // Sizes
  { description: "Extra small size", name: "advance-select-xs", type: "size" },
  { description: "Small size", name: "advance-select-sm", type: "size" },
  {
    description: "Medium size (default)",
    name: "advance-select-md",
    type: "size",
  },
  { description: "Large size", name: "advance-select-lg", type: "size" },
  { description: "Extra large size", name: "advance-select-xl", type: "size" },
];

export function AdvanceSelectClassesTable() {
  return <ClassesTable classes={advanceSelectClasses} />;
}

// Pre-defined class set for Avatar component
export const avatarClasses: ClassInfo[] = [
  // Component
  { description: "Avatar wrapper", name: "avatar", type: "component" },
  {
    description: "Group of stacked avatars",
    name: "avatar-group",
    type: "component",
  },
  {
    description: "Placeholder avatar (initials)",
    name: "avatar-placeholder",
    type: "component",
  },
  // Modifiers
  {
    description: "online indicator at top",
    name: "avatar-online-top",
    type: "modifier",
  },
  {
    description: "online indicator at bottom",
    name: "avatar-online-bottom",
    type: "modifier",
  },
  {
    description: "offline indicator at top",
    name: "avatar-offline-top",
    type: "modifier",
  },
  {
    description: "offline indicator at bottom",
    name: "avatar-offline-bottom",
    type: "modifier",
  },
  {
    description: "busy indicator at top",
    name: "avatar-busy-top",
    type: "modifier",
  },
  {
    description: "busy indicator at bottom",
    name: "avatar-busy-bottom",
    type: "modifier",
  },
  {
    description: "away indicator at top",
    name: "avatar-away-top",
    type: "modifier",
  },
  {
    description: "away indicator at bottom",
    name: "avatar-away-bottom",
    type: "modifier",
  },
  { description: "lifts avatar on hover", name: "pull-up", type: "modifier" },
];

export function AvatarClassesTable() {
  return <ClassesTable classes={avatarClasses} />;
}

// Pre-defined class set for Badge component
export const badgeClasses: ClassInfo[] = [
  // Component
  { description: "Badge", name: "badge", type: "component" },
  // Colors
  { description: "primary color", name: "badge-primary", type: "color" },
  { description: "secondary color", name: "badge-secondary", type: "color" },
  { description: "accent color", name: "badge-accent", type: "color" },
  { description: "info color", name: "badge-info", type: "color" },
  { description: "success color", name: "badge-success", type: "color" },
  { description: "warning color", name: "badge-warning", type: "color" },
  { description: "error color", name: "badge-error", type: "color" },
  // Styles
  { description: "soft style", name: "badge-soft", type: "style" },
  { description: "outline style", name: "badge-outline", type: "style" },
  // Sizes
  { description: "Extra small size", name: "badge-xs", type: "size" },
  { description: "Small size", name: "badge-sm", type: "size" },
  { description: "Medium size (default)", name: "badge-md", type: "size" },
  { description: "Large size", name: "badge-lg", type: "size" },
  { description: "Extra large size", name: "badge-xl", type: "size" },
];

export function BadgeClassesTable() {
  return <ClassesTable classes={badgeClasses} />;
}

// Pre-defined class set for Breadcrumbs component
export const breadcrumbsClasses: ClassInfo[] = [
  // Component
  {
    description: "Breadcrumbs wrapper",
    name: "breadcrumbs",
    type: "component",
  },
  {
    description: "Custom separator element",
    name: "breadcrumbs-separator",
    type: "component",
  },
];

export function BreadcrumbsClassesTable() {
  return <ClassesTable classes={breadcrumbsClasses} />;
}

// Pre-defined class set for Card component
export const cardClasses: ClassInfo[] = [
  // Component
  { description: "Card wrapper", name: "card", type: "component" },
  {
    description: "Card header section",
    name: "card-header",
    type: "component",
  },
  { description: "Card body / content", name: "card-body", type: "component" },
  { description: "Card title", name: "card-title", type: "component" },
  {
    description: "Card footer section",
    name: "card-footer",
    type: "component",
  },
  {
    description: "Container for card actions",
    name: "card-actions",
    type: "component",
  },
  {
    description: "Inline alert inside the card",
    name: "card-alert",
    type: "component",
  },
  {
    description: "Group of connected cards",
    name: "card-group",
    type: "component",
  },
  // Styles
  { description: "bordered style", name: "card-border", type: "style" },
  // Modifiers
  {
    description: "horizontal side-by-side layout",
    name: "card-side",
    type: "modifier",
  },
  {
    description: "full-bleed image background",
    name: "image-full",
    type: "modifier",
  },
  // Sizes
  { description: "Extra small size", name: "card-xs", type: "size" },
  { description: "Small size", name: "card-sm", type: "size" },
  { description: "Medium size (default)", name: "card-md", type: "size" },
  { description: "Large size", name: "card-lg", type: "size" },
  { description: "Extra large size", name: "card-xl", type: "size" },
];

export function CardClassesTable() {
  return <ClassesTable classes={cardClasses} />;
}

// Pre-defined class set for Carousel component
export const carouselClasses: ClassInfo[] = [
  // Component
  { description: "Carousel wrapper", name: "carousel", type: "component" },
  {
    description: "Carousel slides container",
    name: "carousel-body",
    type: "component",
  },
  {
    description: "Carousel viewport box",
    name: "carousel-box",
    type: "component",
  },
  {
    description: "Individual slide",
    name: "carousel-slide",
    type: "component",
  },
  {
    description: "Previous slide control",
    name: "carousel-prev",
    type: "component",
  },
  {
    description: "Next slide control",
    name: "carousel-next",
    type: "component",
  },
  { description: "Pagination dot", name: "carousel-dot", type: "component" },
  // Behavior
  { description: "disabled control", name: "disabled", type: "behavior" },
];

export function CarouselClassesTable() {
  return <ClassesTable classes={carouselClasses} />;
}

// Pre-defined class set for Chat component
export const chatClasses: ClassInfo[] = [
  // Component
  { description: "Chat message wrapper", name: "chat", type: "component" },
  { description: "Chat avatar", name: "chat-avatar", type: "component" },
  {
    description: "Chat message header",
    name: "chat-header",
    type: "component",
  },
  {
    description: "Chat message bubble",
    name: "chat-bubble",
    type: "component",
  },
  {
    description: "Chat message footer",
    name: "chat-footer",
    type: "component",
  },
  // Modifiers
  {
    description: "aligns the message as sender",
    name: "chat-sender",
    type: "modifier",
  },
  {
    description: "aligns the message as receiver",
    name: "chat-receiver",
    type: "modifier",
  },
];

export function ChatClassesTable() {
  return <ClassesTable classes={chatClasses} />;
}

// Pre-defined class set for Checkbox component
export const checkboxClasses: ClassInfo[] = [
  // Component
  { description: "Checkbox", name: "checkbox", type: "component" },
  // Colors
  { description: "primary color", name: "checkbox-primary", type: "color" },
  { description: "secondary color", name: "checkbox-secondary", type: "color" },
  { description: "accent color", name: "checkbox-accent", type: "color" },
  { description: "info color", name: "checkbox-info", type: "color" },
  { description: "success color", name: "checkbox-success", type: "color" },
  { description: "warning color", name: "checkbox-warning", type: "color" },
  { description: "error color", name: "checkbox-error", type: "color" },
  // Sizes
  { description: "Extra small size", name: "checkbox-xs", type: "size" },
  { description: "Small size", name: "checkbox-sm", type: "size" },
  { description: "Medium size (default)", name: "checkbox-md", type: "size" },
  { description: "Large size", name: "checkbox-lg", type: "size" },
  { description: "Extra large size", name: "checkbox-xl", type: "size" },
];

export function CheckboxClassesTable() {
  return <ClassesTable classes={checkboxClasses} />;
}

// Pre-defined class set for Collapse component
export const collapseClasses: ClassInfo[] = [
  // Component
  { description: "Collapse wrapper", name: "collapse", type: "component" },
];

export function CollapseClassesTable() {
  return <ClassesTable classes={collapseClasses} />;
}

// Pre-defined class set for CustomOptions component
export const customOptionsClasses: ClassInfo[] = [
  // Component
  {
    description: "Custom option (radio/checkbox card)",
    name: "custom-option",
    type: "component",
  },
  { description: "Option label text", name: "label-text", type: "component" },
  // Styles
  { description: "soft style", name: "custom-soft-option", type: "style" },
];

export function CustomOptionsClassesTable() {
  return <ClassesTable classes={customOptionsClasses} />;
}

// Pre-defined class set for Diff component
export const diffClasses: ClassInfo[] = [
  // Component
  { description: "Diff wrapper", name: "diff", type: "component" },
  {
    description: "First diff item (before)",
    name: "diff-item-1",
    type: "component",
  },
  {
    description: "Second diff item (after)",
    name: "diff-item-2",
    type: "component",
  },
  {
    description: "Draggable resizer between items",
    name: "diff-resizer",
    type: "component",
  },
];

export function DiffClassesTable() {
  return <ClassesTable classes={diffClasses} />;
}

// Pre-defined class set for Divider component
export const dividerClasses: ClassInfo[] = [
  // Component
  { description: "Divider", name: "divider", type: "component" },
  // Colors
  { description: "neutral color", name: "divider-neutral", type: "color" },
  { description: "primary color", name: "divider-primary", type: "color" },
  { description: "secondary color", name: "divider-secondary", type: "color" },
  { description: "accent color", name: "divider-accent", type: "color" },
  { description: "info color", name: "divider-info", type: "color" },
  { description: "success color", name: "divider-success", type: "color" },
  { description: "warning color", name: "divider-warning", type: "color" },
  { description: "error color", name: "divider-error", type: "color" },
  // Styles
  { description: "dashed style", name: "divider-dashed", type: "style" },
  { description: "dotted style", name: "divider-dotted", type: "style" },
  // Modifiers
  {
    description: "horizontal orientation",
    name: "divider-horizontal",
    type: "modifier",
  },
  {
    description: "vertical orientation",
    name: "divider-vertical",
    type: "modifier",
  },
  {
    description: "aligns content to start",
    name: "divider-start",
    type: "modifier",
  },
  {
    description: "aligns content to end",
    name: "divider-end",
    type: "modifier",
  },
];

export function DividerClassesTable() {
  return <ClassesTable classes={dividerClasses} />;
}

// Pre-defined class set for Drawer component
export const drawerClasses: ClassInfo[] = [
  // Component
  { description: "Drawer wrapper", name: "drawer", type: "component" },
  {
    description: "Drawer header section",
    name: "drawer-header",
    type: "component",
  },
  { description: "Drawer title", name: "drawer-title", type: "component" },
  {
    description: "Drawer body / content",
    name: "drawer-body",
    type: "component",
  },
  {
    description: "Drawer footer section",
    name: "drawer-footer",
    type: "component",
  },
  // Modifiers
  {
    description: "opens from start side",
    name: "drawer-start",
    type: "modifier",
  },
  { description: "opens from end side", name: "drawer-end", type: "modifier" },
  { description: "opens from top", name: "drawer-top", type: "modifier" },
  { description: "opens from bottom", name: "drawer-bottom", type: "modifier" },
];

export function DrawerClassesTable() {
  return <ClassesTable classes={drawerClasses} />;
}

// Pre-defined class set for Dropdown component
export const dropdownClasses: ClassInfo[] = [
  // Component
  {
    description: "Dropdown menu wrapper",
    name: "dropdown-menu",
    type: "component",
  },
  {
    description: "Dropdown header",
    name: "dropdown-header",
    type: "component",
  },
  { description: "Dropdown title", name: "dropdown-title", type: "component" },
  { description: "Dropdown item", name: "dropdown-item", type: "component" },
  {
    description: "Dropdown footer",
    name: "dropdown-footer",
    type: "component",
  },
  // Behavior
  {
    description: "marks active item",
    name: "dropdown-active",
    type: "behavior",
  },
  {
    description: "looks disabled",
    name: "dropdown-disabled",
    type: "behavior",
  },
];

export function DropdownClassesTable() {
  return <ClassesTable classes={dropdownClasses} />;
}

// Pre-defined class set for FileInput component
export const fileinputClasses: ClassInfo[] = [
  // Component
  { description: "File input control", name: "input", type: "component" },
  // Styles
  {
    description: "floating label style",
    name: "input-floating",
    type: "style",
  },
  // Sizes
  { description: "Extra small size", name: "input-xs", type: "size" },
  { description: "Small size", name: "input-sm", type: "size" },
  { description: "Medium size (default)", name: "input-md", type: "size" },
  { description: "Large size", name: "input-lg", type: "size" },
  { description: "Extra large size", name: "input-xl", type: "size" },
];

export function FileinputClassesTable() {
  return <ClassesTable classes={fileinputClasses} />;
}

// Pre-defined class set for Filter component
export const filterClasses: ClassInfo[] = [
  // Component
  { description: "Filter wrapper", name: "filter", type: "component" },
  {
    description: "Filter reset button",
    name: "filter-reset",
    type: "component",
  },
];

export function FilterClassesTable() {
  return <ClassesTable classes={filterClasses} />;
}

// Pre-defined class set for Footer component
export const footerClasses: ClassInfo[] = [
  // Component
  { description: "Footer wrapper", name: "footer", type: "component" },
  {
    description: "Footer column title",
    name: "footer-title",
    type: "component",
  },
  { description: "Footer link", name: "link", type: "component" },
  // Modifiers
  {
    description: "centers footer content",
    name: "footer-center",
    type: "modifier",
  },
];

export function FooterClassesTable() {
  return <ClassesTable classes={footerClasses} />;
}

// Pre-defined class set for Indicator component
export const indicatorClasses: ClassInfo[] = [
  // Component
  { description: "Indicator wrapper", name: "indicator", type: "component" },
  {
    description: "Item being positioned",
    name: "indicator-item",
    type: "component",
  },
  // Modifiers
  {
    description: "positions item at top",
    name: "indicator-top",
    type: "modifier",
  },
  {
    description: "positions item at vertical middle",
    name: "indicator-middle",
    type: "modifier",
  },
  {
    description: "positions item at bottom",
    name: "indicator-bottom",
    type: "modifier",
  },
  {
    description: "positions item at start",
    name: "indicator-start",
    type: "modifier",
  },
  {
    description: "positions item at horizontal center",
    name: "indicator-center",
    type: "modifier",
  },
  {
    description: "positions item at end",
    name: "indicator-end",
    type: "modifier",
  },
];

export function IndicatorClassesTable() {
  return <ClassesTable classes={indicatorClasses} />;
}

// Pre-defined class set for Input component
export const inputClasses: ClassInfo[] = [
  // Component
  { description: "Input control", name: "input", type: "component" },
  {
    description: "Label used in floating style",
    name: "input-floating-label",
    type: "component",
  },
  // Styles
  {
    description: "floating label style",
    name: "input-floating",
    type: "style",
  },
  // Sizes
  { description: "Extra small size", name: "input-xs", type: "size" },
  { description: "Small size", name: "input-sm", type: "size" },
  { description: "Medium size (default)", name: "input-md", type: "size" },
  { description: "Large size", name: "input-lg", type: "size" },
  { description: "Extra large size", name: "input-xl", type: "size" },
];

export function InputClassesTable() {
  return <ClassesTable classes={inputClasses} />;
}

// Pre-defined class set for Kbd component
export const kbdClasses: ClassInfo[] = [
  // Component
  { description: "Keyboard key", name: "kbd", type: "component" },
  // Sizes
  { description: "Extra small size", name: "kbd-xs", type: "size" },
  { description: "Small size", name: "kbd-sm", type: "size" },
  { description: "Medium size (default)", name: "kbd-md", type: "size" },
  { description: "Large size", name: "kbd-lg", type: "size" },
  { description: "Extra large size", name: "kbd-xl", type: "size" },
];

export function KbdClassesTable() {
  return <ClassesTable classes={kbdClasses} />;
}

// Pre-defined class set for Label component
export const labelClasses: ClassInfo[] = [
  // Component
  { description: "Form field label", name: "label-text", type: "component" },
  {
    description: "Helper / hint text below the field",
    name: "helper-text",
    type: "component",
  },
  {
    description: "Success message text",
    name: "success-message",
    type: "component",
  },
  {
    description: "Error message text",
    name: "error-message",
    type: "component",
  },
];

export function LabelClassesTable() {
  return <ClassesTable classes={labelClasses} />;
}

// Pre-defined class set for Link component
export const linkClasses: ClassInfo[] = [
  // Component
  { description: "Link", name: "link", type: "component" },
  // Colors
  { description: "neutral color", name: "link-neutral", type: "color" },
  { description: "primary color", name: "link-primary", type: "color" },
  { description: "secondary color", name: "link-secondary", type: "color" },
  { description: "accent color", name: "link-accent", type: "color" },
  { description: "info color", name: "link-info", type: "color" },
  { description: "success color", name: "link-success", type: "color" },
  { description: "warning color", name: "link-warning", type: "color" },
  { description: "error color", name: "link-error", type: "color" },
  // Styles
  { description: "underline only on hover", name: "link-hover", type: "style" },
  {
    description: "animated underline on hover",
    name: "link-animated",
    type: "style",
  },
  // Behavior
  { description: "looks disabled", name: "disabled", type: "behavior" },
];

export function LinkClassesTable() {
  return <ClassesTable classes={linkClasses} />;
}

// Pre-defined class set for Loading component
export const loadingClasses: ClassInfo[] = [
  // Component
  { description: "Loading indicator", name: "loading", type: "component" },
  // Styles
  { description: "spinner style", name: "loading-spinner", type: "style" },
  { description: "dots style", name: "loading-dots", type: "style" },
  { description: "ring style", name: "loading-ring", type: "style" },
  { description: "ball style", name: "loading-ball", type: "style" },
  { description: "bars style", name: "loading-bars", type: "style" },
  { description: "infinity style", name: "loading-infinity", type: "style" },
  // Sizes
  { description: "Extra small size", name: "loading-xs", type: "size" },
  { description: "Small size", name: "loading-sm", type: "size" },
  { description: "Medium size (default)", name: "loading-md", type: "size" },
  { description: "Large size", name: "loading-lg", type: "size" },
  { description: "Extra large size", name: "loading-xl", type: "size" },
];

export function LoadingClassesTable() {
  return <ClassesTable classes={loadingClasses} />;
}

// Pre-defined class set for Mask component
export const maskClasses: ClassInfo[] = [
  // Component
  { description: "Mask wrapper", name: "mask", type: "component" },
  // Modifiers (shape variants)
  { description: "squircle shape", name: "mask-squircle", type: "modifier" },
  { description: "heart shape", name: "mask-heart", type: "modifier" },
  { description: "hexagon shape", name: "mask-hexagon", type: "modifier" },
  {
    description: "alternate hexagon shape",
    name: "mask-hexagon-2",
    type: "modifier",
  },
  { description: "decagon shape", name: "mask-decagon", type: "modifier" },
  { description: "pentagon shape", name: "mask-pentagon", type: "modifier" },
  { description: "diamond shape", name: "mask-diamond", type: "modifier" },
  { description: "square shape", name: "mask-square", type: "modifier" },
  { description: "circle shape", name: "mask-circle", type: "modifier" },
  { description: "star shape", name: "mask-star", type: "modifier" },
  {
    description: "alternate star shape",
    name: "mask-star-2",
    type: "modifier",
  },
  { description: "triangle shape", name: "mask-triangle", type: "modifier" },
  {
    description: "alternate triangle shape",
    name: "mask-triangle-2",
    type: "modifier",
  },
  {
    description: "alternate triangle shape",
    name: "mask-triangle-3",
    type: "modifier",
  },
  {
    description: "alternate triangle shape",
    name: "mask-triangle-4",
    type: "modifier",
  },
  {
    description: "parallelogram shape",
    name: "mask-parallelogram",
    type: "modifier",
  },
  {
    description: "alternate parallelogram shape",
    name: "mask-parallelogram-2",
    type: "modifier",
  },
  {
    description: "alternate parallelogram shape",
    name: "mask-parallelogram-3",
    type: "modifier",
  },
  {
    description: "alternate parallelogram shape",
    name: "mask-parallelogram-4",
    type: "modifier",
  },
  {
    description: "first half of the shape",
    name: "mask-half-1",
    type: "modifier",
  },
  {
    description: "second half of the shape",
    name: "mask-half-2",
    type: "modifier",
  },
];

export function MaskClassesTable() {
  return <ClassesTable classes={maskClasses} />;
}

// Pre-defined class set for Menu component
export const menuClasses: ClassInfo[] = [
  // Component
  { description: "Menu wrapper", name: "menu", type: "component" },
  { description: "Menu group title", name: "menu-title", type: "component" },
  {
    description: "Nested dropdown inside the menu",
    name: "menu-dropdown",
    type: "component",
  },
  // Behavior
  { description: "marks active item", name: "menu-active", type: "behavior" },
  { description: "looks disabled", name: "menu-disabled", type: "behavior" },
  {
    description: "shows the nested dropdown",
    name: "menu-dropdown-show",
    type: "behavior",
  },
  // Modifiers
  {
    description: "vertical orientation",
    name: "menu-vertical",
    type: "modifier",
  },
  {
    description: "horizontal orientation",
    name: "menu-horizontal",
    type: "modifier",
  },
  // Sizes
  { description: "Extra small size", name: "menu-xs", type: "size" },
  { description: "Small size", name: "menu-sm", type: "size" },
  { description: "Medium size (default)", name: "menu-md", type: "size" },
  { description: "Large size", name: "menu-lg", type: "size" },
  { description: "Extra large size", name: "menu-xl", type: "size" },
];

export function MenuClassesTable() {
  return <ClassesTable classes={menuClasses} />;
}

// Pre-defined class set for Mockup component
export const mockupClasses: ClassInfo[] = [
  // Component
  {
    description: "Browser window mockup",
    name: "mockup-browser",
    type: "component",
  },
  {
    description: "Browser toolbar inside the mockup",
    name: "mockup-browser-toolbar",
    type: "component",
  },
  {
    description: "Generic OS window mockup",
    name: "mockup-window",
    type: "component",
  },
  {
    description: "Phone device mockup",
    name: "mockup-phone",
    type: "component",
  },
  {
    description: "Phone camera notch",
    name: "mockup-phone-camera",
    type: "component",
  },
  {
    description: "Phone display area",
    name: "mockup-phone-display",
    type: "component",
  },
  { description: "Code window mockup", name: "mockup-code", type: "component" },
];

export function MockupClassesTable() {
  return <ClassesTable classes={mockupClasses} />;
}

// Pre-defined class set for Modal component
export const modalClasses: ClassInfo[] = [
  // Component
  { description: "Modal wrapper", name: "modal", type: "component" },
  {
    description: "Modal dialog container",
    name: "modal-dialog",
    type: "component",
  },
  {
    description: "Modal content surface",
    name: "modal-content",
    type: "component",
  },
  {
    description: "Modal header section",
    name: "modal-header",
    type: "component",
  },
  { description: "Modal title", name: "modal-title", type: "component" },
  {
    description: "Modal body / content",
    name: "modal-body",
    type: "component",
  },
  {
    description: "Modal footer section",
    name: "modal-footer",
    type: "component",
  },
  // Sizes (dialog)
  { description: "Small dialog", name: "modal-dialog-sm", type: "size" },
  {
    description: "Medium dialog (default)",
    name: "modal-dialog-md",
    type: "size",
  },
  { description: "Large dialog", name: "modal-dialog-lg", type: "size" },
  { description: "Extra large dialog", name: "modal-dialog-xl", type: "size" },
  // Modifiers (position)
  { description: "anchors modal to top", name: "modal-top", type: "modifier" },
  {
    description: "anchors modal to top start",
    name: "modal-top-start",
    type: "modifier",
  },
  {
    description: "anchors modal to top end",
    name: "modal-top-end",
    type: "modifier",
  },
  {
    description: "anchors modal to middle",
    name: "modal-middle",
    type: "modifier",
  },
  {
    description: "anchors modal to middle start",
    name: "modal-middle-start",
    type: "modifier",
  },
  {
    description: "anchors modal to middle end",
    name: "modal-middle-end",
    type: "modifier",
  },
  {
    description: "anchors modal to bottom",
    name: "modal-bottom",
    type: "modifier",
  },
  {
    description: "anchors modal to bottom start",
    name: "modal-bottom-start",
    type: "modifier",
  },
  {
    description: "anchors modal to bottom end",
    name: "modal-bottom-end",
    type: "modifier",
  },
];

export function ModalClassesTable() {
  return <ClassesTable classes={modalClasses} />;
}

// Pre-defined class set for Navbar component
export const navbarClasses: ClassInfo[] = [
  // Component
  { description: "Navbar wrapper", name: "navbar", type: "component" },
  {
    description: "Start section of the navbar",
    name: "navbar-start",
    type: "component",
  },
  {
    description: "Center section of the navbar",
    name: "navbar-center",
    type: "component",
  },
  {
    description: "End section of the navbar",
    name: "navbar-end",
    type: "component",
  },
];

export function NavbarClassesTable() {
  return <ClassesTable classes={navbarClasses} />;
}

// Pre-defined class set for PinInput component
export const pinInputClasses: ClassInfo[] = [
  // Component
  { description: "Pin input field", name: "pin-input", type: "component" },
  // Styles
  {
    description: "underline style",
    name: "pin-input-underline",
    type: "style",
  },
  // Behavior
  { description: "looks disabled", name: "disabled", type: "behavior" },
  // Sizes
  { description: "Extra small size", name: "pin-input-xs", type: "size" },
  { description: "Small size", name: "pin-input-sm", type: "size" },
  { description: "Medium size (default)", name: "pin-input-md", type: "size" },
  { description: "Large size", name: "pin-input-lg", type: "size" },
  { description: "Extra large size", name: "pin-input-xl", type: "size" },
];

export function PinInputClassesTable() {
  return <ClassesTable classes={pinInputClasses} />;
}

// Pre-defined class set for Progress component
export const progressClasses: ClassInfo[] = [
  // Component
  { description: "Progress wrapper", name: "progress", type: "component" },
  {
    description: "Filled progress bar",
    name: "progress-bar",
    type: "component",
  },
  {
    description: "Step within the progress",
    name: "progress-step",
    type: "component",
  },
  {
    description: "Progress label / text",
    name: "progress-label",
    type: "component",
  },
  // Colors
  { description: "primary color", name: "progress-primary", type: "color" },
  { description: "secondary color", name: "progress-secondary", type: "color" },
  { description: "accent color", name: "progress-accent", type: "color" },
  { description: "info color", name: "progress-info", type: "color" },
  { description: "success color", name: "progress-success", type: "color" },
  { description: "warning color", name: "progress-warning", type: "color" },
  { description: "error color", name: "progress-error", type: "color" },
  // Styles
  { description: "striped style", name: "progress-striped", type: "style" },
  { description: "animated stripes", name: "progress-animated", type: "style" },
  // Modifiers
  {
    description: "horizontal orientation",
    name: "progress-horizontal",
    type: "modifier",
  },
  {
    description: "vertical orientation",
    name: "progress-vertical",
    type: "modifier",
  },
  {
    description: "indeterminate progress",
    name: "progress-indeterminate",
    type: "modifier",
  },
];

export function ProgressClassesTable() {
  return <ClassesTable classes={progressClasses} />;
}

// Pre-defined class set for RadialProgress component
export const radialprogressClasses: ClassInfo[] = [
  // Component
  {
    description: "Radial progress indicator",
    name: "radial-progress",
    type: "component",
  },
];

export function RadialprogressClassesTable() {
  return <ClassesTable classes={radialprogressClasses} />;
}

// Pre-defined class set for Radio component
export const radioClasses: ClassInfo[] = [
  // Component
  { description: "Radio input", name: "radio", type: "component" },
  // Colors
  { description: "primary color", name: "radio-primary", type: "color" },
  { description: "secondary color", name: "radio-secondary", type: "color" },
  { description: "accent color", name: "radio-accent", type: "color" },
  { description: "info color", name: "radio-info", type: "color" },
  { description: "success color", name: "radio-success", type: "color" },
  { description: "warning color", name: "radio-warning", type: "color" },
  { description: "error color", name: "radio-error", type: "color" },
  // Styles
  { description: "inset dot style", name: "radio-inset", type: "style" },
  // Sizes
  { description: "Extra small size", name: "radio-xs", type: "size" },
  { description: "Small size", name: "radio-sm", type: "size" },
  { description: "Medium size (default)", name: "radio-md", type: "size" },
  { description: "Large size", name: "radio-lg", type: "size" },
  { description: "Extra large size", name: "radio-xl", type: "size" },
];

export function RadioClassesTable() {
  return <ClassesTable classes={radioClasses} />;
}

// Pre-defined class set for Range component
export const rangeClasses: ClassInfo[] = [
  // Component
  { description: "Range slider", name: "range", type: "component" },
  // Colors
  { description: "primary color", name: "range-primary", type: "color" },
  { description: "secondary color", name: "range-secondary", type: "color" },
  { description: "accent color", name: "range-accent", type: "color" },
  { description: "info color", name: "range-info", type: "color" },
  { description: "success color", name: "range-success", type: "color" },
  { description: "warning color", name: "range-warning", type: "color" },
  { description: "error color", name: "range-error", type: "color" },
  // Behavior
  { description: "looks disabled", name: "disabled", type: "behavior" },
  // Sizes
  { description: "Extra small size", name: "range-xs", type: "size" },
  { description: "Small size", name: "range-sm", type: "size" },
  { description: "Medium size (default)", name: "range-md", type: "size" },
  { description: "Large size", name: "range-lg", type: "size" },
  { description: "Extra large size", name: "range-xl", type: "size" },
];

export function RangeClassesTable() {
  return <ClassesTable classes={rangeClasses} />;
}

// Pre-defined class set for Select component
export const selectClasses: ClassInfo[] = [
  // Component
  { description: "Select control", name: "select", type: "component" },
  {
    description: "Label used in floating style",
    name: "select-floating-label",
    type: "component",
  },
  // Styles
  {
    description: "floating label style",
    name: "select-floating",
    type: "style",
  },
  // Sizes
  { description: "Extra small size", name: "select-xs", type: "size" },
  { description: "Small size", name: "select-sm", type: "size" },
  { description: "Medium size (default)", name: "select-md", type: "size" },
  { description: "Large size", name: "select-lg", type: "size" },
  { description: "Extra large size", name: "select-xl", type: "size" },
];

export function SelectClassesTable() {
  return <ClassesTable classes={selectClasses} />;
}

// Pre-defined class set for Skeleton component
export const skeletonClasses: ClassInfo[] = [
  // Component
  { description: "Skeleton placeholder", name: "skeleton", type: "component" },
  // Styles
  {
    description: "shimmer animation",
    name: "skeleton-animated",
    type: "style",
  },
  { description: "striped style", name: "skeleton-striped", type: "style" },
];

export function SkeletonClassesTable() {
  return <ClassesTable classes={skeletonClasses} />;
}

// Pre-defined class set for Stack component
export const stackClasses: ClassInfo[] = [
  // Component
  { description: "Stack wrapper", name: "stack", type: "component" },
  // Styles
  { description: "animated stack", name: "stack-animated", type: "style" },
  // Modifiers
  { description: "stack from top", name: "stack-top", type: "modifier" },
  {
    description: "stack from top start",
    name: "stack-top-start",
    type: "modifier",
  },
  {
    description: "stack from top end",
    name: "stack-top-end",
    type: "modifier",
  },
  {
    description: "stack from bottom start",
    name: "stack-bottom-start",
    type: "modifier",
  },
  {
    description: "stack from bottom end",
    name: "stack-bottom-end",
    type: "modifier",
  },
  { description: "stack from start", name: "stack-start", type: "modifier" },
  { description: "stack from end", name: "stack-end", type: "modifier" },
];

export function StackClassesTable() {
  return <ClassesTable classes={stackClasses} />;
}

// Pre-defined class set for Stat component
export const statClasses: ClassInfo[] = [
  // Component
  { description: "Stats wrapper", name: "stats", type: "component" },
  { description: "Single stat block", name: "stat", type: "component" },
  { description: "Stat title", name: "stat-title", type: "component" },
  { description: "Stat value", name: "stat-value", type: "component" },
  { description: "Stat description", name: "stat-desc", type: "component" },
  { description: "Stat figure / icon", name: "stat-figure", type: "component" },
  {
    description: "Stat actions container",
    name: "stat-actions",
    type: "component",
  },
  // Styles
  { description: "bordered style", name: "stats-border", type: "style" },
  // Modifiers
  {
    description: "horizontal orientation",
    name: "stats-horizontal",
    type: "modifier",
  },
  {
    description: "vertical orientation",
    name: "stats-vertical",
    type: "modifier",
  },
];

export function StatClassesTable() {
  return <ClassesTable classes={statClasses} />;
}

// Pre-defined class set for Status component
export const statusClasses: ClassInfo[] = [
  // Component
  { description: "Status indicator dot", name: "status", type: "component" },
  // Colors
  { description: "primary color", name: "status-primary", type: "color" },
  { description: "secondary color", name: "status-secondary", type: "color" },
  { description: "accent color", name: "status-accent", type: "color" },
  { description: "info color", name: "status-info", type: "color" },
  { description: "success color", name: "status-success", type: "color" },
  { description: "warning color", name: "status-warning", type: "color" },
  { description: "error color", name: "status-error", type: "color" },
  // Sizes
  { description: "Extra small size", name: "status-xs", type: "size" },
  { description: "Small size", name: "status-sm", type: "size" },
  { description: "Medium size (default)", name: "status-md", type: "size" },
  { description: "Large size", name: "status-lg", type: "size" },
  { description: "Extra large size", name: "status-xl", type: "size" },
];

export function StatusClassesTable() {
  return <ClassesTable classes={statusClasses} />;
}

// Pre-defined class set for Swap component
export const swapClasses: ClassInfo[] = [
  // Component
  { description: "Swap wrapper", name: "swap", type: "component" },
  {
    description: "Element shown when active",
    name: "swap-on",
    type: "component",
  },
  {
    description: "Element shown when inactive",
    name: "swap-off",
    type: "component",
  },
  {
    description: "Element shown in indeterminate state",
    name: "swap-indeterminate",
    type: "component",
  },
  // Styles
  { description: "rotate animation", name: "swap-rotate", type: "style" },
  { description: "flip animation", name: "swap-flip", type: "style" },
  // Behavior
  {
    description: "marks the swap as active",
    name: "swap-active",
    type: "behavior",
  },
];

export function SwapClassesTable() {
  return <ClassesTable classes={swapClasses} />;
}

// Pre-defined class set for Switches component
export const switchesClasses: ClassInfo[] = [
  // Component
  { description: "Switch toggle", name: "switch", type: "component" },
  // Colors
  { description: "primary color", name: "switch-primary", type: "color" },
  { description: "secondary color", name: "switch-secondary", type: "color" },
  { description: "accent color", name: "switch-accent", type: "color" },
  { description: "info color", name: "switch-info", type: "color" },
  { description: "success color", name: "switch-success", type: "color" },
  { description: "warning color", name: "switch-warning", type: "color" },
  { description: "error color", name: "switch-error", type: "color" },
  // Styles
  { description: "outline style", name: "switch-outline", type: "style" },
  // Sizes
  { description: "Extra small size", name: "switch-xs", type: "size" },
  { description: "Small size", name: "switch-sm", type: "size" },
  { description: "Medium size (default)", name: "switch-md", type: "size" },
  { description: "Large size", name: "switch-lg", type: "size" },
  { description: "Extra large size", name: "switch-xl", type: "size" },
];

export function SwitchesClassesTable() {
  return <ClassesTable classes={switchesClasses} />;
}

// Pre-defined class set for Tab component
export const tabClasses: ClassInfo[] = [
  // Component
  { description: "Tabs wrapper", name: "tabs", type: "component" },
  { description: "Single tab", name: "tab", type: "component" },
  { description: "Tab content panel", name: "tab-content", type: "component" },
  // Styles
  { description: "bordered style", name: "tabs-bordered", type: "style" },
  { description: "lifted style", name: "tabs-lifted", type: "style" },
  // Behavior
  { description: "marks active tab", name: "tab-active", type: "behavior" },
  // Modifiers
  {
    description: "vertical orientation",
    name: "tabs-vertical",
    type: "modifier",
  },
  // Sizes
  { description: "Extra small size", name: "tabs-xs", type: "size" },
  { description: "Small size", name: "tabs-sm", type: "size" },
  { description: "Medium size (default)", name: "tabs-md", type: "size" },
  { description: "Large size", name: "tabs-lg", type: "size" },
  { description: "Extra large size", name: "tabs-xl", type: "size" },
];

export function TabClassesTable() {
  return <ClassesTable classes={tabClasses} />;
}

// Pre-defined class set for Table component
export const tableClasses: ClassInfo[] = [
  // Component
  { description: "Table", name: "table", type: "component" },
  // Styles
  { description: "striped rows", name: "table-striped", type: "style" },
  {
    description: "striped columns",
    name: "table-striped-columns",
    type: "style",
  },
  { description: "borderless style", name: "table-borderless", type: "style" },
  // Behavior
  { description: "marks active row", name: "row-active", type: "behavior" },
  { description: "row hover highlight", name: "row-hover", type: "behavior" },
  // Modifiers
  {
    description: "pins header / row sections",
    name: "table-pin-rows",
    type: "modifier",
  },
  {
    description: "pins first / last columns",
    name: "table-pin-cols",
    type: "modifier",
  },
  // Sizes
  { description: "Extra small size", name: "table-xs", type: "size" },
  { description: "Small size", name: "table-sm", type: "size" },
  { description: "Medium size (default)", name: "table-md", type: "size" },
  { description: "Large size", name: "table-lg", type: "size" },
  { description: "Extra large size", name: "table-xl", type: "size" },
];

export function TableClassesTable() {
  return <ClassesTable classes={tableClasses} />;
}

// Pre-defined class set for Textarea component
export const textareaClasses: ClassInfo[] = [
  // Component
  { description: "Textarea control", name: "textarea", type: "component" },
  {
    description: "Label used in floating style",
    name: "textarea-floating-label",
    type: "component",
  },
  // Styles
  {
    description: "floating label style",
    name: "textarea-floating",
    type: "style",
  },
  // Sizes
  { description: "Extra small size", name: "textarea-xs", type: "size" },
  { description: "Small size", name: "textarea-sm", type: "size" },
  { description: "Medium size (default)", name: "textarea-md", type: "size" },
  { description: "Large size", name: "textarea-lg", type: "size" },
  { description: "Extra large size", name: "textarea-xl", type: "size" },
];

export function TextareaClassesTable() {
  return <ClassesTable classes={textareaClasses} />;
}

// Pre-defined class set for Timeline component
export const timelineClasses: ClassInfo[] = [
  // Component
  { description: "Timeline wrapper", name: "timeline", type: "component" },
  { description: "Item start side", name: "timeline-start", type: "component" },
  {
    description: "Item middle / icon area",
    name: "timeline-middle",
    type: "component",
  },
  { description: "Item end side", name: "timeline-end", type: "component" },
  {
    description: "Boxed item content",
    name: "timeline-box",
    type: "component",
  },
  {
    description: "Snaps icon to the line",
    name: "timeline-snap-icon",
    type: "component",
  },
  // Modifiers
  {
    description: "vertical orientation",
    name: "timeline-vertical",
    type: "modifier",
  },
  {
    description: "horizontal orientation",
    name: "timeline-horizontal",
    type: "modifier",
  },
  {
    description: "compact spacing",
    name: "timeline-compact",
    type: "modifier",
  },
  {
    description: "centers content around the line",
    name: "timeline-centered",
    type: "modifier",
  },
  {
    description: "shifts content alignment",
    name: "timeline-shift",
    type: "modifier",
  },
];

export function TimelineClassesTable() {
  return <ClassesTable classes={timelineClasses} />;
}

// Pre-defined class set for Tooltip component
export const tooltipClasses: ClassInfo[] = [
  // Component
  { description: "Tooltip wrapper", name: "tooltip", type: "component" },
  {
    description: "Tooltip content container",
    name: "tooltip-content",
    type: "component",
  },
  {
    description: "Tooltip body / bubble",
    name: "tooltip-body",
    type: "component",
  },
  // Colors
  { description: "primary color", name: "tooltip-primary", type: "color" },
  { description: "secondary color", name: "tooltip-secondary", type: "color" },
  { description: "accent color", name: "tooltip-accent", type: "color" },
  { description: "info color", name: "tooltip-info", type: "color" },
  { description: "success color", name: "tooltip-success", type: "color" },
  { description: "warning color", name: "tooltip-warning", type: "color" },
  { description: "error color", name: "tooltip-error", type: "color" },
];

export function TooltipClassesTable() {
  return <ClassesTable classes={tooltipClasses} />;
}

// Pre-defined class set for Validation component
export const validationClasses: ClassInfo[] = [
  // Component
  { description: "Form field label", name: "label-text", type: "component" },
  {
    description: "Helper / hint text below the field",
    name: "helper-text",
    type: "component",
  },
  {
    description: "Success message text",
    name: "success-message",
    type: "component",
  },
  {
    description: "Error message text",
    name: "error-message",
    type: "component",
  },
  // Behavior
  {
    description: "enables native validation styling",
    name: "validate",
    type: "behavior",
  },
  { description: "marks field as valid", name: "is-valid", type: "behavior" },
  {
    description: "marks field as invalid",
    name: "is-invalid",
    type: "behavior",
  },
  {
    description: "marks option as selected",
    name: "selected",
    type: "behavior",
  },
];

export function ValidationClassesTable() {
  return <ClassesTable classes={validationClasses} />;
}
