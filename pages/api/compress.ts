import * as model from '../../models';
import shortId from 'shortid';
import { NextApiRequest, NextApiResponse } from 'next'

export default async function compress(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    let { fullUrl }: { fullUrl: string } = req.body;

    /*TODO : http or https가 없는 경우 => default로 http를 붙여도록 구현 */
    let spl: string[] = fullUrl.split("://");
    let prefix: boolean = false;
    if (spl[0] === "http" || spl[0] === "https") {
      prefix = true;
    }

    if (!prefix) { //http or https가 없으면 추가
      fullUrl = "http://" + fullUrl;
    }
    const [rows] = await model.url.getUrlFromFull(fullUrl);

    let shortUrl: string;
    if (rows[0]) {
      shortUrl = rows[0].shortUrl;
      console.log("already exist");
    } else {
      shortUrl = shortId.generate();
      await model.url.addUrl(fullUrl, shortUrl);
      console.log('add new');
    }
    res.json({ shortUrl });
  } else {
    res.statusCode = 405;
    res.end();
  }

}



