import { DataGrid } from '@mui/x-data-grid'
import { Link, useNavigate } from 'react-router-dom';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import { DeleteOutline, EditOutlined, VisibilityOutlined} from '@mui/icons-material';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { format } from 'date-fns';
import { FadeLoader } from 'react-spinners';
import config from '../../config'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import moment from 'moment';
import BarReturn from '../../components/barReturn/BarReturn';
import {FileExcelOutlined} from '@ant-design/icons';
import RapportRow from './rapportRow/RapportRow';

const RapportPresence = () => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [dataTable, setDataTable] = useState({})

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);


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
      await axios.delete(`${DOMAIN}/api/admin/presence/${id}`);
      window.location.reload();
    }
  } catch (err) {
    console.log(err);
  }
};

console.log(dataTable)

  const columns = [
    { field: 'first_name', headerName: 'Nom', width: 90 },
    { field: 'last_name', headerName: 'Post-nom', width: 90 },
    {
      field: 'company_name',
      headerName: 'Client',
      width: 90 
    },
    {
        field: 'date',
        headerName: 'Date de la présence',
        width: 90,
        valueGetter: (params) =>
        moment(params.row.date).format('DD-MM-yyyy'),
    },
    {
      field: 'month_name',
      headerName: 'Mois',
      width: 90,
    },
    {
      field: 'check_in_time',
      headerName: "Heure d'arrivée",
      width: 100,
      valueGetter: (params) => params.row.check_in_time.substring(0, 5)
    },
    {
      field: 'check_out_time',
      headerName: 'Heure de sortie',
      width: 100,
      valueGetter: (params) => params.row.check_out_time.substring(0, 5)
    },
    {
      field: 'presence_status',
      headerName: 'Statut',
      width: 90,
      renderCell: (params) => {
        let backgroundColor, color, icon;
    
        if (params.value === 'Présent') {
          backgroundColor = '#4caf50'; // Vert
          color = 'white';
          icon = <CheckCircleOutlinedIcon style={{ fontSize: '16px' }} />;
        } else {
          backgroundColor = '#f44336'; // Rouge
          color = 'white';
          icon = <ClearOutlinedIcon style={{ fontSize: '16px' }} />;
        }
    
        return (
          <span
            style={{
              backgroundColor: backgroundColor,
              color: color,
              borderRadius: '50px',
              padding: '4px 8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
            }}
          >
            {icon}
            <span style={{ marginLeft: '4px' }}>{params.value}</span>
          </span>
        );
      }
    },
    {
      field: 'total_presence',
      headerName: 'Nombre de présence',
      width: 80,
      valueFormatter: (params) => {
        const totalPresence = params.value;
        if (totalPresence === 1) {
          return '1 jour';
        } else {
          return `${totalPresence} jours`;
        }
      }
    },
    {field: 'action', HeaderName: 'Action', width: 140, renderCell: (params) =>{
        return(
          <>
              <>
                <div className="table-icons-row">
                  <div className="userOvert0">
                    <Link onClick={''}>
                      <EditOutlined className="userListBtn" onClick={() => navigate(`/presenceEdit/${params.row.id}`)} />
                      <span className='userOvert'>Modifier</span>
                    </Link>
                  </div>
                  <div className="userOvert1">
                    <VisibilityOutlined className='userEye' onClick={() => navigate(`/presenceListView/${params.row.emp1_id}`)} />
                    <span className='userOvert'>détail</span>
                  </div>
                  <div className="userOvert2">
                    <DeleteOutline className="userListDelete" onClick={()=>{handleDelete(params.row.id)}} />
                    <span className='userOvert'>Supprimer</span>
                  </div>
                </div>
              </>
          </>

        )
    }},
  ];

  return (
    <>
      <div className="presence">
        <div className="presence-wrapper">
          <div className="contrats-top">
              <ChecklistRtlIcon className='contrats-icon'/>
              <div className="contrats-info">
                  <h2 className="contrats-title">Rapport</h2>
                  <span className="contrats-span">Rapport des presences</span>
              </div>
          </div>
          <div className="personPdf">
            <Link className="personnel-btn" onClick={handleOpen}><PersonAddAlt1Icon/>Nouveau</Link>
            <Link className="personnel-btn-pdf" onClick={() => navigate('/presencePdf')}><PictureAsPdfIcon/>Pdf</Link>
          </div>
        </div>
        <BarReturn/>
        <RapportRow setDataTable={setDataTable} setLoading={setLoading}/>
        {loading ? (
        <div className="spinner-container">
            <FadeLoader color={'#36D7B7'} loading={loading} />
        </div>
        ) : (
            <>
              <DataGrid rows={dataTable} columns={columns} pageSize={10} checkboxSelection className="presenceTable" />
            </>
        )}
      </div>
    </>
  )
}

export default RapportPresence