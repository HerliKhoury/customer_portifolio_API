import express from "express";
import { userRoutes } from "./routes/users.routes";
import { loginRoutes } from "./routes/login.routes";
import { customerRoutes } from "./routes/customer.routes";
import { errorHandler } from "./errors/errorHandler";


const app = express();

app.use(express.json());
app.use("/login", loginRoutes);
app.use("/users", userRoutes);
app.use("/customers", customerRoutes);

app.use(errorHandler);
export default app;