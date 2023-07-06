import ListTable from "../../components/list/ListTable";

const speederTblProps = {

  title: 'Speeders',
  entityName: 'speeders',
  routeName: 'speeder',
  tableHeaders: ['Música', 'Descrição', 'Original BPM', 'Atual BPM', "Completo", "Última atualização"]
}

const SpeederList = () => {

return (
  <>
  <ListTable title={speederTblProps.title} entityName={speederTblProps.entityName} routeName={speederTblProps.routeName} tableHeaders={speederTblProps.tableHeaders}/>
  </>
)
}

export default SpeederList;
