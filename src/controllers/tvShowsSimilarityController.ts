import { cancelSimilarityVote } from './../services/tvShowSimilarityService';
import { addOrUpdateTvShowSimilarities } from '../services/tvShowSimilarityService';
import { Request, Response } from "express";
import { SimilarityRateDto } from "../dtos/similarityRateDto";
import { ISimilarity } from '../models/types/similarityType';

export const addTvShowSimilarityController= async (request : Request<{}, SimilarityRateDto>, response : Response)=>{
    const result : ISimilarity = await addOrUpdateTvShowSimilarities(request.body);
    response.send({ similarities : result });
};

export const cancelTvShowSimilarityController= async (request : Request<{}, SimilarityRateDto>, response : Response)=>{
    try{
        const result : ISimilarity = await cancelSimilarityVote(request.body);
        response.send({ similarities : result });
    }catch(error){
        console.error(error);
        response.status(500);
        response.send({ error : error.message});
    }
};