import { DataGrid } from '@mui/x-data-grid'
import { Link, useNavigate } from 'react-router-dom';
import { DeleteOutline} from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { useEffect, useState } from 'react';
import './horaireAll.scss'
import Horaires from './form/Horaires';
import axios from 'axios';
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import { FadeLoader } from 'react-spinners';

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

const HoraireAll = () => {

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const columns = [
    { field: 'id', headerName: 'ID', width: 60 },
    { field: 'first_name', headerName: "Employé(e)", width: 120 },

    {
      field: 'company_name',
      headerName: 'Client(e)',
      width: 120 
    },
    {
        field: 'start_date',
        headerName: "Date de debut",
        width: 120,
        valueGetter: (params) =>
        format(new Date(params.row.start_date), 'yyyy-MM-dd'),
        
    },
    {
        field: 'end_date',
        headerName: "Date de la fin",
        width: 120,
        valueGetter: (params) =>
        format(new Date(params.row.end_date), 'yyyy-MM-dd'),
    },
    {
      field: 'days',
      headerName: 'Week-end',
      width: 120 
    },
    {
        field: 'start_time',
        headerName: "Heure d'arrivée",
        width: 120 
      },
      {
        field: 'end_time',
        headerName: 'Heure de sortie',
        width: 120 
      },
    {field: 'action', HeaderName: 'Action', width: 150, renderCell: (params) =>{
        return(
          <>
            <div className="table-icons-row">
                <VisibilityIcon className='userEye' onClick={() => navigate(`/horairesView/${params.row.id}`)}/>
                <DeleteOutline className="userListDelete" onClick={()=>{handleDelete(params.row.id)}} />
            </div>
          </>

        )
    }},
  ];

/*   useEffect(()=>{

    const fetchData = async ()=> {
        try{
            const res = await axios.get("http://localhost:8080/api/admin/horaire");
            setData(res.data)
            setLoading(false);
    
          }catch(error){
            console.log(error)
          };
    }
    fetchData()
 }, []) */

 useEffect(()=>{

  const fetchData = async ()=> {
      try{
          const res = await axios.get("http://localhost:8080/api/admin/horaires");
          setData(res.data)
          setLoading(false);
  
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
      await axios.delete(`http://localhost:8080/api/admin/deleteHoraire/${id}`);
      window.location.reload();
    }
  } catch (err) {
    console.log(err);
  }
};


  return (
    <>
      <div className="facturation">
        <div className="facturation-wrapper">
          <div className="contrats-top">
              <AccessTimeIcon className='contrats-icon'/>
              <div className="contrats-info">
                  <h2 className="contrats-title">Heure d'horaire</h2>
                  <span className="contrats-span">Liste des heures d'horaire</span>
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
                              <Horaires/>
                            </Box>
                        </Box>
                    </Fade>
                </Modal>
        </div>
        {loading ? (
        <div className="spinner-container">
            <FadeLoader color={'#36D7B7'} loading={loading} />
        </div>
        ) : (
        <DataGrid rows={data} columns={columns} pageSize={10} checkboxSelection className="presenceTable" />
        )}
      </div>
    </>
  )
}

export default HoraireAll