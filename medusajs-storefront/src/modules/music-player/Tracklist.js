import React, {useState} from "react";
import Song from "./Song";
import tracks from "./Tracks";

const Tracklist = ({onTrackSelect, currentTrackIndex, isPlaying}) => {
    const songs = tracks.map((song, index) => {
        const isActive = index === currentTrackIndex;
        return (
            <Song 
                key={index} // Always add a key when rendering lists
                songIndex = {index + 1}
                title={song.title}
                artist={song.artist}
                link={song.link}
                active={isActive}
                onSongClick={() => onTrackSelect(index)}
                isPlaying={isPlaying}
                buyLink={song.buyLink}
            />
        );
    });

    return (
        <>
            <div>{songs}</div>
        </>
    );
};

export default Tracklist;

