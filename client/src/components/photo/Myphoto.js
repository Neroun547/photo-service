import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../style/my-photo.css";

export const Myphoto = () => {
    const [photo, setPhoto] = useState([]);
    const [loading, setLoading] = useState(true);
    const [skip, setSkip] = useState(0); 
    const [loadMore, setLoadMore] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch("/photo/?skip=0&take=6", {
            headers: {
                Authorization: "bearer " + localStorage.getItem("token")
            }
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            setPhoto(data.data);
            setLoading(false);
            setLoadMore(data.loadMore)
        })
        .catch(() => {
            setLoading(false);
        })
    }, []);

    const loadMorePictures = async () => {
        setSkip((prev) => prev+6);

        const api = await fetch(`/photo/?skip=${skip+6}&take=6`, {
            headers: {
                Authorization: "bearer " + localStorage.getItem("token")
            }
        })
        const data = await api.json();

        setLoadMore(data.loadMore);
        setPhoto(prev => [...prev, ...data.data]);
    }
    const deletePhoto = (id) => {
        const newPhotoArr = photo.filter((el) => el._id !== id);
        setPhoto(newPhotoArr);
        setSkip(prev => prev -1);

        fetch(`/photo/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: "bearer " + localStorage.getItem("token")
            }
        })
    }

    if(loading) {
        return <div>Loading ...</div>
    }
    if(!photo.length && !loading) {
        return (
            <div className="wrapper__main">
                <Link to="/my-photo/add-photo" className="add-photo-link">Add photo</Link>
                <h2>You don't have photo</h2>
            </div>
        )
    }
    if(loadMore) {
        return (
            <div className="wrapper__main">
                <Link to="/my-photo/add-photo" className="add-photo-link">Add photo</Link>
                <div className="wrapper__photo">
                    {photo.map((el) => {
                        return (
                            <div className="wrapper__photo-item" key={el._id}>  
                                <div className="wrapper__photo-item-top-bar">
                                    <button onClick={() => deletePhoto(el._id)}>Delete photo</button> 
                                    <div className="wrapper__photo-item-theme">Theme: {el.theme}</div>
                                </div>
                                <div className="wrapper__photo-item-img">
                                    <img src={"/photo/"+el._id}/>    
                                </div>  
                            </div>
                        )
                    })}
                </div>

                <button onClick={loadMorePictures} className="load-more-photo">Load more pictures</button>
            </div>
        )
    } 
    if(!loadMore) {
        return (
            <div className="wrapper__main">
                <Link to="/my-photo/add-photo" className="add-photo-link">Add photo</Link>
                <div className="wrapper__photo">
                    {photo.map((el) => {
                        return (
                            <div className="wrapper__photo-item" key={el._id}>
                                <div className="wrapper__photo-item-top-bar">
                                    <button onClick={() => deletePhoto(el._id)}>Delete photo</button> 
                                    <div className="wrapper__photo-item-theme">Theme: {el.theme}</div>
                                </div>
                                <div className="wrapper__photo-item-img">
                                    <img src={"/photo/"+el._id}/>    
                                </div>  
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}
