//@ts-ignore
import Slider from 'react-slick'
import {Col} from 'antd'
import {useRef} from 'react'
import {useRouter} from "next/router";
import {promotion} from "../../utils/Db/promotion";

/*---Components---*/
import {LazyLoadImage} from "../Preloaders/LazyLoadImage";

/*---Styles---*/
import styles from './style/banner.module.scss'

export default function HomeBanner(){

    const carousel = useRef(null)
    const router = useRouter()
    const locale:string = router.locale || 'ru'

    const settings = {
        dots: true,
        autoplay: true,
        infinite: true,
        speed: 1000,
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    dots: false,
                    arrows: false,
                }
            }
        ]
    }
    return(
        <Slider {...settings} className={`${styles['carousel-slick-container']}`} ref={carousel}>
            {
                (promotion||[]).map((item, index)=>{
                    return(
                        <div key={index} className={styles['carousel-item']}>
                            <Col lg={10} md={12} span={24} className={styles['banner-text']}>
                                <h1>{item.title[locale]}</h1>
                                <p>{item.description[locale]}</p>
                            </Col>

                            <LazyLoadImage image={{
                                src: item.image?item.image.original:'',
                                srcSet: item.image?item.image.thumbnail:'',
                                alt: item.title[locale]?item.title[locale]:''
                            }}/>
                        </div>
                    )
                })
            }
        </Slider>
    )
}
