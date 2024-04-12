const { tex } = require("express");

//FUNÇÃO QUE EXTRAI O TEMPO DE EXPERIÊNCIA DOS CADASTRADOS, SERÁ CHAMADO LÁ EM BAIXO!!
function extrairAnosMeses(texto_experiencia) {
  if (texto_experiencia == 'Não foi possível encontrar Experiência no textocompleto.'){
    return 0;
  }

  let tempo_experiencia = 0;
  let regex =
    /(\d*)\s*ano[s]?|(\d*)\s*m[eê]s[es]?|(\d+)\s*ano[s]?\s*(\d+)\s*m[eê]s[es]?/gi;

  let matches;
  let resultados = [];

  while ((matches = regex.exec(texto_experiencia)) !== null) {
    let anos = parseInt(matches[1]) || 0;
    let meses = parseInt(matches[2]) || 0;
    let totalMeses = anos * 12 + meses;

    resultados.push({ anos, meses, totalMeses });
    tempo_experiencia = tempo_experiencia + totalMeses;
  }

  return tempo_experiencia;
}


//FUNÇÃO QUE EXTRAI A INFORMAÇÃO DE CADA TÓPICO DO CURRICULO LINKEDIN
function extrairInformacaoEntreMarcadores(textocompleto, marcadorInicial, marcadorFinal, reserva1) {
  //  let english_nivel = extrairInformacaoEntreMarcadores(languages, 'Inglês (', ')');

  
  let inicioIndex = textocompleto.indexOf(marcadorInicial);
  let fimIndex = textocompleto.indexOf(marcadorFinal);
  let fimIndex2 = textocompleto.indexOf(reserva1);

  // Certifique-se de que o marcador inicial e o marcador final existam
  if (inicioIndex !== -1 && fimIndex !== -1) {
    let informacaoEntreMarcadores = textocompleto.substring(inicioIndex + marcadorInicial.length, fimIndex).trim();
    return informacaoEntreMarcadores

  } // Certifique-se de que o marcador inicial  e o marcador final 2 existam
  else if (inicioIndex !== -1 && fimIndex2 !== -1) {
    let informacaoEntreMarcadores = textocompleto.substring(inicioIndex + marcadorInicial.length, fimIndex2).trim();
    return informacaoEntreMarcadores
      
  }// Certifique-se de que o marcador inicial exista
  else if (inicioIndex == -1) {
    let informacaoEntreMarcadores = null;
    return informacaoEntreMarcadores;
  } // Caso não entre em nenhuma acima, salvará como null
  else {
    let informacaoEntreMarcadores = null;
    return informacaoEntreMarcadores;
  }
}


//FUNÇÃO QUE VERIFICA A EXISTÊNCIA AS ESCOLARIDADES
function escolaridadeFilter(FORMACAO) {
  let escolaridade = {
    ensinoMedio: 0,
    mestrado: 0,
    ensinoSuperior: 0,
    posGraduacao: 0,
    doutorado: 0,
    graduacao: 0,
  };

  let ensinoMedio = FORMACAO.indexOf('Ensino médio');
  let mestrado = FORMACAO.indexOf('Mestrado');
  let bacharelado = FORMACAO.indexOf('Bacharelado');
  let tecnologo = FORMACAO.indexOf('Técnologo');
  let licenciatura = FORMACAO.indexOf('Licenciatura');
  let posGraduacao = FORMACAO.indexOf('Pós-graduação');
  let doutorado = FORMACAO.indexOf('Doutorado');
  let graduacao = FORMACAO.indexOf('Graduação');

  if (doutorado !== -1) {
    escolaridade.doutorado = 1;
    escolaridade.mestrado = 1;
    escolaridade.ensinoSuperior = 1;
    escolaridade.ensinoMedio = 1;
  } else if (mestrado !== -1) {
    escolaridade.mestrado = 1;
    escolaridade.ensinoSuperior = 1
    escolaridade.ensinoMedio = 1;
  } else if (bacharelado !== -1) {
    escolaridade.ensinoSuperior = 1;
    escolaridade.ensinoMedio = 1;
  }else if (graduacao !== -1) {
    escolaridade.ensinoSuperior = 1;
    escolaridade.ensinoMedio = 1;
  }else if (tecnologo !== -1) {
    escolaridade.ensinoSuperior = 1;
    escolaridade.ensinoMedio = 1;
  }else if (licenciatura !== -1) {
    escolaridade.doutorado = 0;
    escolaridade.mestrado = 0;
    escolaridade.ensinoSuperior = 1;
    escolaridade.ensinoMedio = 1;
  } else if (ensinoMedio !== 1) {
    escolaridade.ensinoMedio = 1;
  }

  if (posGraduacao !== -1) {
    escolaridade.posGraduacao = 1;
    escolaridade.ensinoSuperior = 1;
    escolaridade.ensinoMedio = 1;
  }

  return escolaridade;
}


