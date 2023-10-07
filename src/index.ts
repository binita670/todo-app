import config from "config";
import { Express } from "express";
import server from "./server";
import "./database/database";

export function bootstrap() {
  const app: Express = server();
  return app.listen(config.get("server.port"), () => {
    /* eslint-disable */
    console.log(`Express running at port: ${config.get("server.port")}`);
  });
}

if (process.env.NODE_ENV !== "test") {
  bootstrap();
}
