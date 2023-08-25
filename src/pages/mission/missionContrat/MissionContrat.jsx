import { DataGrid } from '@mui/x-data-grid'
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useEffect, useState } from 'react';
import './../../horaire/horaireAll.scss'
import axios from 'axios';
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import { FadeLoader } from 'react-spinners';
import config from '../../../config'
import { useLocation } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';


const MissionContrat = () => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);;
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const clientId = searchParams.get('client_id');
  const [agentsAffectes, setAgentsAffectes] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);



  const handleCheckboxChange = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 60 },
    { field: 'start_date', headerName: "Date de debut", width: 160 , valueGetter: (params) =>
    format(new Date(params.row.start_date), 'yyyy-MM-dd'), },
    { field: 'end_date', headerName: 'Date de la fin', width: 160,  valueGetter: (params) =>
    format(new Date(params.row.end_date), 'yyyy-MM-dd')},
    { field: 'contract_type', headerName: "Type du contrat", width: 160 },
    { field: 'status', headerName: "status du contrat", width: 150, renderCell: (params) => {
    
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
    }, },
    {
      field: 'action',
      HeaderName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <div className="table-icons-row">
              <VisibilityIcon className='userEye' onClick={() => navigate(`/horairesView/${params.row.id}`)}/>
            </div>
          </>
        );
      },
    },
    {
      field: 'checkbox',
      headerName: 'Sélectionner',
      width: 120,
      renderCell: (params) => {
        return (
          <input
            type="checkbox"
            checked={selectedIds.includes(params.row.id)}
            onChange={() => handleCheckboxChange(params.row.id)}
          />
        );
      },
    },
  ];

  useEffect(() => {
    const fetchAgentsAffectes = async () => {
      try {
        const clientId = searchParams.get('client_id');
  
        const response = await axios.get(`${DOMAIN}/api/admin/missionContrat/${clientId}`);
  
        setAgentsAffectes(response.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchAgentsAffectes();
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const selectedAgentIds = selectedIds.join(',');
      const params = new URLSearchParams({
        contrat_id: selectedAgentIds,
        client_id: clientId
      });
  
      navigate(`/missions?${params.toString()}`);
    } catch (err) {
      Swal.fire({
        title: 'Error',
        text: err.message,
        icon: 'error',
        confirmButtonText: 'OK'
      });
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
                  <h2 className="contrats-title">Liste des contrats qui sont liés au client...</h2>
                  <span className="contrats-span">Liste des contrat</span>
              </div>
          </div>
          <button className="personnel-btn" onClick={''}><PersonAddAlt1Icon/>Ajouter</button>
        </div>
        {loading ? (
        <div className="spinner-container">
            <FadeLoader color={'#36D7B7'} loading={loading} />
        </div>
        ) : (
        <DataGrid rows={agentsAffectes} columns={columns} pageSize={10} checkboxSelection className="presenceTable" />
        )}
            <button className="personnel-btn" onClick={handleClick}>Avoir les agents..</button>
      </div>
    </>
  )
}

export default MissionContrat