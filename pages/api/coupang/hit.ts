import { NextApiRequest, NextApiResponse } from "next";
import * as model from '../../../models/index';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      const { code } = req.body;
      if (code) {
        await model.coupang.addHits(code);
        res.status(200).json({ message: "success" });
      } else {
        res.json({ message: "name is not defined" });
      }
      break;

    default:
      res.status(405).json({ message: "Not supported method" });
      break;
  }

}