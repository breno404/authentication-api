import AuthController from '@/controllers/AuthController'
import AuthenticationMiddleware from '@/middlewares/AuthenticationMiddleware'
import AuthorizationMiddleware from '@/middlewares/AuthorizationMiddleware'
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

router.get('/to-users', AuthenticationMiddleware, AuthorizationMiddleware(['user']), (req, res) => {
    res.json({ message: 'Hi, User!' })
})

router.get('/to-managers', AuthenticationMiddleware, AuthorizationMiddleware(['manager']), (req, res) => {
    res.json({ message: 'Hi, Manager!' })
})

export default router