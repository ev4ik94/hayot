import type { NextPage } from 'next'
import {Row, Col} from 'antd'
import moment from 'moment'
import Link from 'next/link'
//@ts-ignore
import Slider from 'react-slick'

import styles from '../styles/Home.module.scss'
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";

import {News} from "../utils/Db/news";
import {Dogs} from "../utils/Db/dogs";
import {MediaNews} from "../utils/Db/media-news";
import {INews, IDogs, INewsMedia} from "../ts-types/main";

/*----Components---*/
import HomeBanner from "../components/BannerCarousel/HomeBanner";
import {useRouter} from "next/router";
import {useState, useEffect} from "react";

import {RenderAge, age_words} from "../utils/functions";


const Home: NextPage = () => {
  const {t} = useTranslation()
    const [newsArr, setNewsArr] = useState<INews[]>([])
    const router = useRouter()
    const [windowWidth, setWindowWidth] = useState(992)
    const locale:string = router.locale || 'ru'
    age_words['dogs age3'] = t('dogs age3')
    age_words['dogs age'] = t('dogs age')
    age_words['dogs age1'] = t('dogs age1')

    const dataDogs:IDogs[] = Dogs

    useEffect(()=>{
        setNewsArr(News)
    }, [])

    useEffect(()=>{
        setWindowWidth(window.innerWidth)
        window.addEventListener("resize", function(e) {
            const elem = e.target as Window
            setWindowWidth(elem.innerWidth)
        });
    }, [])

    const settings = {
        dots: false,
        autoplay: true,
        infinite: true,
        speed: 2000,
        arrows: false,
        slidesToShow: 4,
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 553,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    }

    const settingsNews = {
        dots: false,
        autoplay: true,
        infinite: true,
        speed: 1000,
        arrows: true,
        slidesToShow: 4,
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: true
                }
            },
            {
                breakpoint: 420,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: true
                }
            }
        ]
    }

  return (
    <div>

        <Head>
            <title>Hayot App</title>
            <meta name="description" content='Generated by create next app' />
            <link rel="icon" href="/favicon.ico" />
        </Head>

      <main>
        <HomeBanner />

          <div className={styles['news-container']}>
              <Row gutter={12} className={`${styles['block-news']}`}>
                  {
                      newsArr.map((item, index)=>{
                          return(
                              <Col key={index} lg={8} md={8} sm={8} span={8}>
                                  <Link href={`/our-blog/${item.id}`}>
                                      <a>
                                          <Row>
                                              <Col lg={12} md={12} span={12} className={styles['image-news']}>
                                                  <div>
                                                      <img src={item.images.length?item.images[0].src:''} alt={item.title[locale]}/>
                                                  </div>
                                              </Col>
                                              <Col lg={12} md={12} span={12}>
                                                  <p className={styles['date-news']}>{item.createdAt}</p>
                                                  <p className={styles['description-news']}>{item.description[locale]}</p>
                                              </Col>
                                          </Row>
                                      </a>
                                  </Link>
                              </Col>
                          )
                      })
                  }
              </Row>
          </div>

          <section className={`${styles['catalog-dog-container']} container`}>
              <h1 className='text-center'>{t('main title 1')}</h1>
              <Row gutter={[12, 12]} justify='space-between'>
                  {
                      dataDogs.map((item,index)=>{

                            if(!item.adopted){
                                return(
                                    <Col key={index} className={styles['item_dog']} lg={6} md={6} sm={12} span={24}>
                                        <Link href={`/our-wards/${item.slug}`}>
                                            <a title={item.name[locale]}>
                                                <div className={styles['image_dog']}>
                                                    <img src={item.gallery.length?item.gallery[0].original:''} alt={item.name[locale]}/>
                                                    <div className={styles['dog-info']}>
                                                        <p>{item.name[locale]}</p>
                                                        <p>{RenderAge(item.age, age_words)}</p>
                                                    </div>
                                                </div>
                                            </a>
                                        </Link>
                                    </Col>
                                )
                            }
                            return ''
                      })
                  }
              </Row>
              <Link href='/our-wards'>
                  <a title={t('view all')} className={styles['button-view-all']}>{t('view all')}</a>
              </Link>
          </section>

          <section className={`${styles['adopted-dogs']}`}>
              <div className='container'>
                  <h1>{t('adopted title01')}<br/>{t('adopted title02')} {t('adopted title03')}</h1>
                  <div className={`${styles['gallery']}`}>
                      {
                          dataDogs.map((item,index)=>{

                              if(windowWidth>576){

                                  return(
                                      <div className={!(index%2)?styles['wide']:styles['tall']} key={index} >
                                          <Link href={`/adopted/${item.slug}`}>
                                              <a title={item.name[locale]}>
                                                  <img src={item.gallery.length?item.gallery[0].original:''} alt="adopted"/>
                                                  <div className={styles['adopted-stamp']}>
                                                      <img src="/adopted.png" alt="adopted"/>
                                                  </div>
                                              </a>
                                          </Link>
                                      </div>

                                  )
                              }else{
                                  return (
                                      <Col sm={8} span={10} key={index} >
                                          <Link href={`/adopted/${item.slug}`}>
                                              <a title={item.name[locale]}>
                                                  <img src={item.gallery.length?item.gallery[0].original:''} alt=""/>
                                                  <div className={styles['adopted-stamp']}>
                                                      <img src="/adopted.png" alt="adopted"/>
                                                  </div>
                                              </a>
                                          </Link>
                                      </Col>
                                  )
                              }
                          })
                      }
                  </div>
                  <Link href='/adopted'>
                      <a title={t('adopted button')} className={styles['button-adopted-view']}>{t('adopted button')}</a>
                  </Link>
              </div>
          </section>

          <section className={styles['volunteers']}>
                <div className={`container`}>
                    <h1>{t('volonters')}</h1>
                    {
                        windowWidth>991?(<div className='position-relative'>
                            {
                                Array.from(Array(18).keys()).map((item, index)=>{
                                    return(
                                        <div key={item} className={styles['item-volunteers']}>
                                            <img src={`/volunteers/v${(item+1)<10?'0':''}${item+1}.png`} alt=""/>
                                        </div>
                                    )
                                })
                            }
                        </div>):
                            (<Slider {...settings}>
                                {
                                    Array.from(Array(18).keys()).map((item, index)=>{
                                        return(
                                            <div key={item} className={styles['item-volunteers-mobile']}>
                                                <img src={`/volunteers/v${(item+1)<10?'0':''}${item+1}.png`} alt=""/>
                                            </div>
                                        )
                                    })
                                }
                            </Slider>)
                    }

                    <Link href={'/'}>
                        <a className={styles['volunteers-button']} title={t('volonters button')}>{t('volonters button')}</a>
                    </Link>
                </div>
          </section>

          <section className={`${styles['media-news']} container`}>
              <h1 className='text-center'>{t('media news title')}</h1>
              <Slider {...settingsNews}>
                  {
                      MediaNews.map((item, index)=>{
                          return(
                              <div key={index} className={styles['item-news-media']}>

                                  <a href={item.website.link} target='_blank' title={item.title[locale]} rel='noreferrer'>
                                      <div style={{background: item.color}}>
                                          <p>{item.website.name}</p>
                                          <div className={styles['picture-news']}>
                                              <img src={item.img.src} alt={item.title[locale]}/>
                                          </div>

                                          <div className={styles['title-news']}>
                                              <p>{moment(item.createdAt).format('MMMM Do YYYY')}</p>
                                              <h5>{item.title[locale]}</h5>
                                          </div>
                                      </div>
                                  </a>

                              </div>
                          )
                      })
                  }
              </Slider>
          </section>

          <section className={`${styles['info-block-owner']} position-relative`}>
              <div>
                  <Col lg={12} span={24} className='position-absolute' style={{left: 0}}>
                      <img src="/pictures/v03.png" alt=""/>
                  </Col>

                  <Row className={`container ${styles['block-info-text']}`} justify='end'>
                      <Col lg={12} span={24}>
                          <div>
                              <p>{t('info owner text1')}</p>
                              <p>{t('info owner text2')}</p>
                          </div>
                          <div>
                              <p>{t('info owner text3')}</p>
                          </div>
                          <Link href={'/'}>
                              <a>{t('info owner text4')}</a>
                          </Link>
                      </Col>
                  </Row>
              </div>
          </section>
      </main>

    </div>
  )
}

export const getStaticProps = async ({ locale }: any) => {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
        },
    };
};

export default Home
