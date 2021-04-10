import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { DrawerProvider } from './providers/DrawerContext';
import { ThemeProvider } from './providers/ThemeContext';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <DrawerProvider>
        <App />
      </DrawerProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);