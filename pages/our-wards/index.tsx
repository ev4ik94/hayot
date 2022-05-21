import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {Row, Col, Menu, Dropdown, Card, Spin, Radio, Space, Drawer, Collapse } from 'antd'
import Link from "next/link";
import {useState} from "react";
import {useRouter} from "next/router";
import {
    useInfiniteQuery
} from 'react-query';
import {LazyLoadImage} from "../../components/Preloaders/LazyLoadImage";
import {RenderAge, age_words} from "../../utils/functions";
import { UnorderedListOutlined} from '@ant-design/icons'

/*---Api----*/
import {DogsApi} from "../../utils/api";

/*---interface----*/
import {IDogs} from "../../ts-types/main";

/*---Styles---*/
import style from '../../styles/Catalog.module.scss'

import {CaretDownOutlined} from "@ant-design/icons";
import {ArrowIcon} from "../../assets/Icons/icons-pack";
import Languages from "../../components/Languages/Languages";
import {Categories} from "../../utils/Db/categories";



export default function DogsList(){
    const {t} = useTranslation()

    const router = useRouter()
    const locale:string = router.locale || 'ru'
    const [sex, setSex] = useState<string|null>(null)
    const [age, setAge] = useState<number|null>(null)
    const [size, setSize] = useState<string|null>(null)
    const [filters, setFilters] = useState<string[]>([])
    const [showSideBar, setShowSideBar] = useState(false)

    age_words['dogs age3'] = t('dogs age3')
    age_words['dogs age'] = t('dogs age')
    age_words['dogs age1'] = t('dogs age1')

    const dataResponse = useInfiniteQuery(
        ['dogs', {filters}],
        ({pageParam = 1}) =>
            DogsApi.getAll(pageParam,  null ,filters),
        {
            getNextPageParam: ({ data }) => data.current_page===data.last_page?undefined:data.current_page+1
        }
    );

    const filtersHandler = (type:string, value:string)=>{
        if(value==='all'){
            setFilters(filters.filter(item=>!item.match(type)))
        }else{
            if(filters.length){
                if(filters.filter(item=>item.match(type)).length){
                    let new_params = filters.map(item=>{

                        if(item.match(type)){
                            return `${type}=${value}`
                        }
                        return item
                    })
                    setFilters(new_params??[])
                }else{
                    setFilters([...filters, `${type}=${value}`])
                }

            }else{
                setFilters([`${type}=${value}`])
            }
        }

    }



    const isLoading = dataResponse.isLoading
    const error = dataResponse.error
    const dogsArr:{pages:[], pageParams:[]}|any = dataResponse.data
    const isFetching = dataResponse.isFetching
    const fetchNextPage = dataResponse.fetchNextPage
    const hasNextPage = dataResponse.hasNextPage





    const menu1 = (
        <Menu onClick={(e)=>{
            setSex(e.key)
            filtersHandler('sex', e.key)
        }} className={style['dropdown-block-list']}>

            <Menu.Item key='all'>
                <p>{t('all')}</p>
            </Menu.Item>

            <Menu.Item key='boy'>
                <p>{t('boy')}</p>
            </Menu.Item>
            <Menu.Item key='girl' >
                <p>{t('girl')}</p>
            </Menu.Item>
        </Menu>
    );

    const menu2 = (
        <Menu onClick={(e)=>{
            setAge(+e.key)
            filtersHandler('age', e.key)
        }} className={style['dropdown-block-list']}>

            <Menu.Item key='all'>
                <p>{t('all')}</p>
            </Menu.Item>

            <Menu.Item key={1}>
                <p>1</p>
            </Menu.Item>
            <Menu.Item key={2} >
                <p>2</p>
            </Menu.Item>
            <Menu.Item key={3} >
                <p>3</p>
            </Menu.Item>
            <Menu.Item key={4} >
                <p>4</p>
            </Menu.Item>
            <Menu.Item key={5} >
                <p>5</p>
            </Menu.Item>
        </Menu>
    );

    const menu3 = (
        <Menu onClick={(e)=>{
            setSize(e.key)
            filtersHandler('size', e.key)
        }} className={style['dropdown-block-list']}>
            <Menu.Item key='all'>
                <p>{t('all')}</p>
            </Menu.Item>

            <Menu.Item key='big'>
                <p>{t('big')}</p>
            </Menu.Item>
            <Menu.Item key='average' >
                <p>{t('average')}</p>
            </Menu.Item>
            <Menu.Item key='small' >
                <p>{t('small')}</p>
            </Menu.Item>
        </Menu>
    );

    if(isLoading){
        return (<div className='preloader'>
            <Spin size="large" tip="Loading..."/>
        </div>)
    }

    if(error){
        return (<p>Error</p>)
    }

    console.log(dogsArr)


    return(
        <>
            <Drawer
                placement='left'
                width={500}
                onClose={()=>setShowSideBar(false)}
                visible={showSideBar}
            >
                <div className={`${style['filters_mobile_menu']}`}>
                    <Col lg={12} md={12} span={24} className={`${style['filters_wrap']}`}>
                        <Collapse className={style['collapase-panel-filter']}>
                            <Collapse.Panel header="Пол" key="1">
                                <div className={`${style['radio-group']}`}>
                                    <Radio.Group onChange={({target})=> {
                                        filtersHandler('sex', target.value)
                                        setShowSideBar(false)
                                    }} value={filters.filter(item=>item.match(/sex/g)).length?filters.filter(item=>item.match(/sex/g))[0].replace(/sex=/g, ''):'all'}>
                                        <Space direction="vertical">
                                            <Radio value='all'>all</Radio>
                                            <Radio value='girl'>{t('boy')}</Radio>
                                            <Radio value='boy'>{t('girl')}</Radio>
                                        </Space>
                                    </Radio.Group>
                                </div>
                            </Collapse.Panel>

                            <Collapse.Panel header="Возраст" key="2">
                                <div className={`${style['radio-group']}`}>
                                    <Radio.Group onChange={({target})=> {
                                        filtersHandler('age', target.value)
                                        setShowSideBar(false)
                                    }} value={filters.filter(item=>item.match(/age/g)).length?filters.filter(item=>item.match(/age/g))[0].replace(/age=/g, ''):'all'}>
                                        <Space direction="vertical">
                                            <Radio value='all' key='all'>all</Radio>
                                            {
                                                Array.from(new Array(7)).map((item,index)=>{
                                                    return(
                                                        <Radio value={index+1+''} key={index}>{index+1}</Radio>
                                                    )
                                                })
                                            }
                                        </Space>
                                    </Radio.Group>
                                </div>
                            </Collapse.Panel>

                            <Collapse.Panel header="Размер" key="3">
                                <div className={`${style['radio-group']}`}>
                                    <Radio.Group onChange={({target})=> {
                                        filtersHandler('size', target.value)
                                        setShowSideBar(false)
                                    }} value={filters.filter(item=>item.match(/size/g)).length?filters.filter(item=>item.match(/size/g))[0].replace(/size=/g, ''):'all'}>
                                        <Space direction="vertical">
                                            <Radio value='all'>all</Radio>
                                            <Radio value='big'>{t('big')}</Radio>
                                            <Radio value='average'>{t('average')}</Radio>
                                            <Radio value='small'>{t('small')}</Radio>
                                        </Space>
                                    </Radio.Group>
                                </div>
                            </Collapse.Panel>

                        </Collapse>
                    </Col>
                </div>
            </Drawer>
            <section className={style['catalog-section']}>
                <div className={`container ${style['catalog-wrap']}`}>
                    <div className={style['header-block']}>
                        <h1>{t('title page catalog')}</h1>
                        <p>{t('subtitle page catalog01')} <span>{t('subtitle page catalog02')}</span> {t('subtitle page catalog03')}</p>
                    </div>

                    <Row className={style['filters-block']} >
                        <Col lg={12} md={24}>
                            <Row className='d-lg-flex d-none'>
                                <Dropdown overlay={menu1} placement="bottomCenter" arrow trigger={['click']} className={style['dropdown-filter']}>
                                    <a className="ant-dropdown-link" onClick={e=>e.preventDefault()} style={{padding: '10px', color: '#000'}}>
                                        {(sex?t(sex):null)??t('filter01')}
                                        <CaretDownOutlined style={{marginLeft: '5px', verticalAlign: 'middle'}} />
                                    </a>
                                </Dropdown>
                                <Dropdown overlay={menu2} placement="bottomCenter" arrow trigger={['click']} className={style['dropdown-filter']}>
                                    <a className="ant-dropdown-link" onClick={e=>e.preventDefault()} style={{padding: '10px', color: '#000'}}>
                                        {age??t('filter02')}
                                        <CaretDownOutlined style={{marginLeft: '5px', verticalAlign: 'middle'}} />
                                    </a>
                                </Dropdown>
                                <Dropdown overlay={menu3} placement="bottomCenter" arrow trigger={['click']} className={style['dropdown-filter']}>
                                    <a className="ant-dropdown-link" onClick={e=>e.preventDefault()} style={{padding: '10px', color: '#000'}}>
                                        {(size?t(size):null)??t('filter03')}
                                        <CaretDownOutlined style={{marginLeft: '5px', verticalAlign: 'middle'}} />
                                    </a>
                                </Dropdown>
                            </Row>
                            <button onClick={()=>setShowSideBar(true)} className={`d-lg-none d-block ${style['filter-button']}`}><UnorderedListOutlined /> Фильтр</button>
                        </Col>
                        <Col lg={12} span={24}>
                            <div className={style['search-input']}>
                                <input type="text" placeholder={t('search placeholder')}/>
                                <button><ArrowIcon /></button>
                            </div>
                        </Col>
                    </Row>

                    <Row gutter={[24,24]} className={style['dogs-list']}>
                        {
                            Array.isArray(dogsArr?.pages)&&dogsArr.pages.length?(<>{
                                (dogsArr.pages||[]).map((page:any)=>{
                                    const data:IDogs[] = page?.data?.data||[]
                                    if(data.length){
                                        return(<>{
                                            data.map((item,index)=>{
                                                return(
                                                    <Col key={index} lg={6} md={12} span={24}>
                                                        <Link href={`/our-wards/${item.slug}`}>
                                                            <a>
                                                                <Card
                                                                    hoverable
                                                                    cover={<LazyLoadImage image={{
                                                                        srcSet: item.gallery.length?item.gallery[0].thumbnail??'':'',
                                                                        alt: item.name['ru'],
                                                                        src: item.gallery.length?item.gallery[0].original??'':''
                                                                    }}/>}
                                                                >
                                                                    <h5>{item.name[locale]}</h5>
                                                                    <div>
                                                                        <p>{RenderAge(item.age, age_words)}</p>
                                                                        <p>{item.disposition[locale]}</p>
                                                                    </div>
                                                                </Card>
                                                            </a>
                                                        </Link>
                                                    </Col>
                                                )
                                            })
                                        }</>)
                                    }

                                    return(
                                        <div className='no-data w-100 text-center' key={'1'}>
                                            <h1>Поиск не дал результатов</h1>
                                        </div>
                                    )


                                })
                            }</>):(<div className='no-data w-100 text-center'>
                                <h1>Поиск не дал результатов</h1>
                            </div>)
                        }
                    </Row>
                </div>
            </section>
            <style>{`
            .ant-dropdown-arrow{
                border-color: #fff transparent transparent #fff !important;
                background: #fff!important;
            }


            .ant-card-cover{
                height: 250px;
            }

            .ant-card-cover img{
                width: 100%;
                height: 100%;
                object-fit: cover!important;
            }

            .ant-card-body > div p{
                margin-bottom: 5px;
            }



        `}</style>
        </>
    )
}





export const getStaticProps = async ({ locale }: any) => {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
        },
    };
};
