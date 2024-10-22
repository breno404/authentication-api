import AuthenticationMiddleware from '@/middlewares/AuthenticationMiddleware'
import UserModel from '@/models/UserModel'
import { Router } from 'express'

const router = Router()

router.get('/', AuthenticationMiddleware, (req, res) => {

    res.json([UserModel])
})

export default router