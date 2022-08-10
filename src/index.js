import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { LoadingContextProvider } from './context/LoadingContext';
import { TitleContextProvider } from './context/TitleContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <LoadingContextProvider>
    <TitleContextProvider>
      <App/>
    </TitleContextProvider>
  </LoadingContextProvider>
);

reportWebVitals();
