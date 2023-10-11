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
        className="shadow-lg p-3 mt-4 bg-white rounded"
        noValidate
        validated={validado}
        onSubmit={manipulaSubmissao}
      
        <Row className="justify-content-center " >
          <Col className="col-3">
            <Form.Group >
              <Form.Label>CPF:</Form.Label>
              <Form.Control
                type="text"
                placeholder="000.000.000-00"
                value={pessoa.cpf}
                id="cpf"
                onChange={manipularMudanca}
                required
              />
              <Form.Control.Feedback type="invalid">
                Por favor, informe o cpf!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col className="col-3">
            <Form.Group >
              <Form.Label>Nome:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nome completo..."
                value={pessoa.nome}
                id="nome"
                onChange={manipularMudanca}
                required
              />
              <Form.Control.Feedback type="invalid">
                Por favor, informe o nome completo!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col className="col-3">
            <Form.Group >
              <Form.Label>Data de nascimento:</Form.Label>
              <Form.Control
                type="date"
                value={moment(pessoa.dataNasc).format("YYYY-MM-DD")}
                id="dataNasc"
                onChange={manipularMudanca}
                required
              />
              <Form.Control.Feedback type="invalid">
                Por favor, informe a data de nascimento!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col className="col-2">
            <Form.Group >
              <Form.Label>Gênero:</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={pessoa.genero}
                id="genero"
                onChange={manipularMudanca}
              >
                <option value="">Selecione</option>
                <option value="F">Feminino</option>
                <option value="M">Masculino</option>
                <option value="Outro">Outro</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col className="col-3 my-3">
            <Form.Group >
              <Form.Label>Endereço:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Endereço com número..."
                value={pessoa.endereco}
                id="endereco"
                onChange={manipularMudanca}
                required
              />
              <Form.Control.Feedback type="invalid">
                Por favor, informe o endereço!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col className="col-3 my-3">
            <Form.Group>
              <Form.Label>Cidade:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Informe a cidade..."
                value={pessoa.cidade}
                id="cidade"
                onChange={manipularMudanca}
                required
              />
              <Form.Control.Feedback type="invalid">
                Por favor, informe a cidade!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col className="col-3 my-3">
            <Form.Group>
              <Form.Label>Bairro:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Informe o bairro..."
                value={pessoa.bairro}
                id="bairro"
                onChange={manipularMudanca}
                required
              />
              <Form.Control.Feedback type="invalid">
                Por favor, informe o bairro!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col className="col-2 my-3" >
            <Form.Group >
              <Form.Label>Estado:</Form.Label>
              <Form.Select
                type="text"
                value={pessoa.uf}
                id="uf"
                onChange={manipularMudanca}
                required
              >
                <option value="">Selecione</option>
                <option value="AC">Acre</option>
                <option value="AL">Alagoas</option>
                <option value="AP">Amapá</option>
                <option value="AM">Amazonas</option>
                <option value="BA">Bahia</option>
                <option value="CE">Ceará</option>
                <option value="DF">Distrito Federal</option>
                <option value="ES">Espírito Santo</option>
                <option value="GO">Goiás</option>
                <option value="MA">Maranhão</option>
                <option value="MT">Mato Grosso</option>
                <option value="MS">Mato Grosso do Sul</option>
                <option value="MG">Minas Gerais</option>
                <option value="PA">Pará</option>
                <option value="PB">Paraíba</option>
                <option value="PR">Paraná</option>
                <option value="PE">Pernambuco</option>
                <option value="PI">Piauí</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="RN">Rio Grande do Norte</option>
                <option value="RS">Rio Grande do Sul</option>
                <option value="RO">Rondônia</option>
                <option value="RR">Roraima</option>
                <option value="SC">Santa Catarina</option>
                <option value="SP">São Paulo</option>
                <option value="SE">Sergipe</option>
                <option value="TO">Tocantins</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Por favor, informe o estado!
              </Form.Control.Feedback>
            </Form.Group>
          </Col >
          <Col className="col-2">
            <Form.Group >
              <Form.Label>CEP:</Form.Label>
              <Form.Control
                type="text"
                placeholder="00000-000"
                value={pessoa.cep}
                id="cep"
                onChange={manipularMudanca}
                required
              />
              <Form.Control.Feedback type="invalid">
                Por favor, informe o cep!.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col className="col-2">
            <Form.Group >
              <Form.Label>Celular:</Form.Label>
              <InputMask
                mask="(99) 99999-9999"
                value={pessoa.celular}
                onChange={manipularMudanca}
                id="celular"
                required
              >
                {(inputProps) => (
                  <Form.Control
                    {...inputProps}
                    type="text"
                    placeholder="Celular com DDD..."
                  />
                )}
              </InputMask>
              <Form.Control.Feedback type="invalid">
                Por favor, informe o número do celular!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col className="col-3">
            <Form.Group>
              <Form.Label>E-mail:</Form.Label>
              <Form.Control
                type="text"
                placeholder=" Exemplo@gmail.com"
                value={pessoa.email}
                id="email"
                onChange={manipularMudanca}
                required
              />
              <Form.Control.Feedback type="invalid">
                Por favor, informe o e-mail!.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col className="col-2 mb-4">
            <div >
              <label htmlFor="inputFuncao" className="form-label">
                Função:
              </label>
              <Form.Select
                id="cargo_id"
                className="form-control"
                onChange={manipularMudanca}
                required
              >
                <option value="">Selecione</option>
                {funcoes.map((funcao) => (
                  <option key={funcao.idCargo} value={funcao.idCargo} >
                    {funcao.funcaomembro}
                  </option>
                ))}
              </Form.Select>
            </div>
          </Col>
          <Col className="col-2">
            <Form.Group>
              <Form.Control.Feedback type="invalid">
                Por favor, informe o e-mail!.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

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


