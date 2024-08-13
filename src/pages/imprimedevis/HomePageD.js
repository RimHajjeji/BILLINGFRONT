import React, { useEffect } from "react";
import '../../styles/home/HomePage.css'
import CalenderD from './CalenderD';
import { useDispatch, useSelector } from "react-redux";
import { HomeD } from "../../store/homeD/action";

const Dashboard = () => {
    const dispatch = useDispatch();
    const Idcopany = useSelector(state => state?.Show_company_byUser?.data[0]?._id)
    const etat = useSelector(state => state?.HomeD?.data?.etat)
    const sum = useSelector(state => state?.HomeD?.data?.sum)
    useEffect(() => {
        dispatch(HomeD(Idcopany))
    }, [Idcopany])


    return (
        <div /* className="container" */>
            <div className="dashboar-flex-res" >

                <div className="cdt cadre-total">
                    <h3>TOTAL</h3>
                    <h4>FAC: {etat?.total}</h4>
                    <h4>MTHT:  {sum?.montantHTT} CFA</h4>
                </div>


                <div className="cdt cadre-paye">
                    <h3>PAYE</h3>
                    <h4>FAC: {etat?.pay}</h4>
                    <h4>MTHT:  {sum?.montontHTP} CFA</h4>

                </div>

                <div className="cdt cadre-nonpaye">
                    <h3>NON PAYE </h3>
                    <h4>FAC: {etat?.notpay}</h4>
                    <h4>MTHT:  {sum?.montontHTNP} CFA</h4>
                </div>


            </div>

            <CalenderD />
        </div>

    )
};

export default Dashboard;