import "./ListTable.css";
import axios from "../../lib/axios-client";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import Confirmation from "../modal/Confirmation";
const ListTable = ({title, entityName, routeName, tableHeaders}) => {
  const [list, setList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  useEffect(() => {
    updateList();
  }, []);

  const handleDelete = async () => {
    await axios.delete(`/api/${entityName}/${selectedItem.id}`);
    updateList();
  };

  const updateList = async () => {
    const { data } = await axios.get(`/api/${entityName}`);
    setList(data);
  };

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setOpenModal(true);

  };

  return (
    <div className="list-container">
      <h1>{title}</h1>
      <div className="list-tbl">
        <table>
          <thead>
            <tr>
              {tableHeaders.map(item => (
                <th>{item}</th>
              ))}
              <th>Editar</th>
              <th>Excluir</th>
              <th><NavLink to={`/${routeName}/cadastro`}>Cadastrar <FontAwesomeIcon icon={faPlus}  style={{ color: "#ffffff" }} beat size="sm" /></NavLink></th>
            </tr>
          </thead>
          <tbody>
          {list.map((item) => (
              <tr>
                {entityName==="songs" &&
                <>
                <td>{item.name}</td>
                <td>{item.artist}</td>
                <td>{item.genre}</td>
                </>}

                {entityName==="speeders" &&
                <>
                <td>{item.song.name}</td>
                <td>{item.desc}</td>
                <td>{item.og_speed}</td>
                <td>{item.cur_speed}</td>
                <td>{item.cur_speed>=item.og_speed ? "Sim" : "Não"}</td>
                <td>{item.updated_at.split('T')[0]}</td>
                </>}
                
                <td>
                  <NavLink to={`/${routeName}/edit/${item.id}`}>
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      size="lg"
                      style={{ color: "#c21f9f"}}
                    />
                  </NavLink>
                </td>
                <td>
                  <button onClick={() => handleOpenModal(item)}>
                    <FontAwesomeIcon
                      icon={faTrash}
                      size="2xl"
                      style={{ color: "#c21f9f"}}
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
        <h3>Tem certeza que deseja excluir o item "{selectedItem?.name ? selectedItem?.name : `${selectedItem?.song?.name} - ${selectedItem?.desc}`}"?</h3>
      </Confirmation>
    </div>
  );
};

export default ListTable;
