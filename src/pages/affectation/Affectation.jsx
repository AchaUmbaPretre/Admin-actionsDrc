import './affectation.scss'
import { DataGrid } from '@mui/x-data-grid'
import { Link } from 'react-router-dom';
import { DeleteOutline} from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { useEffect, useState } from 'react';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Affectation = () => {

  const HandleDelete = (id) =>{
    const dataFilter = data.filter(item=> item.id !== id)
    setData(dataFilter)
  }

  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'emploie_id', headerName: 'employees', width: 200 },

    {
      field: 'fonction_id',
      headerName: 'Fonction_id',
      width: 200 
    },
    {
      field: 'contrat_id',
      headerName: 'Contrat_id',
      width: 200 
    },
    {field: 'action', HeaderName: 'Action', width: 200, renderCell: (params) =>{
        return(
          <>
            <div className="table-icons-row">
                <VisibilityIcon className='userEye'/>
                <DeleteOutline className="userListDelete" onClick={()=>{HandleDelete(params.row.id)}} />
            </div>
          </>

        )
    }},
  ];
  useEffect(() => {

    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/admin/affectation");
        setData(res.data)

      } catch (error) {
        console.log(error)
      };
    }
    fetchData()
  }, [])

  return (
    <>

      <div className="listeConge">
        <div className="liste-wrapper">
          <div className="contrats-top">
              <ShowChartIcon className='contrats-icon'/>
              <div className="contrats-info">
                  <h2 className="contrats-title">Affectation</h2>
                  <span className="contrats-span">Liste des agents affectés</span>
              </div>
          </div>
          <button className="personnel-btn" onClick={handleOpen}><PersonAddAlt1Icon/>Ajouter</button>
        </div>
        <DataGrid rows={data} columns={columns} pageSize={10} checkboxSelection className="presenceTable" />
      </div>
    </>
  )
}

export default Affectation