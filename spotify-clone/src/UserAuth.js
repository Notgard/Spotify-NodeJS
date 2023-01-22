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
            console.log(res.data)
            setAccessToken(res.data.accessToken)
            setRefreshToken(res.data.refreshToken)
            setExpiresIn(res.data.expiresIn)
            window.history.pushState({}, null, "/")
        }).catch(function (err) {
            window.location = "/"
        })
    }, [code]//Whenever the code changes dependency
    )

    useEffect(() => {
        if (!refreshToken || !expiresIn) return;
        const interval = setInterval(() => {
            axios.post("http://localhost:3001/refresh", { 
                refreshToken
            }).then(function (res) {
                setAccessToken(res.data.acessToken)
                setExpiresIn(res.data.expiresIn)
            }).catch(function (err) {
                window.location = "/"
            })
        }, (expiresIn)*1000)
        return () => clearInterval(interval)
    }, [refreshToken, expiresIn])
    

    return accessToken
}
