import axios from 'axios'

export const url =  'http://localhost:3000/api'


export const clientInstance = axios.create({
    baseURL: url
})


export const DogsApi = {
    getAll(page=1, search:string|null=null, filter:string[]=[]){
        let url_s = new URL(url+'/dogs')
        const query_params = new URLSearchParams()
        const filters_params = filter.join(';')
        query_params.append('page', page+'')
        if(filter.length) query_params.append('filter', filters_params)
        url_s.search = query_params.toString()

        return clientInstance
            .get(`/dogs/?${url_s.search}`)
            .then((response)=>response)
    },

    getOne(slug:string){
        return clientInstance
            .get(`/dog/${slug}`)
            .then((response)=>response)
    }
}