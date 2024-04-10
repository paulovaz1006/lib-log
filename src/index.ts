import { AppDataSource } from "./data-source"
import LibLogInfo from "./service/log";
import server from "./server";

AppDataSource.initialize().then(async () => {
    const port = 3000;
    LibLogInfo.configRoot("./src")
    server.listen(port, () => {
        LibLogInfo.saveLog("Run server", "Info")
        console.log("Run server")
    })
}).catch(error => LibLogInfo.saveLog(error, "error"))
