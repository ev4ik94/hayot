import { Drawer, Space, Menu  } from 'antd';
import {useRouter} from "next/router";
import {Categories} from "../../utils/Db/categories";
import Link from 'next/link'
import {useTranslation} from "next-i18next";


/*---Components---*/
import Languages from "../Languages/Languages";

/*----Styles----*/
import style from './style/side-bar.module.scss'


interface Props  {
    show: boolean,
    closeFunc: (val:boolean)=>void
}


export function SideBarMobile({show, closeFunc}:Props){
    const router = useRouter()
    const {t} = useTranslation()
    const locale = router.locale || 'ru'
    return(
        <Drawer
            placement='left'
            width={500}
            onClose={()=>closeFunc(false)}
            visible={show}
            extra={
                <Space>
                    <Link href='/' >
                        <a className={style['link-adopt']}> {t('categories 1')}</a>
                    </Link>
                    <Languages />
                </Space>
            }
        >
            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
            >
                {
                    Categories.map((item, index)=>{
                        if(!item.children.length){
                            return(
                                <Menu.Item key={item.link}>
                                    <Link href={item.link}>
                                        <a key={index} title={item.title[locale]}>{item.title[locale]}</a>
                                    </Link>
                                </Menu.Item>
                            )
                        }

                        return(
                            <Menu.SubMenu key={index} title={item.title[locale]}>
                                {
                                    item.children.map((child, index)=>{
                                        return(
                                            <Menu.Item key={child.link}>
                                                <Link href={child.link}>
                                                    <a key={index} title={child.title[locale]}>{child.title[locale]}</a>
                                                </Link>
                                            </Menu.Item>
                                        )
                                    })
                                }
                            </Menu.SubMenu>
                        )
                    })
                }

            </Menu>
        </Drawer>
    )
}
