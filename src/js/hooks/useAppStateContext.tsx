import React, { PropsWithChildren } from 'react';
import { IAppState, ICalc, IPage } from '../types/IAppState';

interface IAppStateApi {
  appState: IAppState;
  setCalculations: (calculations: ICalc[]) => void;
  updateCalculation: (index: number, calculation: ICalc) => void;
  reset: () => void;
  setPage: (page: IPage) => void;
}

const AppStateContext = React.createContext<IAppStateApi | undefined>(undefined);

const AppStateProvider: React.FC<PropsWithChildren<IAppStateApi>> = ({
  appState,
  setCalculations,
  updateCalculation,
  reset,
  setPage,
  children,
}) => {
  return (
    <AppStateContext.Provider
      value={{ appState, reset, setCalculations, updateCalculation, setPage }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

const useAppStateContext = (): IAppStateApi => {
  const context = React.useContext(AppStateContext);

  if (undefined === context) {
    throw new Error('useAppStateContext must be used within a AppStateProvider');
  }

  return context;
};

export default useAppStateContext;
export { AppStateProvider, IAppStateApi };
