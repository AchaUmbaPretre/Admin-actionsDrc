import { DataGrid } from '@mui/x-data-grid'
import { Link } from 'react-router-dom';
import './presence.scss'
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import { DeleteOutline} from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { useState } from 'react';
import {presents} from './../../data'
import axios from 'axios';

const Presence = () => {
  const [data, setData] = useState([]);
  const [employeeId, setEmployeeId] = useState('');
  const [checkInTime, setCheckInTime] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');

  const HandleDelete = (id) =>{
    const dataFilter = data.filter(item=> item.id !== id)
    setData(dataFilter)
  }
  const handleAttendanceSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3000/api/admin/presences', {
      employee_id : employeeId,
      check_in_time: { day: 'lundi', time: checkInTime },
      check_out_time: { day: 'lundi', time: checkOutTime },
    })
      .then(response => {
        console.log('Participation enregistrée avec succès');
      })
      .catch(error => {
        console.error("Erreur lors de l'enregistrement des présences : ", error);
      });
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'employee_id', headerName: 'employees', width: 120 },

    {
      field: 'client_id',
      headerName: 'Clients',
      width: 130 
    },
    {
        field: 'date',
        headerName: 'Date de la présence',
        width: 150 
    },
    {
        field: 'check_in_time',
        headerName: "Heure d'arrivée",
        width: 140 
    },
    {
      field: 'check_out_time',
      headerName: 'Heure de départ',
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
      <div className="presence">
        <div className="presence-wrapper">
          <div className="contrats-top">
              <ChecklistRtlIcon className='contrats-icon'/>
              <div className="contrats-info">
                  <h2 className="contrats-title">Presence</h2>
                  <span className="contrats-span">Liste des presences</span>
              </div>
          </div>
          <button className="personnel-btn" onClick={handleOpen}><PersonAddAlt1Icon/>Ajouter</button>
        </div>
        <DataGrid rows={data} columns={columns} pageSize={10} checkboxSelection className="presenceTable" />
      </div>

    </>
  )
}

export default Presence