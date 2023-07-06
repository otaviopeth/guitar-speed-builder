import { useParams } from "react-router-dom"
import SpeederItem from "./SpeederItem";
const SpeederEdit = () => {

  const {id} = useParams();

  
  return (
    <SpeederItem method="edit" apiRoute={`/api/speeders/${id}`} mainBtn="Editar"/>
  )
}

export default SpeederEdit;