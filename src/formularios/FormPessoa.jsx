import { Button, Col, Form, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import InputMask from "react-input-mask";
import moment from "moment";

export default function FormPessoa(props) {
  const [validado, setValidado] = useState(false);
  const [pessoa, setPessoa] = useState({
    ...props.pessoa,
    dataNasc: moment(props.pessoa.dataNasc).format("YYYY-MM-DD"),
    funcoes: [] // Array to store multiple roles
  });
  const [funcoes, setFuncoes] = useState([]);

  function manipularMudanca(e) {
    const elemForm = e.currentTarget;
    const { id, value } = elemForm;

    if (id === "dataNasc") {
      setPessoa({ ...pessoa, [id]: moment(value).format("YYYY-MM-DD") });
    } else {
      setPessoa({ ...pessoa, [id]: value });
    }
  }

  function adicionarFuncao() {
    const selectedRoleId = document.getElementById("cargo_id").value;
    const selectedRole = funcoes.find((funcao) => funcao.idCargo === parseInt(selectedRoleId, 10));

    if (selectedRole && !pessoa.funcoes.some((role) => role.idCargo === selectedRole.idCargo)) {
      setPessoa({
        ...pessoa,
        funcoes: [...pessoa.funcoes, selectedRole]
      });
    }
  }

  function removerFuncao(idCargo) {
    const updatedRoles = pessoa.funcoes.filter((role) => role.idCargo !== idCargo);
    setPessoa({
      ...pessoa,
      funcoes: updatedRoles
    });
  }

  function manipulaSubmissao(evento) {
    const form = evento.currentTarget;
    if (form.checkValidity()) {
      const url = `https://129.146.68.51/aluno14-pfsii/pessoa${props.atualizando ? `/${pessoa.id}` : ''}`;
      const method = props.atualizando ? "PUT" : "POST";

      fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(pessoa)
      })
        .then((resposta) => resposta.json())
        .then((dados) => {
          if (dados.status) {
            props.setModoEdicao(false);
            let novaLista = props.listaPessoa;
            novaLista.push(pessoa);
            props.setPessoa(novaLista);
            props.exibirTabela(true);
            window.location.reload();
          }
          window.alert(dados.mensagem);
        })
        .catch((erro) => {
          window.alert("Erro ao executar a requisição:" + erro.message);
        });

      setValidado(false);
    } else {
      setValidado(true);
    }
    evento.preventDefault();
    evento.stopPropagation();
  }

  useEffect(() => {
    fetch("https://129.146.68.51/aluno14-pfsii/funcao", {
      method: "GET"
    })
      .then((resposta) => resposta.json())
      .then((dados) => {
        if (Array.isArray(dados)) {
          setFuncoes(dados);
        }
      })
      .catch((erro) => {
        console.error("Erro ao obter funções:", erro);
      });
  }, []);

  return (
    <>
      <Form
        className="shadow-lg p-3 mt-4 bg-white rounded"
        noValidate
        validated={validado}
        onSubmit={manipulaSubmissao}
      >
        <Row className="justify-content-center ">
          {/* ... existing code ... */}
          <Col className="col-2 mb-4">
            <div>
              <label htmlFor="inputFuncao" className="form-label">
                Função:
              </label>
              <Form.Select id="cargo_id" className="form-control" required>
                <option value="">Selecione</option>
                {funcoes.map((funcao) => (
                  <option key={funcao.idCargo} value={funcao.idCargo}>
                    {funcao.funcaomembro}
                  </option>
                ))}
              </Form.Select>
              <Button
                variant="btn btn-outline-primary mt-2"
                type="button"
                onClick={adicionarFuncao}
              >
                Adicionar Função
              </Button>
              <div className="mt-2">
                {pessoa.funcoes.map((role) => (
                  <div key={role.idCargo}>
                    {role.funcaomembro}{" "}
                    <Button
                      variant="btn btn-outline-danger btn-sm"
                      type="button"
                      onClick={() => removerFuncao(role.idCargo)}
                    >
                      Remover
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </Col>
          {/* ... existing code ... */}
          <div className="d-flex justify-content-end mb-2 mt-5">
            <div>
              <Button
                variant="btn btn-outline-danger"
                type="button"
                onClick={() => {
                  props.exibirTabela(true);
                }}
              >
                Voltar
              </Button>{" "}
              <Button type="submit" variant="btn btn-outline-success">
                {props.atualizando ? "Atualizar" : "Cadastrar"}
              </Button>
            </div>
          </div>
        </Row>
      </Form>
    </>
  );
}
