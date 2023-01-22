const express = require('express');
const SpotifyAPI = require('spotify-web-api-node')
const cors = require('cors');
const bodyParser = require('body-parser');

var app = express();
app.use(cors());
app.use(bodyParser.json());

const credentials = {
    clientId: '026018b24fa74bc9a78293bd0823647f',
    clientSecret: 'ad450f1b8a714c3daa19b13189cf0114',
    redirectUri: 'http://localhost:3000'
}

const lyricsFinder = require('lyrics-finder');

app.post("/login", function (req, res) {
    const code = req.body.code
    const spotify = new SpotifyAPI(credentials)

    spotify.authorizationCodeGrant(code)
        .then(data => {
            res.json({
                accessToken: data.body.access_token,
                refreshToken: data.body.refresh_token,
                expiresIn: data.body.expires_in,
            })
        })
        .catch(err => {
            res.sendStatus(400)
        })
})

app.post('/refresh', function (req, res) {
    const refreshToken = req.body.refreshToken
    console.log("Server ", refreshToken)
    const refreshCredentials = {
        clientId: '026018b24fa74bc9a78293bd0823647f',
        clientSecret: 'ad450f1b8a714c3daa19b13189cf0114',
        redirectUri: 'http://localhost:3000',
        refreshToken
    }
    const spotify = new SpotifyAPI(refreshCredentials)
    spotify.refreshAccessToken().then(
        function (data) {
            res.json({
                acessToken: data.body.accessToken,
                expiresIn: data.body.expiresIn
            })
        })
        .catch((err) => {
            console.log(err)
            res.sendStatus(400)
        })
})

app.get("/lyrics", async (req, res) => {
    const lyrics = (
        await lyricsFinder(req.query.artist, req.query.track)) || "No Lyrics Found"
    res.json({ lyrics }
    )
});

app.listen(3001);

