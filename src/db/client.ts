import { QueryResultRow } from "pg";
import { pg } from "./pgClient";

const pool = pg.createPool();

const query = async <T>(
  sql: string,
  values?: Array<string | number>
): Promise<T[]> => {
  return new Promise((resolve, reject) => {
    pool.query<T & QueryResultRow, any>(sql, values, (error, result) => {
      if (error) reject(error);
      else resolve(result?.rows);
    });
  });
};

const querySingle = async <T = any>(
  sql: string,
  values?: Array<string | number>
): Promise<T> => {
  return new Promise((resolve, reject) => {
    pool.query<T & QueryResultRow, any>(sql, values, (error, result) => {
      if (error) reject(error);
      resolve(result?.rows?.[0]);
    });
  });
};

const mutate = async <T = any>(
  sql: string,
  values?: Array<string | number>
): Promise<T> => {
  return new Promise((resolve, reject) => {
    pool.query<T & QueryResultRow, any>(sql, values, (error, result) => {
      if (error) reject(error);
      resolve(result?.rows?.[0]);
    });
  });
};

const db = { query, querySingle, mutate };

export { db };
