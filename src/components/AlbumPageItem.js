import React from "react";

const AlbumPageItem = ({ name, image, tracks, tags, wiki }) => {
  return (
    <div className="album-item">
      <div className="album-title">
        <h4>{name ? name : "Unkown"}</h4>
        <img
          className="album-img"
          src={
            image[2]["#text"]
              ? image[2]["#text"]
              : "https://i.pinimg.com/originals/86/f6/dc/86f6dc70f9c0492eb16e00fb0877848c.jpg"
          }
          alt="cover"
        />
      </div>
      <div className="tracklist">
        <h4>Track List</h4>
        <ul>
          {tracks &&
            tracks.track.map((item, index) => {
              return <li key={index}>{item.name}</li>;
            })}
        </ul>
      </div>
      <div className="album-info">
        <h4>Info</h4>
        <div className="release">
          <span style={{ fontWeight: "600" }}>Release Date: </span>
          <span>{wiki && wiki.published ? wiki.published : "Unkown"}</span>
        </div>
        <div className="album-tags">
          <span style={{ fontWeight: "600" }}>Tags: </span>
          <ul>
            {tags.tag.map((item, index) => (
              <li key={index}>{item.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AlbumPageItem;
