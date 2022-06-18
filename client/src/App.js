import "./style/app.css";
import { useEffect, useState } from "react";
import { Link, Route, Router, Routes } from "react-router-dom";
import { InfoPhoto } from "./components/photo/InfoPhoto";

function App() {
  const [photo, setPhoto] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [loadMore, setLoadMore] = useState(false);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    fetch("/photo/random")
      .then((res) => {
        return res.json();
      })
      .then(data => {
        setPhoto(data);
      })
  }, []);

  const searchPhoto = async (e) => {
    e.preventDefault();
    setSkip(0);
    const api = await fetch(`/photo/search-by-theme/?theme=${searchItem}&skip=${skip}`)
    const data = await api.json();

    setPhoto(data.data);
    setLoadMore(data.loadMore);
  }
  const changeSearchInput = (e) => {
    setSearchItem(e.target.value);
  }
  const loadMorePhoto = async () => {
    setSkip(prev => prev+6);
    const api = await fetch(`/photo/search-by-theme/?theme=${searchItem}&skip=${skip+6}`)
    const data = await api.json();

    setPhoto(prev => [...prev, ...data.data]);
    setLoadMore(data.loadMore);
  }

  if(loadMore) {
    return (
      <div className="wrapper__main">
        <h2>Photo galary web-site</h2>
        <div className="wrapper__input-find-photo">
          <form onSubmit={searchPhoto}>
            <input placeholder="Find photo by theme:" value={searchItem} onChange={changeSearchInput} required/>
            <button type="submit">Find photo</button>
          </form>
        </div>
        <h2 className="logo-random-photo">Some photo</h2>
        <div className="wrapper__photo">
          {photo.map((el) => {
            return (
              <Link to={`/photo/info-photo/?theme=${el.theme}&description=${el.description}&_id=${el._id}`} key={el._id}>
                <div className="wrapper__photo-item">
                  <div className="wrapper__photo-item-img">
                    <img src={"/photo/" + el._id} />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
        <button className="load-more-photo" onClick={loadMorePhoto}>Load more</button>
      </div>
    );
  }
  return (
    <div className="wrapper__main">
      <h2>Photo galary web-site</h2>
      <div className="wrapper__input-find-photo">
        <form onSubmit={searchPhoto}>
          <input placeholder="Find photo by theme:" value={searchItem} onChange={changeSearchInput} required/>
          <button type="submit">Find photo</button>
        </form>
      </div>
      <h2 className="logo-random-photo">Some photo</h2>
      <div className="wrapper__photo">
          {photo.map((el) => {
            return (
              <Link to={`/photo/info-photo/?theme=${el.theme}&description=${el.description}&_id=${el._id}`} key={el._id}>
                <div className="wrapper__photo-item">
                  <div className="wrapper__photo-item-img">
                    <img src={"/photo/" + el._id} />
                  </div>
                </div>
              </Link>
            )
          })}
      </div>
    </div>
  );
}

export default App;
