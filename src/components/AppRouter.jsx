import React, { useContext } from "react";
import {Routes, Route, Navigate} from 'react-router-dom'
import Error from '../pages/Error';
import { privateaddressRoutes, publicaddressRoutes} from "../Router/";
import { AuthContext } from "../context";
import Loader from "./UI/Loader/Loader";

const AppRouter = () => {
    const {isAuth,  isLoading} = useContext(AuthContext);
    if(isLoading){
        return <Loader/>
    }
    return (
        isAuth
            ?   
                <Routes>
                    <Route path="/" element={<Navigate to="/posts" />} />
                    <Route path="/login" element={<Navigate to="/posts" />} />
                    <Route path="/*" element={<Navigate to="/error" />} />
                    {privateaddressRoutes.map(route => 
                        <Route
                            path={route.path}
                            element={<route.component/>}
                            exact = {route.exact}
                            key={route.path}
                        />
                    )}
                    <Route path="/error" element={<Error />} />
                </Routes>
            :
                <Routes>
                    <Route path="/*" element={<Navigate to="/login" />} />
                    {publicaddressRoutes.map(route => 
                        <Route
                            path={route.path}
                            element={<route.component/>}
                            exact = {route.exact}
                            key={route.path}
                        />
                    )}
                </Routes>
        
    );
}

export default AppRouter;