import express, { Express } from "express";
import loaders from "./loaders";

function createServer(): Express {
  const app: Express = express();
  loaders.init(app);
  return app;
}

export default createServer;
