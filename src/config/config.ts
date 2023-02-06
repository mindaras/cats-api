import dotenv from "dotenv";

dotenv.config();

const env = process.env as { [key: string]: string };

const config = {
  app: {
    PORT: env.PORT,
  },
};

export { config };
