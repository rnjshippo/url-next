import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import config from '../config/config';

export const authenticated = (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise(resolve => {

    jwt.verify(req.cookies.authToken!, config.secret, async (err, decoded) => {
      if (!err && decoded) {
        const { userId } = decoded;
        req.cookies.userId = userId; /* decode 해서 얻은 id 값을 쿠키로 다음 라우터에 전달 */
        return await fn(req, res);
      }
      resolve();
      res.status(401).json({ result: "false", message: "You are not authenticated" })
    });

  })

}