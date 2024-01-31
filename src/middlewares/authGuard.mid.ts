import { NextFunction, Request, Response } from "express";
import { TOKEN } from "../consts/const";
import jwt from "jsonwebtoken";

export default function authGuard(req:Request, res:Response, next:NextFunction): any {
  const token = req.cookies[TOKEN]; // Replace with your actual cookie name
  const JWT_SECRET = process.env.JWT_SECRET || '';

  console.log('****boob', JWT_SECRET);
  console.log('------------', token)
  if (!token) {
    // Token not provided, or cookie not found
    return res.status(401).json({ 
      status: false,
      msg: 'Unauthorized' 
    });
  }

  if (!JWT_SECRET) return res.status(500).json({
    status: false,
    msg: 'server error'
  });

  jwt.verify(token, JWT_SECRET, (err:any, decoded:any) => {
    if (err) {
      // Token verification failed
      // Optionally, you can clear the token cookie here
      res.clearCookie(TOKEN); // Replace with your actual cookie name
      return res.status(401).json({ 
        status: false,
        msg: 'Unauthorized-- token has expired!' });
    }

    // Token is valid, you can access decoded data in `decoded` variable
    (req as any).user = decoded; // Attach the decoded user information to the request object
    next();
  });
}