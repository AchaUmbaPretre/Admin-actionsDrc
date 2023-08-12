import './clientTab.scss'
import GroupsIcon from '@mui/icons-material/Groups';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { DataGrid } from '@mui/x-data-grid'
import { Link } from 'react-router-dom';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import { DeleteOutline} from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import ClientForm from './form/ClientForm';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'
import { FadeLoader } from 'react-spinners';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  outline: 'none'
}

const ClientTab = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'company_name', headerName: "Company", width: 120 },

    {
      field: 'address',
      headerName: 'Adresse',
      width: 130 
    },
    {
        field: 'phone_number',
        headerName: "Tel de la compagnie",
        width: 150 
    },
    {
        field: 'contact_name',
        headerName: "Nom du contact principal",
        width: 140 
    },
    {
      field: 'contact_email',
      headerName: "Email",
      width: 140 
  },
    {
      field: 'contact_phone',
      headerName: 'Tel principal',
      width: 140 
    },
    {field: 'action', HeaderName: 'Action', width: 150, renderCell: (params) =>{
        return(
          <>
            <div className="table-icons-row">
                <Link to={`/clientUpdate/${params.row.id}`}><ModeEditOutlineIcon className='userListBtn'/></Link>
                <VisibilityIcon className='userEye' onClick={() => navigate(`/viewsClient/${params.row.id}`)}/>
                <DeleteOutline className="userListDelete" onClick={()=>{handleDelete(params.row.id)}} />
            </div>
          </>

        )
    }},
  ];

  useEffect(()=>{
    
    const fetchData = async ()=> {
      try{
          const res = await axios.get("http://localhost:8080/api/admin/client");
          setData(res.data)
          setLoading(false);
  
        }catch(error){
          console.log(error)
        };
  }
  fetchData()
  }, [])

  

/*   const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/admin/client/${id}`);
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  }; */
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
        await axios.delete(`http://localhost:8080/api/admin/client/${id}`);
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <>
        <div className="clientTab">
          <div className="client-wrapper">
            <div className="contrats-top">
              <GroupsIcon className='contrats-icon'/>
              <div className="contrats-info">
                <h2 className="contrats-title">Client</h2>
                <span className="contrats-span">Liste des clients</span>
              </div>
            </div>
            <button className="contrats-btn" onClick={handleOpen}><PersonAddAlt1Icon/>Ajouter</button>
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
                              <ClientForm/>
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

export default ClientTab