import {Request, Response} from 'express'
import User, { IUser } from "..//models/user";
import jwt from "jsonwebtoken";
import config from "../config/config";

function createToken(user: IUser){
    jwt.sign({id: user.id, email: user.email}, config.jwtSecret, {
        expiresIn: 86400
    });
}

export const signUp = async (req: Request, res:Response): Promise<Response> => {
    if(!req.body.email || !req.body.password){
        return res.status(400).json({msg: 'Por favor envia email y contraseña'})
    }

    const user = await User.findOne({email: req.body.email});
    if (user) {
        return res.status(400).json({msg: "El usuario ya existe"});
    }

    const newUser = new User(req.body);
    await newUser.save();
    return res.status(201).json(newUser);
}

export const signIn = async (req: Request, res:Response) => {
    if(!req.body.email || !req.body.password){
        return res.status(400).json({msg: 'Por favor envia email y contraseña'})
    }

    const user = await User.findOne({email: req.body.email})
    if (!user) {
        return res.status(400).json({msg: 'El usuario no existe'});
    }

    const coincide = await user.comparePassword(req.body.password);
    if (coincide) {
        return res.status(200).json({token: createToken(user)});
    }

    return res.status(400).json({
        msg: "El correo o la contraseña son incorrectos"
    });
}