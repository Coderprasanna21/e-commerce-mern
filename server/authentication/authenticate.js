import jwt from 'jsonwebtoken';


const authenticate =  (req, res, next)=>{
    const token = req.headers.authorization?.split(" ")[1];
    const secretKey =  process.env.JWT_SECRET || 'defaultsecretkey';
    
    if(!token)
    {
        return res.status(401).json({ message: "Unauthorized: No token provided" });

    }

    try{
        const decoded = jwt.verify(token, secretKey); 
        req.user = decoded;
        next(); 
    }
    catch(error)
    {
        res.status(403).json({ message: "Invalid token"});
    }
}

export default authenticate;