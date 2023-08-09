import { DataGrid } from '@mui/x-data-grid'
import { Link } from 'react-router-dom';
import './presence.scss'
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import { DeleteOutline} from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import {presents} from './../../data'
import axios from 'axios';
import PresenceForm from './form/PresenceForm';
import { format } from 'date-fns';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '1px solid #FFF',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  outline: 'none'
}

const Presence = () => {
  const [data, setData] = useState([]);
  const [employeeId, setEmployeeId] = useState('');
  const [checkInTime, setCheckInTime] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');

  const HandleDelete = (id) =>{
    const dataFilter = data.filter(item=> item.id !== id)
    setData(dataFilter)
  }

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(()=>{

    const fetchData = async ()=> {
        try{
            const res = await axios.get("http://localhost:8080/api/admin/presence");
            setData(res.data)
    
          }catch(error){
            console.log(error)
          };
    }
    fetchData()
 }, [])

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
        width: 150,
        valueGetter: (params) =>
        format(new Date(params.row.date), 'yyyy-MM-dd'),
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
          <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                    }} 
                >
                    <Fade in={open}>
                        <Box sx={style}>
                            <Box component="form" sx={{'& > :not(style)': { m: 1},}} noValidate autoComplete="off">
                              <PresenceForm/>
                            </Box>
                        </Box>
                    </Fade>
          </Modal>
        </div>
        <DataGrid rows={data} columns={columns} pageSize={10} checkboxSelection className="presenceTable" />
      </div>

    </>
  )
}

export default Presence