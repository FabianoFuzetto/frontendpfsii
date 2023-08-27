import TelaCadastroPatrimonio from "./telas/TelaCadastroPatrimonio.jsx";
import TelaCadastrocategoria from "./telas/TelaCadastroCategoria.jsx";
import TelaMenu from "./telas/TelaMenu";
import Tela404 from "./telas/Tela404";
import { BrowserRouter, Route, Routes } from "react-router-dom";


function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path="/patrimonio" element={<TelaCadastroPatrimonio/>}/>
          <Route path="/categoria" element={<TelaCadastrocategoria/>}/> 
          <Route path="/" element={<TelaMenu/>}/>
          <Route path="*" element={<Tela404/>} />
            
        </Routes>
        
     </BrowserRouter>
    </div>
  );
}

export default App;
