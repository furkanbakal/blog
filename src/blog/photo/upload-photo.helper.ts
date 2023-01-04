import { diskStorage } from 'multer';
import * as path from 'path';

export const extensions = ['.jpg','.jpeg', '.png', '.gif', '.bmp', '.xlsx', '.docx', '.pdf', '.pptx'];
export const photoExtensions = ['.jpg','.jpeg', '.png', '.gif', '.bmp'];

export  const photoFilter = (req, file, callback) => {
    let ext = path.extname(file.originalname.toLowerCase());
       
    if (photoExtensions.indexOf(ext) === -1) {
      const error = `Geçersiz dosya tipi: ${ext}`;
      req.fileValidationError = error;

      return callback(null, false);
    }

    return callback(null, true);
};

 