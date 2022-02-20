import { useState, useEffect } from 'react'
import axios from 'axios'
import SpotifyWebApi from "spotify-web-api-node"
import UserAuth from "./UserAuth"

const spotifyAPI = new SpotifyWebApi

export default function Dashboard({ code }) {
    const accessToken = UserAuth(code)


  return (
    <div>Dashboard, code: {code}</div>
  )
}
