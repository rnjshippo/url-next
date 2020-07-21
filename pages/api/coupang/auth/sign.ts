import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt';
import db from '../../../../lib/db_connection';

export default async function Sign(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      const { id, pw } = req.body;
      const pool = db();

      bcrypt.hash(pw, 10, async function (err, hash) {
        // Store hash in your password DB.
        if (err) {
          return res.status(401).json({ message: "Error occurred" });
        }

        let sql = "INSERT INTO User (id, pw) VALUES (?, ?);";
        await pool.execute(sql, [id, hash]);

        return res.status(200).json({ message: "success" });
      });

      break;
    default:
      res.status(405).json({ message: "Not supported method" });
      break;
  }
}