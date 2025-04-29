import { Input, Typography } from 'antd';
import React from 'react';
import './index.scss';

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

const RHFInputField = ({
  id,
  name,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
}: RHFInputFieldProps) => {
  return (
    <div className="a-rhf-input-field">
      {label && (
        <label htmlFor={id} className="a-rhf-input-field__label">
          {label} {required && <span className="a-rhf-input-field__label-required">*</span>}
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
        <Text type="danger" className="a-rhf-input-field__error">
          {error}
        </Text>
      )}
    </div>
  );
};

export default RHFInputField;
