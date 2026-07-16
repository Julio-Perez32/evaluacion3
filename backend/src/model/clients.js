import mongoose from "mongoose";
import {Schema, model} from mongoose

const clientSchema = new Schema({
    name:{
        type: String
    },
    email:{
        type: String
    },
    password:{
        type: String
    },
    isVerified:{
        type: Boolean
    },
    loginAttemps:{
        type: Number
    },
    timeOut:{
        type: String
    }
},{
    timestamps: true,
    strict: false
})
export default model ("clients", clientSchema)