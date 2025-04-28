import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
// Import Ant Design styles - update the import path to the current version
import 'antd/dist/reset.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
