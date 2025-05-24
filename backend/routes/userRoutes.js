import {Router} from "express"
import { createUser} from "../controller/userController.js"

const router = Router()

router.post("/register", createUser)

export default router