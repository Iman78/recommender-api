import {server} from './configuration/server';
import './configuration/database';
import setRoutes from './configuration/routes'
import { addOrUpdateTvShowSimilarities, createTvShowSimilarity } from './services/tvShowSimilarityService';

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});

setRoutes(server);

