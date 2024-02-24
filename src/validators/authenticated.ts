import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
    userData: any;
}

const authenticatedValidator = (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.replace("Bearer ", "") || '';
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      const authenticatedRequest = req as AuthenticatedRequest;
      authenticatedRequest.userData = decoded;
      next();
    } catch (err) {
      res.status(401).json({
        message: "Authentication Failed"
      });
    }
  };
  

export default authenticatedValidator;
