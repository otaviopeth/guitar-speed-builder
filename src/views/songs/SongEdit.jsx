import { useParams } from "react-router-dom"
import SongItem from "./SongItem";
const SongEdit = () => {

  const {id} = useParams();

  
  return (
    <SongItem method="edit" apiRoute={`/api/songs/${id}`} mainBtn="Editar"/>
  )
}

export default SongEdit