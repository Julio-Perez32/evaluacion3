import mongoose from "mongoose";
import {Schema, model} from mongoose

const ticketsPurchaseSchema = new Schema({
    customerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "clients"
    },
    quantity:{
        type: Number
    },
    PurchaseDate:{
        type: Date
    },
    total:{
        type: Number
    },
    paymentStatus:{
        type: String
    },
    transactionId:{
        type: String
    }
},{
    timestamps: true,
    strict: false
})
export default model ("ticketsPurchase", ticketsPurchaseSchema)