
export interface ISimilarityFactor{
    factorName : string;
    similarityRate : number;
}

export interface ISimilarity{
    firstItemId : number;
    secondItemId : number;
    similarityRate : number;
    date : Date;
    similarityFactors : ISimilarityFactor[];
}
