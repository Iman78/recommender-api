import express from "express";
import bodyParser from "body-parser";
export const server = express();

server.use(bodyParser.json());
