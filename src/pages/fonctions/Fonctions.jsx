import './../../pages/listeConge/listeConge.scss'
import { DataGrid } from '@mui/x-data-grid'
import { Link, useNavigate } from 'react-router-dom';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import { DeleteOutline, EditOutlined, AddCircleOutline, VisibilityOutlined} from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { useEffect, useState } from 'react';
import config from './../../config'
import axios from 'axios';
import ContratFonction from './contratFonction/ContratFonction';
import Swal from 'sweetalert2';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 850,
    bgcolor: 'background.paper',
    p: 4,
    borderRadius: 2,
    outline: 'none'
  }

const Fonctions = () => {


  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN
  const navigate = useNavigate();

  const columns = [
    {
      field: 'nom_client',
      headerName: 'Client',
      width: 150 
    },
    {
        field: 'nom',
        headerName: "Competence",
        width: 150 
    },
    {
      field: 'avantages',
      headerName: 'Avantages',
      width: 160 
    },
    {
        field: 'prix',
        headerName: "Prix",
        width: 150,renderCell: (params) => `${params.value} $`
    },
    {
        field: 'salaire',
        headerName: "Salaire",
        width: 150, renderCell: (params) => `${params.value} $`
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
            navigate(`/contratFonctionEdit/${params.row.id}`);
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
                  <VisibilityOutlined className='userEye' onClick={() => navigate(`/fonctionView/${params.row.id}`)} />
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
            const {data} = await axios.get(`${DOMAIN}/api/admin/contratInfo`);
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
      await axios.delete(`${DOMAIN}/api/admin/contratInfo/${id}`);
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
              <ChecklistRtlIcon className='contrats-icon'/>
              <div className="contrats-info">
                  <h2 className="contrats-title">Fonctions</h2>
                  <span className="contrats-span"></span>
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
                <Box component="form" sx={{ '& > :not(style)': { m: 1 } }}>
                  <ContratFonction handleModalClose={handleClose} />
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

export default Fonctions