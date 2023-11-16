import { DataGrid } from '@mui/x-data-grid'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import { DeleteOutline, EditOutlined, VisibilityOutlined} from '@mui/icons-material';
import { useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import axios from 'axios';
import { format } from 'date-fns';
import { FadeLoader } from 'react-spinners';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import moment from 'moment';
import config from '../../../config';
import Swal from 'sweetalert2';
import './presenceListView.scss'

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

const PresenceListView = () => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const id = pathname.split('/')[2]
  const [name, setName] = useState('');

  const months = [
    { value: 1, label: 'Janvier' },
    { value: 2, label: 'Février' },
    { value: 3, label: 'Mars' },
    { value: 4, label: 'Avril' },
    { value: 5, label: 'Mai' },
    { value: 6, label: 'Juin' },
    { value: 7, label: 'Juillet' },
    { value: 8, label: 'Août' },
    { value: 9, label: 'Septembre' },
    { value: 10, label: 'Octobre' },
    { value: 11, label: 'Novembre' },
    { value: 12, label: 'Décembre' },
  ];

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const [totalJours, setTotalJours] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(1);

  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value, 10));
  };

  useEffect(() => {
    const fetchTotalJours = async () => {
      try {
        const {data} = await axios.get(`${DOMAIN}/api/admin/presenceAllViewCounter?month=${selectedMonth}&AgentId=${id}`);
        setTotalJours(data[0]?.total_jours);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTotalJours();
  }, [selectedMonth]);


 useEffect(()=>{

  const fetchData = async ()=> {
      try{
          const {data} = await axios.get(`${DOMAIN}/api/admin/presenceOneView/${id}`);
          setData(data);
          setName(data[0].first_name)
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
      await axios.delete(`${DOMAIN}/api/admin/presence/${id}`);
      window.location.reload();
    }
  } catch (err) {
    console.log(err);
  }
};

  const columns = [
    { field: 'first_name', headerName: 'Nom', width: 110 },
    { field: 'last_name', headerName: 'Post-nom', width: 110 },
    { field: 'dayOfWeek', headerName: 'Jour', width: 100 },
    {
        field: 'date',
        headerName: 'Date de la présence',
        width: 150,
        valueGetter: (params) =>
        moment(params.row.date).format('DD-MM-yyyy'),
    },
    {
        field: 'check_in_time',
        headerName: "Heure d'arrivée",
        width: 120,
        valueGetter: (params) => params.row.check_in_time.substring(0, 5)
    },
    {
      field: 'check_out_time',
      headerName: 'Heure de départ',
      width: 120,
      valueGetter: (params) => params.row.check_out_time.substring(0, 5)
    },
    {
      field: 'presence_status',
      headerName: 'Status',
      width: 120,
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
    {field: 'action', HeaderName: 'Action', width: 150, renderCell: (params) =>{
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
                  <VisibilityOutlined className='userEye' onClick={() => navigate(`/presenceView/${params.row.id}`)} />
                  <span className='userOvert'>détail</span>
                </div>
                <div className="userOvert2">
                  <DeleteOutline className="userListDelete" onClick={()=>{handleDelete(params.row.id)}} />
                  <span className='userOvert'>Supprimer</span>
                </div>
              </div>
          </>
         {/*  <div className="table-icons-row">
              <VisibilityIcon className='userEye' onClick={() => navigate(`/presenceView/${params.row.emp1_id}/${params.row.id}`)} />
              <DeleteOutline className="userListDelete"  />
          </div> */}
        </>

      )
  }},
  ];

  const exportToExcel = () => {
        
    const excelData = data.map(row => ({
      ID: row.id,
      "Employé(e)": row.first_name,
      Client: row.company_name,
      "Date de la presence": format(new Date(row.date), 'yyyy-MM-dd'),
      "Heure d'arrivée": row.check_in_time.substring(0, 5),
      "Heure de sortie": row.check_out_time.substring(0, 5),
    }));
  

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(excelData);
  

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Feuille 1');
  

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    

    const excelFilename = 'tableau.xlsx';
    saveAs(excelBlob, excelFilename);
  };

  return (
    <>
      <div className="presenceListView">
        <div className="presence-wrapper">
          <div className="contrats-top">
              <ChecklistRtlIcon className='contrats-icon'/>
              <div className="contrats-info">
                  <h2 className="contrats-title">Presence</h2>
                  <span className="contrats-span">Liste des presences de l'agent {name}</span>
              </div>
          </div>
          <div className="contrats-rows-counter">
              <h2 className='contrat-h2'>Total de jours de présence de l'employé : {totalJours}</h2>
              <div className="contrat-month">
                <label htmlFor="month">Sélectionnez un mois : </label>
                <select id="month" value={selectedMonth} onChange={handleMonthChange}>
                  <option disabled >selectionnez un mois </option>
                  {months.map((month) => (
                  <option key={month.value} value={month.value}>{month.label}</option>
                ))}
                </select>
              </div>
          </div>
{/*           <div className="personPdf">
            <Link className="personnel-btn" onClick={handleOpen}><PersonAddAlt1Icon/>Presence</Link>
            <Link className="personnel-btn-excel" onClick={exportToExcel}>Export Excel</Link>
          </div> */}
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

export default PresenceListView