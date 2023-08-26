import Pagina from "../templates/Pagina";
import FormCategoria from "../formularios/FormCategoria";
import TabelaCategoria from "../tabelas/TabelaCategoria";
import { useState, useEffect } from "react";
import { Alert, Container } from "react-bootstrap";
import { urlBase } from "../utilitarios/definicoes";

export default function TelaCadastroCategoria(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [categorias, setCategoria] = useState([]);
    const [modoEdicao, setModoEdicao] = useState(false)
    const [atualizando, setAtualizando] = useState(false)
    const [CategoriaEmEdicao, setCategoriaEmEdicao] = useState(
        {
            idCategoria: 0,
            categoria: ""
        }
    );
    
    function prepararCategoriaParaEdicao(categoria) {
        console.log('prepararCategoriaParaEdicao', categoria)
        setAtualizando(true);
        setCategoriaEmEdicao(categoria);
        setExibirTabela(false);
    }
    function apagarCategoria(categoria) {
        fetch(urlBase + "/categoria", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(categoria),
        })
            .then((resposta) => {
                if (resposta.ok) {
                    const listaAtualizada = categorias.filter(
                        (item) => item.idCategoria !== categoria.idCategoria
                    );
                    setCategoria(listaAtualizada);
                    alert("Categoria excluída com sucesso!");
                } else {
                    alert("Não foi possível excluir a categoria.");
                }
            })
            .catch((erro) => {
                alert("Erro ao executar a requisição: " + erro.message);
            });
    }
    useEffect(() => {
        fetch(urlBase + "/categoria", {
            method: "GET"
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            if (Array.isArray(dados)) {
                setCategoria(dados)
            }
        })
        .catch((erro) => {
            console.error("Erro ao obter a categoria:", erro);
          });
    }, []);
    return (
        <Pagina>
            <Container >
                <Alert variant={"secondary"} className="text-center m-2 shadow-sm mb-4 rounded"> Cadastro de Tipo</Alert>
                {
                    exibirTabela ?
                        <TabelaCategoria listaCategoria={categorias}
                            setCategoria={setCategoria}
                            exibirTabela={setExibirTabela}
                            editarCategoria={prepararCategoriaParaEdicao}
                            excluirCategoria={apagarCategoria} />   
                        :
                        <FormCategoria listaCategoria={categorias}
                            setCategoria={setCategoria}
                            exibirTabela={setExibirTabela}
                            modoEdicao={modoEdicao}
                            setModoEdicao={setModoEdicao}
                            atualizando={atualizando}
                            categoria={CategoriaEmEdicao} /> 
                }
            </Container>
        </Pagina>
    );
}