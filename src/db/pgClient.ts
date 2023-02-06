import { config } from "@config/config";
import { Pool } from "pg";

const createPool = () => new Pool(config.db);

const pg = { createPool };

export { pg };
