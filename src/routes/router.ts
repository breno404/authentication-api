import AuthController from '@/controllers/AuthController'
import AuthenticationMiddleware from '@/middlewares/AuthenticationMiddleware'
import userRouter from '@/routes/UserRoute'
import { Router } from 'express'


const router = Router()

router.get('/', async (req, res) => {
    res.json({ message: 'Hello World!' })
})

router.post('/login', AuthController.login)

router.get('/logout', AuthenticationMiddleware, AuthController.logout)

router.post('/refresh-token', AuthController.refreshToken)

//==========================================================
router.use('/users', AuthenticationMiddleware, userRouter)

router.use('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' })
})

export default router