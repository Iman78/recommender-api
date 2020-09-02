import { Document, Model, model, Types, Schema, Query } from "mongoose"
import { ISimilarity } from "../types/similarityType";
import { SimilarityFactorSchema } from "./similarityFactorSchema";



const SimilaritySchema = new Schema({
    firstItemId : {
        type: Number,
        required: true
    },
    secondItemId : {
        type: Number,
        required: true
    },
    lastUpdated : Date,
    similarityRate : {
        type: Number,
        required: true
    },
    similarityFactors : [SimilarityFactorSchema] 
});


export interface ISimilaritySchema extends Document, ISimilarity{
}


export const tvShowSimilaritiesModel= model<ISimilaritySchema, Model<ISimilaritySchema>>("tvshow_similarities", SimilaritySchema);
