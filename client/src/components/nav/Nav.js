import { useEffect, useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import App from "../../App";
import { Myphoto } from "../photo/Myphoto";
import { Signin } from "../auth/Signin";
import { Signup } from "../signup/Signup";
import "../../style/nav.css";
import { Addphoto } from "../photo/AddPhoto";

export const Nav = () => {
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        fetch("/signin/check-token", {
            headers: {
                Authorization: "bearer " + localStorage.getItem("token")
            }
        })
        .then((response) => {
            if(response.ok) {
                setAuth(true);
            } else {
                setAuth(false);
            }
        })
    }, []);

    const exitFromAccount = () => {
        localStorage.removeItem("token");
        window.location.href = "/signin";
    }

    if(!auth) {

        return (
            <BrowserRouter>
                <div className="wrapper__nav">
                    <nav className="wrapper__nav-nav">
                        <Link to="/">Home</Link>
                        <Link to="/signin">Sign in</Link>
                        <Link to="/signup">Sign up</Link> 
                    </nav>
                </div>
            
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/signin" element={<Signin/>}/>
                <Route path="/signup" element={<Signup/>}/>
            </Routes>
        </BrowserRouter>
    )
    } else {
        return (
            <BrowserRouter>
                <div className="wrapper__nav">
                    <nav className="wrapper__nav-nav">
                        <Link to="/">Home</Link>
                        <Link to="/my-photo">My photo</Link>
                        <button onClick={exitFromAccount}>Exit</button>
                    </nav>
                </div>
            
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/my-photo" element={<Myphoto/>}/>
                <Route path="/my-photo/add-photo" element={<Addphoto/>}/>
            </Routes>
        </BrowserRouter>
    ) 
    }
}
