import { Menu, Dropdown } from 'antd'
//@ts-ignore
import styled from "styled-components"
import { DownOutlined   } from '@ant-design/icons'
import Link from 'next/link'
import {useRouter} from "next/router";

const MenuItem = styled(Menu)`
  border-radius: 5px;
  & .ant-dropdown-link{
    color: #000!important;
  }
`

export default function Languages(){
    const router = useRouter()
    const {locale} = router

    const languages = [
        {
            lang: 'ru',
            title: 'Русский'
        },
        {
            lang: 'uz',
            title: 'O`zbekcha'
        },
        {
            lang: 'en',
            title: 'English'
        }
    ]

    const menu = (
        <MenuItem>

            {
                languages.map(item=>{
                    return(
                        <Menu.Item key={item.lang} >
                            <Link href={router.pathname} locale={item.lang}>
                                <a>{item.title}</a>
                            </Link>
                        </Menu.Item>
                    )
                })
            }
        </MenuItem>
    );

    return(
        <Dropdown overlay={menu} placement="bottomCenter" arrow trigger={['click']}>
            <a className="ant-dropdown-link" onClick={e=>e.preventDefault()} style={{padding: '10px', color: '#000'}}>
                {languages.filter(item=>item.lang===locale).length?languages.filter(item=>item.lang===locale)[0].title:'Русский'}
                <DownOutlined style={{marginLeft: '5px', verticalAlign: 'middle'}} />
            </a>
        </Dropdown>
    )
}
