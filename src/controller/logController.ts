import { Request, Response } from "express";
import LibLogInfo from "../service/log";
import { AppDataSource } from "../data-source";
import LogEntity from "../entity/LogEntity";

class LogController {
  async teste(req: Request, res: Response) {
    const {payload} = req.body;
    await LibLogInfo.saveLog("texto teste", "Warn")

    res.status(200).send("ok")
  }

  async execute(req: Request, res: Response) {
    const repositoryEntity = AppDataSource.getRepository(LogEntity)
    const list: any = await repositoryEntity.find()
    const listRes: any = {
      totals: {
        errors: 0,
        success: 0,
        warnings: 0,
        info: 0,
        not_informed: 0
      },
      errors: [],
      success: [],
      warnings: [],
      info: [],
      not_informed: []
    }

    for(let i = 0; i < list.length; i++) {
      const current = list[i];
      switch(current.type.toLowerCase()) {
        case "error":
          listRes["errors"].push(current)
          listRes.totals["errors"]++;
          break;
        case "success":
          listRes["success"].push(current)
          listRes.totals["success"]++;
          break;
        case "warn":
          listRes["warnings"].push(current)
          listRes.totals["warnings"]++;
          break;
        case "info":
          listRes["info"].push(current)
          listRes.totals["info"]++;
          break;
        default:
          listRes["not_informed"].push(current)
          listRes.totals["not_informed"]++;
      }

    }


    res.status(200).send(listRes)
  }
}

export {LogController};