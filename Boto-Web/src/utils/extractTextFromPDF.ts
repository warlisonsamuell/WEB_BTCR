type GetTextFromPDFReturn = {
  link: string;
  fullText: string;
};

export function GetTextFromPDF(pdf: any): GetTextFromPDFReturn {
  console.log(pdf);

  // savePDFFile(pdf);

  // pdfjsLib.getDocument()

  // let pages = pdf.numPages;
  // let textocompleto;


  // console.log(pdf.item);
  // console.log(pages);

  // for (let i = 1; i <= pages; i++) {
  //   let page = await pdf.getPage(i); // Obtém o objeto de página para cada página
  //   let txt = await page.getTextContent(); // Obtém o conteúdo de texto da página
  //   let text = txt.items.map((s: any) => s.str).join(''); // Concatena os itens de texto em uma única string

  //   textocompleto = textocompleto + text;
  // }

  return { link: 'caminho', fullText: '' };
}
