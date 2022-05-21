import {Row, Col, Dropdown, Menu} from 'antd'
//@ts-ignore
import styled from "styled-components"
import { MenuFoldOutlined, CaretDownOutlined  } from '@ant-design/icons'
import {useTranslation} from "next-i18next";
import Link from 'next/link'
import {useRouter} from "next/router";

/*---Styles---*/
import style from './header.module.scss'

/*----Components----*/
import Languages from "../Languages/Languages";

/*-----Db-----*/
import {Categories} from "../../utils/Db/categories";

interface Props {
    openSideBar: (val:boolean)=>void
}

const MenuCat = styled(Menu)`
  border-radius: 5px;
  
  p{
    margin-bottom: 0;
  }
  
  .nav-link{
    color: #000;
    padding-right: 30px;
    &:hover{
      background: #fff;
      transition: .3s;
      position: relative;
      &:after{
        content: '';
        position: absolute;
        width: 25px;
        height: 20px;
        right: 0;
        top: 12px;
        background-repeat: no-repeat;
        background-image: url("data:image/svg+xml, %3Csvg width='14' height='13' viewBox='0 0 14 13' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 6.91202H13M13 6.91202L7.35849 1.27051M13 6.91202L7.63443 12.2776' stroke='%23F37500' stroke-width='0.952533'/%3E%3C/svg%3E");
      }
    }
  }
`



export default function Header({openSideBar}:Props){

    const router = useRouter()
    const locale = router.locale || 'ru'
    const {t} = useTranslation()



    const renderCategories = ()=>{
        return Categories.map((item, index)=>{
            if(item.children.length){
                const menu = (
                    <MenuCat>
                        <Col span={24}>
                            {
                                item.children.map((child, index)=>{
                                    return(
                                        <p key={index}>
                                            <Link href={child.link}>
                                                <a className='nav-link'>{child.title[locale]}</a>
                                            </Link>
                                        </p>
                                    )
                                })
                            }
                        </Col>
                    </MenuCat>
                )
                return (
                    <Dropdown overlay={menu} trigger={['click']} placement="bottomCenter" arrow className={`${style['header__catalog']}`} key={index}>
                        <a className={`ant-dropdown-link nav-link`} onClick={e => e.preventDefault()} style={{color: '#000',  fontWeight: '500'}}>
                            {item.title[locale]}
                            <CaretDownOutlined style={{verticalAlign: 'text-bottom', marginLeft: '5px'}}/>
                        </a>
                    </Dropdown>
                )
            }
            return(
                <li className={`nav-item ${style['nav-item']}`} key={index}>
                    <Link href={item.link}>
                        <a className={`${style['nav-link']} ${style['active']} nav-link`} aria-current="page">{item.title[locale]}</a>
                    </Link>
                </li>

            )
        })
    }


    return(
        <header className={style['header_contain']}>
            <nav className={`${style['navbar']} navbar navbar-expand-lg justify-content-between`}>

                <div className='container-xxl d-flex flex-nowrap'>

                    <div className={`${style['header__nav_main']} d-flex align-items-center col-12`}>
                        <Row className='position-relative col-1'>
                            <Link href='/'>
                                <a className={`navbar-brand ${style['navbar-brand']} flex-column align-items-center d-flex`}  title="Hayot">
                                    <div className='position-absolute'>
                                        <img src="/Logo.png" alt="Hayot"/>
                                    </div>
                                </a>
                            </Link>
                        </Row>
                        <div className={`${style['mobile-menu']} d-lg-none d-block`}>
                            <Row>
                                <button onClick={()=>openSideBar(true)} className={`d-lg-none d-block ${style['burger-menu']}`}>
                                    <MenuFoldOutlined />
                                </button>
                            </Row>
                        </div>
                        <Link href='/'>
                            <a className={style['btn-donate']}><span>Пожертвовать</span></a>
                        </Link>

                        <div className={`d-lg-block d-none align-items-center col-lg-9 ${style['categories-main-block']}`} style={{marginLeft: '30px'}}>
                            <div className="collapse navbar-collapse justify-content-between" id="navbarNavDropdown">
                                <ul className={`navbar-nav ${style['navbar-links']}`}>
                                    <li className={style['button-adopt']}>
                                        <Link href='/'>
                                            <a>{t('categories 1')}</a>
                                        </Link>
                                    </li>
                                    {renderCategories()}
                                </ul>

                                <Languages />


                            </div>
                        </div>
                    </div>
                </div>
            </nav>

        </header>
    )
}
