import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { UserProvider } from './components/Context/UserContext';
import { LabelProvider } from './components/Context/LabelContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="214623411226-893gd1ee3tbepf54ekkri1ffb7flfjp8.apps.googleusercontent.com">
      <UserProvider>
        <LabelProvider>
          <App />
        </LabelProvider>
      </UserProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
