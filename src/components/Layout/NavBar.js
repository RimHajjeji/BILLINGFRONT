import React, { useState } from 'react'
import '../../styles/layout/navbar.css'
import { Button, ButtonGroup, Col, Container, Dropdown, Image, Row } from 'react-bootstrap'
import { RiUserSettingsLine } from 'react-icons/ri'
import { GrSecure } from 'react-icons/gr'
import UserProfile from '../../pages/user/UserProfile'
import logo from "../../assets/logo.png"
import Changepass from '../../pages/user/Changepass'
function NavBar() {
    const [modalShowProfile, setModalShowProfile] = useState(false);
    const [modalShowPass, setModalShowPass] = useState(false);
    const [updShow, setUpdShow] = useState(false);
    const [selectedElement, setSelecetedElement] = useState()
    /*    const closModal = () => {
           setModalShow(false)
       } */
    /* console.log('state', modalShow) */
    return (

        <Container style={{ position: 'sticky', zIndex: '100' }} className='nav-bar-container'>

            <div className='userss'>
                <Image className='img' style={{ marginLeft: '0px', marginTop: '-5px', marginBottom: '15px' }} src={logo} width={250} />
                <Dropdown>
                    <Dropdown.Toggle className='drop' /* variant="outline-success" */ /* id="dropdown-basic" */>
                        <RiUserSettingsLine />
                    </Dropdown.Toggle>

                    <Dropdown.Menu className='it'>
                        <Dropdown.Item onClick={() => setModalShowProfile(true)}>

                            <RiUserSettingsLine /> Profile <br />

                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => setModalShowPass(true)}>


                            <GrSecure /> Mot de pass
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <UserProfile
                    show={modalShowProfile}
                    onHide={() => setModalShowProfile(false)}
                />
                <Changepass
                    show={modalShowPass}
                    onHide={() => setModalShowPass(false)}
                />
            </div>






        </Container>
    )
}

export default NavBar