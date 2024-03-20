const Connection = require('../models/connection');
const extractText = require('../utils/getInformationsFromPDF');

class PeopleController {
  index(request, response) {
    const tempoExp = parseInt(request.query.tempoExp);
    const escolaridade = request.query.escolaridade;
    const idioma = request.query.idioma
    const cidade = request.query.cidade

    const peopleController = new PeopleController();

    const params = {};
    if (tempoExp) {
      params.tempoExp = tempoExp;
    }
    if (escolaridade) {
      params.escolaridade = escolaridade;
    }
    if (idioma) {
      params.idioma = idioma;
    }
    if (cidade) {
      params.cidade = cidade;
    }

    peopleController.getAll({ params }, response);
  }

  
  getAll(request, response) {
    const tempoExp = parseInt(request.params.tempoExp);
    const escolaridade = request.params.escolaridade;
    const idioma = request.params.idioma;
    const cidade = request.params.cidade;

    let query = "SELECT * FROM pessoa WHERE 1=1";

    if (tempoExp) {
        if (tempoExp === 12) {
            query += " AND tempo <= 12";
        } else if (tempoExp === 36) {
            query += " AND tempo > 12 AND tempo <= 36";
        } else if (tempoExp === 60) {
            query += " AND tempo > 36 AND tempo <= 60";
        } else if (tempoExp === 61) {
            query += " AND tempo > 60";
        }
    }

    if (escolaridade) {
        query += ` AND ${escolaridade} = '1'`;
    }

    if (idioma) {
        query += ` AND (${idioma} = 'English' OR ${idioma} = 'Espanhol')`;
    }

    if (cidade) {
        query += ` AND cidade = '${cidade}'`;
    }

    Connection.query(query, (err, result) => {
        if (err) {
            return response.status(500).send('Erro ao obter pessoas');
        }
        return response.json(result);
    });
}

  create(request, response) {
    const { nome, fullText } = request.body;
    const { email_verificado, tempo_experiencia, escolaridade, link_linkedIn, english_verificado, nivel_english, spanish_verificado, nivel_spanish, cidade} =
      extractText(fullText);
    const query = `INSERT INTO pessoa (nome, email, linkedin, tempo, ensinomedio, ensinosuperior, posgraduacao, mestrado, doutorado, english, nivelenglish, spanish, nivelspanish, cidade) 
    VALUES ('${nome}', '${email_verificado}', '${link_linkedIn}', '${tempo_experiencia}', '${escolaridade.ensinoMedio}', '${escolaridade.ensinoSuperior}',
    '${escolaridade.posGraduacao}', '${escolaridade.mestrado}', '${escolaridade.doutorado}', '${english_verificado}','${nivel_english}', '${spanish_verificado}','${nivel_spanish}','${cidade}')`;

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
