import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import './i18n/config.ts';

const container = document.getElementById('root')!;
const root = createRoot(container);

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const { worker } = await import('./mocks/browser');
  return worker.start();
}

enableMocking().then(() => {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
