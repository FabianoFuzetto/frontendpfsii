import React, { useState, useEffect } from 'react';
import { Button, Container, Table, Row } from "react-bootstrap";
import SearchBar from '../Componentes/SearchBar';
import moment from 'moment';

export default function TabelaPatrimonio(props) {
    const [searchResults, setSearchResults] = useState(props.listaPatrimonio || []);

    useEffect(() => {
        const buscarPatrimonio = () => {
            fetch("https://129.146.68.51/aluno14-pfsii/patrimonios", { method: "GET" })
                .then((resposta) => resposta.json())
                .then((listaPatrimonio) => {
                    if (Array.isArray(listaPatrimonio)) {
                        setSearchResults(listaPatrimonio);
                    }
                });
        };

        buscarPatrimonio();
    }, []);

    function excluirPatrimonio(id) {
        const ListaAtualizada = searchResults.filter((patrimonio) => patrimonio.id !== id);
        setSearchResults(ListaAtualizada);

        fetch("https://129.146.68.51/aluno14-pfsii/", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id })
        })
            .then((response) => response.json())
            .then((dados) => {
                if (dados && dados.status) {
                    props.exibirTabela(true);
                    alert("Patrimônio excluído com sucesso!");
                } else {
                    window.alert(dados && dados.mensagem);
                }
            })
            .catch((erro) => {
                window.alert("Erro ao executar a requisição: " + erro.message);
            });
    }

    function filtrarPatrimonios(e) {
        const termoBusca = e.currentTarget.value;

        fetch("https://129.146.68.51/aluno14-pfsii/patrimonios", { method: "GET" })
            .then((resposta) => resposta.json())
            .then((ListaPatrimonio) => {
                if (Array.isArray(ListaPatrimonio)) {
                    const resultadoBusca = ListaPatrimonio.filter((patrimonio) => patrimonio.nomeDoPatrimonio.toLowerCase().includes(termoBusca.toLowerCase()));
                    setSearchResults(resultadoBusca);
                }
            });
    }

    return (
        <Container>
            <Row className="col-4">
                <SearchBar onSearch={filtrarPatrimonios} />
            </Row>
            <Table striped bordered hover className="shadow-lg">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Data</th>
                        <th>Valor</th>
                        <th>Condição</th>
                        <th>Descrição</th>
                        <th>Código</th>
                        <th>Editar/Excluir</th>
                    </tr>
                </thead>
                <tbody>
                    {searchResults.map((patrimonio) => {
                        return (
                            <tr key={patrimonio.id}>
                                <td>{patrimonio.id}</td>
                                <td>{patrimonio.nomeDoPatrimonio}</td>
                                <td>{moment(patrimonio.dataPatrimonio).format('DD/MM/YYYY')}</td>
                                <td>{patrimonio.ValorDoPatrimonio}</td>
                                <td>{patrimonio.Condicao}</td>
                                <td style={{ whiteSpace: "pre-wrap", maxWidth: "300px", overflow: "auto" }}>{patrimonio.Descricao}</td>
                                <td>{patrimonio.Codigo}</td>
                                <td>
                                    <Button
                                        onClick={() => { props.editarPatrimonio(patrimonio) }}
                                        title="Editar" variant="btn btn-outline-primary">
                                        {/* Ícone de edição */}
                                    </Button>{' '}
                                    <Button title="Excluir" variant="btn btn-outline-danger" onClick={() => {
                                        if (window.confirm('Confirma a exclusão desse patrimônio?')) {
                                            excluirPatrimonio(patrimonio.id)
                                        }
                                    }}>
                                        {/* Ícone de exclusão */}
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            {searchResults.length === 0 && (
                <p className="text-center my-4">Nenhum patrimônio encontrado.</p>
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
