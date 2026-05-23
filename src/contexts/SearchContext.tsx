import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from "react";

interface SearchContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const SearchContext = createContext<SearchContextValue>({
  isOpen: false,
  open: () => {},
  close: () => {},
});

export function SearchProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const value = useMemo(() => ({ isOpen, open, close }), [isOpen, open, close]);
  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  return useContext(SearchContext);
}
