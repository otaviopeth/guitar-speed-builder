import './SongItem.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../lib/axios-client";
const SongItem = ({method, apiRoute, mainBtn}) => {
  const [name, setName] = useState("");
  const [artist, setArtist] = useState("");
  const [genre, setGenre] = useState("");
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
  const checkEdit = async() => {
    if(method==="edit"){
      const response = await axios.get(apiRoute);
      setName(response.data.name);
      setArtist(response.data.artist);
      setGenre(response.data.genre);
    }
    setErrors([]);
  }

  checkEdit();

}, []);
  
  const handleRegister = async (e) => {
    let errsList = [];
    e.preventDefault();
    try {
     await axios.post(`${apiRoute}`, {
        name,
        artist,
        genre,
      });
      setName("");
      setArtist("");
      setGenre("");
    } catch (err) {
      if (err.response.status === 422) {
        const errs = err.response.data.errors;
        let count = 0;
        for (const key in errs) {
          errsList.push(<li key={count} >{errs[key]}</li>);
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
        name,
        artist,
        genre,
      });
      setName("");
      setArtist("");
      setGenre("");
    } catch (err) {
      console.log(err);
      if (err.response.status === 422) {
        const errs = err.response.data.errors;
        let count = 0;
        for (const key in errs) {
          errsList.push(<li key={count} >{errs[key]}</li>);
          count++;
        }

        setErrors(errsList);
      }
    }
  };
  

  return (
    <div className="item-container">
      <h1>Músicas</h1>
      {errors.length !== 0 && <h4>Erros: </h4>}
      <ul>{errors}</ul>
      <form onSubmit={method==="register" ? handleRegister : handleEdit }>
        <div className="item-reg">
          <div className="itens">
            <label>Nome: <span className="mandatory">*</span></label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="itens">
            <label>Artista: <span className="mandatory">*</span></label>
            <input
              type="text"
              name="artist"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
            />
          </div>
          <div className="itens">
            <label>Gênero:</label>
            <input
              type="text"
              name="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
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

export default SongItem;
