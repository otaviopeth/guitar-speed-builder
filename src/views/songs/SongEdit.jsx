import { useParams } from "react-router-dom"
const SongEdit = () => {

  const {id} = useParams();

  
  return (
    <div>SongEdit - {id}</div>
  )
}

export default SongEdit