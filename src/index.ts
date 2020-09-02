import {server} from './configuration/server';
import './configuration/database';

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});


//findByTvShowIds(63333, 56570).then(res=>{console.log(res)});