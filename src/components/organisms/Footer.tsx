import { Layout, Typography } from 'antd';

const { Footer: AntFooter } = Layout;
const { Text } = Typography;

const Footer = () => {
  return (
    <AntFooter
      style={{
        textAlign: 'center',
        backgroundColor: '#f0f2f5',
        padding: '24px 0',
      }}
    >
      <Text type="secondary">
        🎬 Movie App ©{new Date().getFullYear()} Created with React, TypeScript & Ant Design
      </Text>
    </AntFooter>
  );
};

export default Footer;
