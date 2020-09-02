import { BusinessException } from './Exceptions/BusinessException';
import express, { Request, Response, NextFunction } from "express";
import 'express-async-errors';
import bodyParser from "body-parser";
import morgan from "morgan";
import { tvShowSimilaritiesRouter } from "../routes/tvShowSimilarities";

export const server = express();

server.use(bodyParser.json());
server.use(morgan('dev'));

server.use("/tvShows/similarities", tvShowSimilaritiesRouter);

server.get('/test', (request : Request, response : Response, next : NextFunction )=>{
    throw new Error('You failed')
});

server.use((request : Request, response : Response, next : NextFunction )=>{
    const error = new Error('Route \''+request.path+'\' not found');
    response.status(404);
    console.log(error);
    next(error);
});

server.use((error : Error, request : Request, response : Response, next : NextFunction )=>{
    if(error instanceof BusinessException) {
        response.status(500);
        response.send({type : BusinessException.name, message : error.message});
    }
    else next(error);
});

server.use((error : Error, request : Request, response : Response, next : NextFunction )=>{
    const codeString = response.statusCode.toString()
    if(!codeString.startsWith('4') && !codeString.startsWith('5')) response.status(500);
    response.send({message : error.message});
});