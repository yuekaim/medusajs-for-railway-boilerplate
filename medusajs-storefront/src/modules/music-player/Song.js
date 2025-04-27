import React from 'react';
import { IoIosMusicalNotes } from "react-icons/io";
import tracks from './Tracks';
import { useEffect } from 'react';

const Song = ({ songIndex, title, buyLink, artist, active, onSongClick, isPlaying }) => {
    return (
        <div 
            className={`song flex flex-row items-center`}
            onClick={
                // changePlayStatus();  // Change play status in the local state
                // onSongClick(songIndex);
                onSongClick
            }
        >
            <div className='h-max playButton'>
                {active && isPlaying ? <IoIosMusicalNotes /> : songIndex + '.'}
            </div>
            {/* <div className={`${active ? 'inline-block' : 'hidden'}`}><IoIosPlay /></div> */}
            <div className={`hover:bg-gray-200 hover:cursor-pointer ml-2 ${active ? 'bg-gray-200' : ''}`}>{title} - {artist}</div>
            {/* <div className='px-4 text-[blue] hover:italic'><a href={buyLink} target='_blank'>{active ? 'BUY' : ''}</a></div> */}
        </div>
    );
};

export default Song;
