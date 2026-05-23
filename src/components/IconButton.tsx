import type { ReactNode } from "react";

interface IconButtonProps {
  icon: ReactNode;
  onClick: () => void;
  tooltip: string;
  /** Optional: forwarded aria-label (defaults to tooltip) */
  ariaLabel?: string;
}

export function IconButton({ icon, onClick, tooltip, ariaLabel }: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      title={tooltip}
      aria-label={ariaLabel ?? tooltip}
      style={{ background: "none", border: "none", padding: "4px", cursor: "pointer" }}
      className="text-[#E8E3D5]/35 hover:text-[#E8E3D5]/65 transition-opacity duration-200 flex items-center justify-center"
    >
      {icon}
    </button>
  );
}
