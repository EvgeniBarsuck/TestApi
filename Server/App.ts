import * as express from 'express';
import * as bodyParser from 'body-parser';
import { getCharacter } from 'rickmortyapi';
import Controller from "../src/Components/Heroes/HeroControllerInterface";
const cors = require('cors');
const { Pool } = require('pg');

 
const corsOption = {
  origin : 'http://localhost:3000',
  credentials : true
};
const connectionString = 'postgresql://postgres:postgres@139.28.223.167:5432/testApi'

class App {
  public app: express.Application;
 
  constructor(controllers: Controller[]) {
    this.app = express();
    this.app.use(cors(corsOption));
    this.initializeMiddlewares();
    this.connectToDatbase();
    this.initializeControllers(controllers);
  }
  public listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`App listening on the port ${process.env.PORT}`);
    });
  }
 
  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
  }
  
  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use('/api/', controller.router);
      
    });
    
  }
  private async connectToDatbase(){
    // const {
    //   POSTGRE_USER,
    //   POSTGRE_PASSWORD,
    //   POSTGRE_HOST,
    //   POSTGRE_DATABASE,
    //   POSTGRE_PATH
    // } = process.env;
    // const connectionString = `${POSTGRE_PATH}${POSTGRE_USER}:${POSTGRE_PASSWORD}@${POSTGRE_HOST}/${POSTGRE_DATABASE}`
    // const pool = new Pool({
    //   connectionString
    // })
    // await pool.connect();
    // let count = 10;
    // let page = 2;
    // let startItem = count*page;
    // let query = `select * from hero_list limit ${count} offset ${startItem}`;
    // const result =  await pool.query(query);
    // console.log(result.rows);
    // pool.end();
  }
 
 
}
 
export default App;