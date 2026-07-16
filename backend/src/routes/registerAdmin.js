import express from "express"
import registerAdmin from "../controller/registerAdminController.js"
const router = express.Router();
router.route("/")

.post(registerAdmin.register)

router.route("/verifyCodeEmail").post(registerAdmin.verifyCode)

export default router