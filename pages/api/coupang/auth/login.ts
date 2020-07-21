import { NextApiRequest, NextApiResponse } from "next";
import * as model from '../../../../models/index';
import bcrypt from 'bcrypt';
import { sign } from "jsonwebtoken";
import config from "../../../../config/config";
import { serialize } from "cookie";

/**
 * POST /api/coupang/auth/login
 */

export default async function Login(req: NextApiRequest, res: NextApiResponse) {
  return new Promise(async resolve => {
    switch (req.method) {
      case "POST":
        const { id, pw } = req.body;
        const [rows] = await model.coupang.login(id);
        const user = rows[0]

        bcrypt.compare(pw, user?.pw ?? 0, function (err, result) {
          resolve();
          if (err) {
            return res.status(401).json({ message: "Error occurred" });
          }
          else {
            if (result) {

              const claims = { userId: user.id, userName: user.name };
              const jwt = sign(claims, config.secret, { expiresIn: 21600 });
              res.setHeader("Set-Cookie", serialize('authToken', jwt, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                sameSite: 'strict',
                maxAge: 21600,
                path: '/'
              }));
              resolve()
              return res.status(200).json({ message: "success" });
            }
            else return res.status(401).json({ message: "fail" });
          }
        });

        break;
      default:
        resolve();
        return res.status(405).json({ message: "Not supported method" });
        break;
    }
  })
}