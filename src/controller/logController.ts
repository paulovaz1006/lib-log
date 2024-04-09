import { Request, Response } from "express";
import { Log } from "../service/log";

class LogController {
  async execute(req: Request, res: Response) {
    const {payload} = req.body;
    const log =  new Log()
    const saveLog = await log.warn(payload)

    res.status(200).send("ok")
  }
}

export {LogController};