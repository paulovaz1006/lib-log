import { Request, Response } from "express";
import LibLogInfo from "../service/log";

class LogController {
  async execute(req: Request, res: Response) {
    const {payload} = req.body;
    await LibLogInfo.saveLog("texto teste", "Warn")

    res.status(200).send("ok")
  }
}

export {LogController};