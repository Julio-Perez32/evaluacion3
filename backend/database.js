import mongoose from "mongoose";
import { config } from "./config.js";

mongoose.connect(config.db.URI)
const conection = mongoose.connection;
conection.once("open", () =>{
    console.log("db is connected")
})
conection.on("disconected", () =>{
    console.log("DB is desconected")
})
conection.on("error", (err) =>{
    console.log("error", err)
})



