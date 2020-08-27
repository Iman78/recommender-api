import { tvShowSimilaritiesModel, ISimilaritySchema  } from './../models/schemas/similaritySchema';
import { SimilarityRateDto } from '../dtos/similarityRateDto';
import { ISimilarity } from '../models/types/similarityType';
import { ItemTypeEnum } from '../models/types/itemTypeEnum';

const itemType : ItemTypeEnum = ItemTypeEnum.tvShow;

export const findByTvShowIds= async (firstItemId : number, secondItemId : number) :Promise<ISimilaritySchema> =>{
    try{
        const result = await tvShowSimilaritiesModel.findOne({firstItemId, secondItemId });
        console.log(result);
        return result;
    }
    catch(err){
        console.error(err);
    };
}

export const createTvShowSimilarity= async (tvShowSimilarityDto : SimilarityRateDto) : Promise<ISimilaritySchema> =>{
    try{
        const model = {
            firstItemId : tvShowSimilarityDto.firstItemId,
            secondItemId : tvShowSimilarityDto.secondItemId,
            votesCount : 1,
            similarityRatesSum : tvShowSimilarityDto.similarityRate,
            lastUpdated : Date.now(),
            similarityFactors : tvShowSimilarityDto.similarityFactors.map(f=>({
                factorName : f.factorName,
                similarityRatesSum : f.similarityRate,
                votesCount : 1,
            }))
        };
        const result = await tvShowSimilaritiesModel.create(model);
        console.log(result);
        return result;
    }
    catch(err){
        console.error(err);
    };
}

export const updateTvShowSimilarity= async (tvShowSimilarityDto : SimilarityRateDto, document : ISimilaritySchema) : Promise<ISimilaritySchema> =>{
    try{
        
        document.votesCount=<number>document.votesCount+1;
        document.similarityRatesSum=<number>document.similarityRatesSum+tvShowSimilarityDto.similarityRate;
        tvShowSimilarityDto.similarityFactors.forEach((newFactor)=>{
            var existent = document.similarityFactors.find( factor=>factor.factorName===newFactor.factorName );
            if(existent){
                existent.votesCount=<number>existent.votesCount+1;
                existent.similarityRatesSum=<number>existent.similarityRatesSum+newFactor.similarityRate;
            }
            else document.similarityFactors.push({
                factorName: newFactor.factorName, 
                similarityRatesSum: newFactor.similarityRate, 
                votesCount : 1,
            })
        });
        document.lastUpdated = new Date();
        const result = await document.save();
        console.log(result);
        return result;
    }
    catch(err){
        console.error(err);
    };
}

export const addOrUpdateTvShowSimilarities= async (tvShowSimilarityDto : SimilarityRateDto) : Promise<ISimilarity> =>{
    try{
        const existent = await findByTvShowIds(tvShowSimilarityDto.firstItemId, tvShowSimilarityDto.secondItemId);
        if(existent){
            return await (await updateTvShowSimilarity(tvShowSimilarityDto, existent)).toObject();
        }else {
            return (await createTvShowSimilarity(tvShowSimilarityDto)).toObject();
        }
    }
    catch(err){
        console.error(err);
    };
}

export const deleteSimilarity= async (tvShowSimilarityDto : SimilarityRateDto) :Promise<ISimilaritySchema> =>{
    try{
        const result = await tvShowSimilaritiesModel.findOneAndDelete({
            firstItemId : tvShowSimilarityDto.firstItemId, 
            secondItemId : tvShowSimilarityDto.secondItemId 
        });
        console.log('deleted', result);
        return result;
    }
    catch(err){
        console.error(err);
    };
}

export const cancelSimilarityVote= async (tvShowSimilarityDto : SimilarityRateDto) : Promise<ISimilarity> =>{
    const document = await findByTvShowIds(tvShowSimilarityDto.firstItemId, tvShowSimilarityDto.secondItemId);
    if(document && document.votesCount>1){
        if(document.similarityRatesSum<tvShowSimilarityDto.similarityRate){
            throw Error(`The vote ${tvShowSimilarityDto.similarityRate} for ${itemType}s of ids ${tvShowSimilarityDto.firstItemId} and ${tvShowSimilarityDto.secondItemId} is not correct.`);
        }
        document.votesCount=<number>document.votesCount-1;
        document.similarityRatesSum=<number>document.similarityRatesSum-tvShowSimilarityDto.similarityRate;
        tvShowSimilarityDto.similarityFactors.forEach((newFactor)=>{
            var existent = document.similarityFactors.find( factor=>factor.factorName===newFactor.factorName );
            if(existent){
                existent.votesCount=<number>existent.votesCount-1;
                existent.similarityRatesSum=<number>existent.similarityRatesSum-newFactor.similarityRate;
                if(existent.similarityRatesSum<newFactor.similarityRate){
                    throw Error(`The vote ${newFactor.similarityRate} for factor '${newFactor.factorName}' between ${itemType}s of ids ${document.firstItemId} and ${document.secondItemId} is not correct.`);
                }
                if(existent.votesCount==0) 
                    document.similarityFactors.splice(document.similarityFactors.indexOf(existent), 1);
            }
        });
        document.lastUpdated = new Date();
        try{
        const result = await document.save();
        console.log(result);
        return result;
        }
        catch(err){
            console.error(err);
        };
    }else if(document){
        const deleted = await (await deleteSimilarity(tvShowSimilarityDto)).toObject();
        if(document.votesCount<1) throw Error(`No more votes for similarity between ${itemType}s with ids ${tvShowSimilarityDto.firstItemId} and ${tvShowSimilarityDto.secondItemId}. It was deleted from the database.`)
        else return deleted;
    }
    else{
        throw Error(`No similarity vote between ${itemType}s with ids ${tvShowSimilarityDto.firstItemId} and ${tvShowSimilarityDto.secondItemId}`);
    }
}