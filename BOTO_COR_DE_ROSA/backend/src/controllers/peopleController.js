const Connection = require('../models/connection');
const extractText = require('../utils/getInformationsFromPDF');

class PeopleController {
  index(request, response) {
    const tempoExp = parseInt(request.query.tempoExp);
    const escolaridade = request.query.escolaridade;

    const peopleController = new PeopleController();

    const params = {};
    if (tempoExp) {
      params.tempoExp = tempoExp;
    }
    if (escolaridade) {
      params.escolaridade = escolaridade;
    }

    peopleController.getAll({ params }, response);
  }

  getAll(request, response) {
    let umAno = 12;
    let tresAnos = 36;
    let cincoAnos = 60;

    const tempoExp = parseInt(request.params.tempoExp);
    const escolaridade = request.params.escolaridade;

    //////////////////////////////////////// CASO A PESSOA TENHA APENAS O TEMPO DE EXPERIENCIA /////////////////////////////////
    if (tempoExp && !escolaridade) {
      if (tempoExp == umAno) {
        const query = `SELECT * FROM pessoa WHERE tempo <= ${umAno}`;
        Connection.query(query, (err, result) => {
          if (err) {
            return response.status(500).send('Erro ao obter pessoas');
          }
          return response.json(result);
        });
      } else if (tempoExp == tresAnos) {
        const query = `SELECT * FROM pessoa WHERE tempo > ${umAno} AND tempo <= ${tresAnos}`;

        Connection.query(query, (err, result) => {
          if (err) {
            return response.status(500).send('Erro ao obter pessoas');
          }
          return response.json(result);
        });
      } else if (tempoExp == cincoAnos) {
        const query = `SELECT * FROM pessoa WHERE tempo > ${tresAnos} AND tempo <= ${cincoAnos}`;

        Connection.query(query, (err, result) => {
          if (err) {
            return response.status(500).send('Erro ao obter pessoas');
          }
          return response.json(result);
        });
      } else if (tempoExp > cincoAnos) {
        const query = `SELECT * FROM pessoa WHERE tempo > ${cincoAnos}`;

        Connection.query(query, (err, result) => {
          if (err) {
            return response.status(500).send('Erro ao obter pessoas');
          }
          return response.json(result);
        });
      }
    }

    //////////////////////////////////////// CASO A PESSOA TENHA APENAS A ESCOLARIDADE/////////////////////////////////
    if (escolaridade && !tempoExp) {
      const query = `SELECT * FROM pessoa WHERE ${escolaridade} = '1'`;

      Connection.query(query, (err, result) => {
        if (err) {
          return response.status(500).send('Erro ao obter pessoas');
        }
        return response.json(result);
      });
      console.log('entrou');
    }

    //////////////////////////////////////// CASO A PESSOA  NÃO TENHA APENAS NADA (SEM PARAMETROS)/////////////////////////////////
    if (!tempoExp && !escolaridade) {
      const query = 'SELECT * FROM pessoa';

      Connection.query(query, (err, result) => {
        if (err) {
          return response.status(500).send('Erro ao obter pessoas');
        }
        return response.json(result);
      });
    }
    //////////////////////////////////////// CASO A PESSOA  TENHA ESCOLARIDADE E FORMAÇÃO/////////////////////////////////
    if (tempoExp && escolaridade) {
      if (tempoExp == umAno) {
        const query = `SELECT * FROM pessoa WHERE ${escolaridade} = '1' AND tempo <= ${umAno}`;

        Connection.query(query, (err, result) => {
          if (err) {
            return response.status(500).send('Erro ao obter pessoas');
          }
          return response.json(result);
        });
      } else if (tempoExp == tresAnos) {
        const query = `SELECT * FROM pessoa WHERE ${escolaridade} = '1' and tempo > ${umAno} AND tempo <= ${tresAnos}`;

        Connection.query(query, (err, result) => {
          if (err) {
            return response.status(500).send('Erro ao obter pessoas');
          }
          return response.json(result);
        });
      } else if (tempoExp == cincoAnos) {
        const query = `SELECT * FROM pessoa WHERE ${escolaridade} = '1' and tempo > ${tresAnos} AND tempo <= ${cincoAnos}`;

        Connection.query(query, (err, result) => {
          if (err) {
            return response.status(500).send('Erro ao obter pessoas');
          }
          return response.json(result);
        });
      } else if (tempoExp > cincoAnos) {
        const query = `SELECT * FROM pessoa WHERE ${escolaridade} = '1' AND tempo > ${cincoAnos}`;

        Connection.query(query, (err, result) => {
          if (err) {
            return response.status(500).send('Erro ao obter pessoas');
          }
          return response.json(result);
        });
      }
    }
  }

  create(request, response) {
    const { nome, fullText } = request.body;
    const { email_verificado, tempo_experiencia, escolaridade, link_linkedIn} = extractText(fullText);
    const query = `INSERT INTO pessoa (nome, email, linkedin, tempo, ensinomedio, ensinosuperior, posgraduacao, mestrado, doutorado) 
    VALUES ('${nome}', '${email_verificado}', '${link_linkedIn}', '${tempo_experiencia}', '${escolaridade.ensinoMedio}', '${escolaridade.ensinoSuperior}',
    '${escolaridade.posGraduacao}', '${escolaridade.mestrado}', '${escolaridade.doutorado}')`;

    Connection.query(query, (err, result) => {
      if (err) {
        response.status(500).send('Erro ao obter alunos');
      }
      response.status(203);
    });
    return response.json('ok');
  }
}


module.exports = PeopleController;
