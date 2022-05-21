import {useState} from "react";

/*---Components---*/
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import {SideBarMobile} from "../Header/SideBar-mobile";

type Props = {
    children: React.ReactChild
};

export default function Layout({children}:Props){

    const [showSideBar, setShowSideBar] = useState(false)

    return(
        <>
            <SideBarMobile show={showSideBar} closeFunc={setShowSideBar}/>
            <Header openSideBar={(val:boolean)=>setShowSideBar(val)}/>
            {children}
            <Footer />
        </>
    )
}
