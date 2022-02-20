import { useState, useEffect } from 'react'
import axios from 'axios'

export default function UserAuth(code) {
    const [accessToken, setAccessToken] = useState()
    const [refreshToken, setRefreshToken] = useState()
    const [expiresIn, setExpiresIn] = useState()

    useEffect(function () {
        axios.post('http://localhost:3001/login', {
            code,
        }).then(function (res) {
            setAccessToken(res.data.accessToken)
            setRefreshToken(res.data.refreshToken)
            setExpiresIn(res.data.expiresIn)
        })
    })

  return (
    <div>userAuth</div>
  )
}
