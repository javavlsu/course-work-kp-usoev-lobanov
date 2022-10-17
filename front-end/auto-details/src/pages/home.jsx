import * as React from 'react';
import Sidebar from '../components/sidebar';
import { Outlet } from "react-router-dom";
import './home.css'

function Home() {

    return (

        <div>
            <div>
                <Sidebar />
            </div>
            
            <div className='content'>
                <Outlet />
            </div>
        </div>
    )
}
export default Home