import { Layout, Tabs } from 'antd';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import type { TabsProps } from 'antd';

import TodoListPage from './pages/TodoListPage';
import FormPage from './pages/FormPage';

const { Header, Content } = Layout;

const NavigationTabs = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const items: TabsProps['items'] = [
    { key: '/', label: 'Todo List' },
    { key: '/form', label: '表单示例' },
  ];

  const activeKey = location.pathname === '/form' ? '/form' : '/';

  return (
    <Tabs
      items={items}
      activeKey={activeKey}
      onChange={(key) => navigate(key)}
    />
  );
};

const App = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          background: '#fff',
          borderBottom: '1px solid #f0f0f0',
          padding: '0 24px',
        }}
      >
        <NavigationTabs />
      </Header>

      <Content style={{ padding: '24px', maxWidth: 900, margin: '0 auto' }}>
        <Routes>
          <Route path="/" element={<TodoListPage />} />
          <Route path="/form" element={<FormPage />} />
        </Routes>
      </Content>
    </Layout>
  );
};

export default App;