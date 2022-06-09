import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css'; // currently nothing here
import { BrowserRouter as Router } from 'react-router-dom';
import Auth0ProviderWithNavigate from './auth/auth0-provider-with-history';

import { Auth0Provider } from "@auth0/auth0-react";

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Auth0Provider
    domain="dev-9nfdi31c.us.auth0.com"
    clientId="qXNCxyCOhPb04XXdEGPZmrNbRQucJRRY"
    redirectUri={window.location.origin}
  >
      <App />
    </Auth0Provider> 
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
