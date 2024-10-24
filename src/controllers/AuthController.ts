import DataSource from '@/db/DataSource';
import UserDTO, { InputData } from '@/dto/UserDTO';
import Permission from '@/models/PermissionModel';
import Role from '@/models/RoleModel';
import User from '@/models/UserModel';
import BCryptService from '@/services/BCryptService';
import JWTService from '@/services/JWTService';
import type Express from 'express';
import { FindOptionsSelect, FindOptionsSelectByString } from 'typeorm';

export default class AuthController {
    static async login(req: Express.Request, res: Express.Response) {
        const { username, password } = req.body as Record<string, string>;
        const ds = await DataSource.getMysqlDataSource()

        const selectFields: FindOptionsSelect<User> | FindOptionsSelectByString<User> | undefined = {
            id: true, name: true, password: true, isAdmin: true, isActive: true, username: true
        }

        const userRepository = ds.getRepository(User)
        const permissionRepository = ds.getRepository(Permission)
        const roleRepository = ds.getRepository(Role)

        const [user, permission, role] = await Promise.all([
            userRepository.findOne({ where: { username, isActive: true }, select: selectFields }),
            permissionRepository.findOne({ where: { user: { username, isActive: true } }, select: { id: false } }),
            roleRepository.findOne({ where: { user: { username, isActive: true } }, select: { id: false } })
        ])

        if (user && (await BCryptService.compare(password, user.password))) {

            const userDTO = UserDTO({ ...user, ...permission, ...role } as InputData)
            const accessToken = JWTService.generateAccessToken(userDTO);
            const refreshToken = JWTService.generateRefreshToken({ id: userDTO.id, username: userDTO.username, roles: userDTO.roles });

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
            JWTService.verifyRefreshToken(refreshToken, async (err, decoded) => {
                if (err) {
                    res.status(403).json({ message: 'Token inválido' });

                } else {
                    const ds = await DataSource.getMysqlDataSource()
                    const id = +(decoded as Record<string, any>).id;

                    const selectFields: FindOptionsSelect<User> | FindOptionsSelectByString<User> | undefined = {
                        id: true, name: true, isAdmin: true, isActive: true, username: true
                    }

                    const userRepository = ds.getRepository(User)
                    const permissionRepository = ds.getRepository(Permission)
                    const roleRepository = ds.getRepository(Role)

                    const [user, permission, role] = await Promise.all([
                        userRepository.findOne({ where: { id, isActive: true }, select: selectFields }),
                        permissionRepository.findOne({ where: { user: { id, isActive: true } }, select: { id: false } }),
                        roleRepository.findOne({ where: { user: { id, isActive: true } }, select: { id: false } })
                    ])

                    const userDTO = UserDTO({ ...user, ...permission, ...role } as InputData)

                    const newAccessToken = JWTService.generateAccessToken(userDTO);

                    res.json({ accessToken: newAccessToken });
                }
            })
        } else res.status(403).json({ message: 'Token inválido' });
    }
}