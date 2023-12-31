import Pagina from "../templates/Pagina";
import FormPessoa from "../formularios/FormPessoa.jsx";
import TabelaPessoa from "../tabelas/TabelaPessoa.jsx";
import { useState, useEffect } from "react";
import { Alert, Container, Button } from "react-bootstrap"; 


export default function TelaCadPessoa(props) {
  const [exibirTabela, setExibirTabela] = useState(true);
  const [pessoas, setPessoa] = useState([]);


  const [funcoesEPessoas, setFuncoesEPessoas] = useState([]);

  const [modoEdicao, setModoEdicao] = useState(false);
  const [atualizando, setAtualizando] = useState(false);
  const [PessoaEmEdicao, setPessoaEmEdicao] = useState(
    {

      cpf: "",
      nome: "",
      dataNasc: "",
      genero: "",
      endereco: "",
      cidade: "",
      bairro: "",
      uf: "",
      cep: "",
      email: "",
      celular: ""
      
      
    });

  function prepararParaEdicao(pessoa) {
    setAtualizando(true);
    setPessoaEmEdicao(pessoa);
    setExibirTabela(false); 
  }

  function apagarPessoa(pessoa) {
    fetch("https://129.146.68.51/aluno14-pfsii/pessoa", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pessoa),
    })
      .then((resposta) => {
        if (resposta.ok) {
          const listaAtualizada = pessoas.filter(
            (item) => item.cpf !== pessoa.cpf
          );
          setPessoa(listaAtualizada);
          alert("Pessoa excluída com sucesso");
        } else {
          alert("Não foi possível excluir essa pessoa");
        }
      })
      .catch((erro) => {
        alert("Erro ao executar essa requisição: " + erro.message);
      });
  }

  useEffect(() => {
   
    fetch("https://129.146.68.51/aluno14-pfsii/pessoa", {
      method: "GET",
    })
      .then((resposta) => resposta.json())
      .then((dados) => {
       
        if (Array.isArray(dados)) {
          
          setPessoa(dados);
        }
      })
      .catch((erro) => {
        console.error("Erro ao obter os pessoas:", erro);
      });
  }, []);


 const buscarFuncoesEPessoas = () => {
    fetch("https://129.146.68.51/aluno14-pfsii/pessoa_funcao", {
      method: "GET",
    })
      .then((resposta) => resposta.json())
      .then((dados) => {
        if (Array.isArray(dados)) {
          setFuncoesEPessoas(dados);
          setExibirTabela(false);
        }
      })
      .catch((erro) => {
        console.error("Erro ao obter as funções e pessoas:", erro);
      });
  };


 



  return (
    <Pagina>
      <Container>
        <Alert variant={"secondary"} className="text-center m-2 shadow-sm mb-4 rounded">Cadastro de Pessoas</Alert>

 <div className="text-center">
          <Button variant="success" onClick={buscarFuncoesEPessoas}>
             Veja Cargos já Cadastrados N:N
          </Button>
        </div>

        {
          exibirTabela ?
            <TabelaPessoa listaPessoa={pessoas}
              setPessoa={setPessoa}
              exibirTabela={setExibirTabela}
              editarpessoa={prepararParaEdicao}
              excluirpesssoa={apagarPessoa} />
            :

            <div>
            <h3>Pessoa e Cargo</h3>
            <ul>
              {funcoesEPessoas.map((item) => (
                <li key={item.id}>{item.id_pessoa} - {item.idCargo}</li>
              ))}
            </ul>

            <FormPessoa
              listaPessoa={pessoas}
              setPessoa={setPessoa}
              exibirTabela={setExibirTabela}
              modoEdicao={modoEdicao}
              setModoEdicao={setModoEdicao}
              atualizando={atualizando}
              pessoa={PessoaEmEdicao}
            />
          </div>
        }

        
      </Container>
    </Pagina>
  );
}


