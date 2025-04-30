import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { ChangeEvent, useEffect, useState } from 'react';
import './index.scss';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
  delay?: number;
}

const SearchBar = ({ onSearch, placeholder, delay = 500 }: SearchBarProps) => {
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
      className="a-search-bar"
      placeholder={placeholder}
      prefix={<SearchOutlined />}
      value={searchTerm}
      onChange={handleChange}
      allowClear
      size="large"
    />
  );
};

export default SearchBar;
