
import ticketsPurchaseModel from "../model/ticketsPurchase.js";


const ticketsPurchaseController = {}

ticketsPurchaseController.getAll = async (req, res) => {
    try {
        const ticketsPurchase = await ticketsPurchaseModel.find()
        return res.status(200).json(ticketsPurchase)
    } catch (error) {
        console.error("error al obtener los datos: ", error)
        return res.status(500).json({ message: "error interno nose jeje xdxdxdxd" })
    }
}
ticketsPurchaseController.create = async (req, res) => {
    try {
        const { customerId, quantity, PurchaseDate, total, paymentStatus, transactionId } = req.body
        const newData = new ticketsPurchaseModel({
            customerId, 
            quantity, 
            PurchaseDate, 
            total, 
            paymentStatus, 
            transactionId
        })
        await newData.save()
        return res.status(201).json({message:"data agregada ya xdxdxd"})
    } catch (error) {
        console.error("error al obtener los datos: ", error)
        return res.status(500).json({ message: "error interno nose jeje xdxdxdxd" })
    }
}
ticketsPurchaseController.delete = async(req, res) =>{
    try{
        await ticketsPurchaseModel.findOneAndDelete(req.params.id)
        return res.status(200).json({message: "bro no me la vas a creer se elimino asi bien de una bro W"})
    }catch (error) {
        console.error("error al obtener los datos: ", error)
        return res.status(500).json({ message: "error interno nose jeje xdxdxdxd" })
    }
}
ticketsPurchaseController.update = async(req, res) =>{
    try{
        const {customerId, quantity, PurchaseDate, total, paymentStatus, transactionId} = req.body
        await ticketsPurchaseModel.findOneAndUpdate(
            req.params.id,
            customerId, 
            quantity, 
            PurchaseDate, 
            total, 
            paymentStatus, 
            transactionId,
            {new: true}
        )
        return res.status(200).json({message: "ya actualizado ojala y si hey pq no aguanto el sueño y nose pq no entiendo te lo juro"})
    }catch (error) {
        console.error("error al obtener los datos: ", error)
        return res.status(500).json({ message: "error interno nose jeje xdxdxdxd" })
    }
}

export default ticketsPurchaseController