export const getPagesCount = (totalCount, limit)=>{
    return Math.ceil(totalCount/ limit);
}
export const getPagesArray = (totalPages)=>{
    let arr  = [];
    for (let index = 0; index < totalPages; index++) {
         arr.push(index+1)
    }
    return arr;
}