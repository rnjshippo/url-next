import db from '../../lib/db_connection';

const pool = db();

export const getFullCoupangUrl = (name: string) => {
  let sql = "SELECT * FROM Coupang WHERE name=?;";
  return pool.execute(sql, [name]);
}

export const getCoupangItems = () => {
  let sql = "SELECT * FROM Coupang;";
  return pool.execute(sql);
}

export const addHits = (name: String) => {
  let sql = "UPDATE Coupang SET hit=hit+1 WHERE name=?;";
  return pool.execute(sql, [name]);
}