//FUNÇÃO QUE EXTRAI A INFORMAÇÃO DE CADA TÓPICO CHAMANDO A FUNÇÃO extrairInformacaoEntreMarcadores() LÁ DE CIMA
function extractText(textocompleto) {
  // Dados extraidos
  let contato = extrairInformacaoEntreMarcadores(
    textocompleto,
    'Contato',
    'Principais competências',
    'Languages'
  );

  let competencias = extrairInformacaoEntreMarcadores(
    textocompleto,
    'Principais competências',
    'Languages',
    'Certifications',
  );

  // mexi aqui
  let languages = extrairInformacaoEntreMarcadores(
    textocompleto,
    'Languages',
    'Certifications',
    'Resumo'
  ) || '';

  let certifications = extrairInformacaoEntreMarcadores(
    textocompleto,
    'Certifications',
    'Resumo',
    'Experiência',
  );

  let resumo = extrairInformacaoEntreMarcadores(
    textocompleto,
    'Resumo',
    'Experiência',
    'Formação acadêmica',
  );

  let experiencias = extrairInformacaoEntreMarcadores(
    textocompleto,
    'Experiência',
    'Formação acadêmica',
  );

  
  //EXTRAINDO O TÓPICO FORMAÇÃO
  let formacao = textocompleto.substring(
    textocompleto.indexOf('Formação acadêmica') + 'Formação acadêmica'.length,
  );

  
  // SEPARANDO A INFORMAÇÃO QUE CONTEM O LINKEDIN E APÓS ISSO EU CHAMO A FUNÇÃO DE ACHAR AO TEXTO ENCONTRADO
  let linkedIn = contato.substring(contato[0], contato.indexOf('(LinkedIn)')+'(LinkedIn)'.length);

  let link_linkedIn = acharlinkedin(linkedIn);
  link_linkedIn = link_linkedIn.replace(/\s+/g, '');
  

  function acharlinkedin(linkedIn) {
    let indiceLinkedIn = linkedIn.indexOf('(LinkedIn)');
    let indiceWWW = linkedIn.lastIndexOf('www');

    if (indiceLinkedIn !== -1 && indiceWWW !== -1) {
      let linkedin = linkedIn.substring(indiceWWW, indiceLinkedIn).trim();
      return linkedin;
    } else {
      return null;
    }
  }
  //////////////////////////////////////////////////////////////////////////




  // AQUI ESTA ACONTECENDO A SEPARAÇÃO DE LINGUAGENS: INGLÊS E ESPANHOL
  if (languages){
    english = languages.substring(languages.indexOf('English  ('))
    spanish = languages.substring(languages.indexOf('Espanhol  ('))

    if (!english){
      english = languages.substring(languages.indexOf('Inglês'))
    }
  }else{
    spanish = null
    english =   null
  }
 
  // console.log(english)

  if (english) {
    if ((english.includes('English')) || (english.includes('Inglês'))) {
      if(english.includes('English')){
        english_verificado = "English";
        nivel_english = english.substring(english.indexOf('English  (') + 'English  ('.length, english.indexOf(')'));
        // console.log(nivel_english);

      }else if (english.includes('Inglês')){
        ingles = languages.substring(languages.indexOf('Inglês  ('))
        english_verificado = "English";
        nivel_english = ingles.substring(ingles.indexOf('Inglês  (') + 'Inglês  ('.length, ingles.indexOf(')'));
        // console.log(nivel_english);
      }
      
      if (!nivel_english){
        nivel_english = english.substring(english.indexOf('Inglês  (') + 'Inglês  ('.length, english.indexOf(')'));
        // console.log(nivel_english);
      }

    }else {
      english_verificado = null;
      nivel_english = null;
    }

  }
  
  if (spanish) {
    if (spanish.includes("Espanhol")) {
      spanish_verificado = "Espanhol";
      nivel_spanish = spanish.substring(spanish.indexOf('Espanhol  (') + 'Espanhol  ('.length, spanish.indexOf(')'));
      // console.log(nivel_spanish);
    } else {
      spanish_verificado = null;
      nivel_spanish = null;
    }
  }
  
  
  if ((!english) && (!spanish)){
    english_verificado = null
    nivel_english = null;
    spanish_verificado = null;
    nivel_spanish = null;
  }
  
  //////////////////////////////////////////////////////////////////////////



  // AQUI ESTA ACONTECENDO A SEPARAÇÃO DA EXPERIÊNCIA E APÓS EXTRAIO O TEMPO CHAMANDO A FUNÇÃO LÁ DO INICIO extrairanosemeses()
  let tempo_experiencia = textocompleto.substring(textocompleto.indexOf('Experiência') + 'Experiência'.length, textocompleto.indexOf('Formação acadêmica'));

  tempo_experiencia = extrairAnosMeses(tempo_experiencia);

  function formadonao(text){
    text = formacao.substring(formacao.indexOf('('), formacao.indexOf(')'));
    let regex = /\b\d{4}\b/g;
    let anos = text.match(regex);
    let ultimoAno = anos[anos.length - 1];
    // console.log(ultimoAno);
  }
  // console.log(formacao)
  formadonao(formacao);


  // chamando a função para filtrar escolaridade
  const escolaridade = escolaridadeFilter(formacao);
  // console.log(escolaridade);


  // chamando a função para filtrar email pessoal e para verificar se ele existe, pois quando não tiver o email vai ter o linkedin
  let email = contato.substring(contato[0], contato.indexOf('.com') + '.com'.length).trim();

  email_verificado = verificaremail(email);
  function verificaremail (email){
    if (email == 'www.linkedin.com'){
      return(null)
    }else{
      return email
    }
  };



  //função para ver se a pessoa é de Manaus ou não
  function acharCidade(termo){
    textocompleto.indexOf(termo)
    if (textocompleto.indexOf(termo) !== -1){
      return 'Manaus'
    }else{
      return null
    }
  }

  cidade = acharCidade('Manaus, Amazonas, Brasil') || '';



  //função para concatenar as informações para salvar no banco de dados em caso de filtragem
  function concatenarInform(X, Y){
    let concatenado = (X + Y).toUpperCase();
    concatenadosemacento = concatenado.replace(/\s/g, '');
    textofinal = removerAcentos(concatenadosemacento);
    function removerAcentos(texto) {
      return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
    return textofinal
  }

  textoinfo = concatenarInform(competencias, resumo,certifications ,formacao)

  let formacoes = formacao.replace(/Page \d+ of \d+/g, '');
  let formacoesArray = formacoes.toUpperCase().split(/(?<=\))\b/);
  
  // console.log(formacoesArray)


  return { email_verificado, tempo_experiencia, escolaridade, link_linkedIn, english_verificado, nivel_english, spanish_verificado, nivel_spanish, cidade, textoinfo};
}

module.exports = extractText;
