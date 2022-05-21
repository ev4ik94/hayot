

export const age_words = {
    "dogs age3": '',
    "dogs age": '',
    "dogs age1": ''
}

export function RenderAge(age:number, age_words: {}){

    if(age<12){
        //@ts-ignore
        return `${age} ${age_words['dogs age3']}`
    }else{
        const result = Math.ceil(age/12)
        //@ts-ignore
        const age_val = result===1?age_words['dogs age']:(result>1&&result<=4?age_words['dogs age1']:age_words['dogs age3'])
        return `${result} ${age_val}`
    }

}