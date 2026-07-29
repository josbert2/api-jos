'use client';

import { useState, useMemo, useEffect } from 'react';
import {
  Dialog,
  DialogPopup,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@coss/ui/ui/dialog';
import { Button } from '@coss/ui/ui/button';

// --- Types ---
interface ThemeVariables {
  'base-100': string;
  'base-200': string;
  'base-300': string;
  'base-content': string;
  primary: string;
  'primary-content': string;
  secondary: string;
  'secondary-content': string;
  accent: string;
  'accent-content': string;
  neutral: string;
  'neutral-content': string;
  info: string;
  'info-content': string;
  success: string;
  'success-content': string;
  warning: string;
  'warning-content': string;
  error: string;
  'error-content': string;
  'rounded-box': string;
  'rounded-btn': string;
  'rounded-badge': string;
}

// All preset themes
const presetThemes: Record<string, ThemeVariables> = {
  light: {
    'base-100': '#ffffff', 'base-200': '#f2f2f2', 'base-300': '#e5e6e6', 'base-content': '#1f2937',
    primary: '#570df8', 'primary-content': '#ffffff',
    secondary: '#f000b8', 'secondary-content': '#ffffff',
    accent: '#37cdbe', 'accent-content': '#163835',
    neutral: '#3d4451', 'neutral-content': '#ffffff',
    info: '#3abff8', 'info-content': '#002b3d',
    success: '#36d399', 'success-content': '#003320',
    warning: '#fbbd23', 'warning-content': '#382800',
    error: '#f87272', 'error-content': '#470000',
    'rounded-box': '1rem', 'rounded-btn': '0.5rem', 'rounded-badge': '1.9rem',
  },
  dark: {
    'base-100': '#1d232a', 'base-200': '#191e24', 'base-300': '#15191e', 'base-content': '#a6adbb',
    primary: '#661ae6', 'primary-content': '#ffffff',
    secondary: '#d926aa', 'secondary-content': '#ffffff',
    accent: '#1fb2a6', 'accent-content': '#ffffff',
    neutral: '#2a323c', 'neutral-content': '#a6adbb',
    info: '#3abff8', 'info-content': '#002b3d',
    success: '#36d399', 'success-content': '#003320',
    warning: '#fbbd23', 'warning-content': '#382800',
    error: '#f87272', 'error-content': '#470000',
    'rounded-box': '1rem', 'rounded-btn': '0.5rem', 'rounded-badge': '1.9rem',
  },
  cupcake: {
    'base-100': '#faf7f5', 'base-200': '#efeae6', 'base-300': '#e7e2df', 'base-content': '#291334',
    primary: '#65c3c8', 'primary-content': '#291334',
    secondary: '#ef9fbc', 'secondary-content': '#291334',
    accent: '#eeaf3a', 'accent-content': '#291334',
    neutral: '#291334', 'neutral-content': '#faf7f5',
    info: '#3abff8', 'info-content': '#002b3d',
    success: '#36d399', 'success-content': '#003320',
    warning: '#fbbd23', 'warning-content': '#382800',
    error: '#f87272', 'error-content': '#470000',
    'rounded-box': '1rem', 'rounded-btn': '1.9rem', 'rounded-badge': '1.9rem',
  },
  bumblebee: {
    'base-100': '#ffffff', 'base-200': '#f9f9f9', 'base-300': '#f0f0f0', 'base-content': '#333333',
    primary: '#f9d72f', 'primary-content': '#333333',
    secondary: '#e0a82e', 'secondary-content': '#333333',
    accent: '#f9d72f', 'accent-content': '#333333',
    neutral: '#333333', 'neutral-content': '#ffffff',
    info: '#3abff8', 'info-content': '#002b3d',
    success: '#36d399', 'success-content': '#003320',
    warning: '#fbbd23', 'warning-content': '#382800',
    error: '#f87272', 'error-content': '#470000',
    'rounded-box': '1rem', 'rounded-btn': '0.5rem', 'rounded-badge': '1.9rem',
  },
  emerald: {
    'base-100': '#ffffff', 'base-200': '#f2f2f2', 'base-300': '#e5e6e6', 'base-content': '#333c4d',
    primary: '#66cc8a', 'primary-content': '#ffffff',
    secondary: '#377cfb', 'secondary-content': '#ffffff',
    accent: '#ea5234', 'accent-content': '#ffffff',
    neutral: '#333c4d', 'neutral-content': '#ffffff',
    info: '#3abff8', 'info-content': '#002b3d',
    success: '#36d399', 'success-content': '#003320',
    warning: '#fbbd23', 'warning-content': '#382800',
    error: '#f87272', 'error-content': '#470000',
    'rounded-box': '1rem', 'rounded-btn': '0.5rem', 'rounded-badge': '1.9rem',
  },
  corporate: {
    'base-100': '#ffffff', 'base-200': '#f4f4f5', 'base-300': '#e5e6e6', 'base-content': '#181a2a',
    primary: '#4b6bfb', 'primary-content': '#ffffff',
    secondary: '#7b92b2', 'secondary-content': '#ffffff',
    accent: '#67cba0', 'accent-content': '#181a2a',
    neutral: '#181a2a', 'neutral-content': '#ffffff',
    info: '#3abff8', 'info-content': '#002b3d',
    success: '#36d399', 'success-content': '#003320',
    warning: '#fbbd23', 'warning-content': '#382800',
    error: '#f87272', 'error-content': '#470000',
    'rounded-box': '0.25rem', 'rounded-btn': '0.25rem', 'rounded-badge': '0.25rem',
  },
  synthwave: {
    'base-100': '#1a103d', 'base-200': '#150d30', 'base-300': '#100a24', 'base-content': '#f5e6fa',
    primary: '#e779c1', 'primary-content': '#1a103d',
    secondary: '#58c7f3', 'secondary-content': '#1a103d',
    accent: '#f3cc30', 'accent-content': '#1a103d',
    neutral: '#20134e', 'neutral-content': '#f5e6fa',
    info: '#53c0f3', 'info-content': '#1a103d',
    success: '#71ead2', 'success-content': '#1a103d',
    warning: '#f3cc30', 'warning-content': '#1a103d',
    error: '#e24056', 'error-content': '#f5e6fa',
    'rounded-box': '1rem', 'rounded-btn': '0.5rem', 'rounded-badge': '1.9rem',
  },
  retro: {
    'base-100': '#ece3ca', 'base-200': '#e4d8b4', 'base-300': '#dbcd9e', 'base-content': '#282425',
    primary: '#ef9995', 'primary-content': '#282425',
    secondary: '#a4cbb4', 'secondary-content': '#282425',
    accent: '#ebdc99', 'accent-content': '#282425',
    neutral: '#7d7259', 'neutral-content': '#ece3ca',
    info: '#3abff8', 'info-content': '#002b3d',
    success: '#36d399', 'success-content': '#003320',
    warning: '#fbbd23', 'warning-content': '#382800',
    error: '#f87272', 'error-content': '#470000',
    'rounded-box': '0.5rem', 'rounded-btn': '0.5rem', 'rounded-badge': '1.9rem',
  },
  cyberpunk: {
    'base-100': '#ffee00', 'base-200': '#e6d700', 'base-300': '#ccc000', 'base-content': '#120f0b',
    primary: '#ff7598', 'primary-content': '#120f0b',
    secondary: '#75d1f0', 'secondary-content': '#120f0b',
    accent: '#c07eec', 'accent-content': '#120f0b',
    neutral: '#2a1f47', 'neutral-content': '#f5f5f5',
    info: '#3abff8', 'info-content': '#002b3d',
    success: '#36d399', 'success-content': '#003320',
    warning: '#fbbd23', 'warning-content': '#382800',
    error: '#f87272', 'error-content': '#470000',
    'rounded-box': '0', 'rounded-btn': '0', 'rounded-badge': '0',
  },
  valentine: {
    'base-100': '#fae7f4', 'base-200': '#f0d6ea', 'base-300': '#e5c5df', 'base-content': '#632c3b',
    primary: '#e96d7b', 'primary-content': '#ffffff',
    secondary: '#a991f7', 'secondary-content': '#ffffff',
    accent: '#88dbdf', 'accent-content': '#632c3b',
    neutral: '#af4670', 'neutral-content': '#fae7f4',
    info: '#3abff8', 'info-content': '#002b3d',
    success: '#36d399', 'success-content': '#003320',
    warning: '#fbbd23', 'warning-content': '#382800',
    error: '#f87272', 'error-content': '#470000',
    'rounded-box': '1rem', 'rounded-btn': '1.9rem', 'rounded-badge': '1.9rem',
  },
  halloween: {
    'base-100': '#212121', 'base-200': '#1a1a1a', 'base-300': '#131313', 'base-content': '#d5d5d5',
    primary: '#f28c18', 'primary-content': '#131313',
    secondary: '#6d3a9c', 'secondary-content': '#d5d5d5',
    accent: '#51a800', 'accent-content': '#131313',
    neutral: '#2f1b05', 'neutral-content': '#f28c18',
    info: '#3abff8', 'info-content': '#002b3d',
    success: '#51a800', 'success-content': '#131313',
    warning: '#f28c18', 'warning-content': '#131313',
    error: '#bc002d', 'error-content': '#d5d5d5',
    'rounded-box': '1rem', 'rounded-btn': '0.5rem', 'rounded-badge': '1.9rem',
  },
  garden: {
    'base-100': '#e9e7e7', 'base-200': '#dcdada', 'base-300': '#cfcdcd', 'base-content': '#100f0f',
    primary: '#5c7f67', 'primary-content': '#ffffff',
    secondary: '#ecf4e7', 'secondary-content': '#100f0f',
    accent: '#fae5e5', 'accent-content': '#100f0f',
    neutral: '#5d5656', 'neutral-content': '#e9e7e7',
    info: '#3abff8', 'info-content': '#002b3d',
    success: '#36d399', 'success-content': '#003320',
    warning: '#fbbd23', 'warning-content': '#382800',
    error: '#f87272', 'error-content': '#470000',
    'rounded-box': '1rem', 'rounded-btn': '0.5rem', 'rounded-badge': '1.9rem',
  },
  forest: {
    'base-100': '#171212', 'base-200': '#120e0e', 'base-300': '#0d0a0a', 'base-content': '#d7ccc8',
    primary: '#1eb854', 'primary-content': '#ffffff',
    secondary: '#1db990', 'secondary-content': '#ffffff',
    accent: '#1db9ac', 'accent-content': '#ffffff',
    neutral: '#19362d', 'neutral-content': '#d7ccc8',
    info: '#3abff8', 'info-content': '#002b3d',
    success: '#1eb854', 'success-content': '#ffffff',
    warning: '#fbbd23', 'warning-content': '#382800',
    error: '#f87272', 'error-content': '#470000',
    'rounded-box': '1rem', 'rounded-btn': '0.5rem', 'rounded-badge': '1.9rem',
  },
  aqua: {
    'base-100': '#345da7', 'base-200': '#2d5196', 'base-300': '#274585', 'base-content': '#c9ebff',
    primary: '#09ecf3', 'primary-content': '#005355',
    secondary: '#966fb3', 'secondary-content': '#ffffff',
    accent: '#ffe999', 'accent-content': '#5c4d00',
    neutral: '#3b8ac4', 'neutral-content': '#c9ebff',
    info: '#3abff8', 'info-content': '#002b3d',
    success: '#36d399', 'success-content': '#003320',
    warning: '#fbbd23', 'warning-content': '#382800',
    error: '#f87272', 'error-content': '#470000',
    'rounded-box': '1rem', 'rounded-btn': '0.5rem', 'rounded-badge': '1.9rem',
  },
  lofi: {
    'base-100': '#ffffff', 'base-200': '#f5f5f5', 'base-300': '#ebebeb', 'base-content': '#000000',
    primary: '#0d0d0d', 'primary-content': '#ffffff',
    secondary: '#1a1a1a', 'secondary-content': '#ffffff',
    accent: '#262626', 'accent-content': '#ffffff',
    neutral: '#000000', 'neutral-content': '#ffffff',
    info: '#0070f3', 'info-content': '#ffffff',
    success: '#21cc51', 'success-content': '#000000',
    warning: '#ff6154', 'warning-content': '#000000',
    error: '#de1c8d', 'error-content': '#ffffff',
    'rounded-box': '0.25rem', 'rounded-btn': '0.125rem', 'rounded-badge': '0.125rem',
  },
  pastel: {
    'base-100': '#ffffff', 'base-200': '#f9f9f9', 'base-300': '#eee', 'base-content': '#333333',
    primary: '#d1c1d7', 'primary-content': '#333333',
    secondary: '#f6cbd1', 'secondary-content': '#333333',
    accent: '#b4e9d6', 'accent-content': '#333333',
    neutral: '#70acc7', 'neutral-content': '#ffffff',
    info: '#a6e3f5', 'info-content': '#333333',
    success: '#b4e9d6', 'success-content': '#333333',
    warning: '#fbecc6', 'warning-content': '#333333',
    error: '#f6cbd1', 'error-content': '#333333',
    'rounded-box': '1rem', 'rounded-btn': '1.9rem', 'rounded-badge': '1.9rem',
  },
};

// Tailwind CSS color palette (OKLCH values from DaisyUI)
const tailwindColors = {
  slate: ['#f8fafc', '#f1f5f9', '#e2e8f0', '#cbd5e1', '#94a3b8', '#64748b', '#475569', '#334155', '#1e293b', '#0f172a', '#020617'],
  gray: ['#f9fafb', '#f3f4f6', '#e5e7eb', '#d1d5db', '#9ca3af', '#6b7280', '#4b5563', '#374151', '#1f2937', '#111827', '#030712'],
  zinc: ['#fafafa', '#f4f4f5', '#e4e4e7', '#d4d4d8', '#a1a1aa', '#71717a', '#52525b', '#3f3f46', '#27272a', '#18181b', '#09090b'],
  neutral: ['#fafafa', '#f5f5f5', '#e5e5e5', '#d4d4d4', '#a3a3a3', '#737373', '#525252', '#404040', '#262626', '#171717', '#0a0a0a'],
  stone: ['#fafaf9', '#f5f5f4', '#e7e5e4', '#d6d3d1', '#a8a29e', '#78716c', '#57534e', '#44403c', '#292524', '#1c1917', '#0c0a09'],
  red: ['#fef2f2', '#fee2e2', '#fecaca', '#fca5a5', '#f87171', '#ef4444', '#dc2626', '#b91c1c', '#991b1b', '#7f1d1d', '#450a0a'],
  orange: ['#fff7ed', '#ffedd5', '#fed7aa', '#fdba74', '#fb923c', '#f97316', '#ea580c', '#c2410c', '#9a3412', '#7c2d12', '#431407'],
  amber: ['#fffbeb', '#fef3c7', '#fde68a', '#fcd34d', '#fbbf24', '#f59e0b', '#d97706', '#b45309', '#92400e', '#78350f', '#451a03'],
  yellow: ['#fefce8', '#fef9c3', '#fef08a', '#fde047', '#facc15', '#eab308', '#ca8a04', '#a16207', '#854d0e', '#713f12', '#422006'],
  lime: ['#f7fee7', '#ecfccb', '#d9f99d', '#bef264', '#a3e635', '#84cc16', '#65a30d', '#4d7c0f', '#3f6212', '#365314', '#1a2e05'],
  green: ['#f0fdf4', '#dcfce7', '#bbf7d0', '#86efac', '#4ade80', '#22c55e', '#16a34a', '#15803d', '#166534', '#14532d', '#052e16'],
  emerald: ['#ecfdf5', '#d1fae5', '#a7f3d0', '#6ee7b7', '#34d399', '#10b981', '#059669', '#047857', '#065f46', '#064e3b', '#022c22'],
  teal: ['#f0fdfa', '#ccfbf1', '#99f6e4', '#5eead4', '#2dd4bf', '#14b8a6', '#0d9488', '#0f766e', '#115e59', '#134e4a', '#042f2e'],
  cyan: ['#ecfeff', '#cffafe', '#a5f3fc', '#67e8f9', '#22d3ee', '#06b6d4', '#0891b2', '#0e7490', '#155e75', '#164e63', '#083344'],
  sky: ['#f0f9ff', '#e0f2fe', '#bae6fd', '#7dd3fc', '#38bdf8', '#0ea5e9', '#0284c7', '#0369a1', '#075985', '#0c4a6e', '#082f49'],
  blue: ['#eff6ff', '#dbeafe', '#bfdbfe', '#93c5fd', '#60a5fa', '#3b82f6', '#2563eb', '#1d4ed8', '#1e40af', '#1e3a8a', '#172554'],
  indigo: ['#eef2ff', '#e0e7ff', '#c7d2fe', '#a5b4fc', '#818cf8', '#6366f1', '#4f46e5', '#4338ca', '#3730a3', '#312e81', '#1e1b4b'],
  violet: ['#f5f3ff', '#ede9fe', '#ddd6fe', '#c4b5fd', '#a78bfa', '#8b5cf6', '#7c3aed', '#6d28d9', '#5b21b6', '#4c1d95', '#2e1065'],
  purple: ['#faf5ff', '#f3e8ff', '#e9d5ff', '#d8b4fe', '#c084fc', '#a855f7', '#9333ea', '#7e22ce', '#6b21a8', '#581c87', '#3b0764'],
  fuchsia: ['#fdf4ff', '#fae8ff', '#f5d0fe', '#f0abfc', '#e879f9', '#d946ef', '#c026d3', '#a21caf', '#86198f', '#701a75', '#4a044e'],
  pink: ['#fdf2f8', '#fce7f3', '#fbcfe8', '#f9a8d4', '#f472b6', '#ec4899', '#db2777', '#be185d', '#9d174d', '#831843', '#500724'],
  rose: ['#fff1f2', '#ffe4e6', '#fecdd3', '#fda4af', '#fb7185', '#f43f5e', '#e11d48', '#be123c', '#9f1239', '#881337', '#4c0519'],
};

const colorNames = Object.keys(tailwindColors) as (keyof typeof tailwindColors)[];

// Color Picker Modal Component - Using Dialog from registry
function ColorPickerModal({
  isOpen,
  colorKey,
  label,
  currentColor,
  onColorChange,
  onClose,
  themeColors,
}: {
  isOpen: boolean;
  colorKey: string;
  label: string;
  currentColor: string;
  onColorChange: (color: string) => void;
  onClose: () => void;
  themeColors: Record<string, string>;
}) {
  const [pickerMode, setPickerMode] = useState<'palette' | 'picker'>('palette');
  const [hexInput, setHexInput] = useState(currentColor);

  // Get short label for assigned colors
  const getColorLabel = (colorHex: string): string | null => {
    const labels: Record<string, string> = {
      'base-100': '100', 'base-200': '200', 'base-300': '300', 'base-content': 'A',
      'primary': 'P', 'primary-content': 'PC',
      'secondary': 'S', 'secondary-content': 'SC',
      'accent': 'A', 'accent-content': 'AC',
      'neutral': 'N', 'neutral-content': 'NC',
      'info': 'IN', 'info-content': 'INC',
      'success': 'SU', 'success-content': 'SUC',
      'warning': 'WA', 'warning-content': 'WAC',
      'error': 'ER', 'error-content': 'ERC',
    };
    for (const [key, value] of Object.entries(themeColors)) {
      if (value.toLowerCase() === colorHex.toLowerCase() && labels[key]) {
        return labels[key];
      }
    }
    return null;
  };

  // Calculate relative luminance
  const getLuminance = (hex: string): number => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return 0;
    const [r, g, b] = [
      parseInt(result[1], 16) / 255,
      parseInt(result[2], 16) / 255,
      parseInt(result[3], 16) / 255,
    ].map(c => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  // Calculate contrast ratio
  const getContrastRatio = (hex1: string, hex2: string): number => {
    const l1 = getLuminance(hex1);
    const l2 = getLuminance(hex2);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
  };

  const selectColor = (color: string) => {
    onColorChange(color);
    setHexInput(color);
  };

  const handleHexChange = (value: string) => {
    setHexInput(value);
    if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
      onColorChange(value);
    }
  };

  useEffect(() => {
    setHexInput(currentColor);
  }, [currentColor]);

  const contrastBase = themeColors['base-content'] || '#000000';
  const contrastRatio = getContrastRatio(currentColor, contrastBase);
  const contrastLevel = contrastRatio >= 7 ? 'AAA' : contrastRatio >= 4.5 ? 'AA' : contrastRatio >= 3 ? 'A' : '';

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogPopup className="sm:max-w-3xl p-0 gap-0 overflow-hidden" showCloseButton={false}>
        {/* Header */}
        <DialogHeader className="flex-row items-center justify-between gap-4 px-6 py-5 border-b-0">
          <div className="flex items-center gap-4">
            <div 
              className="grid size-12 place-items-center rounded-xl border border-border text-xl font-black shadow-sm"
              style={{ backgroundColor: currentColor, color: getLuminance(currentColor) > 0.5 ? '#000' : '#fff' }}
            >
              A
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-px bg-border" />
              <div>
                <DialogDescription className="text-xs text-muted-foreground">Pick a color for</DialogDescription>
                <DialogTitle className="text-lg font-semibold">{label}</DialogTitle>
              </div>
            </div>
          </div>
          
          {/* Mode Toggle */}
          <div className="flex gap-0.5 rounded-lg bg-muted p-1">
            <button 
              onClick={() => setPickerMode('palette')}
              className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-all ${pickerMode === 'palette' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="5" cy="5" r="1.5"/><circle cx="12" cy="5" r="1.5"/><circle cx="19" cy="5" r="1.5"/>
                <circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/>
                <circle cx="5" cy="19" r="1.5"/><circle cx="12" cy="19" r="1.5"/><circle cx="19" cy="19" r="1.5"/>
              </svg>
              Palette
            </button>
            <button 
              onClick={() => setPickerMode('picker')}
              className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-all ${pickerMode === 'picker' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 4L14 4"/><path d="M10 4L3 4"/><path d="M21 12L12 12"/>
                <path d="M8 12L3 12"/><path d="M21 20L16 20"/><path d="M12 20L3 20"/>
                <path d="M14 2L14 6"/><path d="M8 10L8 14"/><path d="M16 18L16 22"/>
              </svg>
              Picker
            </button>
          </div>
        </DialogHeader>

        {/* Palette Mode - Color Grid */}
        {pickerMode === 'palette' && (
          <div className="flex justify-center py-4 px-4 overflow-x-auto">
            <div className="grid grid-cols-11 gap-0.5 lg:[writing-mode:vertical-lr]" role="listbox">
              {colorNames.map((colorName) => (
                tailwindColors[colorName].map((color, index) => {
                  const colorLabel = getColorLabel(color);
                  const isLight = getLuminance(color) > 0.5;
                  const isSelected = currentColor.toLowerCase() === color.toLowerCase();
                  return (
                    <button
                      key={`${colorName}-${index}`}
                      onClick={() => selectColor(color)}
                      className="appearance-none p-0.5 [writing-mode:lr] group"
                      aria-label={`${colorName}-${(index + 1) * 50 || 50}`}
                    >
                      <div 
                        className={`relative grid size-6 sm:size-7 place-items-center rounded-full border select-none transition-all duration-150 group-hover:scale-110 group-hover:shadow-md ${isSelected ? 'ring-2 ring-primary ring-offset-2 ring-offset-background scale-110' : 'border-black/10'}`}
                        style={{ backgroundColor: color }}
                      >
                        {colorLabel && (
                          <span 
                            className="font-mono text-[8px] font-bold uppercase leading-none"
                            style={{ color: isLight ? '#000' : '#fff' }}
                          >
                            {colorLabel}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })
              ))}
              {/* White and Black */}
              <button onClick={() => selectColor('#ffffff')} className="appearance-none p-0.5 [writing-mode:lr] group" aria-label="white">
                <div className={`relative grid size-6 sm:size-7 place-items-center rounded-full border select-none transition-all duration-150 group-hover:scale-110 group-hover:shadow-md ${currentColor.toLowerCase() === '#ffffff' ? 'ring-2 ring-primary ring-offset-2 ring-offset-background scale-110' : 'border-black/10'}`} style={{ backgroundColor: '#ffffff' }} />
              </button>
              <button onClick={() => selectColor('#000000')} className="appearance-none p-0.5 [writing-mode:lr] group" aria-label="black">
                <div className={`relative grid size-6 sm:size-7 place-items-center rounded-full border select-none transition-all duration-150 group-hover:scale-110 group-hover:shadow-md ${currentColor.toLowerCase() === '#000000' ? 'ring-2 ring-primary ring-offset-2 ring-offset-background scale-110' : 'border-black/10'}`} style={{ backgroundColor: '#000000' }} />
              </button>
            </div>
          </div>
        )}

        {/* Picker Mode - Native color input */}
        {pickerMode === 'picker' && (
          <div className="flex justify-center py-8 px-6">
            <input
              type="color"
              value={currentColor}
              onChange={(e) => selectColor(e.target.value)}
              className="size-64 cursor-pointer rounded-2xl border-0 p-0"
              style={{ WebkitAppearance: 'none' }}
            />
          </div>
        )}

        {/* Footer */}
        <DialogFooter className="flex-row items-center justify-between gap-4 border-t bg-muted/40 px-6 py-4">
          {/* Color Value Input */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground whitespace-nowrap">Color value</span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-1.5 h-8 px-2.5">
                <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 16.008v-8.018a1.98 1.98 0 0 0 -1 -1.717l-7 -4.008a2.016 2.016 0 0 0 -2 0l-7 4.008c-.619 .355 -1 1.01 -1 1.718v8.018c0 .709 .381 1.363 1 1.717l7 4.008a2.016 2.016 0 0 0 2 0l7 -4.008c.619 -.355 1 -1.01 1 -1.718z"/>
                  <path d="M12 22v-10"/><path d="M12 12l8.73 -5.04"/><path d="M3.27 6.96l8.73 5.04"/>
                </svg>
                HEX
              </Button>
              <input
                type="text"
                value={hexInput}
                onChange={(e) => handleHexChange(e.target.value)}
                className="h-8 w-28 rounded-md border border-input bg-background px-2.5 text-sm font-mono uppercase"
                aria-label={`${colorKey} value`}
              />
            </div>
          </div>

          {/* Contrast Meter */}
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-2">
                {contrastLevel && (
                  <>
                    <span className="rounded border border-border bg-background px-1.5 py-0.5 text-[10px] font-bold">{contrastLevel}</span>
                    <svg className="size-4 text-emerald-500" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd"/>
                    </svg>
                  </>
                )}
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-20 rounded-full bg-muted overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-300" 
                    style={{ width: `${Math.min(contrastRatio / 21 * 100, 100)}%` }}
                  />
                </div>
                <span className="text-[10px] text-muted-foreground tabular-nums">{contrastRatio.toFixed(1)}</span>
              </div>
            </div>
          </div>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  );
}

export default function ThemeGenerator() {
  const [themeName, setThemeName] = useState('cupcake');
  const [theme, setTheme] = useState<ThemeVariables>(presetThemes.cupcake);
  const [mounted, setMounted] = useState(false);
  const [previewTab, setPreviewTab] = useState<'demo' | 'variants' | 'palette'>('demo');
  const [showCssModal, setShowCssModal] = useState(false);
  const [sliderValue, setSliderValue] = useState(50);
  const [colorPicker, setColorPicker] = useState<{ open: boolean; key: keyof ThemeVariables | null; label: string }>({ open: false, key: null, label: '' });
  const [pickerMode, setPickerMode] = useState<'palette' | 'picker'>('palette');

  // Color palette for picker (OKLCH-based colors arranged in grid)
  const colorPalette = useMemo(() => {
    const colors: string[] = [];
    // Generate a nice color palette grid
    const hues = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
    const lightnesses = [95, 85, 75, 65, 55, 45, 35, 25, 15, 10];
    const saturations = [5, 30, 50, 70, 90];
    
    // Grayscale row first
    for (let l = 98; l >= 5; l -= 8) {
      colors.push(`hsl(0, 0%, ${l}%)`);
    }
    
    // Color rows
    for (const lightness of [85, 70, 55, 45, 35, 25, 18]) {
      for (const hue of hues) {
        const sat = lightness > 60 ? 70 : lightness > 40 ? 80 : 70;
        colors.push(`hsl(${hue}, ${sat}%, ${lightness}%)`);
      }
    }
    
    return colors;
  }, []);

  // Get short label for color key  
  const getColorLabel = (key: string): string => {
    const labels: Record<string, string> = {
      'base-100': '100', 'base-200': '200', 'base-300': '300', 'base-content': 'A',
      'primary': 'P', 'primary-content': 'PC',
      'secondary': 'S', 'secondary-content': 'SC',
      'accent': 'AC', 'accent-content': 'ACC',
      'neutral': 'N', 'neutral-content': 'NC',
      'info': 'IN', 'info-content': 'INC',
      'success': 'SU', 'success-content': 'SUC',
      'warning': 'WA', 'warning-content': 'WAC',
      'error': 'ER', 'error-content': 'ERC',
    };
    return labels[key] || key;
  };

  // Check if a palette color is currently used
  const getColorUsage = (paletteColor: string): string | null => {
    const hexColor = hslToHex(paletteColor);
    for (const [key, value] of Object.entries(theme)) {
      if (value.toLowerCase() === hexColor.toLowerCase()) {
        return getColorLabel(key);
      }
    }
    return null;
  };

  // Convert HSL string to Hex
  const hslToHex = (hsl: string): string => {
    const match = hsl.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
    if (!match) return hsl;
    
    const h = parseInt(match[1]) / 360;
    const s = parseInt(match[2]) / 100;
    const l = parseInt(match[3]) / 100;
    
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    
    let r, g, b;
    if (s === 0) {
      r = g = b = l;
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
    
    const toHex = (x: number) => {
      const hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  const openColorPicker = (key: keyof ThemeVariables, label: string) => {
    setColorPicker({ open: true, key, label });
  };

  const selectPaletteColor = (color: string) => {
    if (colorPicker.key) {
      updateColor(colorPicker.key, hslToHex(color));
    }
  };

  useEffect(() => setMounted(true), []);

  const updateColor = (key: keyof ThemeVariables, value: string) => {
    setTheme(prev => ({ ...prev, [key]: value }));
  };

  const loadPreset = (name: string) => {
    if (presetThemes[name]) {
      setTheme({ ...presetThemes[name] });
      setThemeName(name);
    }
  };

  const previewStyle = useMemo(() => {
    const vars: Record<string, string> = {};
    Object.entries(theme).forEach(([key, val]) => {
      vars[`--${key}`] = val;
    });
    return vars as React.CSSProperties;
  }, [theme]);

  const cssOutput = `[data-theme="${themeName}"] {
${Object.entries(theme).map(([k, v]) => `  --${k}: ${v};`).join('\n')}
}`;

  const copyCSS = () => {
    navigator.clipboard.writeText(cssOutput);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-base-200 flex">
      
      {/* === SIDEBAR: Theme List === */}
      <div className="w-48 bg-neutral text-neutral-content flex-shrink-0 flex flex-col h-screen sticky top-0 overflow-y-auto">
        <div className="p-4 border-b border-neutral-content/10">
          <h1 className="font-bold flex items-center gap-2">
            Themes
            <span className="text-xs opacity-50">···</span>
          </h1>
        </div>
        
        <div className="px-3 py-2">
          <button className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border-2 border-dashed border-base-300 text-sm text-base-content/60 hover:border-primary hover:text-primary hover:bg-primary/5 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Hold to add theme
          </button>
        </div>

        <div className="px-4 pb-4">
          <p className="text-[10px] font-medium text-base-content/40 uppercase tracking-widest mb-3">Themes</p>
          <div className="space-y-0.5">
            {Object.keys(presetThemes).map(name => (
              <button 
                key={name}
                onClick={() => loadPreset(name)}
                className={`w-full flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-sm transition-colors ${themeName === name ? 'bg-base-200 text-base-content' : 'text-base-content/70 hover:bg-base-200/50 hover:text-base-content'}`}
              >
                <div 
                  className="grid grid-cols-2 gap-px rounded p-0.5 shrink-0"
                  style={{ backgroundColor: presetThemes[name]['base-100'] }}
                >
                  <div className="size-1.5 rounded-full" style={{ backgroundColor: presetThemes[name]['base-content'] }} />
                  <div className="size-1.5 rounded-full" style={{ backgroundColor: presetThemes[name].primary }} />
                  <div className="size-1.5 rounded-full" style={{ backgroundColor: presetThemes[name].secondary }} />
                  <div className="size-1.5 rounded-full" style={{ backgroundColor: presetThemes[name].accent }} />
                </div>
                <span className="capitalize font-normal">{name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* === MAIN CONTENT === */}
      <div className="flex-1 flex flex-col lg:flex-row gap-4 p-4 overflow-auto">
        
        {/* === EDITOR COLUMN === */}
        <div className="w-full lg:w-80 flex-shrink-0 space-y-4">
          {/* Theme Name & Actions */}
          <div className="bg-base-100 rounded-box p-4 shadow-sm border border-base-300">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm opacity-60">Name</span>
              <input 
                type="text" 
                value={themeName} 
                onChange={e => setThemeName(e.target.value)}
                className="input input-sm input-bordered flex-1" 
              />
              <span className="text-xs opacity-30">✏️</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button className="btn btn-sm btn-outline" onClick={() => {
                const r = () => '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
                setTheme(prev => ({...prev, primary: r(), secondary: r(), accent: r() }));
              }}>
                🎲 Random
              </button>
              <button className="btn btn-sm btn-neutral" onClick={() => setShowCssModal(true)}>
                {'{ } CSS'}
              </button>
            </div>
          </div>

          {/* Change Colors */}
          <div className="bg-base-100 rounded-box p-4 shadow-sm border border-base-300">
            <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
              <span className="opacity-50">✦</span> Change Colors
            </h3>
            
            {/* Base Colors Row */}
            <div className="mb-4">
              <div className="flex gap-2 mb-1">
                {[
                  { key: 'base-100', label: 'base 100' },
                  { key: 'base-200', label: 'base 200' },
                  { key: 'base-300', label: 'base 300' },
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => openColorPicker(key as keyof ThemeVariables, label)}
                    className="w-12 h-12 rounded-lg border border-base-content/20 cursor-pointer flex items-center justify-center text-xs font-medium hover:scale-105 transition-transform"
                    style={{ backgroundColor: theme[key as keyof ThemeVariables], color: theme['base-content'] }}
                  >
                    {key.split('-')[1]}
                  </button>
                ))}
                <button
                  onClick={() => openColorPicker('base-content', 'base content')}
                  className="w-12 h-12 rounded-lg border border-base-content/20 cursor-pointer flex items-center justify-center text-sm font-bold hover:scale-105 transition-transform"
                  style={{ backgroundColor: theme['base-content'], color: theme['base-100'] }}
                >
                  A
                </button>
              </div>
              <span className="text-xs opacity-50">base</span>
            </div>

            {/* Primary & Secondary Row */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="flex gap-2 mb-1">
                  <button onClick={() => openColorPicker('primary', 'primary')} className="w-12 h-12 rounded-lg cursor-pointer hover:scale-105 transition-transform" style={{ backgroundColor: theme.primary }} />
                  <button onClick={() => openColorPicker('primary-content', 'primary content')} className="w-12 h-12 rounded-lg border border-base-content/20 cursor-pointer flex items-center justify-center text-sm font-bold hover:scale-105 transition-transform" style={{ backgroundColor: theme['primary-content'], color: theme.primary }}>A</button>
                </div>
                <span className="text-xs opacity-50">primary</span>
              </div>
              <div>
                <div className="flex gap-2 mb-1">
                  <button onClick={() => openColorPicker('secondary', 'secondary')} className="w-12 h-12 rounded-lg cursor-pointer hover:scale-105 transition-transform" style={{ backgroundColor: theme.secondary }} />
                  <button onClick={() => openColorPicker('secondary-content', 'secondary content')} className="w-12 h-12 rounded-lg border border-base-content/20 cursor-pointer flex items-center justify-center text-sm font-bold hover:scale-105 transition-transform" style={{ backgroundColor: theme['secondary-content'], color: theme.secondary }}>A</button>
                </div>
                <span className="text-xs opacity-50">secondary</span>
              </div>
            </div>

            {/* Accent & Neutral Row */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="flex gap-2 mb-1">
                  <button onClick={() => openColorPicker('accent', 'accent')} className="w-12 h-12 rounded-lg cursor-pointer hover:scale-105 transition-transform" style={{ backgroundColor: theme.accent }} />
                  <button onClick={() => openColorPicker('accent-content', 'accent content')} className="w-12 h-12 rounded-lg border border-base-content/20 cursor-pointer flex items-center justify-center text-sm font-bold hover:scale-105 transition-transform" style={{ backgroundColor: theme['accent-content'], color: theme.accent }}>A</button>
                </div>
                <span className="text-xs opacity-50">accent</span>
              </div>
              <div>
                <div className="flex gap-2 mb-1">
                  <button onClick={() => openColorPicker('neutral', 'neutral')} className="w-12 h-12 rounded-lg cursor-pointer hover:scale-105 transition-transform" style={{ backgroundColor: theme.neutral }} />
                  <button onClick={() => openColorPicker('neutral-content', 'neutral content')} className="w-12 h-12 rounded-lg border border-base-content/20 cursor-pointer flex items-center justify-center text-sm font-bold hover:scale-105 transition-transform" style={{ backgroundColor: theme['neutral-content'], color: theme.neutral }}>A</button>
                </div>
                <span className="text-xs opacity-50">neutral</span>
              </div>
            </div>

            {/* Info & Success Row */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="flex gap-2 mb-1">
                  <button onClick={() => openColorPicker('info', 'info')} className="w-12 h-12 rounded-lg cursor-pointer hover:scale-105 transition-transform" style={{ backgroundColor: theme.info }} />
                  <button onClick={() => openColorPicker('info-content', 'info content')} className="w-12 h-12 rounded-lg border border-base-content/20 cursor-pointer flex items-center justify-center text-sm font-bold hover:scale-105 transition-transform" style={{ backgroundColor: theme['info-content'], color: theme.info }}>A</button>
                </div>
                <span className="text-xs opacity-50">info</span>
              </div>
              <div>
                <div className="flex gap-2 mb-1">
                  <button onClick={() => openColorPicker('success', 'success')} className="w-12 h-12 rounded-lg cursor-pointer hover:scale-105 transition-transform" style={{ backgroundColor: theme.success }} />
                  <button onClick={() => openColorPicker('success-content', 'success content')} className="w-12 h-12 rounded-lg border border-base-content/20 cursor-pointer flex items-center justify-center text-sm font-bold hover:scale-105 transition-transform" style={{ backgroundColor: theme['success-content'], color: theme.success }}>A</button>
                </div>
                <span className="text-xs opacity-50">success</span>
              </div>
            </div>

            {/* Warning & Error Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex gap-2 mb-1">
                  <button onClick={() => openColorPicker('warning', 'warning')} className="w-12 h-12 rounded-lg cursor-pointer hover:scale-105 transition-transform" style={{ backgroundColor: theme.warning }} />
                  <button onClick={() => openColorPicker('warning-content', 'warning content')} className="w-12 h-12 rounded-lg border border-base-content/20 cursor-pointer flex items-center justify-center text-sm font-bold hover:scale-105 transition-transform" style={{ backgroundColor: theme['warning-content'], color: theme.warning }}>A</button>
                </div>
                <span className="text-xs opacity-50">warning</span>
              </div>
              <div>
                <div className="flex gap-2 mb-1">
                  <button onClick={() => openColorPicker('error', 'error')} className="w-12 h-12 rounded-lg cursor-pointer hover:scale-105 transition-transform" style={{ backgroundColor: theme.error }} />
                  <button onClick={() => openColorPicker('error-content', 'error content')} className="w-12 h-12 rounded-lg border border-base-content/20 cursor-pointer flex items-center justify-center text-sm font-bold hover:scale-105 transition-transform" style={{ backgroundColor: theme['error-content'], color: theme.error }}>A</button>
                </div>
                <span className="text-xs opacity-50">error</span>
              </div>
            </div>
          </div>

          {/* Radius */}
          <div className="bg-base-100 rounded-box p-4 shadow-sm border border-base-300">
            <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
              <span className="opacity-50">⌗</span> Radius
            </h3>
            
            <div className="mb-4">
              <div className="text-xs opacity-50 mb-2">Boxes <span className="text-[10px]">card, modal, alert</span></div>
              <div className="flex gap-2">
                {['0', '0.25rem', '0.5rem', '1rem', '1.5rem', '2rem'].map((val) => (
                  <button
                    key={val}
                    onClick={() => updateColor('rounded-box', val)}
                    className={`w-8 h-8 border transition-all ${theme['rounded-box'] === val ? 'border-primary bg-primary/10' : 'border-base-300 bg-base-200'}`}
                    style={{ borderRadius: val }}
                  />
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs opacity-50 mb-2">Fields <span className="text-[10px]">button, input, select, tab</span></div>
              <div className="flex gap-2">
                {['0', '0.25rem', '0.5rem', '1rem', '1.5rem', '2rem'].map((val) => (
                  <button
                    key={val}
                    onClick={() => updateColor('rounded-btn', val)}
                    className={`w-8 h-8 border transition-all ${theme['rounded-btn'] === val ? 'border-primary bg-primary/10' : 'border-base-300 bg-base-200'}`}
                    style={{ borderRadius: val }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* === PREVIEW COLUMN === */}
        <div 
          className="flex-1 rounded-2xl overflow-hidden border border-base-300"
          style={previewStyle}
        >
          {/* Preview Header */}
          <div className="bg-base-100 px-5 py-3 flex items-center justify-between border-b border-base-200">
            <h2 className="font-semibold text-sm text-base-content/80">Components Demo</h2>
            <div className="flex gap-0.5 bg-base-200 rounded-lg p-0.5">
              <button onClick={() => setPreviewTab('demo')} className={`p-1.5 rounded-md transition-colors ${previewTab === 'demo' ? 'bg-base-100 shadow-sm' : 'hover:bg-base-100/50'}`}>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></svg>
              </button>
              <button onClick={() => setPreviewTab('variants')} className={`p-1.5 rounded-md transition-colors ${previewTab === 'variants' ? 'bg-base-100 shadow-sm' : 'hover:bg-base-100/50'}`}>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
              </button>
              <button onClick={() => setPreviewTab('palette')} className={`p-1.5 rounded-md transition-colors ${previewTab === 'palette' ? 'bg-base-100 shadow-sm' : 'hover:bg-base-100/50'}`}>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="13.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="10.5" r="2.5"/><circle cx="8.5" cy="7.5" r="2.5"/><circle cx="6.5" cy="12.5" r="2.5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z"/></svg>
              </button>
            </div>
          </div>

          {/* Preview Content */}
          <div className="bg-base-200/50 p-5 min-h-[600px]">
            {previewTab === 'demo' && (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {/* Filters Card */}
                <div className="card bg-base-100 border border-base-300 shadow-sm rounded-xl">
                  <div className="card-body gap-4 p-5">
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-2 text-sm font-medium">
                        <svg className="w-4 h-4 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l2 2"/></svg>
                        Preview
                      </span>
                      <span className="text-xs text-primary cursor-pointer hover:underline">more</span>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-base-200 text-xs">Shoes <span className="opacity-50 cursor-pointer hover:opacity-100">×</span></span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-base-200 text-xs">Bags <span className="opacity-50 cursor-pointer hover:opacity-100">×</span></span>
                    </div>
                    <div className="space-y-1">
                      {[{l:'Hoodies',c:25,ch:true},{l:'Bags',c:3,ch:true},{l:'Shoes',c:0,ch:false,w:true},{l:'Accessories',c:4,ch:false}].map((i,idx)=>(
                        <label key={idx} className="flex items-center justify-between py-2 px-2 -mx-2 cursor-pointer rounded-lg hover:bg-base-200/50 transition-colors">
                          <span className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${i.ch ? 'bg-primary border-primary' : 'border-base-300'}`}>
                              {i.ch && <svg className="w-3 h-3 text-primary-content" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                            </div>
                            <span className="text-sm">{i.l}</span>
                          </span>
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${i.w ? 'bg-warning/20 text-warning' : 'bg-base-200 text-base-content/60'}`}>{i.c}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Chart Card */}
                <div className="card bg-base-100 rounded-xl shadow-sm border border-base-300">
                  <div className="card-body gap-4 p-4">
                    <div className="flex h-20 items-end gap-1">
                      {[10,20,10,25,22,15,20,35,40,45,30,35,60,65,80,90].map((h,i)=>(
                        <div key={i} className="bg-base-content w-full rounded-sm" style={{height:`${h}%`}}/>
                      ))}
                    </div>
                    <p className="text-xs text-base-content/70">Sales volume reached $12,450 this week, showing a 15% increase from the previous period.</p>
                    <div className="grid grid-cols-2 gap-2">
                      <button className="btn btn-sm">Charts</button>
                      <button className="btn btn-sm btn-neutral">Details</button>
                    </div>
                  </div>
                </div>

                {/* Calendar Card */}
                <div className="card bg-base-100 rounded-xl shadow-sm border border-base-300 overflow-hidden">
                  <div className="card-body gap-4 p-5">
                    <div className="grid grid-cols-7 gap-1 text-center pb-4">
                      {[{d:12,l:'M'},{d:13,l:'T'},{d:14,l:'W',a:true},{d:15,l:'T'},{d:16,l:'F'},{d:17,l:'S'},{d:18,l:'S'}].map((day,i)=>(
                        <div key={i} className={`flex flex-col items-center py-1.5 rounded-lg cursor-pointer transition-colors ${day.a ? 'bg-primary text-primary-content' : 'hover:bg-base-200'}`}>
                          <span className="text-sm font-medium">{day.d}</span>
                          <span className="text-[10px] opacity-60">{day.l}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-base-200/50 rounded-lg">
                      <svg className="w-4 h-4 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                      <input type="text" className="flex-1 bg-transparent text-sm outline-none placeholder:text-base-content/40" placeholder="Search for events" />
                    </div>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <div className="w-5 h-5 rounded border-2 bg-primary border-primary flex items-center justify-center">
                        <svg className="w-3 h-3 text-primary-content" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <span className="text-sm text-base-content/70">Show all day events</span>
                    </label>
                  </div>
                  <div className="bg-base-200/70 px-5 py-4 flex items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm">Team Sync Meeting</div>
                      <div className="text-xs text-base-content/50">Weekly product review with design and development teams</div>
                    </div>
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-base-300 text-base-content/70">1h</span>
                  </div>
                </div>

                {/* Stats Card */}
                <div className="card bg-base-100 border border-base-300 shadow-sm">
                  <div className="stats shadow-none">
                    <div className="stat">
                      <div className="stat-title">Page Score</div>
                      <div className="stat-value">91<span className="text-base font-normal">/100</span></div>
                      <div className="stat-desc text-success flex items-center gap-1">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        All good
                      </div>
                    </div>
                    <div className="stat place-items-center">
                      <div className="radial-progress text-primary" style={{'--value': 91, '--size': '3.5rem'} as React.CSSProperties}>91</div>
                    </div>
                  </div>
                </div>

                {/* Orders List */}
                <div className="card bg-base-100 border border-base-300 shadow-sm">
                  <div className="card-body gap-0 p-0">
                    <div className="p-4 flex items-center gap-2 font-semibold border-b border-base-300">
                      <svg className="w-5 h-5 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
                      Recent orders
                    </div>
                    <div className="divide-y divide-base-300 divide-dashed text-sm">
                      {[{n:'Charlie Chapman',s:'Send',c:'badge-info'},{n:'Howard Hudson',s:'Failed',c:'badge-error'},{n:'Fiona Fisher',s:'In progress',c:'badge-warning'},{n:'Nick Nelson',s:'Completed',c:'badge-success'},{n:'Amanda Anderson',s:'Completed',c:'badge-success'}].map((o,i)=>(
                        <div key={i} className="flex items-center justify-between px-4 py-2">
                          <span>{o.n}</span>
                          <span className={`badge badge-xs ${o.c}`}>{o.s}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div>
                  <div className="tabs tabs-lifted">
                    <button className="tab">Tab 1</button>
                    <button className="tab tab-active">Tab 2</button>
                    <button className="tab">Tab 3</button>
                  </div>
                  <div className="bg-base-100 border border-base-300 border-t-0 rounded-b-box p-4">
                    Tab content 2
                  </div>
                </div>

                {/* Price Range */}
                <div className="card bg-base-100 border border-base-300 shadow-sm">
                  <div className="card-body gap-4 p-4">
                    <div className="flex items-center gap-2 font-semibold">
                      <svg className="w-5 h-5 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v10M1 12h6m6 0h10"/></svg>
                      Price range
                    </div>
                    <div className="text-center text-5xl font-extralight">{sliderValue}</div>
                    <input type="range" className="range range-sm" value={sliderValue} onChange={e => setSliderValue(Number(e.target.value))} />
                  </div>
                </div>
              </div>
            )}

            {previewTab === 'variants' && (
              <div className="space-y-8">
                <div>
                  <h3 className="font-bold mb-4">Buttons</h3>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {['btn', 'btn btn-primary', 'btn btn-secondary', 'btn btn-accent', 'btn btn-neutral'].map(cls => (
                      <button key={cls} className={cls}>Button</button>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['btn btn-info', 'btn btn-success', 'btn btn-warning', 'btn btn-error', 'btn btn-ghost'].map(cls => (
                      <button key={cls} className={cls}>Button</button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold mb-4">Badges</h3>
                  <div className="flex flex-wrap gap-2">
                    {['badge', 'badge badge-primary', 'badge badge-secondary', 'badge badge-accent', 'badge badge-info', 'badge badge-success', 'badge badge-warning', 'badge badge-error'].map(cls => (
                      <span key={cls} className={cls}>Badge</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold mb-4">Inputs & Controls</h3>
                  <div className="flex flex-wrap gap-4 items-center">
                    <input type="text" placeholder="Input" className="input input-bordered w-32" />
                    <input type="checkbox" className="checkbox checkbox-primary" defaultChecked />
                    <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                    <input type="radio" className="radio radio-primary" defaultChecked />
                  </div>
                </div>
              </div>
            )}

            {previewTab === 'palette' && (
              <div className="space-y-4">
                <div className="rounded-lg overflow-hidden border border-base-content/10">
                  {[{n:'Primary',bg:'bg-primary',t:'text-primary-content'},{n:'Secondary',bg:'bg-secondary',t:'text-secondary-content'},{n:'Accent',bg:'bg-accent',t:'text-accent-content'},{n:'Neutral',bg:'bg-neutral',t:'text-neutral-content'}].map(c=>(
                    <div key={c.n} className={`${c.bg} ${c.t} h-20 p-4 flex items-end justify-end`}>
                      <span className="text-sm font-semibold">{c.n}</span>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-3 rounded-lg overflow-hidden border border-base-content/10">
                  {['Base 100','Base 200','Base 300'].map((n,i)=>(
                    <div key={n} className={`bg-base-${(i+1)*100} text-base-content h-28 p-4 flex items-end justify-end`}>
                      <span className="text-sm font-semibold">{n}</span>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-4 rounded-lg overflow-hidden border border-base-content/10">
                  {[{n:'Info',bg:'bg-info',t:'text-info-content'},{n:'Success',bg:'bg-success',t:'text-success-content'},{n:'Warning',bg:'bg-warning',t:'text-warning-content'},{n:'Error',bg:'bg-error',t:'text-error-content'}].map(c=>(
                    <div key={c.n} className={`${c.bg} ${c.t} h-20 p-4 flex items-end justify-end`}>
                      <span className="text-sm font-semibold">{c.n}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CSS Modal */}
      <Dialog open={showCssModal} onOpenChange={(open) => !open && setShowCssModal(false)}>
        <DialogPopup className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span className="text-success">✦</span>
              Add <span className="font-bold">{themeName}</span> theme to your CSS file
            </DialogTitle>
            <DialogDescription>
              Add it after <span className="font-semibold italic">@plugin "daisyui";</span>
            </DialogDescription>
          </DialogHeader>
          <div className="px-6 pb-4">
            <textarea 
              className="w-full h-72 rounded-lg border border-input bg-muted/50 p-4 font-mono text-xs resize-none focus:outline-none focus:ring-2 focus:ring-ring"
              value={cssOutput}
              readOnly
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCssModal(false)}>Close</Button>
            <Button onClick={copyCSS} className="gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
              Copy to clipboard
            </Button>
          </DialogFooter>
        </DialogPopup>
      </Dialog>

      {/* Color Picker Modal */}
      {colorPicker.open && colorPicker.key && (
        <ColorPickerModal
          isOpen={colorPicker.open}
          colorKey={colorPicker.key}
          label={colorPicker.label}
          currentColor={theme[colorPicker.key]}
          onColorChange={(color) => updateColor(colorPicker.key!, color)}
          onClose={() => setColorPicker({ open: false, key: null, label: '' })}
          themeColors={theme}
        />
      )}
    </div>
  );
}
