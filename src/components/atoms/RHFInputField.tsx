import { Input, Typography } from 'antd';
import React from 'react';

const { Text } = Typography;

interface RHFInputFieldProps {
  id: string;
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
}

const RHFInputField: React.FC<RHFInputFieldProps> = ({
  id,
  name,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
}) => {
  return (
    <div style={{ marginBottom: 16 }}>
      {label && (
        <label htmlFor={id} style={{ display: 'block', marginBottom: 8 }}>
          {label} {required && <span style={{ color: '#ff4d4f' }}>*</span>}
        </label>
      )}
      <Input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        status={error ? 'error' : ''}
        aria-required={required}
      />
      {error && (
        <Text type="danger" style={{ fontSize: 12 }}>
          {error}
        </Text>
      )}
    </div>
  );
};

export default RHFInputField;
