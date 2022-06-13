import { useState } from "react";
import "../../style/signup.css";

export const Signup = () => {
    const [inputName, setInputName] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [inputUsername, setInputUsername] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [messageFromServer, setMessageFromServer] = useState("");
    const [showMessageFromServer, setShowMessageFromServer] = useState("none");

    const changeName = (e) => {
        setInputName(e.target.value);
    }
    const changeEmail = (e) => {
        setInputEmail(e.target.value);
    }
    const changeUsername = (e) => {
        setInputUsername(e.target.value);
    }
    const changePassword = (e) => {
        setInputPassword(e.target.value);
    }
    const submitForm = async (e) => {
        e.preventDefault();

        try {
            const api = await fetch("/signup", {
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    name: inputName,
                    email: inputEmail,
                    username: inputUsername,
                    password: inputPassword
                })
            });

            const data = await api.json();
            
            setTimeout(() => {
                setShowMessageFromServer("none");
                clearTimeout(this);
            }, 3000);
            setShowMessageFromServer("block");

            setMessageFromServer(data.message);

            window.location.href = "/signin";
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
                <input placeholder="Name:" value={inputName} onChange={changeName} minLength={3} maxLength={30}/>
                <input type="email" placeholder="Email:" value={inputEmail} onChange={changeEmail}/>
                <input placeholder="Username:" value={inputUsername} onChange={changeUsername} minLength={3} maxLength={30}/>
                <input type="password" placeholder="Password:" value={inputPassword} onChange={changePassword} minLength={6} maxLength={30}/>
                <button>Sign up</button>
            </form>
            <div className="wrapper__form-message" style={{ display: showMessageFromServer}}>
                {messageFromServer}
            </div>
        </div>
    )
}
