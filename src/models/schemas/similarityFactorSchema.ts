import { Types, Schema } from "mongoose";
import { ISimilarityFactor } from "../types/similarityType";

export const SimilarityFactorSchema = new Schema ({
    _id : Types.ObjectId,
    factorName : String,
    similarityRate : Number
});

export interface ISimilarityFactorDocument extends Document, ISimilarityFactor{
}