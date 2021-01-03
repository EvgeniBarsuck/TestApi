import {HeroesRepositories, IheroesRepositories} from './HeroesRepositories';

const heroesRepositories = new HeroesRepositories();

export class HeroesDomains implements IheroesRepositories{
    async getHeroList(page, limit, name, status ,species, gender, isFilter) {
        let startedItem;
        if(page!==1) startedItem = (page-1) * limit;
        if(page==1) startedItem = 0;
        name = name || "";
        status = status || "";
        species = species || "";
        gender = gender || "";
        return await heroesRepositories.getHeroList(startedItem, limit,name, status ,species, gender, page, isFilter);
    }
    async getSelectedHero(id) {
        return await heroesRepositories.getSelectedHero(id);
    }  
}