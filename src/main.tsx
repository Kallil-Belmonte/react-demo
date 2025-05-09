import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import App from '@/App';
import '@/assets/scss/styles.scss';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
