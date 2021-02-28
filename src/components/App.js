import { useState } from "react";
import ArtistSearch from "./ArtistSearch";
import { Spinner } from "react-bootstrap";
import DropDownComponent from "./DropDownComponent";
import ArtistPage from "./ArtistPage";

const App = () => {
  const [artistSearchDisplay, setArtistSearchDisplay] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState("");
  const [artistData, setArtistData] = useState({});
  return (
    <div className="App">
      <div className="header">
        <h1>LastFM Music Catalog</h1>
      </div>
      <DropDownComponent
        setArtistSearch={setArtistSearchDisplay}
        setLoading={setLoading}
        selectedArtist={selectedArtist}
      />
      {loading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
      {selectedArtist ? (
        <ArtistPage
          setSelectedArtist={setSelectedArtist}
          selectedArtist={selectedArtist}
          artistData={artistData}
          setLoading={setLoading}
          loading={loading}
        />
      ) : (
        <ArtistSearch
          data={artistSearchDisplay}
          setSelectedArtist={setSelectedArtist}
        />
      )}
    </div>
  );
};

export default App;
