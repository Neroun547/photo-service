import { useState } from "react";

export const Addphoto = () => {
    const [inputFile, setInputFile] = useState("");
    const [inputTheme, setInputTheme] = useState("");
    const [inputDescription, setInputDescription] = useState("");
    const [showMessageFromServer, setShowMessageFromServer] = useState("none");
    const [messageFromServer, setMessageFromServer] = useState("");

    const changeFile = (e) => {
        setInputFile(e.target.files[0]);
    }
    const changeTheme = (e) => {
        setInputTheme(e.target.value);
    }
    const changeDescription = (e) => {
        setInputDescription(e.target.value);
    }
    const submitForm = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("picture", inputFile);
        formData.append("theme", inputTheme);
        formData.append("description", inputDescription);

        try {
            const api = await fetch("/photo/", {
                method: "POST",
                headers: {
                    Authorization: "bearer " + localStorage.getItem("token")
                },
                body: formData
            });
            const data = await api.json();

            setShowMessageFromServer("block");

            setTimeout(() => {
                setShowMessageFromServer("none");
                clearTimeout(this);
            }, 3000);

            setMessageFromServer(data.message);
        } catch {
            setShowMessageFromServer("block");

            setTimeout(() => {
                setShowMessageFromServer("none");
                clearTimeout(this);
            }, 3000);

            setMessageFromServer("Server error");
        }
        setInputDescription("");
        setInputTheme("");
    }
    return (
        <div className="wrapper__main">
            <div className="wrapper__form">
                <form onSubmit={submitForm}>
                    <input type="file" id="file"  name="picture" onChange={changeFile} required/>
                    <input placeholder="Theme:" name="theme" value={inputTheme} onChange={changeTheme}  required/>
                    <input placeholder="Description:" name="description" value={inputDescription} onChange={changeDescription}/>
                    <button type="submit">Add photo</button>
                </form>
                <div className="wrapper__form-message" style={{ display: showMessageFromServer}}>
                    {messageFromServer}
                </div>
            </div>
        </div>
    )    
}
