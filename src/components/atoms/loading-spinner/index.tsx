import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import './index.scss';

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
      <div className="a-loading-spinner--fullscreen">
        <Spin indicator={antIcon} tip={tip} size="large" />
      </div>
    );
  }

  // For a non-fullscreen spinner, we have two options:
  // 1. Use a true nested pattern with content
  // 2. Don't use the tip prop at all

  // Option 1: Create a proper nested pattern by adding content
  return (
    <div className="a-loading-spinner">
      <Spin indicator={antIcon} tip={tip}>
        <div className="a-loading-spinner__content">
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
