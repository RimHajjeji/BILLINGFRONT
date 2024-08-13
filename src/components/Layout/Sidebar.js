import React, { useContext, useRef, useState } from "react";

import '../../styles/layout/sidebar.css'
import { logoSVG } from "../../assets";
import logo from "../../assets/logo.png"

import {

    AiOutlineHome,
    AiOutlineLeft,
    AiOutlineSearch,
    AiOutlineSetting,
} from "react-icons/ai";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { MdLogout, MdOutlineProductionQuantityLimits } from "react-icons/md";
import { BsPeople } from "react-icons/bs";
import { RiCustomerService2Fill } from 'react-icons/ri'
import { useDispatch, useSelector } from "react-redux";
import { ThemeContext } from "../../App";
import { useLocation, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Homeadmin from "../../pages/admin/Homeadmin";
import axios from 'axios'
import { baseUrl } from "../../config/base";
const Sidebar = () => {
    const dispatch = useDispatch()
    const searchRef = useRef(null);
    const [clicked, setClicked] = useState(false)
    const [indexx, setIndex] = useState(null)
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { pathname } = useLocation();
    const role = useSelector(state => state?.LoginUser?.data?.new?.role);
    const linksArray = [
        {
            label: "Accueil",
            iconss: <AiOutlineHome />,
            to: "/",
            for: 1
            /* notification: 0, */
        },





        {
            label: "Imprimer Devis",
            iconss: <AiOutlineHome />,
            to: "/imprimer-devis",
            for: 1
            /* notification: 0, */
        },










        {
            label: "Devis",
            iconss: <FaFileInvoiceDollar />,
            to: "/devis",
            for: 1
        },
        {
            label: "Facture",
            iconss: <FaFileInvoiceDollar />,
            to: "/facture",
            for: 1
        },

        {
            label: "Client",
            iconss: <BsPeople />,
            to: "/client",
            for: 1
            /*  notification: 0, */
        },
        {
            label: "Matériel",
            iconss: <MdOutlineProductionQuantityLimits />,
            to: "/materiel",
            for: 1
            /* notification: 1, */
        },
        {
            label: "Service",
            iconss: <RiCustomerService2Fill />,
            to: "/service",
            for: 1
            /* notification: 1, */
        },
        {
            label: "Paramètres",
            iconss: <AiOutlineSetting />,
            to: "/company/parametre",
            for: 1
        },
        /*    {
               label: "Déconnecter",
               iconss: <MdLogout />,
               to: "/deconneter"
           }, */

        {
            label: "utilisateurs",
            to: "/admin",
            for: 0
        },
        {
            label: "Admins",
            to: "/add/admin",
            for: 0
        },
    ];


    const searchClickHandler = () => {
        if (!sidebarOpen) {
            setSidebarOpen(true);
            searchRef.current.focus();
        } else {
            // search functionality
        }
    };
    const logout = () => {
        axios.post(`${baseUrl}/login/logout`, {}, {
            withCredentials: true, headers: {
                origin: `${baseUrl}/`, 'Content-Type': 'application/json; charset=UTF-8',
                "Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Origin": 'http://localhost:3001/'
            }
        })
            .then((res) => {
                dispatch({
                    type: 'LOGOUT',
                    payload: {}
                })
            })
            .catch((err) => {
                console.log('sdqsdqs', err)
            })
    }
    return (
        <div className="container-sidebar">
            <div style={{ marginTop: "90px" }} className="company-logo">

            </div>
            {/* <div className="sidebar-itemm"> */}


            <ul className="div-lili">
                {linksArray?.filter(el => el?.for === role)?.map((el, index) => (
                    <div className="div-li" key={index}>
                        <Link className="link-to" to={el.to}>
                            <div className={clicked === true && index === indexx ? 'div_li2 clicked' : 'div_li2'} onClick={() => { setClicked(true); setIndex(index) }}>
                                <li className="lii"> <span className="icone-type">{el?.iconss}</span>  <span className="namess">{el.label}</span></li>
                            </div>
                        </Link>
                    </div>
                ))}


            </ul>

            <ul className="div-lili">
                <div className="div-li">
                    <div className={clicked === true === indexx ? 'div_li2 clicked' : 'div_li2'} onClick={() => {
                        setClicked(true);
                        logout()
                    }}>
                        <li className="lii"> <span className="icone-type"></span> <MdLogout /> <span className="namess">Déconnecter</span></li>
                    </div>
                </div>
            </ul>


        </div>
        /* </div> */
    );
};
export default Sidebar;
