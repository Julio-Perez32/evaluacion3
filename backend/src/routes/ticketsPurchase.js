import express from "express"
import ticketsPurchase from "../controller/ticketsPurchaseController.js"
import { validateAuthCookie } from "../middleware/authMiddleware.js";
const router = express.Router();
router.route("/")
.get(validateAuthCookie(["Administrator"]), ticketsPurchase.getAll)
.post(validateAuthCookie(["User"]), ticketsPurchase.create)

router.route("/:id")
.put(validateAuthCookie(["User", "Administrator"]), ticketsPurchase.update)
.delete(validateAuthCookie(["Administrator"]), ticketsPurchase.delete)
export default router