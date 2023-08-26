import React, { useState, useEffect } from "react";
import Pagina from "../templates/Pagina";
import FormularioPatrimonio from "../formularios/FormularioPatrimonio";
import TabelaPatrimonio from "../tabelas/TabelaPatrimonio";
import { Alert, Container } from "react-bootstrap";
import { urlBase } from "../utilitarios/definicoes";

export default function TelaCadastroPatrimonio(props) {

  const [patrimonio, setPatrimonio] = useState([]);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [atualizando, setAtualizando] = useState(false);
  const [patrimonioEmEdicao, setPatrimonioEmEdicao] = useState({

    id: 0,
    nomeDoPatrimonio: "",
    dataPatrimonio: "",
    ValorDoPatrimonio: "",
    Condicao: "",
    Descricao: "",
    Codigo: "",

  });

  const [exibirTabela, setExibirTabela] = useState(true);
  console.log(patrimonioEmEdicao)
  function editarPatrimonio(patrimonio) {
    setAtualizando(true);
    setPatrimonioEmEdicao(patrimonio);
    setExibirTabela(false);
  }

  useEffect(() => {
    fetch(urlBase +"https://129.146.68.51/aluno14-pfsii/patrimonios", {
      method: "GET",
    })
      .then((resposta) => resposta.json())
      .then((dados) => {
        if (Array.isArray(dados)) {
          setPatrimonio(dados);
        }
      })
      .catch((erro) => {
        console.error("Erro ao obter os patrimônios:", erro);
      });
  }, []);

  return (
    <Pagina>
      <Container>
        <Alert variant="secondary" className="text-center m-2 shadow-sm mb-4 rounded">
          Cadastro de Patrimônio
        </Alert>
        {exibirTabela ? (
          <TabelaPatrimonio
            ListaPatrimonio={patrimonio}
            setPatrimonio={setPatrimonio}
            exibirTabela={setExibirTabela}
            editarPatrimonio={editarPatrimonio} // Passando a função como propriedade
          />
        ) : (
          <FormularioPatrimonio
            ListaPatrimonio={patrimonio}
            setPatrimonio={setPatrimonio}
            exibirTabela={setExibirTabela}
            modoEdicao={modoEdicao}
            setmodoEdicao={setModoEdicao}
            atualizando={atualizando}
            patrimonio={patrimonioEmEdicao}
          />
        )}
      </Container>
    </Pagina>
  );
}