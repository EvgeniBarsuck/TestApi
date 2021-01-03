import {IheroesRepositories} from './HeroesRepositories';
import {HeroesDomains} from './HeroesDomains'

const heroesDomains = new HeroesDomains();

export  class HeroesService implements IheroesRepositories{
    async getHeroList(page, limit, name, status ,species, gender, isFilter) {
        return heroesDomains.getHeroList(page, limit, name, status ,species, gender,isFilter);
    }
    getSelectedHero(id) {
        return heroesDomains.getSelectedHero(id);
    }
}