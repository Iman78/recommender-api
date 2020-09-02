import express from 'express';
import { getItemSimilaritiesController, getPairSimilarityFactorsController, addTvShowSimilarityController, cancelTvShowSimilarityController } from '../controllers/tvShowsSimilarityController';
const tvShowSimilaritiesRouter = express.Router();

tvShowSimilaritiesRouter.get('/:firstId', getItemSimilaritiesController);
tvShowSimilaritiesRouter.get('/:firstId/:secondId/factors', getPairSimilarityFactorsController);
tvShowSimilaritiesRouter.post('/', addTvShowSimilarityController);
tvShowSimilaritiesRouter.post('/cancel/:id', cancelTvShowSimilarityController);

export { tvShowSimilaritiesRouter} ;