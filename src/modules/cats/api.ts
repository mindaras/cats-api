import { toErrorResponse, toOrderClause } from "@common/mappers";
import { Order, PaginationParams } from "@common/models";
import { db } from "@db/client";
import { Router, RequestHandler } from "express";
import { Cat } from "./models";

const DEFAULT_LIMIT = 10;
const DEFAULT_OFFSET = 0;

const getAll: RequestHandler = async (req, res) => {
  const {
    limit = DEFAULT_LIMIT,
    offset = DEFAULT_OFFSET,
    order,
  } = req.query as unknown as PaginationParams;

  try {
    const data = await db.query<Cat[]>(
      `SELECT cats.id, cats.name, breeds.name AS breed, weight 
       FROM cats 
       INNER JOIN breeds ON breeds.id = cats.breedid
       ${toOrderClause({ orderBy: "name", order })}
       LIMIT $1
       OFFSET $2`,
      [limit, offset]
    );
    res.json({ data });
  } catch (e) {
    res.status(500).json(toErrorResponse(e));
  }
};

const search: RequestHandler = async (req, res) => {
  const { name } = req.params;
  const {
    limit = DEFAULT_LIMIT,
    offset = DEFAULT_OFFSET,
    order = Order.ASC,
  } = req.query as unknown as PaginationParams;

  if (!name) return res.status(400).json({ message: "No name was provided" });

  try {
    const data = await db.query<Cat>(
      `SELECT cats.id, cats.name, breeds.name AS breed, weight 
       FROM cats 
       INNER JOIN breeds ON breeds.id = cats.breedid
       WHERE cats.name ILIKE $1
       ${toOrderClause({ orderBy: "name", order })}
       LIMIT $2
       OFFSET $3;`,
      [`%${name}%`, limit, offset]
    );
    res.json({ data });
  } catch (e) {
    res.status(500).json(toErrorResponse(e));
  }
};

const get: RequestHandler = async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ message: "No id was provided" });

  try {
    const data = await db.querySingle<Cat>(
      `SELECT cats.id, cats.name, breeds.name AS breed, weight 
       FROM cats 
       INNER JOIN breeds ON breeds.id = cats.breedid
       WHERE cats.id = $1`,
      [id]
    );
    res.json({ data });
  } catch (e) {
    res.status(500).json(toErrorResponse(e));
  }
};

const remove: RequestHandler = async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ message: "No id was provided" });

  try {
    await db.querySingle<Cat>(`DELETE FROM cats WHERE id = $1;`, [id]);
    res.sendStatus(204);
  } catch (e) {
    res.status(500).json(toErrorResponse(e));
  }
};

const catsApi = Router()
  .get("/", getAll)
  .get("/search/:name", search)
  .get("/:id", get)
  .delete("/:id", remove);

export { catsApi };
