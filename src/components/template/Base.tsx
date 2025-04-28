import { Layout } from 'antd';
import { ReactNode } from 'react';
import Footer from '../organisms/Footer';
import Header from '../organisms/Header';

const { Content } = Layout;

interface BaseTemplateProps {
  children: ReactNode;
}

const Base = ({ children }: BaseTemplateProps) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header />
      <Content
        style={{
          padding: '24px',
          maxWidth: 1200,
          margin: '0 auto',
          width: '100%',
        }}
      >
        {children}
      </Content>
      <Footer />
    </Layout>
  );
};

export default Base;
