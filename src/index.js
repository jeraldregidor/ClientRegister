import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);
const strictMode = process.env.NODE_ENV === "production";

root.render(
  <Provider store={store}>
    {strictMode ? (
      <React.StrictMode>
        <App />
      </React.StrictMode>
    ) : (
      <App />
    )}
  </Provider>
);
