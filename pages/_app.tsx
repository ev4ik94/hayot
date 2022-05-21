import '../styles/globals.scss'
import "slick-carousel/slick/slick.scss"
import "slick-carousel/slick/slick-theme.scss"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'antd/dist/antd.css';
import Router from 'next/router'
import  App  from 'next/app'
import {Spin} from 'antd'
import { appWithTranslation } from 'next-i18next';


import {
    QueryClientProvider, QueryClient
} from 'react-query'

/*------Components-----*/
import Layout from '../components/Layout/Layout'

interface IState{
    loading: boolean
}

interface IProps{

}

const queryClient  = new QueryClient()

class MyApp extends App<IProps,IState> {

    state = {
        loading: false
    }

    static async getInitialProps({Component, ctx}:{Component:any, ctx:any}) {
        const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}
        return {pageProps: pageProps}
    }


    componentDidMount() {
        Router.events.on('routeChangeStart', () => {
            this.setState({loading: true})
        })

        Router.events.on('routeChangeComplete', () => {
            this.setState({loading: false})
        })
    }


    render(){

        const {Component, pageProps} = this.props


        if(this.state.loading){
            return (<div className='preloader'>
                       <Spin size="large" tip="Loading..."/>
                     </div>)
        }else{
            return (
                <QueryClientProvider client={queryClient}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </QueryClientProvider>
            )
        }
    }

}

//@ts-ignore
export default (appWithTranslation(MyApp))
