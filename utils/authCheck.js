export const verifySessionTokenUser = (req, res, next) => {
    if((req.user.id === req.params.id) || req.user.isAdmin){
        next();
    } else {
        return res.status(406).send('You are not logged in');
    }
}

export const verifySessionTokenAdmin = (req, res, next) => {
    if(!req.user.isAdmin){
        return res.status(406).send('You are not an admin');
    }
    next();
}

