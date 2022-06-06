import * as React from "react";
import { PropsWithChildren } from "react";

const DebugContext = React.createContext<boolean | undefined>(undefined);

const DebugProvider: React.FC<
  PropsWithChildren<{
    debug: boolean;
  }>
> = ({ debug, children }) => {
  return (
    <DebugContext.Provider value={debug}>{children}</DebugContext.Provider>
  );
};

const useDebug = () => {
  const context = React.useContext(DebugContext);

  if (undefined === context) {
    throw new Error("useDebug must be used within a DebugProvider");
  }

  return context;
};

export { useDebug, DebugProvider };
