import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import AlbumPage from "./AlbumPage";
const ArtistPage = ({
  selectedArtist,
  setSelectedArtist,
  setLoading,
  loading,
}) => {
  const [artistInfo, setArtistInfo] = useState({});
  const [artistAlbums, setArtistAlbums] = useState([]);
  useEffect(() => {
    setLoading(true);
    const urls = [
      `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${selectedArtist}&api_key=${process.env.REACT_APP_LASTFM_API_KEY}&format=json`,
      `http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${selectedArtist}&api_key=${process.env.REACT_APP_LASTFM_API_KEY}&format=json`,
    ];
    let requests = urls.map((url) => fetch(url));
    Promise.all(requests)
      .then((responses) => Promise.all(responses.map((res) => res.json())))
      .then((data) => {
        setArtistInfo(data[0]["artist"]);
        getArtistAlbums(data[1]["topalbums"]["album"]);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);
  const getArtistAlbums = (albumArr) => {
    Promise.all(
      albumArr.map((item) =>
        fetch(
          `http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${process.env.REACT_APP_LASTFM_API_KEY}&artist=${selectedArtist}&album=${item.name}&format=json`
        )
          .then((response) => response.json())
          .then((response) => {
            return response;
          })
          .catch((err) => console.log(err))
      )
    )
      .then((result) => {
        setLoading(false);
        setArtistAlbums((prevAlbums) => {
          return [...prevAlbums, ...result];
        });
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const cleanUpBio = (str) => {
    const sliceIndex = str.indexOf("<");
    str = str.slice(0, sliceIndex);
    return str;
  };

  return (
    <div className="artist-page-container">
      <Button
        className="mt-1"
        variant="info"
        onClick={() => setSelectedArtist("")}
      >
        BACK
      </Button>
      {!loading && artistInfo.image && (
        <div className="artist-info-container">
          <div className="artist-info">
            <h1>{artistInfo.name}</h1>
            <img src={artistInfo["image"][4]["#text"]} alt="artist" />
          </div>

          <div className="artist-bio">{cleanUpBio(artistInfo.bio.summary)}</div>
          <div className="similar-container">
            <div className="similar-artists">
              <h4>Similar Artists</h4>
              <ul>
                {artistInfo.similar.artist.slice(0, 3).map((item, index) => (
                  <li key={index}>
                    <a href={item.url} rel="noreferrer" target="_blank">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="similar-tags">
              <h4>Artist's tags</h4>
              <ul>
                {artistInfo.tags.tag.map((item, index) => (
                  <li key={index}>{item.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      {!loading && artistAlbums.length > 0 && <AlbumPage data={artistAlbums} />}
    </div>
  );
};

export default ArtistPage;
