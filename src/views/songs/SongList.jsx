import "./SongList.css";
import axios from "../../lib/axios-client";
import { useEffect, useState } from "react";
const SongList = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const songs = async () => {
      const { data } = await axios.get("/api/songs");
      setList(data);
    };

    songs();
  }, []);

  return (
    <div className="song-container">
      <h1>Músicas</h1>
      <div className="song-tbl">
      <table>
        <thead>
          {" "}
          <tr>
            <th>Nome</th>
            <th>Artista</th>
            <th>Gênero</th>
            <th>Editar</th>
            <th>Deletar</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <tr>
              <td>{item.name}</td>
              <td>{item.artist}</td>
              <td>{item.genre}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default SongList;
