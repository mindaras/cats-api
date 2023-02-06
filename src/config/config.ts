import dotenv from "dotenv";

dotenv.config();

const env = process.env as { [key: string]: string };

const config = {
  app: {
    PORT: env.PORT,
  },
  db: {
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    host: env.DB_HOST,
    port: parseInt(env.DB_PORT),
    database: env.DB,
    max: 5,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  },
};

export { config };
