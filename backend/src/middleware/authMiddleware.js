import jwt from "jsonwebtoken"
import { config } from "../../config.js"

export const validateAuthCookie = (allowedTypes = []) => {
    return (req, res, next) => {
        try {
            const { authCookie } = req.cookies;
            if (!authCookie) {
                return res.status(400).json({ message: "no se encontro la cookie you feel me?, y ps se necesita la autorizacion no? jeje xdxdxdxdxd" })
            }
            const decoded = jwt.verify(authCookie, config.JWT.secret)
            if (!allowedTypes.includes(decoded.userType)) {
                return res.status(401).json({ message: "acceso no authorized asi como la cookie you feel me?" })
            }
            next()
        } catch (error) {
            console.error("error al obtener los datos: ", error)
            return res.status(500).json({ message: "error interno nose jeje xdxdxdxd" })
        }
    }
}