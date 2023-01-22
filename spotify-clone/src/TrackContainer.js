import React from 'react'
import { Container } from 'react-bootstrap'
export default function TrackContainer({ track, chooseTrack }) {

    function handlePlay() {
        return chooseTrack(track);
    }

    return (
        <Container>
            <div class="d-flex flex-row p-2 m-2">

                <div class="track-images"
                    style={{ cursor: 'pointer' }}
                    onClick={handlePlay}
                >
                    <img src={track.thumbnail} alt=""/>
                </div>

                <div class="m-1">
                    <em style={{ color: "white" }}>{track.artist}</em> <p class="text-muted">{track.title}</p>
                </div>
                <hr class="mt-2 mb-3"/>
            </div>
            <hr class="mt-2 mb-3"/>
        </Container>
    )
}
