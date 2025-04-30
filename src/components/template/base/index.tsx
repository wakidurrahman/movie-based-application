import { Layout } from 'antd';
import { ReactNode } from 'react';
import Footer from '../../organisms/footer/';
import Header from '../../organisms/header/';
import './index.scss';
const { Content } = Layout;

interface BaseTemplateProps {
  children: ReactNode;
}

const Base = ({ children }: BaseTemplateProps) => {
  return (
    <Layout className="t-base">
      <Header />
      <Content>{children}</Content>
      <Footer />
    </Layout>
  );
};

export default Base;
