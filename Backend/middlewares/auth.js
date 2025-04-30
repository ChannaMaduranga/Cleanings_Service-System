import jwt from 'jsonwebtoken';
import cookieParser from "cookie-parser";


const SECRET_KEY = 'secretkey'; 


const authenticateToken = (req, res, next) => {
  const token = req.cookies.accessToken;

  if(!token){
      return res.send({message:"Unauthorized"});
  }

  jwt.verify(token,SECRET_KEY, (err,decoded) =>{
      if(err){
          return res.send({message: "token expired or invalid"});
      }

      // console.log('ok')
      req.user = decoded;
      next();
  });
};

export default authenticateToken;
