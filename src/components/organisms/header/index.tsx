import type { MenuProps } from 'antd';
import { Layout, Menu, Typography } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import './index.scss';

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
    <AntHeader className="o-header">
      <div className="o-header__container">
        <Link to="/movies">
          <Title level={1} className="o-header__logo">
            🎬 Movies
          </Title>
        </Link>
        <Menu mode="horizontal" selectedKeys={[selectedKey]} items={menuItems} />
      </div>
    </AntHeader>
  );
};

export default Header;
