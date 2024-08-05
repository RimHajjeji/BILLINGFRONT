import React from 'react'
import { Col, Dropdown, Row } from 'react-bootstrap'
import { IoIosContacts } from 'react-icons/io'
import { BsPhoneVibrate } from 'react-icons/bs'
import { MdOutlineAlternateEmail } from 'react-icons/md'
import { GrMapLocation } from 'react-icons/gr'
import '../../styles/Auth/contacte.css'
function Contact() {
    return (
        <Dropdown >
            <Dropdown.Toggle className="contactt" variant="outline-primary" /* id="dropdown-basic" */>
                <IoIosContacts />
            </Dropdown.Toggle>
            <Dropdown.Menu className='it2'>

                <Row>
                    <Col md={1}></Col>
                    <Col md={1}>
                        <BsPhoneVibrate />
                    </Col>
                    <Col>
                        <h6> +216 22 571 312</h6>
                    </Col>

                </Row>

                <Row>
                    <Col md={1}></Col>
                    <Col md={1}>
                        <MdOutlineAlternateEmail />
                    </Col>
                    <Col>
                        <h6>khalil.driss@innovup.com.tn </h6>
                    </Col>
                </Row>

                <Row>
                    <Col md={1}></Col>
                    <Col md={1}>
                        <GrMapLocation />
                    </Col>
                    <Col>
                        <h6> Technopark EL Ghazela, office B213-Ariana</h6>
                    </Col>
                </Row>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default Contact