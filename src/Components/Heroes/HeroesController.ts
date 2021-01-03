import {HeroesService} from './HeroesService';
import * as express from 'express';
import Controller from './HeroControllerInterface';

//import {Controller, Get} from "@tsed/common";


const heroesService = new HeroesService();

class HeroesController implements Controller{
    public router = express.Router();
    public path = '/hero';

    public intializeRoutes() {
        this.router.get(this.path,this.getHeroList);
        this.router.get(this.path+"/:id", this.getSelectedHero);
        this.router.get(this.path+"/аш", this.getSelectedHero);
        
    }

    constructor() {
        this.intializeRoutes();
    }

    getHeroList = async (req: express.Request, res: express.Response) =>{
        try{
            res.send(await heroesService.getHeroList(
                req.query.page,
                req.query.limit,
                req.query.name,
                req.query.status,
                req.query.species,
                req.query.gender,
                req.query.isFilter));
        } catch (e){
            console.log("this");
            res.status(e.status);
            res.send(e.message);
        }
    }
    getSelectedHero = async (req: express.Request, res: express.Response) =>{
        try{
            res.send(await heroesService.getSelectedHero(req.params.id));
        } catch (e){
            console.log("this");
            res.status(e.status);
            res.send(e.message);
        }
    }
}

export default HeroesController;