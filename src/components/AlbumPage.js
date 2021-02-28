import React from "react";
import AlbumPageItem from "./AlbumPageItem";

const AlbumPage = ({ data }) => {
  return (
    <div className="album-info-container">
      <h1>Albums</h1>
      <div>
        {data.slice(0, 10).map((item, index) => {
          if (item && item.album) {
            const { name, image, tracks, tags, wiki } = item.album;
            return (
              <AlbumPageItem
                key={index}
                name={name}
                image={image}
                tracks={tracks}
                tags={tags}
                wiki={wiki}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default AlbumPage;
