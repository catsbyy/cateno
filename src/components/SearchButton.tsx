import { Search } from "lucide-react";
import { useSearch } from "../contexts/SearchContext";
import { IconButton } from "./IconButton";

export function SearchButton() {
  const { open } = useSearch();

  return (
    <IconButton
      icon={<Search size={18} strokeWidth={2} aria-hidden />}
      onClick={open}
      tooltip="Search"
    />
  );
}
