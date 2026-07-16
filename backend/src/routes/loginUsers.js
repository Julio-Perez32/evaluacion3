import express from "express"
import UsersLogin from "../controller/loginUser.js"
const router = express.Router();
router.route("/")

.post(UsersLogin.login)

export default router