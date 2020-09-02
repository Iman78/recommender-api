import { createTvShowSimilarity, deleteSimilarityById, getPairSimilarityFactors, getItemSimilarities } from './../services/tvShowSimilarityService';
import { Request, Response } from "express";
import { ISimilarity } from '../models/types/similarityType';

export const addTvShowSimilarityController= async (request : Request<{}, ISimilarity>, response : Response)=>{
    const result : ISimilarity = await createTvShowSimilarity(request.body);
    response.send({ similarities : result });
};

export const getPairSimilarityFactorsController= async (request : Request, response : Response)=>{
    const result = await getPairSimilarityFactors(Number.parseInt(request.params.firstId), Number.parseInt(request.params.secondId));
    response.send(result);
};

export const getItemSimilaritiesController= async (request : Request, response : Response)=>{
    const result = await getItemSimilarities(Number.parseInt(request.params.firstId));
    response.send(result);
};

export const cancelTvShowSimilarityController= async (request : Request, response : Response)=>{
        const result : ISimilarity = await deleteSimilarityById(request.params.id);
        response.send({ similarities : result });
};