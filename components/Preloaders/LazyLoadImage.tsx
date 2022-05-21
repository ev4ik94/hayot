import {useState, useEffect} from 'react'


/*----Interfaces----*/

interface IImage{
    src: string,
    srcSet: string,
    alt: string
}


export function LazyLoadImage({image}:{image:IImage}){

    const [loadingImage, setLoading] = useState(true)

    useEffect(()=>{
        if(loadingImage){
            IsLoading()
        }
    }, [loadingImage])

    const IsLoading = ()=>{
        let load = true
        let imgUp = document.createElement('img');
        imgUp.src = image.src
        imgUp.onload = function() {
            setLoading(false)
        }

    }



    return(<img  src={loadingImage?image.srcSet:image.src} alt={image.alt}  style={{objectFit: 'contain', filter: loadingImage?'blur(5px)':''}}/>)

}
