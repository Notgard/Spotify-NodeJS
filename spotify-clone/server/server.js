const express = require('express');
const SpotifyAPI = require('spotify-web-api-node')

var app = express();

app.post("/login", function(req, res) {
    const code = req.body.code
    const spotify = new SpotifyAPI({
        clientId: '026018b24fa74bc9a78293bd0823647f',
        clientSecret: 'ad450f1b8a714c3daa19b13189cf0114',
        redirectUri: 'http://localhost/3000'
    })

    SpotifyAPI.authorizationCodeGrant(code).then(data =>
        res.json({
            accessToken : data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        }).catch(err => {
            res.sendStatus(400)
        })
    );
})

