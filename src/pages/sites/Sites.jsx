import './../../pages/listeConge/listeConge.scss'
import { DataGrid } from '@mui/x-data-grid'
import { Link, useNavigate } from 'react-router-dom';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import { DeleteOutline, VisibilityOutlined} from '@mui/icons-material';
import AddHomeOutlinedIcon from '@mui/icons-material/AddHomeOutlined';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { useEffect, useState } from 'react';
import config from './../../config'
import axios from 'axios';
import Swal from 'sweetalert2';
import SitesForm from './form/SitesForm';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '1px solid #FFF',
    boxShadow: 24,
    p: 3,
    borderRadius: 2,
  }

const Sites = () => {


  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN
  const navigate = useNavigate();

  const columns = [
    {
        field: 'company_name',
        headerName: 'Client',
        width: 120 
    },
    {
      field: 'avenue',
      headerName: 'Avenue',
      width: 120 
    },
    {
        field: 'quartier',
        headerName: "Quartier",
        width: 120 
    },
    {
      field: 'commune',
      headerName: 'Commune',
      width: 120 
    },
    {
        field: 'numero',
        headerName: "Numero de parcelle",
        width: 150,
    },
    {
        field: 'description',
        headerName: "Description",
        width: 150,
    },
    {field: 'action', HeaderName: 'Action', width: 150, renderCell: (params) =>{
      const handleEdit = () => {
        Swal.fire({
          title: 'Confirmation',
          text: 'Voulez-vous vraiment modifier ?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Oui',
          cancelButtonText: 'Non',
        }).then((result) => {
          if (result.isConfirmed) {
            navigate(`/sitesEdit/${params.row.id}`);
          }
        });
      }
        return(
          <>
            <div className="table-icons-row">
                <div className="userOvert0">
                  <Link onClick={handleEdit}>
                    <ModeEditOutlineIcon className='userListBtn'/>
                    <span className='userOvert'>Modifier</span>
                  </Link>
                </div>
                <div className="userOvert1">
                  <VisibilityOutlined className='userEye' onClick={() => navigate(`/sitesView/${params.row.id}`)} />
                  <span className='userOvert'>détail</span>
                </div>
                <div className="userOvert2">
                  <DeleteOutline className="userListDelete" onClick={() => { handleDelete(params.row.id) }} />
                  <span className='userOvert'>Supprimer</span>
                </div>
            </div>
          </>
        )
    }},
  ];

  useEffect(()=>{
    const fetchData = async ()=> {
        try{
            const {data} = await axios.get(`${DOMAIN}/api/admin/sites`);
            setData(data)
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
      await axios.delete(`${DOMAIN}/api/admin/siteDelete/${id}`);
      window.location.reload();
    }
  } catch (err) {
    console.log(err);
  }
};

  return (
    <>
      <div className="listeConge">
        <div className="liste-wrapper">
          <div className="contrats-top">
              <AddHomeOutlinedIcon className='contrats-icon'/>
              <div className="contrats-info">
                  <h2 className="contrats-title">Lieu du travail</h2>
                  <span className="contrats-span"></span>
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
                <Box component="form" sx={{ '& > :not(style)': { m: 1 } }}>
                  <SitesForm handleModalClose={handleClose} />
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

export default Sites