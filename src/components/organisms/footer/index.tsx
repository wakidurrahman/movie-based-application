import { Layout } from 'antd';
import './index.scss';

const { Footer: AntFooter } = Layout;

const Footer = () => {
  return (
    <AntFooter className="o-footer">
      🎬 Movies App ©{new Date().getFullYear()} Created with React, TypeScript & Ant Design
    </AntFooter>
  );
};

export default Footer;
