import "reflect-metadata"
import { DataSource } from "typeorm"
import { LogEntity } from "./entity/LogEntity"

export const AppDataSource = new DataSource({
    type :"sqlite",
    database: "./src/database/log.sqlite",
    entities: [LogEntity],
    synchronize: true
})
