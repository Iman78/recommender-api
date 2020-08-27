import { addTvShowSimilarityController, cancelTvShowSimilarityController } from "../controllers/tvShowsSimilarityController";

export default (server)=>{
     server.get('/api', (req, resp)=>{
          resp.send({message : 'Recommendations api : v0.1'});
     });
     server.post('/tvShows/similarities', addTvShowSimilarityController);
     server.post('/tvShows/similarities/cancel', cancelTvShowSimilarityController);
}
