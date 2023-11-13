import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createHandler } from "graphql-http/lib/use/express";
import ExpressPlaygroundMiddleware from "graphql-playground-middleware-express";
import mongoose from "mongoose";
import { schema } from "./src/graphql/schema";
import { formatError } from "./src/exceptions/formatError";

dotenv.config();

const app: Express = express();
const port = 5000;

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING || "");
    app.use(cors());
    app.get(
      "/playground",
      ExpressPlaygroundMiddleware({ endpoint: "/graphql" })
    );
    app.all(
      "/graphql",
      createHandler({
        schema,
        formatError,
        context: (req) => {
          return req.headers;
        },
      })
    );
    app.listen(port, () => console.log(`Listening to port ${port}`));
  } catch (e) {
    console.log(e);
  }
};

start();
