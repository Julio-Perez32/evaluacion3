import fetch from "node-fetch"
import {config} from "../../config.js"
const wompiController = {}

wompiController.generateToken = async(req,res) =>{
    try{
        const response = await fetch("https://id-wompi.sv/token",{
            method: "POST",
            headers:{
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URL.SearchParams({
                grant_type:config.wompi.grant_type,
                audience: config.wompi.audience,
                client_id: config.wompi.client_id,
                client_secret: config.wompi.client_secret
            })
        });
        if(!response.ok){
            const error = await response.text;
            return res.status(500).json({error})
        }
        const data = await response.json();
        return res.status(200).json(data);
    }catch (error) {
        console.error("error al obtener los datos: ", error)
        return res.status(500).json({ message: "error interno nose jeje xdxdxdxd" })
    }
}
wompiController.paymentTest = async(req, res) =>{
    try{
        const {token, formData} = req.body;
        const response = await fetch("https://wompi.sv/TransaccionCompra/TokenizadaSin3Ds")
    }catch (error) {
        console.error("error al obtener los datos: ", error)
        return res.status(500).json({ message: "error interno nose jeje xdxdxdxd" })
    }
}