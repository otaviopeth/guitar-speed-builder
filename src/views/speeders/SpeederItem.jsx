import "./SpeederItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../lib/axios-client";
import useAuthContext from "../../contexts/AuthContext";
const SpeederItem = ({ method, apiRoute, mainBtn }) => {
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState();
  const [desc, setDesc] = useState("");
  const [ogSpeed, setOgSpeed] = useState("");
  const [curSpeed, setCurSpeed] = useState("");
  const [errors, setErrors] = useState([]);

  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const checkEdit = async () => {
      if (method === "edit") {
        const response = await axios.get(apiRoute);
        console.log(response);
        setDesc(response.data.desc);
        setOgSpeed(response.data.og_speed);
        setCurSpeed(response.data.cur_speed);
        setSelectedSong(response.data.song_id);
      }
      setErrors([]);
    };
    checkEdit();
    fillSongList();
  }, []);

  const fillSongList = async () => {
    const { data } = await axios.get("/api/songs");
    setSongs(data);
  };
  const handleRegister = async (e) => {
    let errsList = [];
    e.preventDefault();
    try {
      await axios.post(`${apiRoute}`, {
        song_id: selectedSong,
        desc,
        og_speed: ogSpeed,
        cur_speed: curSpeed,
        user_id: user.id,
      });
      setDesc("");
      setOgSpeed("");
      setCurSpeed("");
    } catch (err) {
      if (err.response.status === 422) {
        const errs = err.response.data.errors;
        let count = 0;
        for (const key in errs) {
          errsList.push(<li key={count}>{errs[key]}</li>);
          count++;
        }

        setErrors(errsList);
      }
    }
  };

  const handleEdit = async (e) => {
    let errsList = [];
    e.preventDefault();
    try {
      await axios.put(`${apiRoute}`, {
        song_id: selectedSong,
        desc,
        og_speed: ogSpeed,
        cur_speed: curSpeed,
        user_id: user.id,
      });
      setDesc("");
      setOgSpeed("");
      setCurSpeed("");
    } catch (err) {
      console.log(err);
      if (err.response.status === 422) {
        const errs = err.response.data.errors;
        let count = 0;
        for (const key in errs) {
          errsList.push(<li key={count}>{errs[key]}</li>);
          count++;
        }

        setErrors(errsList);
      }
    }
  };

  return (
    <div className="speeder-container">
      <h1>Speeders</h1>
      {errors.length !== 0 && <h4>Erros: </h4>}
      <ul>{errors}</ul>
      <form onSubmit={method === "register" ? handleRegister : handleEdit}>
        <div className="speeder-reg">
          <div className="speeders">
            
            <select value={selectedSong}
              onChange={(e) => {
                setSelectedSong(e.target.value);
              }}
            >
              {songs.map((item) => (
                <option value={item.id}>{item.name}</option>
              ))}
            </select>
          </div>
          <div className="speeders">
            <label>
              Descrição:
            </label>
            <input
              type="text"
              name="desc"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
<div className="bpm">
          <div className="speeders">
            <label>Original BPM:</label>
            <input
              type="number"
              min="1"
              max="500"
              name="ogspeed"
              value={ogSpeed}
              onChange={(e) => setOgSpeed(e.target.value)}
            />
          </div>
          <div className="speeders">
            <label>Atual BPM:</label>
            <input
              type="number"
              min="1"
              max="500"
              name="curspeed"
              value={curSpeed}
              onChange={(e) => setCurSpeed(e.target.value)}
            />
          </div>
          </div>
         
    
          <div className="btn-container">
            <button type="button" id="back" onClick={() => navigate(-1)}>
              <FontAwesomeIcon icon={faRotateLeft} spin spinReverse size="xl" />
            </button>
            <button type="submit">{mainBtn}</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SpeederItem;
