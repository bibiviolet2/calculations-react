import { useEffect, useReducer } from 'react';
import { useDebug } from './useDebug';
import { IAppState, ICalc, IPage } from '../types/IAppState';
import { IAppStateApi } from './useAppStateContext';

const initialState: IAppState = {
  calculations: [],
  length: 0,
  page: 'home',
};

type IAppStateActionTypes = 'reset-state' | 'add-calculations' | 'set-page';

interface IAppStateAction {
  type: IAppStateActionTypes;
  calculations?: ICalc[];
  page?: IPage;
}

const getAppStateReducer = (state: IAppState, action: IAppStateAction): IAppState => {
  switch (action.type) {
    case 'reset-state':
      return {
        ...initialState,
      };
    case 'add-calculations':
      return {
        ...state,
        ...{
          calculations: undefined === action.calculations ? [] : [...action.calculations],
          length: (action.calculations ?? []).length,
        },
      };
    case 'set-page':
      return {
        ...state,
        page: action.page ?? 'home',
      };
  }
  return {
    ...state,
  };
};

const useAppState = (): IAppStateApi => {
  const [state, dispatch] = useReducer(getAppStateReducer, initialState);
  const isDebugMode = useDebug();

  const setCalculations = (calculations: ICalc[]) => {
    dispatch({ type: 'add-calculations', calculations });
  };

  const updateCalculation = (index: number, calculation: ICalc) => {
    let newState = state;

    newState.calculations[index] = calculation;

    dispatch({ type: 'add-calculations', calculations: newState.calculations });
  };

  const reset = () => {
    dispatch({ type: 'reset-state' });
  };

  const setPage = (page: IPage) => {
    dispatch({ type: 'set-page', page: page });
  };

  useEffect(() => {
    if (isDebugMode) {
      console.log('State has changed: ', state);
    }
  }, [state]);

  return { appState: state, setCalculations, updateCalculation, reset, setPage };
};

export default useAppState;

export { IAppStateAction, IAppStateActionTypes };
