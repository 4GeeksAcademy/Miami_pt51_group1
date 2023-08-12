import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { LandingPage } from "./pages/landingPage";
import { CurrencyConverter  } from "./pages/currencyconverter";
import { Single } from "./pages/single";
import { Private} from "./pages/private"
import injectContext from "./store/appContext";
import MySearch from "./pages/destinationsearch";
import ForgotPassword from "./pages/ForgotPassword";

import { MyNavbar } from "./component/navbar";
import { Footer } from "./component/footer";


import Login from "./pages/Login";
import { Register } from "./component/register";



//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <MyNavbar />
                    <Routes>

                        <Route element={<LandingPage />} path="/" />
                        <Route element={<Home />} path="/a" />


                        
                        <Route element={<Register />}path="/register" />
                        <Route element={<CurrencyConverter />}path="/currency" />

                        
                        <Route element={<ForgotPassword />} path="/forgot-password" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<Private/>} path="/private"/>
                        <Route element={<h1>Not found!</h1>} />
                        <Route element={<Login />} path="/login" />
                        <Route element={<MySearch />} path="/destinations" />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};
export default injectContext(Layout);
