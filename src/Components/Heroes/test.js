function mass(mass){
    console.log(mass.unshift({id: 1, name: 'all'}))
    return mass;
}

let res = mass([{id:2, name: 'not all'}, {id: 3 , name: 'Now all'}]);

console.log(res);