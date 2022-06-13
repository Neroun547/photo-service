import { useState } from "react"

export const Signin = () => {
    const [inputUsername, setInputUsername] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [messageFromServer, setMessageFromServer] = useState("");
    const [showMessageFromServer, setShowMessageFromServer] = useState("none");

    const changeUsername = (e) => {
        setInputUsername(e.target.value);
    }
    const changePassword = (e) => {
        setInputPassword(e.target.value);
    }
    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const api = await fetch("/signin/auth", {
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    username: inputUsername,
                    password: inputPassword
                })
            });

            const data = await api.json();
            
            setTimeout(() => {
                setShowMessageFromServer("none");
                clearTimeout(this);
            }, 3000);

            if(api.ok) {
            
                setShowMessageFromServer("block");
                setMessageFromServer("Auth success");

                localStorage.setItem("token", data.message);

                window.location.href = "/"; 

                return;
            }
            setMessageFromServer(data.message);
            setShowMessageFromServer("block");
            
            setTimeout(() => {
                setShowMessageFromServer("none");
                clearTimeout(this);
            }, 3000);


        } catch {
            setTimeout(() => {
                setShowMessageFromServer("none");
                clearTimeout(this);
            }, 3000);
            
            setShowMessageFromServer("block");
            setMessageFromServer("Server error");
        }
    }   
    return (
        <div className="wrapper__form">
            <form onSubmit={submitForm}>
                <input placeholder="Username:" onChange={changeUsername} minLength={3} maxLength={30}/>
                <input placeholder="Password:" onChange={changePassword} type="password" minLength={6} maxLength={30}/>
                <button>Sign in</button>
            </form>
            <div className="wrapper__form-message" style={{ display: showMessageFromServer}}>
                {messageFromServer}
            </div>
        </div>
    )
}