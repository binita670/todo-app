import { Express } from "express";
import { expressLoader } from "./express.loader";

const init = async (app: Express) => {
  expressLoader.init(app);
};

export default { init };
