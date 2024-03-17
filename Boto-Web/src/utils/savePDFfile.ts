import FileSaver from 'file-saver';

export function savePDFFile(nome: string, pdf: any) {
  let blob = new Blob([pdf], { type: 'application/pdf' });
  FileSaver.saveAs(blob, nome);
}

// savePDFFile(this.nome.value, this.file)
