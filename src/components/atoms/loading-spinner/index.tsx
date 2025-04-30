import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

interface LoadingSpinnerProps {
  size?: number;
}

const LoadingSpinner = ({ size = 48 }: LoadingSpinnerProps) => {
  const antIcon = <LoadingOutlined style={{ fontSize: size }} spin />;

  return <Spin indicator={antIcon} size="large"></Spin>;
};

export default LoadingSpinner;
