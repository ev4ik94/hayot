import { useRouter } from 'next/router'
import {useEffect, useState} from "react";
//@ts-ignore
import Slider from 'react-slick'


/*----Api----*/
import {DogsApi} from "../../utils/api";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

/*----Styles---*/
import styles from '../../styles/OurWards.module.scss'
import {LazyLoadImage} from "../../components/Preloaders/LazyLoadImage";
import {age_words, RenderAge} from "../../utils/functions";
import {useTranslation} from "next-i18next";

const stylesD = `
    .slider-dogs{
      height: 600px;
    }
    
    .slider-dogs .slick-list, 
    .slider-dogs .slick-track,
    .slider-dogs .slick-slide > div,
    .slider-dogs .slick-slide > div>div{
       height: 100%;
     }
     
    .slider-dogs img{
        width: 100%;
        height: 100%;
        object-fit: cover!important;
    }
    
    .slider-dogs .slick-arrow{
        position: absolute;
        z-index: 2;
    }
    
    .slider-dogs .slick-arrow:before{
        content: '';
        width: 50px;
        height: 30px;
        display: block;
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
        opacity: 1;
    }
    
    .slider-dogs .slick-next{
        right: 30px;
    }
    
    .slider-dogs .slick-prev{
        left: 30px;
    }
    
    .slider-dogs .slick-next:before{
        background-image: url("data:image/svg+xml,%3Csvg width='18' height='33' viewBox='0 0 18 33' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.0002 0.380737L16.8051 16.186L1 31.991' stroke='white'/%3E%3C/svg%3E%0A")!important;
    }
    
    .slider-dogs .slick-prev:before{
        transform: rotate(-180deg);
        background-image: url("data:image/svg+xml,%3Csvg width='18' height='33' viewBox='0 0 18 33' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.0002 0.380737L16.8051 16.186L1 31.991' stroke='white'/%3E%3C/svg%3E%0A")!important;
    }
    
    .container-lg{
        padding-bottom: 60px;
    }
    
    
    
    
`


export default function ViewSingle(props:any){
    const router = useRouter()
    const {t} = useTranslation()
    const [showContact, setShowContact] = useState(false)
    const {slug} = router.query as { slug: string }
     const locale:string = router.locale || 'ru'
    const {data} = props
    age_words['dogs age3'] = t('dogs age3')
    age_words['dogs age'] = t('dogs age')
    age_words['dogs age1'] = t('dogs age1')

    const settings = {
        dots: false,
        autoplay: false,
        infinite: false,
        speed: 1000,
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1
    }

    useEffect(()=>{
       console.log(data)
    }, [slug])

    return(
        <div>
            <Slider {...settings} className='slider-dogs'>
                {
                    //@ts-ignore
                    (data.gallery||[]).map(item=>{
                        return(
                            <div key={item.id}>
                                <LazyLoadImage image={{
                                    src: item.original??'',
                                    srcSet: item.thumbnail??'',
                                    alt: data.name[locale]
                                }}/>
                            </div>
                        )
                    })
                }
            </Slider>
            <div className='container-lg'>
                <div className={styles['description-dog']}>
                    <h3>{data.title[locale]}</h3>
                    <div className={styles['classification-dog']}>
                        <p>Возраст: {RenderAge(data.age, age_words)}</p>
                        <p>Вес: {data.weight}</p>
                        <p>Рост: {data.height}</p>
                        <p>Темперамент: {data.disposition[locale]}</p>
                    </div>
                    <div className={styles['content-description']} dangerouslySetInnerHTML={{__html: data.description[locale]}}/>
                </div>

                <button className={styles['btn-contact-show']} onClick={()=>setShowContact(true)}>Узнать контакты опекуна<br/>{
                    showContact?'+998 93 555 55 55':'+998 XX XXX XX XX'
                }</button>
            </div>
            <style>{`${stylesD}`}</style>
        </div>
    )
}




export async function getServerSideProps({locale, params}:{locale:string, params: any}) {
    const {slug} = params
    const response = await DogsApi.getOne(slug);

    return {
        props: {
            ...response.data,
            ...(await serverSideTranslations(locale, ["common"])),
            fallback: "blocking"
        }
    }
}