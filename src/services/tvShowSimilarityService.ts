import { BusinessException } from './../configuration/Exceptions/BusinessException';
import { Types } from 'mongoose';
import { tvShowSimilaritiesModel, ISimilaritySchema  } from './../models/schemas/similaritySchema';
import { SimilarityRateDto as SimilarityRate } from '../dtos/similarityRateDto';
import { ISimilarity, ISimilarityFactor } from '../models/types/similarityType';
import { ItemTypeEnum } from '../models/types/itemTypeEnum';

const itemType : ItemTypeEnum = ItemTypeEnum.tvShow;

export const getPairSimilarityFactors= async (firstItemId : number, secondItemId : number) =>{
    const similarities = await tvShowSimilaritiesModel.find({ $or : [
        {firstItemId : firstItemId, secondItemId : secondItemId}, 
        {firstItemId : secondItemId, secondItemId : firstItemId}
    ]});
    if(similarities.length==0) throw new BusinessException(`No similarity between ${itemType}s with ids ${firstItemId} and ${firstItemId} could be found.`);
    const result = await tvShowSimilaritiesModel.aggregate<ISimilarityFactor>([
        { $match : { $or : [
            {firstItemId : firstItemId, secondItemId : secondItemId}, 
            {firstItemId : secondItemId, secondItemId : firstItemId}, 
        ]}},
        { $unwind : { "path": "$similarityFactors", "preserveNullAndEmptyArrays": true } },
        { $group : {  
            _id : "$similarityFactors.factorName",
            factorSimilarityRate : { $avg: "$similarityFactors.similarityRate" }
        }},
        { $project : { _id :0, factorName: "$_id", factorSimilarityRate : "$factorSimilarityRate" }}
    ]);
    return result;
}

export const getItemSimilarities= async (itemId : number) =>{
    const result = await tvShowSimilaritiesModel.aggregate([
        { $match : { $or : [
            {firstItemId : itemId}, 
            {secondItemId : itemId}, 
        ]}},
        { $group : {  
            _id : {
                $cond : [{
                    $eq : [ "$firstItemId", itemId]
                }, "$secondItemId", "$firstItemId"]
            },
            similarityRate : { $avg: "$similarityRate" }
        }},
        { $project : { _id :0, itemId: "$_id", similarityRate : "$similarityRate" }}
    ]);
    return result;
}

export const createTvShowSimilarity= async (tvShowSimilarityDto : SimilarityRate) : Promise<ISimilarity> =>{
    const model : ISimilarity = {
        firstItemId : tvShowSimilarityDto.firstItemId,
        secondItemId : tvShowSimilarityDto.secondItemId,
        similarityRate : tvShowSimilarityDto.similarityRate,
        date : new Date(),
        similarityFactors : tvShowSimilarityDto.similarityFactors.map(f=>({
            factorName : f.factorName,
            similarityRate : f.similarityRate,
        }))
    };
    const result = await tvShowSimilaritiesModel.create(model);
    console.log(result);
    return result.toObject();
}

export const deleteSimilarityById= async (id : string) :Promise<ISimilarity> =>{
    const result = await tvShowSimilaritiesModel.findOneAndDelete({
        _id :  Types.ObjectId(id)
    });
    console.log('deleted', result);
    if(!result) throw new BusinessException(`No record of similaritywith id ${id} between ${itemType}s could be found.`)
    return result.toObject();
}