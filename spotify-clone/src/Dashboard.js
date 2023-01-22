import { useState, useEffect } from 'react'
import axios from 'axios'

import Player from './Player'
import SpotifyWebApi from "spotify-web-api-node"
import UserAuth from "./UserAuth"
import { Container, Form, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import TrackContainer from './TrackContainer'
import Sidebar from './Sidebar'
import navigationData from "./navigation";


import styles from './Dashboard.module.css';

const spotifyAPI = new SpotifyWebApi({
  clientId: '026018b24fa74bc9a78293bd0823647f',
  clientSecret: 'ad450f1b8a714c3daa19b13189cf0114',
  redirectUri: 'http://localhost:3000'
});

export default function Dashboard({ code }) {
  const accessToken = UserAuth(code);

  let random = () => {
    return Math.random() > 0.5 ? true : false;
  }

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [username, setUsername] = useState("");
  const [language, setLanguage] = useState("");
  const [email, setEmail] = useState("");
  const [followers, setFollowers] = useState(0);
  let img = random ? './content/img/manpfp.png' : './content/img/femalepfp.png';
  const [pfp, setPfp] = useState(img);
  const [playingTrack, setPlayingTrack] = useState()
  const [lyrics, setLyrics] = useState("")

  function chooseTrack(track) {
    setPlayingTrack(track)
    setSearch("")
    setLyrics("")
  }

  useEffect(() => {
    if (!playingTrack) return
    axios
      .get("http://localhost:3001/lyrics", {
        params: {
          track: playingTrack.title,
          artist: playingTrack.artist,
        },
      })
      .then(res => {
        setLyrics(res.data.lyrics)
        console.log(lyrics);
      })
  }, [playingTrack])

  useEffect(() => {
    if (!accessToken) return
    spotifyAPI.setAccessToken(accessToken);
    // Get the authenticated user
    spotifyAPI.getMe()
      .then(function (data) {
        const user = data.body;
        setLanguage(user.country);
        setUsername(user.display_name);
        setEmail(user.email);
        setFollowers(user.followers.total);
        setPfp(user.images[0].url);
      }, function (err) {
        console.log('Something went wrong!', err);
      });
  }, [accessToken]
  )


  useEffect(() => {
    if (!accessToken) return
    if (!search) return setSearchResult([]);

    let cancelOnGoingRequest = false;
    // Do search using the access token
    spotifyAPI.searchTracks(search).then(
      function (data) {
        if (cancelOnGoingRequest) return;
        console.log(data.body);
        setSearchResult(
          data.body.tracks.items.map(track => {
            return {
              artist: track.artists[0].name,
              title: track.album.name,
              uri: track.uri,
              thumbnail: track.album.images[track.album.images.length - 1].url
            }
          })
        )
        console.log(searchResult);

      },
      function (err) {
        console.log('Something went wrong!', err);
      }
    );
    return () => cancelOnGoingRequest = true;
  }, [accessToken, search]
  )

  function resetLyrics() {
    setLyrics("");
  }

  return (
    <div class="d-flex flex-row flex-grow-1" className={styles.mainWrapper}>
      <Sidebar navigationData={navigationData} pfpUrl={pfp} username={username} email={email} language={language} followers={followers} />
      <div class="d-flex flex-column ml-5" className={styles.searchWrapper}>
        <div>
          <Form.Control type="search" placeholder="Search Artists/Albums"
            value={search} onChange={e => setSearch(e.target.value)}
            className={styles.searchbar} onClick={resetLyrics} >
          </Form.Control>
        </div>
        {searchResult.map(track => (
          <TrackContainer track={track} key={track.uri} chooseTrack={chooseTrack} />
        ))}
        {searchResult.length === 0 && (
          <div className={styles.lyricsWrapper} style={{ whiteSpace: "pre" }}>
            {lyrics}
          </div>
        )}
        {/* <Player accessToken={accessToken} /> */}
      </div>
    </div >
  )
}
