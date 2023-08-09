import { DataGrid } from '@mui/x-data-grid'
import { Link } from 'react-router-dom';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import { DeleteOutline} from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { useEffect, useState } from 'react';
import './facturation.scss'
import Swal from 'sweetalert2';
import axios from 'axios';
import FactureForm from './form/FactureForm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  bgcolor: 'background.paper',
  border: '1px solid #FFF',
  boxShadow: 24,
  p: 5,
  borderRadius: 2,
  outline: 'none'
}

const Facturation = () => {

  const [data, setData] = useState([]);
  const [optionsClient, setOptionsClient] = useState([]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(()=>{

    const fetchData = async ()=> {
        try{
            const res = await axios.get("http://localhost:8080/api/admin/facture");
            setData(res.data)
    
          }catch(error){
            console.log(error)
          };
    }
    fetchData()
 }, [])

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Es-tu sûr?',
        text: "Vous ne pourrez pas revenir en arrière !",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, supprimez-le!'
      });
  
      if (result.isConfirmed) {
        await axios.delete(`http://localhost:8080/api/admin/facture/${id}`);
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'client_id', headerName: "client", width: 120 },

    {
      field: 'invoice_date',
      headerName: 'Date de la facture',
      width: 130 
    },
    {
        field: 'due_date',
        headerName: "Date d'échéance de la facture",
        width: 150 
    },
    {
        field: 'total_amount',
        headerName: "Montant total",
        width: 140 
    },
    {
      field: 'status',
      headerName: 'Statut de la facture',
      width: 140 
    },
    {field: 'action', HeaderName: 'Action', width: 150, renderCell: (params) =>{
        return(
          <>
            <div className="table-icons-row">
                <Link to={`/users/${params.row.id}`}><ModeEditOutlineIcon className='userListBtn'/></Link>
                <VisibilityIcon className='userEye'/>
                <DeleteOutline className="userListDelete" onClick={()=>{handleDelete(params.row.id)}} />
            </div>
          </>

        )
    }},
  ];


  return (
    <>
      <div className="facturation">
        <div className="facturation-wrapper">
          <div className="contrats-top">
              <ChecklistRtlIcon className='contrats-icon'/>
              <div className="contrats-info">
                  <h2 className="contrats-title">Facturation</h2>
                  <span className="contrats-span">Liste des facturation</span>
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
                              <FactureForm/>
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

export default Facturation