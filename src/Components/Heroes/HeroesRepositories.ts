import { release } from 'os';
import CacheService from './HeroCache';
import countItem from './src/countItems';
import pagesCount from './src/pagesCount';
const NodeCache = require('node-cache');
const { Pool } = require('pg');

const ttl = 60 * 60 * 1; // cache for 1 Hour
const cache = new CacheService(ttl); // Create a new cache service instance

const {
    POSTGRE_USER,
    POSTGRE_PASSWORD,
    POSTGRE_HOST,
    POSTGRE_DATABASE,
    POSTGRE_PATH
  } = process.env;
const connectionString = `${POSTGRE_PATH}${POSTGRE_USER}:${POSTGRE_PASSWORD}@${POSTGRE_HOST}/${POSTGRE_DATABASE}`;
export interface IheroesRepositories {
    
    getHeroList(startedItem: number, limit: number,name: string, status: string, species: string, gender: string, page: Number,isFilter: boolean) : any;
    getSelectedHero(id: number) : any;
}

export class HeroesRepositories implements IheroesRepositories{
    pool: any;
    limit: number;
    oldFilterParametr: object;
    pagesCountResault: number;
    constructor(){
        this.pool = new Pool({connectionString});
        countItem(cache, this.pool, false);
        this.oldFilterParametr = {};
        this.limit = 25;
        this.pagesCountResault = 0;
    }

    async getHeroList(startedItem,limit,name, status ,species, gender, page, isFilter){
        var isTrueSet = (isFilter === 'true');
        const newFilterParametr = {
            name,
            status,
            species,
            gender,
            limit
        }
        if (this.limit !== limit){
            cache.delStartWith('filter');
            cache.delStartWith('heroesPage');
            this.limit = limit;
        }
        let pagesCountResault =  0;
        let key = '';
        if (isTrueSet){
            if(!this.deepEqual(this.oldFilterParametr, newFilterParametr)){
                await countItem(cache, this.pool, true, name, status ,species, gender);
                pagesCountResault = pagesCount(cache.cache.data.queryPagesCount.v, limit);
                key = `filter ${page}`;
                cache.delStartWith('filter');
                this.oldFilterParametr = newFilterParametr;
            } else {
                await countItem(cache, this.pool, true, name, status ,species, gender);
                pagesCountResault = pagesCount(cache.cache.data.queryPagesCount.v, limit);
                key = `filter ${page}`;
            }
        } else {
            pagesCountResault = pagesCount(cache.cache.data.recordPagesCount.v, limit);
            name = "";
            status = '';
            gender = "";
            species = '';
            key = `heroesPage ${page}`;
        }
        this.pagesCountResault = pagesCountResault || this.pagesCountResault
        return cache.get(key, () =>
        this.pool
            .connect()
            .then(client => {
                return client
                    .query(`select * from hero_list where 
                        name ilike '${name}%' and
                        status ilike '${status}%' and
                        species ilike '${species}%' and
                        gender ilike '${gender}%'
                        limit ${limit} offset ${startedItem}`
                    )
                    .then(res => {
                        client.release()
                        return {countPage: this.pagesCountResault,  resault: res.rows };
                    })
                    .catch(err => {
                        client.release()
                        return err;
                    })
            })
        ).then((result) => {
            return result;
        });
    }
    deepEqual (obj1, obj2){
        return JSON.stringify(obj1)===JSON.stringify(obj2);
     }
    getSelectedHero(id: number) {
        return cache.get(id, () =>
            this.pool
                .connect()
                .then(client => {
                    return client
                        .query(`select * from hero_list where id ='${id}'`)
                        .then(res => {
                            client.release()
                            return res.rows[0];
                        })
                        .catch(err => {
                            client.release()
                            return err;
                        })
            })
        ).then((result) => {
            return result;
        });
    }
}
    //   let start;
    //   let i = 1;
    //   while (start = await getCharacter(i)){
    //     let query = 'INSERT INTO hero_list (id, name,status,species,type,gender,origin.name,origin.url,location.name, location.url,image,episode,url, created) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)';
    //     let values = [start.id,start.name, start.status, start.species, start.type, start.gender, start.origin.name, start.origin.url,
    //     start.location.name, start.location.url, start.image, start.episode,start.url, start.created];
    //     await client.query(query, values, (err, res) => {
    //       if (err) return console.log(err);
    //     });
    //     i++;
    //   }