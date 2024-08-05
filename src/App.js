import React, { useState, useEffect } from "react";

import Login from "./pages/Auth/Login";
import { Route, Switch } from "react-router-dom";
import './app.css'
import Routes from "./Routes";
import Layout from "./components/Layout/Layout";
import Calender from "./pages/home/Calender";
import NavBar from "./components/Layout/NavBar";
import { Redirect } from "react-router-dom";
import Register from "./pages/Auth/Register"
import { useSelector, useDispatch } from "react-redux";
import { Refresh_access } from './store/user/refresh/action'
import Sidebar from "./components/Layout/Sidebar";
export const ThemeContext = React.createContext(null);
const App = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state?.LoginUser?.data?.accessToken)
    const [isLogged, setIslogged] = useState(false)
    console.log('suer sdqsd', user)
    useEffect(() => {
        if (!!user) {
            setIslogged(true)
        }
        else {
            setIslogged(false)
        }
    }, [user])
    useEffect(() => {
        dispatch(Refresh_access(user))
    }, [])
    console.log('login app', isLogged)
    return (
        /*   <h1>APP</h1> */
        /*   <div className="container-fluid App">
              <div className="row"> <NavBar />  </div>
              <div className="row ">
                  <div className="col-md-2 " style={{ backgroundColor: '#021740' }}> <Sidebar /> </div>
                  <div style={{ borderTopLeftRadius: '50px', backgroundColor: 'white', paddingLeft: '90px' }} className="col-md-10"
                  >
                      <div className="children-container" >
                          <Calender />
                      </div>
                  </div>
              </div>
          </div> */
        <div className="App" /* style={{ border: '1px solid red' }} */>
            {isLogged === false ?
                (
                    <>
                        <Switch>
                            <Route exact path="/login">
                                <Login logged={setIslogged} />
                            </Route>
                            <Route exact path="/register">
                                <Register />
                            </Route>
                            <Redirect to="/login" />
                        </Switch>
                    </>
                ) : (<>
                    <Layout>
                        <Routes />
                    </Layout>
                </>
                )
            }
        </div >
    );
};
export default App;
