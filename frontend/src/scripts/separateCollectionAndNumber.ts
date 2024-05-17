export default function separateCollectionAndNumber(fullName: string){
    const index = fullName.indexOf("-");
    
    if(!(index === -1)){
        return [fullName.substring(0,index), fullName.substring(index+1)]
    } else if (fullName.startsWith("OP") || fullName.startsWith("EB") || fullName.startsWith("ST")) {
        return [fullName, null]
    } else {
        return [null, fullName]
    }

}