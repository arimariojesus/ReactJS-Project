import { useState } from 'react';

import './styles.css';

import useDebounce from '../../utils/useDebounce';

export const SearchInput = ({ value, onChange }) => {
  const [searchValue, setDisplayValue] = useState(value);
  const debouncedChange = useDebounce(onChange, 500);

  function handleChange(event) {
    setDisplayValue(event.target.value);
    debouncedChange(event.target.value);
  }

  return (
    <input 
      className="search-input"
      onChange={handleChange}
      value={searchValue}
      type="search"
      placeholder="Type your search"
    />
  );
}