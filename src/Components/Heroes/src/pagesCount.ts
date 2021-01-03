function pagesCount (count, limit){
    const res = count/limit;
    console.log(count, limit);
    if(res %1 !== 0){
        console.log('res', Math.trunc(res) + 1)
        return Math.trunc(res) + 1;
    } else {
        console.log(res)
        return res;
    }
}

export default pagesCount;