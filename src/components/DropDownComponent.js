import React, { useEffect, useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { getTopTenTracksAndOrder } from "../utils";

const DropDownComponent = ({ setArtistSearch, setLoading, selectedArtist }) => {
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");

  useEffect(() => {
    fetch(
      `http://ws.audioscrobbler.com/2.0/?method=tag.getTopTags&api_key=${process.env.REACT_APP_LASTFM_API_KEY}&format=json`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((response) => {
        const apiTags = response.toptags.tag.map((item) => item.name);
        setTags(apiTags);
      });
  }, []);

  const handleSelect = (genreTag) => {
    setSelectedTag(genreTag);
    fetch(
      `http://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag=${genreTag}&api_key=${process.env.REACT_APP_LASTFM_API_KEY}&format=json`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((response) => {
        getArtistData(response.topartists.artist);
      });
  };

  const getArtistData = (artistArray) => {
    setLoading(true);
    Promise.all(
      artistArray.map((item) =>
        fetch(
          `http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${item.name}&api_key=${process.env.REACT_APP_LASTFM_API_KEY}&format=json`
        )
          .then((response) => response.json())
          .then((response) => {
            return response;
          })
      )
    ).then((result) => {
      const topTracks = getTopTenTracksAndOrder(result);
      setLoading(false);
      setArtistSearch(topTracks);
    });
  };

  return (
    <div className="dropdown-container">
      <DropdownButton
        onSelect={handleSelect}
        id="dropdown-basic-button"
        title={selectedTag ? selectedTag : "Select Tag"}
        disabled={selectedArtist.length > 0}
      >
        {tags &&
          tags.map((item) => (
            <Dropdown.Item eventKey={item} key={item}>
              {item}
            </Dropdown.Item>
          ))}
      </DropdownButton>
    </div>
  );
};

export default DropDownComponent;
