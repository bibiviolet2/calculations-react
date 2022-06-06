import * as React from 'react';
import PageContainer from './components/containers/PageContainer';
import useAppState from './hooks/useAppState';
import { AppStateProvider } from './hooks/useAppStateContext';
import { IntlProvider } from 'react-intl';
import langConfig from './config/lang.json';
import useLang from './hooks/useLang';
import flatten from 'flat';
import { LangContextProvider } from './hooks/useLangContext';
import { HashRouter } from 'react-router-dom';

const App: React.FC = () => {
  const { appState, reset, setCalculations, updateCalculation, setPage } = useAppState();
  const { lang, setLang } = useLang();

  return (
    <AppStateProvider
      appState={appState}
      reset={reset}
      setCalculations={setCalculations}
      updateCalculation={updateCalculation}
      setPage={setPage}
    >
      <IntlProvider messages={flatten((langConfig as Record<string, any>)[lang])} locale={lang}>
        <LangContextProvider lang={lang} setLang={setLang}>
          <HashRouter>
            <PageContainer></PageContainer>
          </HashRouter>
        </LangContextProvider>
      </IntlProvider>
    </AppStateProvider>
  );
};

export default App;
