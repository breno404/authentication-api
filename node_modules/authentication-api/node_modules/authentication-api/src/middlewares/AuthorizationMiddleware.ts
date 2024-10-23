import type Express from 'express';

export default function AuthorizationMiddleware(roles: string[]) {
    return (req: Express.Request & { user?: any }, res: Express.Response, next: Express.NextFunction) => {
        if (req.user) {
            let canAccess = false

            for (let i = 0; i < roles.length; i++) {
                canAccess = req.user?.roles.includes(roles[i])
                if (canAccess) break
            }

            if (canAccess) next()
            else res.status(403).json({ message: 'Access denied, you don\'t have permission' });
        } else res.status(401).json({ message: 'You are not logged in' });
    }
}