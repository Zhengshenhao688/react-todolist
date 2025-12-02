import { Tabs } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    { key: '/', label: 'Todo List' },
    { key: '/form', label: '表单示例' },
  ];

  return (
    <div style={{ marginBottom: 20 }}>
      <Tabs
        activeKey={location.pathname === '/form' ? '/form' : '/'}
        items={items}
        onChange={(key) => navigate(key)}
      />
    </div>
  );
};

export default Layout;
