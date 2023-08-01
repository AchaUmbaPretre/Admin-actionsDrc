import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthContextProvider } from './context/authContext';
import './index.css';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);

