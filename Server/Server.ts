import App from './App';
import 'dotenv/config';
import {validateEnv} from "../utils/validateEnv";
import HeroesController from '../src/Components/Heroes/HeroesController';
validateEnv();

try{
  const app = new App(
    [
      new HeroesController,
    ],      
  );  
  app.listen();
} catch(e){
  console.log(e);
}