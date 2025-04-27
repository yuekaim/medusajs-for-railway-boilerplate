import React, { useEffect, useState } from "react";
import tracks from "./Tracks";
import { Howl, Howler } from "howler";
import { IoIosPlay, IoIosPause, IoMdVolumeOff, IoMdVolumeHigh } from "react-icons/io";
import { ImShuffle } from "react-icons/im";
import { Slider } from "@nextui-org/slider";
import Marquee from "react-fast-marquee";
import Draggable from "react-draggable";
import { FiMinimize2, FiMaximize2 } from "react-icons/fi";

const Player = ({ currentTrackIndex, setCurrentTrackIndex, isPlaying, setIsPlaying }) => {
    const [sound, setSound] = useState(null);
    const [volume, setVolume] = useState(0);
    const [playhead, setPlayhead] = useState(0);
    const [duration, setDuration] = useState(0);
    const [minimize, setMinimize] = useState(false);

    const getPlayhead = (sound) => {
        setPlayhead(Math.floor(sound.seek()));
    };

    const resetPlayer = () => {
        setPlayhead(0);
        // setDuration(0);
        if (sound) {
            sound.stop();
            sound.unload();
            setSound(null);
        }
    };

    useEffect(() => {
        // Only set the interval if the sound object is defined
        if (sound) {
            const interval = setInterval(() => getPlayhead(sound), 100);
    
            // Cleanup function to clear the interval
            return () => clearInterval(interval);
        }
    });

    useEffect(() => {
        resetPlayer();

        // Load the new track when currentTrackIndex changes
        if (currentTrackIndex !== -1) {

            const newSound = new Howl({
                src: [tracks[currentTrackIndex].link],
                // html5: true,
                volume: volume,
                onend: () => {
                    setIsPlaying(false); // Stop playing when the track ends
                    resetPlayer();
                },
            });

            setSound(null);
            setSound(newSound);
            setDuration(Math.floor(newSound.duration()));

            if (isPlaying) {
                newSound.play();
            }

            return () => {
                newSound.unload(); // Cleanup sound when component unmounts
            };
        }
    }, [currentTrackIndex]);

    useEffect(() => {
        if (sound) {
            if (isPlaying) {
                setVolume(volume == 0 ? 0.5 : volume)
                sound.play();
            } else {
                sound.pause();
            }
        }
    }, [isPlaying]);

    useEffect(() => {
        if (sound) {
            sound.volume(volume);
        }
    }, [volume, sound]);

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    if (currentTrackIndex === -1) {
        return <div>No track selected</div>;
    }

    const handleShuffle = () => {
        setCurrentTrackIndex(Math.floor(Math.random() * tracks.length));
    }

    const minimizePlayer = () => {
        setMinimize(!minimize);
    }

    return (
        <Draggable>
        <div className={`flex lg:flex-row items-center lg:space-x-2 ${minimize ? 'w-80' : 'lg:w-[70vw]'} w-fit px-4 py-2 gap-4
                        border-1 border-black cursor-move bg-white gap-y-2 ${minimize ? 'flex-row' : 'flex-col'}`}>
        {/* <div className="flex flex-col items-center space-x-4 w-max"> */}
            <div className={`flex items-center gap-2`}>
                <button onClick={handleShuffle} aria-label="Shuffle" className={`${minimize ? 'hidden' : ''}`}>
                    <ImShuffle />
                </button>
                <button 
                    onClick={handlePlayPause}
                    aria-label={isPlaying ? "Pause" : "Play"}
                >
                    {isPlaying ? <IoIosPause /> : <IoIosPlay />}
                </button>
            </div>
            <div className={`${minimize ? 'hidden' : ''}`}>Currently playing: </div>
            <div className="w-40 flex-1 border-x-1 border-black">
                <Marquee speed={50} className="px-4 font-semibold" pauseOnHover>
                    <div className="flex px-4">
                        {tracks[currentTrackIndex].title} 
                        <div className="px-1">-</div> 
                        {tracks[currentTrackIndex].artist}
                    </div>
                </Marquee>
            </div>
            <div className={`px-4 hover:italic ${minimize ? 'hidden' : ''}`}><a href={tracks[currentTrackIndex].buyLink} target='_blank'>GO TO RELEASE</a></div>
            <div className={`w-20 text-sm ${minimize ? 'hidden' : ''}`}>
                {/* display playhead time in mm:ss */}
                {Math.floor(playhead / 60) < 10 ? '0' + Math.floor(playhead / 60) : Math.floor(playhead / 60)}
                :
                {(playhead % 60) <10 ? '0' + (playhead % 60) : (playhead % 60)} 
                /
                {/* duration of track */}
                {Math.floor(duration / 60) < 10 ? '0' + Math.floor(duration / 60) : Math.floor(duration / 60)}
                :
                {(duration % 60) <10 ? '0' + (duration % 60) : (duration % 60)} 
            </div>
            <div className={`flex items-center gap-2 lg:w-1/6 w-40`}>
                <button onClick={()=>{
                    if (volume == 0) {
                        setVolume(0.5);
                    } else {
                        setVolume(0);
                    }
                }}>{volume > 0 ? <IoMdVolumeHigh /> : <IoMdVolumeOff />}</button>
                <Slider
                    size="sm"
                    step={0.1}
                    maxValue={1}
                    minValue={0}
                    color="foreground"
                    value={volume}
                    className={` ${minimize ? 'hidden' : ''}`}
                    onChange={setVolume}
                    aria-label="Volume control"
                />
            </div>
            <button onClick={minimizePlayer}>{minimize ? <FiMaximize2 /> : <FiMinimize2 />}</button>
        </div>
        </Draggable>
    );
};

export default Player;
