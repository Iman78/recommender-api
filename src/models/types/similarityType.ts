
export interface ISimilarityFactor{
    factorName : string;
    similarityRatesSum : number;
    votesCount : number;
}

export interface ISimilarity{
    firstItemId : number;
    secondItemId : number;
    votesCount : number;
    similarityRatesSum : number;
    lastUpdated : Date;
    similarityFactors : ISimilarityFactor[];
}
