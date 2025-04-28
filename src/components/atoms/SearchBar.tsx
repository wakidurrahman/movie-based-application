import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import React, { ChangeEvent, useEffect, useState } from 'react';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
  delay?: number;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = 'Search for movies...',
  delay = 500,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Debounce search term
  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(searchTerm);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, delay, onSearch]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Input
      placeholder={placeholder}
      prefix={<SearchOutlined />}
      value={searchTerm}
      onChange={handleChange}
      allowClear
      style={{ maxWidth: 400, width: '100%' }}
    />
  );
};

export default SearchBar;
