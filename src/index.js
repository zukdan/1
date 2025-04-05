// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Глобальные стили
import { EduProgramProvider } from './context/EduProgramContext'; // Глобальный контекст
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <EduProgramProvider>
      <App />
    </EduProgramProvider>
  </React.StrictMode>
);



reportWebVitals(console.log); // или передай функцию для отправки данных

