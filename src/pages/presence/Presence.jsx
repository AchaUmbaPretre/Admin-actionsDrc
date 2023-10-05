import { DataGrid } from '@mui/x-data-grid'
import { Link, useNavigate } from 'react-router-dom';
import './presence.scss'
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import { DeleteOutline, EditOutlined, VisibilityOutlined} from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import axios from 'axios';
import PresenceForm from './form/PresenceForm';
import { format } from 'date-fns';
import { FadeLoader } from 'react-spinners';
import config from '../../config'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import PresenceSearch from './presenceSearch/PresenceSearch';
import moment from 'moment';

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

const Presence = () => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


 useEffect(()=>{

  const fetchData = async ()=> {
      try{
          const {data} = await axios.get(`${DOMAIN}/api/admin/presenceAll`);
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
      await axios.delete(`${DOMAIN}/api/admin/payement/${id}`);
      window.location.reload();
    }
  } catch (err) {
    console.log(err);
  }
};

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'first_name', headerName: 'employé(e)', width: 150 },

    {
      field: 'company_name',
      headerName: 'Client',
      width: 150 
    },
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
        width: 150,
        valueGetter: (params) => params.row.check_in_time.substring(0, 5)
    },
    {
      field: 'check_out_time',
      headerName: 'Heure de départ',
      width: 150,
      valueGetter: (params) => params.row.check_out_time.substring(0, 5)
    },
    {field: 'action', HeaderName: 'Action', width: 150, renderCell: (params) =>{
        return(
          <>

<>
                <div className="table-icons-row">
                  <div className="userOvert0">
                    <Link onClick={''}>
                      <EditOutlined className="userListBtn" onClick={() => navigate(`/payementEdit/${params.row.id}`)} />
                      <span className='userOvert'>Modifier</span>
                    </Link>
                  </div>
                  <div className="userOvert1">
                    <VisibilityOutlined className='userEye' onClick={() => navigate(`/presenceView/${params.row.emp1_id}/${params.row.id}`)} />
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
      <div className="presence">
        <div className="presence-wrapper">
          <div className="contrats-top">
              <ChecklistRtlIcon className='contrats-icon'/>
              <div className="contrats-info">
                  <h2 className="contrats-title">Presence</h2>
                  <span className="contrats-span">Liste des presences</span>
              </div>
          </div>
          <div className="personPdf">
            <Link className="personnel-btn" onClick={handleOpen}><PersonAddAlt1Icon/>Presence</Link>
            <Link className="personnel-btn-pdf" onClick={() => navigate('/presencePdf')}><PictureAsPdfIcon/>Pdf</Link>
            <Link className="personnel-btn-excel" onClick={exportToExcel}>Export Excel</Link>
          </div>
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
                              <PresenceSearch handleClose={handleClose}/>
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

export default Presence