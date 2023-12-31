import './../../pages/listeConge/listeConge.scss'
import { DataGrid } from '@mui/x-data-grid'
import { useNavigate } from 'react-router-dom';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import { DeleteOutline, EditOutlined, VisibilityOutlined} from '@mui/icons-material';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { FadeLoader } from 'react-spinners';
import { useEffect, useState } from 'react';
import config from './../../config'
import axios from 'axios';
import ContratFonction from './contratFonction/ContratFonction';
import BarReturn from '../../components/barReturn/BarReturn';
import { Popconfirm } from 'antd';

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
        width: 160 
    },
    {
        field: 'nom_departement',
        headerName: "Competence",
        width: 160 
    },
    {
        field: 'avantages',
        headerName: 'Avantages',
        width: 160 
    },
    {
        field: 'prix',
        headerName: "Prix",
        width: 160,renderCell: (params) => `${params.value} $`
    },
    {
        field: 'salaire',
        headerName: "Salaire",
        width: 160, renderCell: (params) => `${params.value} $`
    },
    {   field: 'action', HeaderName: 'Action', width: 150, renderCell: (params) =>{
        const handleEdit = () => {
          navigate(`/contratFonctionEdit/${params.row.id}`);
        }
        return(
          <>
            <div className="table-icons-row">
                <div className="userOvert0">
                    <EditOutlined className='userListBtn' onClick={handleEdit} />
                    <span className='userOvert'>Modifier</span>
                </div>
                <div className="userOvert1">
                  <VisibilityOutlined className='userEye' onClick={() => navigate(`/fonctionView/${params.row.id}`)} />
                  <span className='userOvert'>détail</span>
                </div>
                <div className="userOvert2">
                  <Popconfirm
                    title="Êtes-vous sûr de vouloir supprimer?"
                      onConfirm={() => { handleDelete(params.row.id) }}
                      okText="Oui"
                      cancelText="Non"
                  >
                    <DeleteOutline className="userListDelete" />
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
      await axios.delete(`${DOMAIN}/api/admin/contratInfo/${id}`);
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
              <ChecklistRtlIcon className='contrats-icon'/>
              <div className="contrats-info">
                  <h2 className="contrats-title">Fonctions</h2>
                  <span className="contrats-span">Liste des fonctions</span>
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
                  <ContratFonction handleModalClose={handleClose} />
                </Box>
              </Box>
            </Fade>
          </Modal>
        </div>
        <BarReturn/>
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

export default Fonctions