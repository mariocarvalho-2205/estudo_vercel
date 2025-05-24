import {Router} from "express"
import userRoutes from "../routes/userRoutes.js"
const router = Router()

router.use("/user", userRoutes )

router.get("/test", (req, res) => {
    res.send("Chegou")
})

export default router