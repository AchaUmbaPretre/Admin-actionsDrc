import './listeConge.scss'
import { DataGrid } from '@mui/x-data-grid'
import { Link } from 'react-router-dom';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import { DeleteOutline} from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { useState } from 'react';
import { Box } from '@mui/material';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import FormConge from './formConge/FormConge';

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

const ListeConge = () => {

  const HandleDelete = (id) =>{
    const dataFilter = data.filter(item=> item.id !== id)
    setData(dataFilter)
  }
  const [data, setData] = useState();

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
    {field: 'actions', HeaderName: 'Action', width: 160, renderCell: (params) =>{
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
              <ChecklistRtlIcon className='contrats-icon'/>
              <div className="contrats-info">
                  <h2 className="contrats-title">Demande de congé</h2>
                  <span className="contrats-span">Liste des congés</span>
              </div>
          </div>
          <button className="personnel-btn" onClick={handleOpen}><PersonAddAlt1Icon/>Nouveau</button>
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
                  <FormConge handleClose={handleClose}/>
                </Box>
              </Box>
            </Fade>
          </Modal>
        </div>
        <DataGrid rows={''} columns={columns} pageSize={10} checkboxSelection className="presenceTable" />
      </div>
    </>
  )
}

export default ListeConge