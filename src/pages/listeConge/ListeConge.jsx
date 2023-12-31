import './listeConge.scss';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import { DeleteOutline, EditOutlined } from '@mui/icons-material';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import ClearIcon from '@mui/icons-material/Clear';
import { useEffect, useState } from 'react';
import { Box, Fade, Backdrop, Modal } from '@mui/material';
import FormConge from './formConge/FormConge';
import config from '../../config';
import { format } from 'date-fns';
import axios from 'axios';
import { Popconfirm } from 'antd';
import { FadeLoader } from 'react-spinners';
import BarReturn from '../../components/barReturn/BarReturn';

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
};

const ListeConge = () => {

  const [data, setData] = useState([]);
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${DOMAIN}/api/leave/demandeConge/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${DOMAIN}/api/leave/demandeConge`);
        setData(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const columns = [
    { field: 'first_name', headerName: 'Nom', width: 125 },
    { field: 'last_name', headerName: 'Prenom', width: 125 },
    {
      field: 'start_date',
      headerName: 'Date de début',
      width: 135,
      valueGetter: (params) => format(new Date(params.row.start_date), 'dd-MM-yyyy'),
    },
    {
      field: 'end_date',
      headerName: 'Date de fin',
      width: 135,
      valueGetter: (params) => format(new Date(params.row.end_date), 'dd-MM-yyyy'),
    },
    { field: 'nom_type', headerName: "Type de congé", width: 140 },
    {
      field: 'status',
      headerName: 'Statut de la demande',
      width: 150,
      renderCell: (params) => {
        const status = params.value;
        let color = '';
        let icon = null;
  
        if (status === 'approuvée') {
          color = 'green';
          icon = <DoneOutlineIcon style={{ fontSize: 14 }}/>;
        } else if (status === 'refusé') {
          color = 'red';
          icon = <ClearIcon style={{ fontSize: 14 }}/>;
        }
  
        return (
          <div style={{ color, display: 'flex', alignItems: 'center', gap: "5px" }}>
            {icon}
            {status}
          </div>
        );
      },
    },
    {
      field: 'actions',
      headerName: 'Action',
      width: 160,
      renderCell: (params) => {
        const handleEdit = () => {
          navigate(`/listeCongeEdit/${params.row.id}`);
        }
        return (
          <div className="table-icons-row">
            <div className="userOvert0">
              <EditOutlined className='userListBtn' onClick={handleEdit}/>
              <span className='userOvert'>Modifier</span>
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
        );
      },
    },
  ];

    return (
      <>
        <div className="listeConge">
          <div className="liste-wrapper">
            <div className="contrats-top">
              <ChecklistRtlIcon className='contrats-icon' />
              <div className="contrats-info">
                <h2 className="contrats-title">Demande de congé</h2>
                <span className="contrats-span">Liste des congés</span>
              </div>
            </div>
            <button className="personnel-btn" onClick={handleOpen}><PersonAddAlt1Icon />Nouveau</button>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <Box sx={style}>
                  <form autoComplete="off">
                    <FormConge handleClose={handleClose} />
                  </form>
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
          <DataGrid rows={data ?? []} columns={columns} pageSize={10} checkboxSelection className="presenceTable" />
          )}
        </div>
      </>
    )
  }

  export default ListeConge