import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';
// Import Ant Design styles - correct path for current version
// import 'antd/dist/antd.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
