import { useState, useEffect } from "react";
import YouTube from "react-youtube";
import axios from "axios";
import "./Looper.css";

const Looper = () => {
  const [url, setUrl] = useState("https://www.youtube.com/watch?v=FNdC_3LR2AI");
  const [player, setPlayer] = useState("null");
  const [rate, setRate] = useState(1);
  const [duration, setDuration] = useState(0);
  const [loopstart, setLoopstart] = useState(0);
  const [loopend, setLoopend] = useState(0);

  const opts = {
    playerVars: {
      start: loopstart,
      end: loopend,
    },
  };

  const convert = (time) => {
    const min = Math.floor(time / 60);
    let sec = min * 60;
    sec = time - sec;
    if (sec <= 9) {
      return `${min}:0${sec}`;
    } else {
      return `${min}:${sec}`;
    }
  };

  const handleRate = (e) => {
    setRate(e.target.value);
    player.setPlaybackRate(Number(e.target.value));
  };

  const handleLoopend = (e) => {
    setLoopend(Number(e.target.value));
  };

  const handleLoopstart = (e) => {
    setLoopstart(Number(e.target.value));
  };

  const onReady = (e) => {
    setPlayer(e.target);
    setDuration(e.target.getDuration());
    setLoopend(Number(e.target.getDuration()));
  };

  const onEnd = () => {
    player.seekTo(loopstart);
    player.playVideo();
  };

  return (
    <div className="looper-container">
      <h1>Insira aqui uma URL do YouTube:</h1>
      <form className="looper">
        <input
          type="text"
          name="yturl"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
        />

        <div className="video">
          <YouTube
            videoId={url.split("v=")[1]}
            onReady={onReady}
            opts={opts}
            onEnd={onEnd}
          />

          <div className="video-configs">
            <span className="video-config-title">
              Multiplicador de velocidade:
            </span>
            <div className="input-bar">
              <input
                type="range"
                min="0.00"
                max="2"
                step="0.05"
                value={rate}
                onChange={handleRate}
              />
              <span>{rate}x</span>
            </div>
            <span className="video-config-title">Configure o início e o fim do loop:</span>
            <div className="input-bar">
              <input
                type="range"
                min="0"
                max={loopend-1}
                step="1"
                value={loopstart}
                onChange={handleLoopstart}
              />
              <span>{convert(loopstart)}</span>
            </div>

            <div className="input-bar">
              <input
                type="range"
                min={loopstart+1}
                max={duration}
                step="1"
                value={loopend}
                onChange={handleLoopend}
              />
              <span>{convert(loopend)}</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Looper;
