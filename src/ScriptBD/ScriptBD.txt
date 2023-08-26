CREATE TABLE funcao (
  idCargo INT AUTO_INCREMENT PRIMARY KEY,
  funcaomembro VARCHAR(45) DEFAULT NULL
);

CREATE TABLE pessoa (
  cpf VARCHAR(20) PRIMARY KEY,
  nome VARCHAR(60),
  dataNasc DATE,
  genero VARCHAR(60),
  endereco VARCHAR(60),
  bairro VARCHAR(60),
  cidade VARCHAR(60),
  uf VARCHAR(60),
  cep VARCHAR(60),
  email VARCHAR(60),
  celular VARCHAR(60),
  cargo_id INT,
  FOREIGN KEY (cargo_id) REFERENCES funcao(idCargo)
);

CREATE TABLE categoria (
  idCategoria int(11) AUTO_INCREMENT PRIMARY KEY,
  nomecategoria varchar(50) DEFAULT NULL
)


CREATE TABLE `financeiro` (
  `id_financeiro` int(11) AUTO_INCREMENT PRIMARY KEY,
  `entrada` varchar(45) DEFAULT NULL,
  `valor` decimal(10,2) DEFAULT NULL,
  `datadep` date DEFAULT NULL,
  `tipodep` varchar(20) DEFAULT NULL
) 


CREATE TABLE patrimonio (
  id int(11) AUTO_INCREMENT PRIMARY KEY,
  nomeDoPatrimonio varchar(60) DEFAULT NULL,
  dataPatrimonio date DEFAULT NULL,
  ValorDoPatrimonio decimal(10, 2) DEFAULT NULL,
  Descricao varchar(150) DEFAULT NULL,
  Codigo varchar(11) DEFAULT NULL,
  Condicao varchar(50) DEFAULT NULL,
  patrimonio_id INT,
  FOREIGN KEY (patrimonio_id) REFERENCES categoria (idCategoria)
);


CREATE TABLE evento (

    idEvento INT AUTO_INCREMENT PRIMARY KEY,
    nomeEvento VARCHAR(50),
    Responsavel VARCHAR(50),
    PublicoAlvo VARCHAR(50),
    DataEvento DATE,
    HoraEvento TIME,
    Localizacao VARCHAR(50),
    StatusType VARCHAR(15),
    Descricao VARCHAR(200) 
);



"ANTIGA TELA CONEXÃO DO BACKEND"(ANTES DE COLOCAR O BANCO ONLINE)

import mysql from 'mysql2/promise';

export default async function conectar() {

    if (global.conexao && global.conexao.status != "disconnected") {
        return global.conexao;
    }

    const conexao = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "backend"
    });

    global.conexao = conexao;

    return conexao;
}