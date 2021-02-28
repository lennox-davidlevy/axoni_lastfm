const getTopTenTracksAndOrder = (arr) => {
  const result = [];
  arr.forEach((item) => {
    const trackData = item.toptracks.track;
    const artistObj = {};
    artistObj.artist = trackData[0].artist.name;
    artistObj.totalListeners = countTenTracks(trackData);
    artistObj.topTracks = listTenTracks(trackData);
    artistObj.images = trackData[0].image;
    result.push(artistObj);
  });
  result.sort((a, b) => b.totalListeners - a.totalListeners);
  return result;
};

const countTenTracks = (arr) => {
  let total = 0;
  for (let i = 0; i < 10; i++) {
    let track = arr[i];
    if (track && track.listeners) {
      total += parseInt(track.listeners);
    }
  }
  return total;
};

const listTenTracks = (arr) => {
  const result = [];
  for (let i = 0; i < 10; i++) {
    let track = arr[i];
    if (track && track.name) {
      //let adjustedTrackName;
      //if (track.name.length > 35) {
      //adjustedTrackName = `${track.name.slice(0, 35)}...`;
      //} else {
      //adjustedTrackName = track.name;
      //}
      result.push(track.name);
    }
  }
  return result;
};

const trimTracks = (arr) => {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    let track = arr[i];
    if (track.length > 20) {
      track = `${track.slice(0, 20)}...`;
    }
    result.push(track);
  }
  return result;
};
export { getTopTenTracksAndOrder, trimTracks };
