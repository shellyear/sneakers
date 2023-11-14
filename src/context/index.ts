import { createContext, useContext } from "react";

export const RefetchContext = createContext<{
  refetch: () => void;
}>({
  refetch: () => undefined,
});

export const useRefetch = () => {
  const context = useContext(RefetchContext);
  if (!context) {
    throw new Error("useRefetch must be used within a RefetchContext.Provider");
  }
  return context.refetch;
};


