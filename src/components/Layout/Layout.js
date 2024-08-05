import React, { Children } from 'react'
import NavBar from './NavBar'
import Sidebar from './Sidebar'
function Layout({ children }) {
    return (
        <div className="container-fluid " style={{ height: 'auto' }}>
            <div className="row"> <NavBar />  </div>
            <div className="row " style={{ height: 'auto', position: 'sticky' }}>

                <div className="col-md-2  sidebar-col" style={{ backgroundColor: '#021740', height: '100vh' }}> <Sidebar /> </div>

                <div className="col-md-10 children-cont"
                >
                    <div className="children-container" style={{ height: 'auto' }} >
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout