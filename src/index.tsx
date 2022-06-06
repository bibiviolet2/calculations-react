import * as React from 'react';
import App from './js/App';
import config from './js/config/config.json';
import { DebugProvider } from './js/hooks/useDebug';
import { createRoot } from 'react-dom/client';

const run = () => {
  const rootDiv = document.createElement('div');
  rootDiv.setAttribute('id', 'app');
  document.body.prepend(rootDiv);

  const root = createRoot(rootDiv);

  root.render(
    <React.StrictMode>
      <DebugProvider debug={config.debug}>
        <App></App>
      </DebugProvider>
    </React.StrictMode>
  );
};

document.addEventListener('DOMContentLoaded', () => {
  run();
});
