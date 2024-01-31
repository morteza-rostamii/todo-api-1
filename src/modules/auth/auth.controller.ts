import {Request, Response, NextFunction} from 'express'
import { dbConnect } from '../../libs/db';
import User from '../users/users.model';
import jwt from 'jsonwebtoken'
import otpGenerator from 'otp-generator'
import Otp from '../otp/otp.model';
import { TOKEN } from '../../consts/const';

const authController = {

  async register(req: Request, res: Response) {
    
    const {username, email} = req.body;

    if (!username || !email) {
      return res.status(200).json({
        status: false,
        error: 'Enter info',
      });
    }

    try {

      let otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
  
      // check: for duplicate otp in db
      let result = await Otp.findOne({ otp: otp });
      while (result) {
        otp = otpGenerator.generate(6, {
          upperCaseAlphabets: false,
        });
        result = await Otp.findOne({ otp: otp });
      }

      // save otp in db
      const newOtp = await Otp.create({
        email,
        otp,
      });

      const user = await User.findOne({email: email});

      if (user) {

        return res.status(200).json({
          status: false,
          user,
          otp: newOtp.otp,
        });
      }
      
      const newUser = await new User({
        username,
        email,
      });
      newUser.save();

      return res.status(200).json({
        status: true,
        user: newUser,
        otp: newOtp,
      }); 
    }
    catch(error:any) {
      return res.status(200).json({
        status: false,
        error: error?.message || error,
      });
    }
  },

  async verify(req: Request, res: Response) {
    
    const JWT_SECRET = process.env.JWT_SECRET || '';
    const {email, otp} = req.body;
    // create token and magic link
    
    if (!email || !otp) {
      return res.status(200).json({
        status: false,
        msg: 'Enter info'
      });
    } 
    
    
    try {

      const user = await User.findOne({email});

      // verify the otp
      // Find the most recent OTP for the email
      const response = await Otp.find({ email }).sort({ createdAt: -1 }).limit(1);
      if (response.length === 0 || otp !== response[0].otp) {
        return res.status(400).json({
          status: false,
          msg: 'The OTP is not valid',
        });
      }
  
      const token = jwt.sign({email}, JWT_SECRET, {expiresIn: '15m'});

      res.cookie(TOKEN, token, {
        // Enforce HTTPS-only transmission
        secure: process.env.NODE_ENV !== 'development',  
        // Optionally add other cookie options:
        maxAge: 900000, // 15 minutes expiration
        httpOnly: true  // Inaccessible to client-side JavaScript
      });

      return res.status(200).json({
        status: true,
        data: {
          token: token,
          user,
        },
      }); 
    }
    catch(error:any) {
      return res.status(200).json({
        status: false,
        error: error?.message || error,
      });
    }
  },

  // check if token is still valid
  async checkAuth(req: Request, res: Response) {
    
    const JWT_SECRET = process.env.JWT_SECRET || '';
    try {

      // verify token
      const token = req.cookies[TOKEN];

      if (!token) {
        return res.status(400).json({
          status: false,
          msg: 'no token in cookie',
        });
      }

      // verify token
      jwt.verify(token, JWT_SECRET, (err:any, decoded:any) => {
        if (err) {
          // remove cookie
          res.clearCookie(TOKEN);
          return res.status(401).json({
            status: false,
            msg: 'unauthorized',
          });
        }


        return res.status(200).json({
          status: true,
          data: {
            token,
          },
        }); 
      });
    }
    catch(error:any) {
      return res.status(200).json({
        status: false,
        error: error?.message || error,
      });
    }
  },

  async logout(req: Request, res: Response) {
    

    try {

      // remove cookie
      res.clearCookie(TOKEN);

      return res.status(200).json({
        status: true,
        msg: 'logout',
      }); 
    }
    catch(error:any) {
      return res.status(200).json({
        status: false,
        error: error?.message || error,
      });
    }
  },
}

export default authController