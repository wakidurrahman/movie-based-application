import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React from 'react';

interface LoadingSpinnerProps {
  size?: number;
  tip?: string;
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 40,
  tip = 'Loading...',
  fullScreen = false,
}) => {
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

  return <Spin indicator={antIcon} tip={tip} />;
};

export default LoadingSpinner;
