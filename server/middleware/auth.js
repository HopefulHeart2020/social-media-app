import jwt from 'jsonwebtoken';

export const verifyToken = async(req, res, next) => {
    try{
        console.log(req.headers);
        let token = req.headers['authorization'];

        if(!token){
            return res.status(403).json({msg: 'Access denied'});
        }

        if(token.startsWith('Bearer ')){
            token = token.slice(7, token.length).trimLeft();
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    }catch(err){
        res.status(500).json({error: err.message});
    }
}