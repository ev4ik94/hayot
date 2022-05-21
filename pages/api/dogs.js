import {Dogs} from '../../utils/Db/dogs'



export default function dogs(req, res) {
    const {page, search, filter} = req.query

    let response = {
        data: Dogs,
        perPage: 13,
        next_page: +page+1,
        last_page: Math.ceil(Dogs.length/30),
        current_page: page,
        total: Dogs.length
    }


    if(filter){
        let arr_filter = filter.split(';')
        arr_filter.forEach(item=>{
            let sex = item.match('sex')?item.split('=')[1]:null,
                age = item.match('age')?(item.split('=')[1]*12):null,
                size = item.match('size')?item.split('=')[1]:null
            if((sex)&&age&&size){
                response.data = response.data.filter(item=>item.sex===sex&&item.age===age&&item.size===size)
            }else if(sex&&age){
                response.data = response.data.filter(item=>item.sex===sex&&item.age===age)
            }
            else if(age&&size){
                response.data = response.data.filter(item=>item.age===age&&item.size===size)
            }
            else if(sex&&size){
                response.data = response.data.filter(item=>item.sex===sex&&item.size===size)
            }
           else{
               let type = sex?'sex':age?'age':'size',
                value = sex?sex:age?age:size
                response.data = response.data.filter(item=>item[type]===value)
            }

        })
    }



    let dataJson = new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve(response);
        }, 1000);
    });
    return dataJson.then(result=>res.status(200).json(result))
}