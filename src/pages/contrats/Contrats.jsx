import './contrats.scss'
import { Link } from 'react-router-dom';
import FlakyIcon from '@mui/icons-material/Flaky';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import ContratForm from './formContrat/ContratForm';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import { FadeLoader } from 'react-spinners';
import config from '../../config'
import { DeleteOutline, EditOutlined, AddCircleOutline, VisibilityOutlined } from '@mui/icons-material';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '1px solid #FFF',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  }



const Contrats = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [selected, setSelected] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleSelectionChange = (newSelection) => {
      setSelected(newSelection.selectionModel);
    };
    

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

  
    const columns = [
      { field: 'id', headerName: 'ID', width: 50 },
      { field: 'company_name', headerName: 'Client', width: 150 },
      { field: 'contract_type', headerName: 'Type de contrat', width: 150 },
      {
        field: 'start_date',
        headerName: 'Date du debut',
        width: 150,
        valueGetter: (params) => format(new Date(params.row.start_date), 'yyyy-MM-dd'),
      },
      {
        field: 'end_date',
        headerName: 'Date de la fin',
        width: 150,
        valueGetter: (params) => format(new Date(params.row.end_date), 'yyyy-MM-dd'),
      },
      {
        field: 'status',
        headerName: 'Statut du contrat',
        width: 150,
        renderCell: (params) => {
    
          switch (params.value) {
            case 'Résilié':
              return (
                <span style={{ color: 'red', display: 'flex', alignItems: 'center', justifyContent: 'space-between',gap: "5px"}}>
                  Résilié
                  <CancelIcon style={{ fontSize: '16px' }} />
                </span>
              );
            case 'En attente':
              return (
                <span style={{ color: 'green', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: "5px" }}>
                  En attente
                  <CheckCircleIcon style={{ fontSize: '16px' }} />
                </span>
              );
            case 'En cours':
              return (
                <span style={{ color: 'blue', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: "5px" }}>
                  En cours
                  <PendingIcon style={{ fontSize: '16px' }} />
                </span>
              );
            default:
              return null;
          }
        },
      },
      {
        field: 'action',
        headerName: 'Action',
        width: 150,
        renderCell: (params) => {
          return (
            <>
              <div className="table-icons-row">
                <Link to={`/editContrat/${params.row.id}`}>
                  <EditOutlined className="userListBtn" />
                </Link>
                <VisibilityOutlined className='userEye' onClick={() => navigate(`/contratsView/${params.row.id}`)} />
                <DeleteOutline className="userListDelete" onClick={() => { handleDelete(params.row.id) }} />
                <Link to={`addContrat/${params.row.id}`}>
                  <AddCircleOutline className="userListAjout" />
                </Link>
              </div>
            </>
          );
        },
      },
    ];

      // eslint-disable-next-line react-hooks/exhaustive-deps
       useEffect(()=>{

        const fetchData = async ()=> {
            try{
                const {data} = await axios.get(`${DOMAIN}/api/admin/contrat`);
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
        await axios.delete(`${DOMAIN}/api/admin/contrat/${id}`);
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const YourComponent = ({ data }) => {
    return (
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={10}
        checkboxSelection
        selectionModel={selected}
        onSelectionModelChange={handleSelectionChange}
        className="contratTable"
      />
    );
  };

  return (
    <>
              <div className="contrats">
            <div className="contrats-wrapper">
                <div className="contrats-top">
                    <FlakyIcon className='contrats-icon'/>
                    <div className="contrats-info">
                        <h2 className="contrats-title">Contrat</h2>
                        <span className="contrats-span">Liste des contrats</span>
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
                            <Box component="form" sx={{'& > :not(style)': { m: 1, width: '300ch' }, display:'flex', flexWrap:'wrap'}} noValidate autoComplete="off">
                              <ContratForm handleClose={handleClose}/>
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
            <div className="contrats-left">
            <YourComponent data={data} /> 
            </div>
            )}
        </div>
            
    </>
  )
}

export default Contrats