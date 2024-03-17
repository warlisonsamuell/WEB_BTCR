import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

import FileSaver from 'file-saver';

const storage = multer.diskStorage({
  destination: function (request, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (request, file, cb) {
    const extensaoArquivo = file.originalname.split('.')[1];

    cb(null, `${uuidv4()}.pdf`);
  },
});

const upload = multer({ storage });

export function savePDFFile(pdf: any) {
  console.log('oi');

  // let blob = new Blob(['Hello, world!'], { type: 'text/plain;charset=utf-8' });
  // FileSaver.saveAs(blob, 'hello world.txt');
}
