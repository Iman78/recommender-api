import { Document, Model, model, Types, Schema, Query } from "mongoose"
import { ISimilarityFactor, ISimilarity } from "models/types/similarityType";

const SimilarityFactorSchema = new Schema ({
    factorName : String,
    similarityRatesSum : Number,
    votesCount : Number,
});

export interface ISimilarityFactorDocument extends Document, ISimilarityFactor{
}

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
    votesCount : {
        type: Number,
        required: true
    },
    similarityRatesSum : {
        type: Number,
        required: true
    },
    similarityFactors : [SimilarityFactorSchema] 
});

SimilaritySchema.index({firstItemId: 1, secondItemId: 1}, {unique: true});

export interface ISimilaritySchema extends Document, ISimilarity{
}


export const tvShowSimilaritiesModel= model<ISimilaritySchema, Model<ISimilaritySchema>>("tvshow_similarities", SimilaritySchema);
