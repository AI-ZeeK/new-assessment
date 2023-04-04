import { NextFunction, Request, Response } from "express";

export interface ReqRes {
	(req: Request, res: Response, next?: NextFunction): any;
}
