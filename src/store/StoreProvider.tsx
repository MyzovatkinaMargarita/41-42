import { createContext, ReactNode } from "react";
import { rootStore } from "./rootStore";
import type { RootStore } from "./types";

export const StoreContext = createContext<RootStore | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  return (
    <StoreContext.Provider value={rootStore}>
      {children}
    </StoreContext.Provider>
  );
}
