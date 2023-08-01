import './affectation.scss'
import { DataGrid } from '@mui/x-data-grid'
import { Link } from 'react-router-dom';
import { DeleteOutline} from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { useState } from 'react';
import {listeData} from './../../data'
import ShowChartIcon from '@mui/icons-material/ShowChart';

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
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'employee_id', headerName: 'employees', width: 120 },

    {
      field: 'start_date',
      headerName: 'Date de début',
      width: 130 
    },
    {
        field: 'end_date',
        headerName: 'Date de fin',
        width: 150 
    },
    {
        field: 'leave_type',
        headerName: "Type de congé",
        width: 140 
    },
    {
      field: 'status',
      headerName: 'Statut de la demande',
      width: 140 
    },
    {field: 'action', HeaderName: 'Action', width: 150, renderCell: (params) =>{
        return(
          <>
            <div className="table-icons-row">
                <Link to={`/users/${params.row.id}`}><ModeEditOutlineIcon className='userListBtn'/></Link>
                <VisibilityIcon className='userEye'/>
                <DeleteOutline className="userListDelete" onClick={()=>{HandleDelete(params.row.id)}} />
            </div>
          </>

        )
    }},
  ];


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