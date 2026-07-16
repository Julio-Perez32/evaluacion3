import express from "express";
import loginAdminRoutes from "./src/routes/loginAdmin.js"
import loginUserRoutes from "./src/routes/loginUsers.js"
import registerUserRoutes from "./src/routes/registerUsers.js"
import registerAdminRoutes from "./src/routes/registerAdmin.js"
import ticketsPurchaseRoutes from "./src/routes/ticketsPurchase.js";

import cors from "cors"
import cookieParser from "cookie-parser";
const app = express();

app.use(cors({
    origin:['http://localhost:5173', 'http://localhost:5174'],
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use("/api/loginAdmin", loginAdminRoutes)




export default app