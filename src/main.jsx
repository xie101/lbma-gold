import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './i18n';
// CSS served statically via index.html <link> to /static/css/main.51c4594e.css
// (byte-identical to original site). Do NOT import CSS here — it duplicates the bundle.

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
