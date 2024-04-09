import { Router } from "express";
import { LogController } from "../controller/logController";

const logRoutes = Router();
const logController = new LogController();

logRoutes.get('/', logController.execute);

export default logRoutes;