import React, { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import App from '@/App';
import '@/assets/scss/styles.scss';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
