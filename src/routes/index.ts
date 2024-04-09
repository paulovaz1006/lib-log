import { Router } from "express";
import logRoutes from "./log.routes";
const routes = Router();

routes.use('/logs', logRoutes);

export default routes;