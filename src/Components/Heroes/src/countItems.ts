async function countItem(cache, pool, isFilter, name="", status="" ,species="", gender=""){
    let key ='recordPagesCount';
    if(isFilter){
        key ='queryPagesCount'
    }
    return cache.get(key, () =>
        pool
            .connect()
            .then(client => {
                return client
                    .query(`select count(*) from hero_list where 
                        name ilike '${name}%' and
                        status ilike '${status}%' and
                        species ilike '${species}%' and
                        gender ilike '${gender}%'`
                    )
                    .then(res => {
                        client.release();
                        return res.rows[0].count;
                    })
                    .catch(err => {
                        client.release();
                        return err;
                    })
        })
    ).then((result) => {
        return result;
    });
}

export default countItem;
