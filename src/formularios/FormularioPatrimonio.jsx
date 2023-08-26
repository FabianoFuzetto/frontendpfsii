import { useEffect, useState } from "react";
import { Form, Row, Col, InputGroup, Button } from "react-bootstrap";
import { urlBase } from "../utilitarios/definicoes";
import moment from "moment";

export default function FormularioPatrimonio(props) {
  const [validated, setValidated] = useState(false);
  const [patrimonio, setPatrimonio] = useState(props.patrimonio);
  

  useEffect(() => {
    setPatrimonio(props.patrimonio);
  }, [props.patrimonio]);

  const [Categorias, setCategorias] = useState([]);

  function manipularMudanca(e) {
    const elementoForm = e.currentTarget;
    const id = elementoForm.id;
    const valor = elementoForm.value;
    setPatrimonio({ ...patrimonio, [id]: valor });
  }

  function gravarDados(patrimonio) {
    if (!props.atualizando) {
      fetch(urlBase + "/aluno14-pfsii/patrimonios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(patrimonio)
      })
        .then((response) => {
          alert("Cadastrado com sucesso");
          return response.json()
        })
        .then((dados) => {
          if (dados && dados.status) {
            props.exibirTabela(true);
            window.location.reload();
          } else {
            window.alert(dados && dados.mensagem);
          }
        })
        .catch((erro) => {
          window.alert("Erro ao executar a requisição: " + erro.message);
        });
    } else {
      fetch(urlBase + "/aluno14-pfsii/patrimonios", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(patrimonio)
      })
        .then((resposta) => {
          return resposta.json()
        })
        .then((dados) => {
          if (dados.status) {
            props.setmodoEdicao(false);
            props.exibirTabela(true);
            window.location.reload();
          }
          window.alert(dados.mensagem);
        })
        .catch((erro) => {
          window.alert("Erro ao executar a requisição: " + erro.message);
        });
    }
  }

  function manipularSubmissao(evento) {
    const form = evento.currentTarget;
    if (form.checkValidity()) {
      // Convertendo a data para o formato 'YYYY-MM-DD'
      const dataPatrimonio = moment(patrimonio.dataPatrimonio).format('YYYY-MM-DD');
      gravarDados({ ...patrimonio, dataPatrimonio });
      setValidated(false);
    } else {
      setValidated(true);
    }
    evento.preventDefault();
    evento.stopPropagation();
  }

  useEffect(() => {
    fetch(urlBase + "/aluno14-pfsii/categoria", {
      method: "GET"
    })
      .then((resposta) => resposta.json())
      .then((dados) => {
        if (Array.isArray(dados)) {
          setCategorias(dados);
        }
      })
      .catch((erro) => {
        console.error("Erro ao obter funções:", erro);
      });
  }, []);

  return (
    <>
      <Form
        className="mt-5 shadow px-4 py-4 rounded-3"
        noValidate
        validated={validated}
        onSubmit={manipularSubmissao}
      >
        <Row>
          <Col className="col-6 d-none">
            <Form.Group className="mb-3">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="text"
                id="id"
                value={patrimonio.id}
                onChange={manipularMudanca}
                placeholder="Ex: 441733"
                required
              />
              <Form.Control.Feedback>Ok !</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Por favor verifique o id do Patrimonio !
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col className="col-6">
            <Form.Group className="mb-3">
              <Form.Label>Código do Patrimonio</Form.Label>
              <Form.Control
                type="text"
                id="Codigo"
                value={patrimonio.Codigo}
                onChange={manipularMudanca}
                placeholder="Ex: 441733"
                required
              />
              <Form.Control.Feedback>Ok !</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Por favor preencha o Codigo do Patrimonio !
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col className="col-6">
            <Form.Group className="mb-3">
              <Form.Label>Nome do Patrimonio</Form.Label>
              <Form.Control
                type="text"
                id="nomeDoPatrimonio"
                value={patrimonio.nomeDoPatrimonio}
                onChange={manipularMudanca}
                placeholder="Ex: Microfone, Cadeira"
                required
              />
              <Form.Control.Feedback>Ok !</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Por favor preencha o Nome do Patrimonio !
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col className="col-3">
            <Form.Group className="mb-3 ">
              <Form.Label>Data da aquisição</Form.Label>
              <Form.Control
                type="date"
                id="dataPatrimonio"
                // Formatar a data como 'YYYY-MM-DD' para exibição no campo
                value={moment(patrimonio.dataPatrimonio).format('YYYY-MM-DD')}
                onChange={manipularMudanca}
                required
              />
              <Form.Control.Feedback>Ok !</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Por favor preencha a Data !
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col className="col-3">
            <Form.Group className="mb-3">
              <Form.Label>Valor do Patrimonio</Form.Label>
              <Form.Control
                required
                type="text"
                id="ValorDoPatrimonio"
                value={patrimonio.ValorDoPatrimonio}
                onChange={manipularMudanca}
                placeholder="R$"
              />
              <Form.Control.Feedback>Ok !</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Por favor preencha com um valor !
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col className="col-3">
            <Form.Group >
              <Form.Label>Tipo Patrimonio:</Form.Label>
              <Form.Select
                id="patrimonio_id"
                className="form-control"
                onChange={manipularMudanca}
                required
              >
                <option value="">Selecione</option>
                {Categorias.map((categoria) => (
                  <option key={categoria.idCategoria} value={categoria.idCategoria}>
                    {categoria.nomecategoria}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Por favor, informe o tipo do patrimonio!
              </Form.Control.Feedback>
            </Form.Group>
            </Col>
            <Form.Group as={Col} md="2" >
            <Form.Label>Condicao:</Form.Label>
            <Form.Select
              type="text"
              placeholder="Condicao"
              value={patrimonio.Condicao}
              id="Condicao"
              onChange={manipularMudanca}
              required>
              <option value="">Selecione</option>
              <option value="Baixado">Baixado</option>
              <option value="Em uso">Em uso</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Por favor, informe o status!
            </Form.Control.Feedback>
          </Form.Group>
        
        </Row>
        
        <Row>
          <Col className="mt-5">
            <InputGroup>
              <InputGroup.Text>Descrição</InputGroup.Text>
              <Form.Control
                required
                value={patrimonio.Descricao}
                onChange={manipularMudanca}
                id="Descricao"
                as="textarea"
                placeholder="Insira aqui a descrição sobre o Patrimonio cadastrado"
                style={{ height: "100px" }}
              />
              <Form.Control.Feedback>Ok !</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Por favor Insira uma Descrição !
              </Form.Control.Feedback>
            </InputGroup>
          </Col>
        </Row>

        <div className="d-flex justify-content-end mb-1 mt-5">
          <div>
            <Button
              variant="btn btn-outline-danger"
              type="button"
              className="mt-5 "
              onClick={() => {
                props.exibirTabela(true);
              }}
            >
              Voltar
            </Button>{" "}
            <Button className="mt-5" type="submit" variant="btn btn-outline-success">
              {props.atualizando ? "Atualizar" : "Cadastrar"}
            </Button>{" "}
          </div>
        </div>
      </Form>
    </>
  );
}
