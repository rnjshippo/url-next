import { NextApiRequest, NextApiResponse } from 'next'

export default async function compress(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.json({ "client": true });
  }
  else {
    res.statusCode = 405;
    res.end();
  }
}



