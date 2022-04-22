import React, {useState} from "react";
import s from './Home.module.scss';
import Page from "../../layout/Page/Page";
import Solver from "../Solver/Solver";
import EditMenu from "../EditMenu/EditMenu";
import CompleteCheck from "../CompleteCheck/CompleteCheck";

export default function Home() {

    const [topMenu, setTopMenu] = useState('1');
    const [sideMenu, setSideMenu] = useState('1');

    return (
        <Page topMenu={topMenu} setTopMenu={setTopMenu} sideMenu={sideMenu} setSideMenu={setSideMenu}>
            {topMenu === '1' ?
                <Solver/>
            :
                <EditMenu sideMenu={sideMenu}/>
            }
        </Page>
    );
}