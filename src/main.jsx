import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';
import store from './redux/store'; // ✅ import the store

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}> {/* ✅ Redux provider */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
