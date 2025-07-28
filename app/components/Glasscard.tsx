"use client";

import React, { ReactNode } from 'react';
import clsx from 'clsx';

type GlassCardProps = {
  children: ReactNode;
  className?: string;         // Allow overriding styles (like w-1/2, max-w-md, etc.)
  width?: string;             // Optional width (e.g., "w-96")
  height?: string;            // Optional height (e.g., "h-60")
  padding?: string;
  background?: string,           // Optional padding (e.g., "p-4")
};

const GlassCard = ({
  children,
  className = '',
  width = 'w-full',          // default full width, can override
  height = 'auto',
  padding = 'p-6',
  background = 'bg-white/10',
}: GlassCardProps) => {
  return (
    <div
      className={clsx(
        'rounded-2xl backdrop-blur-md shadow-xl border',
        width,
        height,
        padding,
        className,
        background
      )}
    >
      {children}
    </div>
  );
};

export default GlassCard;

