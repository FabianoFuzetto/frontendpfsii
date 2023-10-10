import React, { useState } from 'react';
import './styles.css';


const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div>
      <input className="input"
        type="text"
        placeholder="Pesquisa Comp..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="button" onClick={handleSearch}>Pesquisar</button>
    </div>
  );
};

export default SearchBar; 