import "./App.css";
import { useEffect, useState } from "react";

function App() {
  // API KEY
  // Tbe2dIR3iWj97DgR3XYduGO4LS609mn0M2yKvfhczjGzHAnLU7n2QpHA

  const [imageData, setImageData] = useState([]);
  const [searchImg, setSearchImg] = useState("");
  const [loader, setLoader] = useState(false);

  const getImages = () => {
    setLoader(true);
    const options = {
      method: "GET",
      headers: {
        Authorization:
          "Tbe2dIR3iWj97DgR3XYduGO4LS609mn0M2yKvfhczjGzHAnLU7n2QpHA",
      },
    };
    fetch(
      `https://api.pexels.com/v1/search?query=${
        searchImg ? searchImg : "nature"
      }&per_page=40`,
      options
    )
      .then((res) => res.json())
      .then((res) => {
        console.log("res => ", res);
        setImageData(res?.photos);
        setLoader(false);
      })
      .catch((err) => console.log("err", err));
  };

  console.log("image datta : ", imageData);

  useEffect(() => {
    getImages();
  }, []);

  const search = () => {
    getImages();
  };

  const saveEnter = (e) => {
    if (e.key === "Enter") {
      getImages();
    }
  };

  return (
    <div className="galleryContainer">
      <div className="searchInput flex">
        <input
          type="text"
          value={searchImg}
          onChange={(e) => setSearchImg(e.target.value)}
          onKeyDown={saveEnter}
          placeholder="Search free pictures"
        />
        <button onClick={search} disabled={!searchImg}>
          Search Image
        </button>
      </div>
      {!loader ? (
        <div className="imgContainer">
          {imageData?.length > 0 &&
            imageData.map((img, index) => {
              return (
                <div>
                  <img key={index} src={img.src.large} alt={img.alt} />
                </div>
              );
            })}
        </div>
      ) : (
        <div className="loadBody">
          <div class="boxes">
            <div class="box">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div class="box">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div class="box">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div class="box">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
