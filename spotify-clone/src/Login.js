import React from "react"
import { Container } from "react-bootstrap"
import styles from './Login.module.css';

const generateRandomString = (myLength) => {
    const chars =
        "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";
    const randomArray = Array.from(
        { length: myLength },
        (v, k) => chars[Math.floor(Math.random() * chars.length)]
    );

    const randomString = randomArray.join("");
    return randomString;
};

const redirect = "http://localhost:3000"
const client_id = "026018b24fa74bc9a78293bd0823647f"
var state = generateRandomString(16)

const AUTH_URL =
    `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state&state=${state}`;

export default function Login() {
    return (
        <div className={styles.mainWrapper}>
            <h1 className={styles.title}>Spotify Interface Demo : </h1>
            <a className="btn btn-success btn-lg" href={AUTH_URL}>
                Login With Spotify
            </a>
        </div>
    )
}