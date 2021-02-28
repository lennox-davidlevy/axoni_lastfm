import React from "react";
import ArtistSearchItem from "./ArtistSearchItem";

const ArtistSearch = ({ data, setSelectedArtist }) => {
  return (
    <div className="artist-list-container">
      {data.map((item, index) => {
        return (
          <ArtistSearchItem
            key={index}
            data={item}
            setSelectedArtist={setSelectedArtist}
          />
        );
      })}
    </div>
  );
};

export default ArtistSearch;
