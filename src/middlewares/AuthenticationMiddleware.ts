import JWTService from '@/services/JWTService';
import type Express from 'express';

export default function AuthenticationMiddleware(req: Express.Request & { user?: any }, res: Express.Response, next: Express.NextFunction) {

    const [tokenType, token] = req.headers.authorization?.split(' ') || [undefined, undefined];

    if (tokenType == 'Bearer' && token)
        JWTService.verifyAccessToken(token, (err, decoded) => {

            if (err) res.status(401).json({ message: 'Erro ao verificar o token: ' + err?.message || 'Token inválido' });

            req.user = decoded;
            next();
        })
    else if (tokenType !== 'Bearer')
        res.status(401).json({ message: 'Tipo de token inválido' });
    else
        res.status(401).json({ message: 'Token inválido' });
}