import { useState, useEffect } from "react";
import "../../style/infoPhoto.css";

export const InfoPhoto = (props) => {
    const [photoId, setPhotoId] = useState("");
    const [theme, setTheme] = useState("");
    const [description, setDescription] = useState("");
    const [authorUsername, setAuthorUsername] = useState("");

    useEffect(() => {
        setPhotoId(props._id);
        setTheme(props.theme);
        setDescription(props.description);

        fetch(`/photo/username/${props._id}`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            setAuthorUsername(data.username);
        })
    }, []);

    const getPhotoFile = async (id) => {
        const a = document.createElement("a");
        const res = await fetch(`/photo/download/${id}`);
        const jsonData = await res.json();

        const blob = new Blob([new Uint8Array(jsonData.data.data, jsonData.data.data.byteLength)]);
        const blobUrl = window.URL.createObjectURL(blob);
        
        a.href = blobUrl;
        a.download = jsonData.name;
        a.click();
        a.remove();
    }

    return (
        <div>
            <div className="wrapper__photo-info-item">
                <div>
                    <img src={`/photo/${photoId}`}  />
                </div>
                <div className="wrapper__photo-info-item-author-block"> 
                    <strong>Theme: <span>{theme}</span></strong>
                    <strong>Author: <span>{authorUsername}</span></strong>
                    <button onClick={() => getPhotoFile(photoId)}>Download</button>
                </div>
            </div>
        </div>
    )
}