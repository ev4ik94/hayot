import {Dogs} from '../../../utils/Db/dogs'
import { NextApiRequest, NextApiResponse } from "next";



export default function dogs(req:NextApiRequest, res:NextApiResponse) {
    const {slug} = req.query

    let response = {
        data: Dogs.filter(item=>item.slug===slug).length?Dogs.filter(item=>item.slug===slug)[0]:{}
    }

    let dataJson = new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve(response);
        }, 1000);
    });

    return dataJson.then(result=>res.status(200).json(result))
}