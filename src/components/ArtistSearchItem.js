import React, { useState } from "react";
import { trimTracks } from "../utils";
const ArtistSearchItem = ({ data, setSelectedArtist }) => {
  const [collapse, setCollapse] = useState(true);
  const { artist, topTracks, images, totalListeners } = data;
  const img = collapse ? images[1]["#text"] : images[2]["#text"];

  const collapseTracks = trimTracks(topTracks)
    .slice(0, 3)
    .map((item, index) => {
      return <li key={index}>{item}</li>;
    });

  const tracks = topTracks.map((item, index) => {
    return <li key={index}>{item}</li>;
  });

  return (
    <div className="artist-search-container">
      <div
        style={{ cursor: "pointer" }}
        className="artist-title"
        onClick={() => setSelectedArtist(artist)}
      >
        <img src={img} alt="" />
        <div className="artist-name">
          <b>{artist}</b>
          <br />
          <span>Total Listeners: {totalListeners}</span>
        </div>
      </div>
      <div className="track-list">
        <h5>Top Ten Tracks</h5>
        <ul>
          {collapse ? collapseTracks : tracks}

          <li
            onClick={() => setCollapse((prevCollapse) => !prevCollapse)}
            key="..."
            style={{ fontWeight: "bold", cursor: "pointer" }}
          >
            {collapse ? "more" : "less"}...
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ArtistSearchItem;
