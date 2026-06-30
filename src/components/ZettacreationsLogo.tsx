import React from 'react';

interface ZettacreationsLogoProps {
  className?: string;
  size?: number;
  showBackground?: boolean;
}

export const ZettacreationsLogo: React.FC<ZettacreationsLogoProps> = ({
  className = '',
  size = 48,
  showBackground = true,
}) => {
  return (
    <img 
      src="/zettacreation.jpg" 
      alt="ZettaCreations Logo"
      width={size}
      height={size}
      className={`inline-block select-none object-contain rounded-full ${className}`}
      style={{ width: size, height: size }}
      referrerPolicy="no-referrer"
    />
  );
};
