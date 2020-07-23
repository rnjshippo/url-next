import db from '../../lib/db_connection';

const pool = db();

export const getFullCoupangUrl = (code: string) => {
  let sql = "SELECT * FROM Coupang WHERE code=?;";
  return pool.execute(sql, [code]);
}

export const getCoupangItems = () => {
  let sql = "SELECT * FROM Coupang order by no desc;";
  return pool.execute(sql);
}

export const addHits = (code: String) => {
  let sql = "UPDATE Coupang SET hit=hit+1 WHERE code=?;";
  return pool.execute(sql, [code]);
}

export const addViewCount = (code: String) => {
  let sql = "UPDATE Coupang SET view=view+1 WHERE code=?;";
  return pool.execute(sql, [code]);
}


export const addCoupangItem = (name: string, code: string, url: string, img: string) => {
  let sql = "INSERT INTO Coupang (name, code, url, img) VALUES (?, ?, ?, ?);";
  return pool.execute(sql, [name, code, url, img]);
}

export const deleteCoupangItem = (code: string) => {
  let sql = "DELETE FROM Coupang WHERE code=?;";
  return pool.execute(sql, [code]);
}

export const login = (id: string) => {
  let sql = "SELECT * FROM User WHERE id=?;";
  return pool.execute(sql, [id]);
}