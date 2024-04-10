import { AppDataSource } from "./data-source"
import server from "./server";

AppDataSource.initialize().then(async () => {
    const port = 3000;
    server.listen(port, () => {
        console.log("Run server")
    })
}).catch(error => console.log(error))
