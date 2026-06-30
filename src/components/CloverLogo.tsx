import React from 'react';

interface CloverLogoProps {
  className?: string;
  size?: number;
  showBackground?: boolean;
}

export function CloverLogo({ className = '', size = 48, showBackground = true }: CloverLogoProps) {
  return (
    <img 
      src="/applogo.png" 
      alt="BioLens Logo"
      width={size}
      height={size}
      className={`inline-block select-none object-contain rounded-full ${className}`}
      style={{ width: size, height: size }}
      referrerPolicy="no-referrer"
    />
  );
}
