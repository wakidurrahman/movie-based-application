import { Layout, Typography } from 'antd';
import './index.scss';

const { Footer: AntFooter } = Layout;
const { Text } = Typography;

const Footer = () => {
  return (
    <AntFooter className="o-footer">
      <Text className="o-footer__text">
        🎬 Movie App ©{new Date().getFullYear()} Created with React, TypeScript & Ant Design
      </Text>
    </AntFooter>
  );
};

export default Footer;
