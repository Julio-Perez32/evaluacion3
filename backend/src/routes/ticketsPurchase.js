import express from "express"
import ticketsPurchase from "../controller/ticketsPurchaseController.js"
const router = express.Router();
router.route("/")
.get(ticketsPurchase.getAll)
.post(ticketsPurchase.create)

router.route("/:id")
.put(ticketsPurchase.update)
.delete(ticketsPurchase.delete)
export default router