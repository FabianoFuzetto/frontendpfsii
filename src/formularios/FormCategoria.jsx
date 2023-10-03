import { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

export default function FormCategoria(props) {
    const [validado, setValidado] = useState(false);
    const [categoria, setCategoria] = useState(props.categoria);

    function manipularMudanca(e) {
        const elemForm = e.currentTarget;
        const id = elemForm.id; 
        const valor = elemForm.value;
        setCategoria({ ...categoria, [id]: valor });
    }


    function manipulaSbmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            //Editar
            console.log(props)
            if (!props.atualizando) {
                fetch('https://129.146.68.51/aluno14-pfsii/categoria', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(categoria) 
                })
                    .then((resposta) => {
                        return resposta.json();
                    })
                    .then((dados) => {
                        if (dados.status) {
                            props.setModoEdicao(false);
                            let novaLista = props.listaCategoria;
                            novaLista.push(categoria);
                            props.setCategoria(novaLista);
                            props.exibirTabela(true);
                            window.location.reload()
                        }
                        window.alert(dados.mensagem);
                    })
                    .catch((erro) => {
                        window.alert("Erro ao executar a requisição: " + erro.message);
                    })
            }
            else {
                fetch('https://129.146.68.51/aluno14-pfsii/categoria', {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(categoria)
                }).then((resposta) => {
                    return resposta.json()
                })
                    .then((dados) => {
                        if (dados.status) {
                            props.setModoEdicao(false);
                            let novaLista = props.listaCategoria;
                            novaLista.push(categoria);
                            props.setCategoria(novaLista);
                            props.exibirTabela(true);
                            setCategoria(props.categoria)
                            window.location.reload()
                        }
                        window.alert(dados.mensagem);
                    })
                    .catch((erro) => {
                        window.alert("Erro ao executar a requisição: " + erro.message);
                    })
            }
            setValidado(false);
        }
        else {
            setValidado(true);
        }
        evento.preventDefault();
        evento.stopPropagation();
    }

    return (
        <>
            <Form className="shadow-lg p-3 mt-4 bg-white rounded" noValidate validated={validado} onSubmit={manipulaSbmissao}>
                <Row>
                    <Col className="d-none">
                        <Form.Group as={Col} md="12" >
                            <Form.Label>ID</Form.Label>
                            <Form.Control
                                ClassName="hidden"
                                type="text"
                                placeholder="id da Categoria"
                                value={categoria.idCategoria}
                                id="idCategoria"
                                onChange={manipularMudanca}
                                required />
                            <Form.Control.Feedback type="invalid">
                                Digite o ID deste Categoria, em breve será auto encremento....
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group as={Col} md="12">
                            <Form.Label>Tipo:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ex: Instrumento, Imovel"
                                value={categoria.nomecategoria}
                                id="nomecategoria"
                                onChange={manipularMudanca}
                                required />
                            <Form.Control.Feedback type="invalid">
                                Digite o tipo a ser cadastrado.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <div className="d-flex justify-content-end mb-1 mt-5">
                    <Button style={{ marginRight: '5px' }} variant="btn btn-outline-danger" type="button" className="mt-5 " onClick={() => {
                        props.exibirTabela(true);
                    }}>Voltar</Button>{' '}
                    <Button className="mt-5" type="submit" variant="btn btn-outline-success">{props.atualizando ? ('Atualizar') : "Cadastrar"}</Button>{' '}
                </div>
            </Form>
        </>
    ); 
}