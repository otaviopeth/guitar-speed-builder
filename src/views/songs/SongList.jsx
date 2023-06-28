import ListTable from "../../components/list/ListTable";

const songTblProps = {

  title: 'Músicas',
  entityName: 'songs',
  routeName: 'musicas',
  tableHeaders: ['Nome', 'Artista', 'Gênero']
}

const SongList = () => {

  return (
    <>
    <ListTable title={songTblProps.title} entityName={songTblProps.entityName} tableHeaders={songTblProps.tableHeaders} routeName={songTblProps.routeName}/>
    </>
  )
}

export default SongList;
