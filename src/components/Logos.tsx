import React, { useState } from "react";
import { Leaf, Orbit } from "lucide-react";

interface LogoProps {
  className?: string;
  size?: number;
}

/**
 * NutriLens Clover/Flower Logo
 * Styled vector version of NutriLens AI Logo with graceful image fallback
 */
export const NutriLensLogo: React.FC<LogoProps> = ({ className = "", size = 36 }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`${className} inline-flex items-center justify-center shrink-0 rounded-xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 shadow-md shadow-emerald-500/10 text-white`}
        style={{ width: size, height: size }}
      >
        <Leaf size={size * 0.55} className="text-white shrink-0" />
      </div>
    );
  }

  return (
    <img
      src="/applogo.png"
      alt="NutriLens AI Logo"
      width={size}
      height={size}
      onError={() => setHasError(true)}
      className={`${className} shrink-0 object-cover rounded-xl`}
      style={{ width: size, height: size }}
      referrerPolicy="no-referrer"
    />
  );
};

/**
 * Studio Logo (Saturn Planet)
 * Styled vector version of ZettaCreations Studio Logo with graceful image fallback
 */
export const StudioLogo: React.FC<LogoProps> = ({ className = "", size = 36 }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`${className} inline-flex items-center justify-center shrink-0 rounded-full bg-slate-950 text-emerald-400 border border-slate-800/80`}
        style={{ width: size, height: size }}
      >
        <Orbit size={size * 0.65} className="text-emerald-400 shrink-0" />
      </div>
    );
  }

  return (
    <img
      src="/studiologo.jpg"
      alt="ZettaCreations Studio Logo"
      width={size}
      height={size}
      onError={() => setHasError(true)}
      className={`${className} shrink-0 object-cover rounded-full`}
      style={{ width: size, height: size }}
      referrerPolicy="no-referrer"
    />
  );
};
