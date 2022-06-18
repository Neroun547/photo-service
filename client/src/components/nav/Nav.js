import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { NavRoutes } from "./NavRoutes";

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

    return (
        <BrowserRouter>
            <NavRoutes auth={auth} />
        </BrowserRouter>
    )
}
