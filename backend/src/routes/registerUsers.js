import express from "express"
import registerUser from "../controller/registerUserController.js"
const router = express.Router();
router.route("/")

.post(registerUser.register)

router.route("/verifyCodeEmail").post(registerUser.verifyCode)

export default router