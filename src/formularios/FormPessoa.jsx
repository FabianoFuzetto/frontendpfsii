import { Button, Col, Form, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import InputMask from "react-input-mask";
import moment from "moment";

export default function FormPessoa(props) {
  const [validado, setValidado] = useState(false);
  const [pessoa, setPessoa] = useState({
    ...props.pessoa,
    dataNasc: moment(props.pessoa.dataNasc).format("YYYY-MM-DD"),
  });
  const [funcoes, setFuncoes] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);

  function manipularMudanca(e) {
    const elemForm = e.currentTarget;
    const { id, value } = elemForm;

    if (id === "dataNasc") {
      setPessoa({ ...pessoa, [id]: moment(value).format("YYYY-MM-DD") });
    } else if (id === "cargo_id") {
      // Handle multiple roles
      const selectedOptions = Array.from(elemForm.selectedOptions, (option) => option.value);
      setSelectedRoles(selectedOptions);
    } else {
      setPessoa({ ...pessoa, [id]: value });
    }
  }

  function manipulaSubmissao(evento) {
    const form = evento.currentTarget;
    if (form.checkValidity()) {
      // ... your existing code

      // Include the selected roles in the body
      const requestBody = { ...pessoa, roles: selectedRoles };

      // ... continue with your existing code
    } else {
      setValidado(true);
    }
    evento.preventDefault();
    evento.stopPropagation();
  }

  useEffect(() => {
    fetch("https://129.146.68.51/aluno14-pfsii/funcao", {
      method: "GET",
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
        {/* ... your existing form layout */}

        <Col className="col-2 mb-4">
          <div>
            <label htmlFor="inputFuncao" className="form-label">
              Função:
            </label>
            <Form.Select
              id="cargo_id"
              className="form-control"
              onChange={manipularMudanca}
              required
              multiple // Enable multiple selection
            >
              {funcoes.map((funcao) => (
                <option key={funcao.idCargo} value={funcao.idCargo}>
                  {funcao.funcaomembro}
                </option>
              ))}
            </Form.Select>
          </div>
        </Col>

        {/* ... your existing form layout */}

      </Form>
    </>
  );
}
