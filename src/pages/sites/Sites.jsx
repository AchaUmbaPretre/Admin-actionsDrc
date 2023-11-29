import './../../pages/listeConge/listeConge.scss'
import { DataGrid } from '@mui/x-data-grid'
import { Link, useNavigate } from 'react-router-dom';
import { DeleteOutline, EditOutlined, VisibilityOutlined} from '@mui/icons-material';
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
import BarReturn from '../../components/barReturn/BarReturn';
import { Popconfirm } from 'antd';
import { FadeLoader } from 'react-spinners';

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
      field: 'description',
      headerName: "Nom du site",
      width: 150,
    },
    {
        field: 'company_name',
        headerName: 'Client',
        width: 140 
    },
    {
      field: 'avenue',
      headerName: 'Avenue',
      width: 130 
    },
    {
        field: 'quartier',
        headerName: "Quartier",
        width: 130 
    },
    {
      field: 'commune',
      headerName: 'Commune',
      width: 130 
    },
    {
        field: 'numero',
        headerName: "N° de parcelle",
        width: 130,
    },
    {field: 'Action', HeaderName: 'Action', width: 150, renderCell: (params) =>{
      const handleEdit = () => {
          navigate(`/sitesEdit/${params.row.id}`);
      }
        return(
          <>
            <div className="table-icons-row">
                <div className="userOvert0">
                  <EditOutlined className='userListBtn' onClick={handleEdit}/>
                  <span className='userOvert'>Modifier</span>
                </div>
                <div className="userOvert1">
                  <VisibilityOutlined className='userEye' onClick={() => navigate(`/sitesView/${params.row.id}`)} />
                  <span className='userOvert'>détail</span>
                </div>
                <div className="userOvert2">
                  <Popconfirm
                    title="Êtes-vous sûr de vouloir supprimer?"
                    onConfirm={() => { handleDelete(params.row.id) }}
                    okText="Oui"
                    cancelText="Non"
                  >
                    <DeleteOutline className="userListDelete"/>
                  </Popconfirm>
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
      await axios.put(`${DOMAIN}/api/admin/siteDelete/${id}`);
      window.location.reload();
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
                  <span className="contrats-span">Liste des sites</span>
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
        <BarReturn/>
        {loading ? (
          <div className="spinner-container">
            <FadeLoader color={'#36D7B7'} loading={loading} />
          </div>) :
        <DataGrid rows={data} columns={columns} pageSize={10} checkboxSelection className="presenceTable" />
        }
      </div>  
    </>
  )
}

export default Sites