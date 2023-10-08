import TelaCadastroPatrimonio from "./telas/TelaCadastroPatrimonio.jsx";
import TelaCadastrocategoria from "./telas/TelaCadastroCategoria.jsx";
import TelaCadastrofuncao from "./telas/TelaCadastroFuncao.jsx";
import TelaCadPessoa from "./telas/TelaCadPessoa.jsx";
import TelaMenu from "./telas/TelaMenu";
import Tela404 from "./telas/Tela404";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SearchBar from './SearchBar';
import React, { useState } from 'react';



function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path="/patrimonios" element={<TelaCadastroPatrimonio/>}/>
          <Route path="/categoria" element={<TelaCadastrocategoria/>}/> 
          <Route path="/pessoa" element={<TelaCadPessoa/>}/>
          <Route path="/funcao" element={<TelaCadastrofuncao/>}/>
            
          <Route path="/" element={<TelaMenu/>}/>
          <Route path="*" element={<Tela404/>} />
         
        </Routes>
        
     </BrowserRouter>
    </div>
  );
}



//Barra de pesquisa
const App = () => {
  const handleSearch = (term) => {
    // Aqui você pode realizar a lógica de pesquisa para cada tipo de cadastro
    console.log(`Realizando pesquisa para: ${term}`);
  };

  return (
    <div>
      <h1>Barra de Pesquisa Componentizada</h1>
      <SearchBar onSearch={handleSearch} />
      {/* Adicione aqui outros componentes ou lógica necessários para cada tipo de cadastro */}
    </div>
  );
};





export default App;



