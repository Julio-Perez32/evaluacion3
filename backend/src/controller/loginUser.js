import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import userModel from "../model/clients.js";
import { config } from "../../config.js";

const loginUsersController = {};

loginUsersController.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userfound = await userModel.findOne({ email });
        if (!userfound) {
            return res.status(400).json({ message: "no se encontro el user ese bro jeje xd" })
        }
        if (userfound.timeOut && userfound.timeOut > Date.now()) {
            return res.status(403).json({ message: "cuenta bloqueada temporalmente" })
        }
        const isMatch = await bcrypt.compare(password, userfound.password);
        if (!isMatch) {
            userfound.loginAttemps = (userfound.loginAttemps || 0) + 1;

            if (userfound.loginAttemps >= 3) {
                userfound.timeOut = Date.now() + 15 * 60 * 1000;
                userfound.loginAttemps = 0
                await userfound.save()
                return res.status(400).json({ message: "cuenta bloqueada por 15 mins por nuv" })
            }
            await userfound.save()
            return res.status(401).json({ message: "contraseña incorrecta brou" });
        }
        userfound.loginAttemps = 0;
        userfound.timeOut = null;
        await userfound.save();
        const token = jsonwebtoken.sign(
            {
                id: userfound._id,
                usertype: "User",
            },
            config.JWT.secret,
            {
                expiresIn: "7d"
            }
        );
        res.cookie("AuthCookie", token);
        res.status(200).json({ message: "login succesful", token });
    } catch (error) {
        console.error("error al obtener los datos: ", error)
        return res.status(500).json({ message: "error interno nose jeje xdxdxdxd" })
    }
}
export default loginUsersController