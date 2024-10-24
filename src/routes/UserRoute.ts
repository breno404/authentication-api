import AuthorizationMiddleware from '@/middlewares/AuthorizationMiddleware'
import UserModel from '@/models/UserModel'
import { Router } from 'express'

const router = Router()

router.route('/')
    .get((req, res) => { res.json([UserModel]) })
    .post((req, res) => { res.json([UserModel]) })

router.route('/:id')
    .get(AuthorizationMiddleware(['user']), (req, res) => { res.json({ message: 'Hi, User!' }) })
    .put(AuthorizationMiddleware(['manager', 'technical']), (req, res) => { res.json({ message: 'Hi, User!' }) })
    .patch(AuthorizationMiddleware(['manager', 'technical']), (req, res) => { res.json({ message: 'Hi, User!' }) })
    .delete(AuthorizationMiddleware(['manager']), (req, res) => { res.json({ message: 'Hi, User!' }) })

router.get('/:id/permissions', AuthorizationMiddleware(['manager', 'technical']), (req, res) => {
    res.json({ message: 'Hi, User!' })
})

router.get('/:id/roles', AuthorizationMiddleware(['manager', 'technical']), (req, res) => {
    res.json({ message: 'Hi, User!' })
})

export default router