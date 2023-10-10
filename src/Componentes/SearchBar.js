import React, { useState } from 'react';
import './CSS/Estilo.css';


const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div>
      <input className="input"
        type="text"
        placeholder="Pesquisar Componentizado..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="button" onClick={handleSearch}>Pesquisar</button>
    </div>
  );
};

export default SearchBar; 