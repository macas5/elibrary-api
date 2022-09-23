import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";


const sessionValidation = async (req, res, next) => {
    const token = req.cookies.session_token

    if(!token) {
        return res.status(401).send('User is not authorized');
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) {
            return res.status(404).send('Token is not valid');
        }  
        req.user = user;
    });

    const user = await userModel.findById(req.user.id);

    if (!user) {
        return res.cookie('session_token', '', {
            httpOnly: true
        })
        .status(401)
        .send('Session expired, please log in again');
    }

    if(user.terminateSession) {
        await userModel.updateOne({email: user.email}, {terminateSession: false});
        return res.cookie('session_token', '', {
            httpOnly: true
        })
        .status(401)
        .send('Session expired, please log in again');
    }

    next();
}

export default sessionValidation;