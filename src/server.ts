import { MyDataSource } from "./data-source";
import app from "./app";

const SERVER_PORT = 3001;

MyDataSource.initialize()
    .then(() => {
        console.log("Server is running");
        app.listen(SERVER_PORT, () => {
            console.log(`Server executing on port ${SERVER_PORT}`);
        });
    }).catch((err) => {
        console.error("Data Source initialization failiure", err);
    });