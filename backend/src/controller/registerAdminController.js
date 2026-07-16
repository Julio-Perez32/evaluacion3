import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import adminModel from "../model/administrators";
import { config } from "../../config.js";
const registerAdminController = {}

registerAdminController.register = async (req, res) => {
    const { name, email, password, isVerified, loginAttemps, timeOut } = req.body
    try {
        const existAdmin = await adminModel.findOne({ email });
        if (existAdmin) {
            return res.status(400).json({ message: "admin este admin existe bro xdxdxdxdxdxd" })
        }
        const passwordHash = await bcrypt.hash(password, 10);
        const verificationCode = crypto.randomBytes(3).toString("hex")
        const tokenCode = jsonwebtoken.sign(
            {
                name,
                email,
                password: passwordHash,
                isVerified,
                loginAttemps,
                timeOut,
                verificationCode
            },
            config.JWT.secret,
            { expiresIn: "15m" },
        );
        res.cookie("verificationToken", tokenCode, { maxAge: 15 * 60 * 1000 });
        const transporter = nodemailer.createTransport({
            servide: "gmail",
            auth: {
                user: config.email.user_email,
                pass: config.email.user_password
            }
        });
        const mailOptions = {
            from: config.email.user_email,
            to: email,
            subject: "verificacion de cuenta",
            text: "para verificar tu cuenta usa este codigo broustoun: " + verificationCode + " expira creo que en unos 15mins asi que apurate"
        }
        transporter.sendMail(mailOptions, (error, info) =>{
            if(error){
                console.log("error" + error);
                return res.status(500).json({message: "error"})
            }
            res.status(200).json({message: "registrado ahora puedes ver tu correo porfa para ver aca el codigo de verificacion bro plis"})
        })
    } catch (error) {
        console.error("error al obtener los datos: ", error)
        return res.status(500).json({ message: "error interno nose jeje xdxdxdxd" })
    }
}

registerAdminController.verifyCode = async(req, res) =>{
    try{
        const {verificationCodeRequest} = req.body;
        const token = req.cookies.verificationToken;
        console.log(token);
        const decoded =jsonwebtoken.verify (token, config.JWT.secret)
        const {
                name,
                email,
                password: passwordHash,
                isVerified,
                loginAttemps,
                timeOut,
                verificationCode: storedCode
        } = decoded;
        if (verificationCodeRequest !== storedCode){
            return res.status(400).json ({message: "nose algun error tiene que dar xdxdd pq tiene q ser igual y no lo es, you feel me?"})
        }
        const newAdmin = new adminModel({
                name,
                email,
                password: passwordHash,
                isVerified: true,
                loginAttemps,
                timeOut,
        })
        await newAdmin.save();
        const admin = await adminModel.findOne({email})
        admin.isVerified = true;
        await admin.save();
        res.clearCookie("verificationToken");
        res.json({message: "cuentita verificadita brou"})
    } catch (error) {
        console.error("error al obtener los datos: ", error)
        return res.status(500).json({ message: "error interno nose jeje xdxdxdxd" })
    }
}
export default registerAdminController