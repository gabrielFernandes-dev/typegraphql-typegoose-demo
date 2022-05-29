import { Request, Response } from 'express';

interface Context {
  req: Request;
  res: Response;
  authToken: string;
}

export default Context;
