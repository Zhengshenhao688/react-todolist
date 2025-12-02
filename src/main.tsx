import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';

import App from './App.tsx';
import './index.css';
import 'antd/dist/reset.css';

import { Provider } from 'react-redux';
import { store } from './store';
import { TodoProvider } from './store/TodoContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <TodoProvider>
          <ConfigProvider>
            <App />
          </ConfigProvider>
        </TodoProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);