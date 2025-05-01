import Footer from '@/components/organisms/footer/';
import Header from '@/components/organisms/header/';
import { Layout } from 'antd';
import { ReactNode } from 'react';
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
