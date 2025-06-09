import React from "react";
import { useFadeIn } from "../hooks/useFadeIn";

interface FadeInSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const FadeInSection: React.FC<FadeInSectionProps> = ({
  children,
  className = "",
  delay = 0,
}) => {
  const ref = useFadeIn();

  const delayClass = delay > 0 ? `fade-in-delay-${Math.min(delay, 3)}` : "";

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`fade-in ${delayClass} ${className}`}
    >
      {children}
    </div>
  );
};

export default FadeInSection;
