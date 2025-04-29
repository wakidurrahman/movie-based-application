import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

interface LoadingSpinnerProps {
  size?: number;
  tip?: string;
  fullScreen?: boolean;
}

const LoadingSpinner = ({
  size = 40,
  tip = 'Loading...',
  fullScreen = false,
}: LoadingSpinnerProps) => {
  const antIcon = <LoadingOutlined style={{ fontSize: size }} spin />;

  if (fullScreen) {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'rgba(255, 255, 255, 0.7)',
          zIndex: 9999,
        }}
      >
        <Spin indicator={antIcon} tip={tip} size="large" />
      </div>
    );
  }

  // For a non-fullscreen spinner, we have two options:
  // 1. Use a true nested pattern with content
  // 2. Don't use the tip prop at all

  // Option 1: Create a proper nested pattern by adding content
  return (
    <div style={{ textAlign: 'center', padding: '30px 50px' }}>
      <Spin indicator={antIcon} tip={tip}>
        <div style={{ opacity: 0, height: '50px', padding: '20px' }}>
          {/* Hidden content to create a proper nesting context */}
          Content
        </div>
      </Spin>
    </div>
  );

  // Option 2 (alternative): Remove tip if that's preferred
  // return <Spin indicator={antIcon} />;
};

export default LoadingSpinner;
