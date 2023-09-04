import express from "express";
import { userRoutes } from "./routes/users.routes";
import { loginRoutes } from "./routes/login.routes";
import { customerRoutes } from "./routes/customer.routes";
import { errorHandler } from "./errors/errorHandler";


const app = express();

const cors = require('cors');
const corsOptions ={
    origin:"*",
    credentials:true,            
    optionSuccessStatus:200
}

app.use(cors(corsOptions));

app.use(express.json());
app.use("/login", loginRoutes);
app.use("/user", userRoutes);
app.use("/customer", customerRoutes);

app.use(errorHandler);
export default app;