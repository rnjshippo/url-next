import formidable from 'formidable';
import { NextApiResponse, NextApiRequest } from 'next';
import multer from 'multer';
import * as model from '../../../models/index';

const upload = multer({ dest: '/public/imgs/coupang' })

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise(resolve => {
    switch (req.method) {
      case "POST":

        const form = formidable({
          multiples: true, //file 여러개
          uploadDir: "./public/imgs/coupang/",
          keepExtensions: true //확장자 표시
        });

        let img_src: string;

        form.on('fileBegin', (name, file) => {
          //rename the incoming file to the file's name
          img_src = `${Date.now()}_${file.name}`;

          file.path = `${form.uploadDir}${img_src}`;
        });

        form.parse(req, async (err, fields, files) => {
          if (err) {
            resolve();
            return res.json({ message: "error" })
          }

          const { name, code, url } = fields;
          await model.coupang.addCoupangItem(name, code, url, `/imgs/coupang/${img_src}`);

          resolve();
          res.json({ message: "success" });
        });

        break;

      default:
        resolve();
        res.status(405).json({ message: "Not supported method" });
        break;
    }
  })
};
