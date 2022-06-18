import { Link, Route, Routes } from "react-router-dom";
import App from "../../App";
import { Myphoto } from "../photo/Myphoto";
import { Signin } from "../auth/Signin";
import { Signup } from "../signup/Signup";
import "../../style/nav.css";
import { Addphoto } from "../photo/AddPhoto";
import { InfoPhoto } from "../photo/InfoPhoto";
import { useQuery } from "../hooks/useQuery/useQuery";

export const NavRoutes = (props) => {
    const query = useQuery();


    const exitFromAccount = () => {
        localStorage.removeItem("token");
        window.location.href = "/signin";
    }

    if(!props.auth) {
        return (
            <>
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
                    <Route path="/photo/info-photo" element={<InfoPhoto description={query.get("description")} theme={query.get("theme")} _id={query.get("_id")} />} />
                </Routes>
            </>
        )
    } else {
        return (
            <>
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
                <Route path="/photo/info-photo" element={<InfoPhoto description={query.get("description")} theme={query.get("theme")} _id={query.get("_id")} />} />
            </Routes>
            </>
        ) 
    }
}