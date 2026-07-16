import express from "express"
import AdminLogin from "../controller/loginAdmin.js"
const router = express.Router();
router.route("/")

.post(AdminLogin.login)

export default router