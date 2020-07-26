import { authenticated } from '../../../../middlewares/auth.middleware';
import { NextApiRequest, NextApiResponse } from 'next';
import * as model from '../../../../models/index';
import fs from 'fs';

/**
 * GET /api/coupang/items : 조회
 * POST /api/coupang/items : 삭제 용도
 */
export default authenticated(function Items(req: NextApiRequest, res: NextApiResponse) {
  return new Promise(async resolve => {
    switch (req.method) {
      case "GET": {
        const [rows] = await model.coupang.getCoupangItems();
        res.status(200).json({ message: "success", items: rows });
        resolve();
        break;
      }

      case "POST": {
        const { code } = req.body;
        const [rows] = await model.coupang.getCoupangItem(code);
        const item = rows[0];
        fs.unlink(`./public${item?.img}`, err => {
          if (err) {
            console.log("Error", err);
          } else {
            console.log("File remove success");
          }
        });

        await model.coupang.deleteCoupangItem(code);

        res.json({ message: "success" });
        resolve();
        break;
      }

      default:
        res.status(405).json({ message: "Not supported method" });
        resolve();
        break;
    }
  })
})