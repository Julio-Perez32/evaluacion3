import mongoose, { connection } from "mongoose";
import { config } from "./config.js";

mongoose.connect(config.db.URI)
const conection = Mongoose.conection;
connection.once("open", () =>{
    console.log("db is connected")
})
conection.on("disconected", () =>{
    console.log("DB is desconected")
})
connection.on("error", (err) =>{
    console.log("error", err)
})



