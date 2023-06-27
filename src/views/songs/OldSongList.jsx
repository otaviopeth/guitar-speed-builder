/*
import "./SongList.css";
import axios from "../../lib/axios-client";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
const SongList = () => {
  const [list, setList] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    handleList();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete("/api/songs/" + id);
    handleList();
  };

  const handleList = async () => {
    const { data } = await axios.get("/api/songs");
    setList(data);
  };

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
                <td>
                  <button>
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      size="2xl"
                      style={{ color: "#c21f9f" }}
                    />
                  </button>
                </td>
                <td>
                  <button onClick={() => handleDelete(item.id)}>
                    <FontAwesomeIcon
                      icon={faTrash}
                      size="2xl"
                      style={{ color: "#c21f9f" }}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SongList;
/*