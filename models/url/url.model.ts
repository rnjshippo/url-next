import db from '../../lib/db_connection';

const pool = db();

export const getUrlFromFull = (fullUrl: string) => {
  let sql = "SELECT * FROM urls WHERE fullUrl=?";
  return pool.execute(sql, [fullUrl]);
}

export const getUrlFromShort = (shortUrl: string) => {
  let sql = "SELECT * FROM urls WHERE shortUrl=?";
  return pool.execute(sql, [shortUrl]);
}

export const addHit = (shortUrl: string) => {
  let sql = "UPDATE urls SET hits=hits+1 WHERE shortUrl=?";
  return pool.execute(sql, [shortUrl]);
}

export const addUrl = (fullUrl: string, shortUrl: string) => {
  let sql = "INSERT INTO urls (fullUrl, shortUrl) VALUES (?, ?)";
  return pool.execute(sql, [fullUrl, shortUrl]);
}