import React, { useState, useEffect } from 'react';
import { Button, Container, Table, Form, Row } from 'react-bootstrap';
import SearchBar from '../Componentes/SearchBar';
export default function TabelaFuncao(props) {
  const [searchResults, setSearchResults] = useState(props.listaFuncao || []);

  useEffect(() => {
    // Função para realizar a busca inicial
    const buscarFuncoes = () => {
      fetch("https://129.146.68.51/aluno14-pfsii/funcao", { method: "GET" })
        .then((resposta) => resposta.json())
        .then((listaFuncao) => {
          if (Array.isArray(listaFuncao)) {
            setSearchResults(listaFuncao);
          }
        });
    };

    // Chama a busca inicial
    buscarFuncoes();
  }, []); // O array vazio [] faz com que o useEffect seja executado apenas uma vez, equivalente ao componentDidMount

  function filtarFuncao(term) {
    const termoBusca = term;
    fetch("https://129.146.68.51/aluno14-pfsii/funcao", { method: "GET" })
      .then((resposta) => resposta.json())
      .then((listaFuncao) => {
        if (Array.isArray(listaFuncao)) {
          const resultadoBusca = listaFuncao.filter((funcao) =>
            funcao.funcaomembro.toLowerCase().includes(termoBusca.toLowerCase())
          );
          setSearchResults(resultadoBusca);
        }
      });
  }

  return (
    <Container>
      <Row className="col-4">
        {/* Adicione a barra de pesquisa aqui */}
        <SearchBar onSearch={filtarFuncao} />
      </Row>
      <Table striped bordered hover className="shadow-lg">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cargos</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map((funcao) => (
            <tr key={funcao.idCargo}>
              <td>{funcao.idCargo}</td>
              <td>{funcao.funcaomembro}</td>
              <td>
                <Button
                  onClick={() => props.editarFuncao(funcao)}
                  title="Editar"
                  variant="btn btn-outline-primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-pencil"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                  </svg>
                </Button>{' '}
                <Button
                  onClick={() => {
                    if (
                      window.confirm(
                        'Confirma a exclusão do Cargo/Função?'
                      )
                    ) {
                      props.excluirFuncao(funcao);
                    }
                  }}
                  title="Excluir"
                  variant="btn btn-outline-danger"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-trash"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                  </svg>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {searchResults.length === 0 && (
        <p className="text-center my-4">Nenhuma função encontrada.</p>
      )}
      <div className="d-flex justify-content-end mb-5">
        <Button
          variant="btn btn-outline-success"
          className="mt-3"
          onClick={() => {
            props.exibirTabela(false);
          }}
        >
          Cadastrar
        </Button>
      </div>
    </Container>
  );
}
