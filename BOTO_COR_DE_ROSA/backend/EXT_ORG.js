let alltext = [];
let textocompleto;
let pessoa_info = [];

pdfjsLib.GlobalWorkerOptions.workerSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

let pdfinput = document.querySelector('.selectpdf');
let upload = document.querySelector('.upload');
let afterupload = document.querySelector('.afterupload');
let select = document.querySelector('select');
let download = document.querySelector('.upload'); 
let pdftext = document.querySelector('.pdftext'); 

upload.addEventListener('click', () => {
  let file = pdfinput.files[0]; 
  if (file != undefined && file.type == 'application/pdf') {
    let fr = new FileReader();
    fr.readAsDataURL(file); 

    fr.onload = () => {
      let res = fr.result;
      extractText(res, textocompleto);
    };
  } else {
    alert('Selecione um arquivo PDF válido');
  }
});

async function extractText(url, textocompleto) {
  try {
    let pdf;

    pdf = await pdfjsLib.getDocument(url).promise;

    let pages = pdf.numPages;

    for (let i = 1; i <= pages; i++) {
      let page = await pdf.getPage(i); 
      let txt = await page.getTextContent(); 
      let text = txt.items.map((s) => s.str).join(''); 
      alltext.push(text);

      textocompleto = textocompleto + text;
    }

    alltext.map((e, i) => {
      select.innerHTML += `<option value="${i + 1}">${i + 1}</option>`; 
    });

    function extrairInformacaoEntreMarcadores(
      marcadorInicial,
      marcadorFinal,
      reseva1,
    ) {
      var inicioIndex = textocompleto.indexOf(marcadorInicial);
      var fimIndex = textocompleto.indexOf(marcadorFinal);
      let istrue = true;

      if (inicioIndex !== -1 && fimIndex !== -1) {
        var fimIndex = textocompleto.indexOf(
          marcadorFinal,
          inicioIndex + marcadorInicial.length,
        );
        var informacaoEntreMarcadores = textocompleto
          .substring(inicioIndex + marcadorInicial.length, fimIndex)
          .trim();
        return informacaoEntreMarcadores;
      } else if (inicioIndex !== -1 && fimIndex == -1) {
        extrairInformacaoEntreMarcadores(marcadorInicial, reseva1);
      } else if (inicioIndex == -1) {
        istrue = false;
        console.log(
          `Não foi possível encontrar '${marcadorInicial}' no textocompleto.`,
        );
        return istrue;
      } else {
        return null;
      }
    }

    let CONTATO = extrairInformacaoEntreMarcadores(
      'Contato',
      'Principais competências',
      'Languages',
    );
    console.log(CONTATO);
    let COMPETENCIAS = extrairInformacaoEntreMarcadores(
      'Principais competências',
      'Languages',
      'Certifications',
    );
    console.log(COMPETENCIAS);
    let LANGUAGE = extrairInformacaoEntreMarcadores(
      'Languages',
      'Certifications',
      'Resumo',
    );
    console.log(LANGUAGE);
    let CERTIFICATIONS = extrairInformacaoEntreMarcadores(
      'Certifications',
      'Resumo',
      'Experiência',
    );
    console.log(CERTIFICATIONS);
    let RESUMO = extrairInformacaoEntreMarcadores(
      'Resumo',
      'Experiência',
      'Formação acadêmica',
    );
    console.log(RESUMO);
    let EXPERIENCIAS = extrairInformacaoEntreMarcadores(
      'Experiência',
      'Formação acadêmica',
    );
    console.log(EXPERIENCIAS);
    let FORMACAO = textocompleto.substring(
      textocompleto.indexOf('Formação acadêmica') + 'Formação acadêmica'.length,
    );
    console.log('formação:', FORMACAO);

    let timexp = textocompleto.substring(
      textocompleto.indexOf('Experiência') + 'Experiência'.length,
      textocompleto.indexOf('Formação acadêmica'),
    );

    let english = extrairInformacaoEntreMarcadores('Inglês (', ')');
    console.log('nivel de ingles: ' + english);

    let spanish = extrairInformacaoEntreMarcadores('Espanhol (', ')');
    console.log('nivel de espanhol: ' + spanish);

    function extrairAnosMeses(texto_experiencia) {
      if (
        texto_experiencia ==
        'Não foi possível encontrar Experiência no textocompleto.'
      ) {
        timexp = 0;
      } else {
        let tempo_experiencia = 0;
        var regex =
          /(\d*)\s*ano[s]?|(\d*)\s*m[eê]s[es]?|(\d+)\s*ano[s]?\s*(\d+)\s*m[eê]s[es]?/gi;

        var matches;
        var resultados = [];

        while ((matches = regex.exec(texto_experiencia)) !== null) {
          var anos = parseInt(matches[1]) || 0;
          var meses = parseInt(matches[2]) || 0;
          var totalMeses = anos * 12 + meses;

          resultados.push({ anos, meses, totalMeses });
          tempo_experiencia = tempo_experiencia + totalMeses;
        }
        timexp = tempo_experiencia;
        return tempo_experiencia;
      }
    }

    if (textocompleto.indexOf('Experiência') !== -1) {
      console.log(
        'tempo de experiencia:' + extrairAnosMeses(timexp) + ' meses',
      );
    } else {
      console.log('Sem experiencia');
    }

    function acharTermo(termo) {
      if (COMPETENCIAS && COMPETENCIAS.indexOf(termo) !== -1) {
        return COMPETENCIAS.substring(
          COMPETENCIAS.indexOf(termo),
          COMPETENCIAS.indexOf(termo) + termo.length,
        );
      } else if (LANGUAGE && LANGUAGE.indexOf(termo) !== -1) {
        return LANGUAGE.substring(
          LANGUAGE.indexOf(termo),
          LANGUAGE.indexOf(termo) + termo.length,
        );
      } else if (CERTIFICATIONS && CERTIFICATIONS.indexOf(termo) !== -1) {
        return CERTIFICATIONS.substring(
          CERTIFICATIONS.indexOf(termo),
          CERTIFICATIONS.indexOf(termo) + termo.length,
        );
      } else if (RESUMO && RESUMO.indexOf(termo) !== -1) {
        return RESUMO.substring(
          RESUMO.indexOf(termo),
          RESUMO.indexOf(termo) + termo.length,
        );
      } else if (EXPERIENCIAS && EXPERIENCIAS.indexOf(termo) !== -1) {
        return EXPERIENCIAS.substring(
          EXPERIENCIAS.indexOf(termo),
          EXPERIENCIAS.indexOf(termo) + termo.length,
        );
      } else {
        return false;
      }
    }

    let sqlcomp = acharTermo('SQL');
    console.log(sqlcomp);
    let desThink = acharTermo('Design Think');
    console.log(desThink);
    let javSc = acharTermo('JavaScript');
    console.log(javSc);

    let manaus = acharTermo('Manaus');
    console.log(manaus);

    function escolaridade(FORMACAO) {
      var ensinoMedio = FORMACAO.indexOf('Ensino médio');
      var mestrado = FORMACAO.indexOf('Mestrado');
      var bacharelado = FORMACAO.indexOf('Bacharelado');
      var tecnologo = FORMACAO.indexOf('Técnologo');
      var licenciatura = FORMACAO.indexOf('Licenciatura');
      var posGraduacao = FORMACAO.indexOf('Pós-graduação');
      var doutorado = FORMACAO.indexOf('Doutorado');

      //DOUTORADO
      if (doutorado !== -1) {
        doutorado = 1;
        ensinoMedio = 1;
        console.log('doutorado', doutorado);
      } else {
        doutorado = 0;
        console.log('doutorado', doutorado);
      }

      //MESTRADO
      if (mestrado !== -1) {
        mestrado = 1;
        ensinoMedio = 1;
        console.log('mestrado', mestrado);
      } else {
        mestrado = 0;
        console.log('mestrado', mestrado);
      }

      //BACHARELADO
      if (bacharelado !== -1) {
        bacharelado = 1;
        ensinoMedio = 1;
        console.log('bacharelado', bacharelado);
      } else {
        bacharelado = 0;
        console.log('bacharelado', bacharelado);
      }

      //TECNOLOGO
      if (tecnologo !== -1) {
        tecnologo = 1;
        ensinoMedio = 1;
        console.log('tecnologo', tecnologo);
      } else {
        tecnologo = 0;
        console.log('tecnologo', tecnologo);
      }

      //LICENCIATURA
      if (licenciatura !== -1) {
        licenciatura = 1;
        ensinoMedio = 1;
        console.log('licenciatura', licenciatura);
      } else {
        licenciatura = 0;
        console.log('licenciatura', licenciatura);
      }

      //PÓS GRADUAÇÃO
      if (posGraduacao !== -1) {
        posGraduacao = 1;
        ensinoMedio = 1;
        console.log('posGraduacao', posGraduacao);
      } else {
        posGraduacao = 0;
        console.log('posGraduacao', posGraduacao);
      }

      //ENSINO MÉDIO
      if (ensinoMedio !== 1) {
        ensinoMedio = 0;
      } else {
        ensinoMedio = 1;
      }
    }
    escolaridade(FORMACAO);

    let email = CONTATO.substring(
      CONTATO[0],
      CONTATO.indexOf('.com') + '.com'.length,
    ).trim();
    console.log(email);

    pessoa_info.push(email);
    pessoa_info.push(email);

    formacao_info = [];
    formacao_info.push(1);
    formacao_info.push(ensinoMedio);
    formacao_info.push(posGraduacao);
    formacao_info.push(mestrado);
    formacao_info.push(doutorado);
    console.log(formacao_info);

    afterProcess();
  } catch (err) {
    console.log(err);
    alert(err.message);
  }
}

function afterProcess() {
  pdftext = textocompleto; 
  download.href =
    'data:text/plain;charset=utf-8,' + encodeURIComponent(textocompleto);
  afterupload.style.display = 'flex';
  document.querySelector('.another').style.display = 'unset';
}
