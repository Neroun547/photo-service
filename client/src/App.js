import "./style/app.css";
import { useEffect, useState } from "react";

function App() {
  const [photo, setPhoto] = useState([]);
  const [searchItem, setSearchItem] = useState("");

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

    const api = await fetch(`/photo/search-by-theme/${searchItem.trim()}`)
    const data = await api.json();

    setPhoto(data);
  }
  const changeSearchInput = (e) => {
    setSearchItem(e.target.value);
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
            <div className="wrapper__photo-item" key={el._id}>
              <div className="wrapper__photo-item-img">
                <img src={"/photo/" + el._id} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
