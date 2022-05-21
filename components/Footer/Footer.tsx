import {Row, Col} from 'antd'
import {useTranslation} from "next-i18next";
import {Lock} from '../../assets/Icons/icons-pack'

/*---components---*/
import MapComponent from "../Map/Map";

/*---style---*/
import style from './style/footer.module.scss'

export default function Footer(){
    const {t} = useTranslation()
    const date = new Date()
    return(
        <footer className={style['footer-contain']}>
            <Row className='container-lg' justify='space-between'>
                <Col lg={7} span={24}>
                    <p>{t('footer.text1')}</p>
                    <p><span><Lock /></span>© 2018-{date.getFullYear()} {t('footer.text4')}</p>
                </Col>
                <Col lg={10} span={24}>
                    <Row>
                        <Col lg={12} span={24}>
                            <MapComponent style={{height: '170px'}}/>
                        </Col>
                        <Col lg={12} span={24} className='d-flex flex-column justify-content-between'>
                            <p>{t('footer.text2')}</p>
                            <p>{t('footer.text3')}</p>
                        </Col>
                    </Row>
                </Col>
                <Col lg={7} span={24}>
                    <p><a href="tel:+998903574477">+998 90 357-44-77</a></p>
                    <p><a href="mailto:info@hayotislife.com">info@hayotislife.com</a></p>
                    <a href="" target='_blank' >{t('footer.text5')}</a>
                </Col>
            </Row>
        </footer>
    )
}
