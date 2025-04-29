import type { MenuProps } from 'antd';
import { Layout, Menu, Typography } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const { Header: AntHeader } = Layout;
const { Title } = Typography;

const Header = () => {
  const location = useLocation();
  const selectedKey =
    location.pathname === '/' || location.pathname === '/movies' ? 'home' : 'favorites';

  // Define menu items using the recommended format
  const menuItems: MenuProps['items'] = [
    {
      key: 'home',
      label: <Link to="/movies">Home</Link>,
    },
    {
      key: 'favorites',
      label: <Link to="/favorites">Favorites</Link>,
    },
  ];

  return (
    <AntHeader
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        width: '100%',
        backgroundColor: '#fff',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.09)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/movies">
            <Title level={3} style={{ margin: 0, cursor: 'pointer' }}>
              🎬 Movie App
            </Title>
          </Link>
        </div>
        <Menu
          mode="horizontal"
          selectedKeys={[selectedKey]}
          style={{ border: 'none', width: 'auto' }}
          items={menuItems}
        />
      </div>
    </AntHeader>
  );
};

export default Header;
