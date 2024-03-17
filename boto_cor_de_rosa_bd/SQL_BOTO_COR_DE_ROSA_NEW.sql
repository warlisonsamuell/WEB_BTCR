create database botocorderosa;

use botocorderosa;

create table if not exists pessoa (
id int primary key auto_increment,
nome varchar(80),
email varchar(80),
linkedin varchar(100),
tempo int,
ensinomedio ENUM('1', '0'),
ensinosuperior Enum('1', '0'),
posgraduacao ENUM('1', '0'),
mestrado ENUM('1', '0'),
doutorado ENUM('1', '0')
);
-- -- drop table pessoa;
-- desc pessoa;

-- -- Query para selecionar todos os curriculos cadastradas
-- select * from pessoa;

-- -- Query para selecionar usuarios especificos atraves do filtro
-- select * from pessoa 
-- where tempoexperiencia = {opcao1} 
-- and ensinomedio = {opcao2}
-- and ensinosuperior = {opcao2}
-- and posgraduacao = {opcao2}
-- and mestrado = {opcao2}
-- and doutourado = {opcao2};

-- -- Query para inserir na tabela pessoa
-- INSERT INTO pessoa (nome, email, linkedin, tempoexperiencia, ensinomedio, ensinosuperior, posgraduacao, mestrado, doutorado)
-- VALUES ('nome', 'email', 'linkedin', 123 , 1, 1, 1, 1, 1);

