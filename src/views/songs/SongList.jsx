import "./SongList.css";
import axios from "../../lib/axios-client";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import Confirmation from "../../components/modal/Confirmation";
const SongList = () => {
  const [list, setList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  useEffect(() => {
    updateList();
  }, []);

  const handleDelete = async () => {
    await axios.delete("/api/songs/" + selectedItem.id);
    updateList();
  };

  const updateList = async () => {
    const { data } = await axios.get("/api/songs");
    setList(data);
  };

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setOpenModal(true);

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
              <th>Excluir</th>
              <th><NavLink to="/musicas/cadastro">Cadastrar <FontAwesomeIcon icon={faPlus}  style={{ color: "#ffffff" }} beat size="sm" /></NavLink></th>
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
                  <button onClick={() => handleOpenModal(item)}>
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
      <Confirmation 
      isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)} confirmFunc={handleDelete}>
        <h3>Tem certeza que deseja excluir o item "{selectedItem?.name}"?</h3>
      </Confirmation>
    </div>
  );
};

export default SongList;
