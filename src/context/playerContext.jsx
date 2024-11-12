import React, { useEffect, useRef, useState } from "react";
import { createContext } from "react";
import { songsData } from "../assets/assets";

// Create a context for the player
export const PlayerContext = createContext();

// Define the PlayerContextProvider component
const PlayerContextProvider = (props) => {
  // Create refs for the audio element, seek background, and seek bar
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  // Set initial state for the current track, player status, and time
  const [track, setTrack] = useState(songsData[0]);
  const [playerStatus, setPlayerStatus] = useState();
  const [time, setTime] = useState({
    currentTime: {
      seconds: 0,
      minutes: 0,
    },
    totalTime: {
      seconds: 0,
      minutes: 0,
    },
  });

  // Function to play the audio
  const play = () => {
    setPlayerStatus(true);
    audioRef.current.play();
  };

  // Function to pause the audio
  const pause = () => {
    setPlayerStatus(false);
    audioRef.current.pause();
  };

  const playWithId = async (id) => {
    await setTrack(songsData[id]);
    await audioRef.current.play();
    setPlayerStatus(true);
  };

  const previous = async () => {
    if (track.id > 0) {
      await setTrack(songsData[track.id - 1]);
      await audioRef.current.play();
      setPlayerStatus(true);
    } else {
      await setTrack(songsData[songsData.length - 1]);
      await audioRef.current.play();
      setPlayerStatus(true);
    }
  };

  const next = async () => {
    if (track.id < songsData.length - 1) {
      await setTrack(songsData[track.id + 1]);
      await audioRef.current.play();
      setPlayerStatus(true);
    } else {
      await setTrack(songsData[0]);
      await audioRef.current.play();
      setPlayerStatus(true);
    }
  };

  const seeksong = async (e) => {
    audioRef.current.currentTime =
      (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
      audioRef.current.duration;
  };

  // Use useEffect to handle audio time updates
  useEffect(() => {
    // Set a timeout to ensure the audio element is ready before adding event listeners
    setTimeout(() => {
      // Add an event listener for the 'timeupdate' event
      audioRef.current.ontimeupdate = () => {
        // Calculate the width of the seek bar based % of song completed
        seekBar.current.style.width = `${
          (audioRef.current.currentTime / audioRef.current.duration) * 100
        }%`;

        // Update the time state with current and total time values (this is for the numbers in the player)
        setTime({
          currentTime: {
            seconds: Math.floor(audioRef.current.currentTime % 60),
            minutes: Math.floor(audioRef.current.currentTime / 60), // these are objects writing this cuz sometimes i get confused
          },
          totalTime: {
            seconds: track.duration.split(":")[1],
            minutes: track.duration.split(":")[0],
          },
        });
      };
    }, 1000);
  }, [audioRef]); // Add audioRef to dependency array to re-run when the ref changes this shit is important

  // another object which gets passed to other files
  const contextValue = {
    audioRef,
    seekBar,
    seekBg,
    track,
    setTrack,
    playerStatus,
    setPlayerStatus,
    time,
    setTime,
    play,
    pause,
    playWithId,
    previous,
    next,
    seeksong,
  };

  // Return the PlayerContextProvider component, wrapping the children with the context value
  // idk why this is necessary but it is
  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

// Export the PlayerContextProvider component
export default PlayerContextProvider;
