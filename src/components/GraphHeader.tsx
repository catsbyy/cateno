// Scenario graph header: back button, title/period, and action buttons.
import { SurpriseButton } from "./SurpriseButton";
import { SearchButton } from "./SearchButton";

interface GraphHeaderProps {
  title: string;
  period: string;
  onBack: () => void;
}

export function GraphHeader({ title, period, onBack }: GraphHeaderProps) {
  return (
    <header
      className="shrink-0 flex items-center gap-4 px-6 py-3"
      style={{ borderBottom: "1px solid #181818" }}
    >
      <button
        onClick={onBack}
        className="text-[#E8E3D5]/30 hover:text-[#E8E3D5]/70 transition-colors duration-150 text-[12px] font-sans uppercase tracking-[0.15em] cursor-pointer flex items-center gap-1.5"
      >
        <span>←</span>
        <span>Scenarios</span>
      </button>

      <div
        className="w-px h-4 self-center"
        style={{ background: "#2a2a2a" }}
      />

      <div>
        <h1 className="text-[#E8E3D5] text-[17px] font-serif leading-none">
          {title}
        </h1>
        <p className="text-[#E8E3D5]/30 text-[11px] font-sans mt-0.5">
          {period}
        </p>
      </div>

      {/* Right side — surprise + search */}
      <div className="ml-auto flex items-center gap-2 pr-1">
        <SurpriseButton />
        <SearchButton />
      </div>
    </header>
  );
}
