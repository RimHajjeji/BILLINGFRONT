import React from "react";
import { Redirect } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Client from "./pages/client/Client";
import Facture_client from "./pages/client/Facture_client";
import HomePage from "./pages/home/HomePage";
import Material from "./pages/material/Material";
import Service from "./pages/service/Service";
import Invoice from "./pages/invoice/Invoice"
import UpdateUser from "./pages/company/UpdateCompany";
import InvoicePdfTemplate from './pages/invoice/InvoicePdfTemplate'
import Homeadmin from "./pages/admin/Homeadmin";
import { useSelector } from "react-redux";
import Addadmin from "./pages/admin/Addadmin";
const Routes = () => {
    const role = useSelector(state => state?.LoginUser?.data?.new?.role);
    return (
        <div>
            {role === 1 ? (
                <Switch>

                    <Route exact path="/">
                        <HomePage />
                    </Route>

                    <Route exact path="/client" >
                        <Client />
                    </Route>

                    <Route exact path="/client/facture/:nom" >
                        <Facture_client />
                    </Route>

                    <Route exact path="/service" >
                        <Service />
                    </Route>

                    <Route exact path="/materiel" >
                        <Material />
                    </Route>

                    <Route exact path="/facture">
                        <Invoice />
                    </Route>

                    <Route exact path="/company/parametre">
                        <UpdateUser />
                    </Route>

                    {/*  <Route exact path="/customers">
                <h1>Customers Page</h1>
            </Route>
            <Route exact path="/diagrams">
                <h1>Diagrams Page</h1>
            </Route> */}


                    <Redirect to="/" />
                </Switch >
            ) : (
                <Switch>
                    <Route exact path="/admin">
                        <Homeadmin />
                    </Route>
                    <Route exact path="/Add/admin">
                        <Addadmin />
                    </Route>
                    <Redirect to="/admin" />
                </Switch>

            )}
        </div>


    );
};

export default Routes;
