import UserModel from '@/models/UserModel';
import BCryptService from '@/services/BCryptService';
import JWTService from '@/services/JWTService';
import type Express from 'express';

export default class AuthController {
    static async login(req: Express.Request, res: Express.Response) {
        const { username, password } = req.body;

        const user = username == UserModel.username && UserModel

        if (user && (await BCryptService.compare(password, user.password))) {
            const accessToken = JWTService.generateAccessToken(UserModel);
            const refreshToken = JWTService.generateRefreshToken({ username: user.username, roles: user.roles });

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                path: '/',
                secure: true,
                sameSite: 'lax'
            });

            res.json({ accessToken });
        } else
            res.status(401).json({ message: 'Credenciais inválidas' });
    }

    static async logout(req: Express.Request, res: Express.Response) {
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');

        res.end();
    }

    static async refreshToken(req: Express.Request, res: Express.Response) {
        const refreshToken = req.cookies.refreshToken;

        if (refreshToken) {
            JWTService.verifyRefreshToken(refreshToken, (err, decoded) => {
                if (err) {
                    res.status(403).json({ message: 'Token inválido' });

                } else {
                    const username = (decoded as Record<string, any>).username;

                    const newAccessToken = JWTService.generateAccessToken(UserModel);
                    res.json({ accessToken: newAccessToken });
                }
            })
        } else res.status(403).json({ message: 'Token inválido' });
    }
}