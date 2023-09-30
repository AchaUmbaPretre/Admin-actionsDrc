import { DataGrid } from '@mui/x-data-grid'
import { Link, useNavigate } from 'react-router-dom';
import { DeleteOutline, EditOutlined, VisibilityOutlined} from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { useEffect, useState } from 'react';
import './facturation.scss'
import Swal from 'sweetalert2';
import axios from 'axios';
import FactureForm from './form/FactureForm';
import { format } from 'date-fns';
import { FadeLoader } from 'react-spinners';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import config from '../../config'
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import Visibility from '@mui/icons-material/Visibility';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import FactureSearch from './factureSearch/FactureSearch';
import moment from 'moment';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '1px solid #FFF',
  boxShadow: 24,
  p: 5,
  borderRadius: 2,
  outline: 'none'
}

const Facturation = () => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN
  const [data, setData] = useState([]);
  const [optionsClient, setOptionsClient] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();


// eslint-disable-next-line react-hooks/exhaustive-deps
 useEffect(()=>{

  const fetchData = async ()=> {
      try{
          const {data} = await axios.get(`${DOMAIN}/api/admin/factureAll`);
          setData(data)
          setLoading(false)
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
        await axios.delete(`${DOMAIN}/api/admin/facture/${id}`);
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const columns = [
    { field: 'id', headerName: 'Numero de facture', width: 130 },
    { field: 'company_name', headerName: "client", width: 160 },
    {
      field: 'created_at',
      headerName: 'Date de la facture',
      width: 160,
      valueGetter: (params) =>
      moment(params.row.created_at).format('DD-MM-yyyy'),
    },
    {
        field: 'total_amount',
        headerName: "Montant total",
        width: 160,renderCell: (params) => `${params.value} $`
    },
    {
      field: 'status',
      headerName: 'Statut de la facture',
      width: 150,
      renderCell: (params) => {
        const status = params.value || 'Non spécifié';
        let cellClassName = '';
    
        if (status === 'Payée') {
          cellClassName = 'cell-paid';
        } else {
          cellClassName = 'cell-not-paid';
        }
    
        return <div className={cellClassName}>{status}</div>;
      },
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
            navigate(`/facturationPut/${params.row.id}`);
          }
        });
      }
        return(
          <>
            <div className="table-icons-row">
            <div className="userOvert0">
{/*                     <Link>
                      <EditOutlined className="userListBtn" onClick={handleEdit} />
                      <span className='userOvert'>Modifier</span>
                    </Link> */}
                  </div>
                  <div className="userOvert1">
                    <VisibilityOutlined className='userEye' onClick={() => navigate(`/facturationView/${params.row.id}`)} />
                    <span className='userOvert'>détail</span>
                  </div>
                  <div className="userOvert2">
                    <DeleteOutline className="userListDelete" onClick={()=>{handleDelete(params.row.id)}} />
                    <span className='userOvert'>Supprimer</span>
                  </div>
            </div>
          </>

        )
    }},
  ];

  const exportToExcel = () => {
        
    const excelData = data.map(row => ({
      Client : row.company_name      ,
      Postnom: row.last_name,
      "Date d'écheance": row.due_date      ,
      "Date de la facture": row.invoice_date,
      "Montant": row.total_amount,
      Status: row.status,
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
      <div className="facturation">
        <div className="facturation-wrapper">
          <div className="contrats-top">
              <FactCheckIcon className='contrats-icon'/>
              <div className="contrats-info">
                  <h2 className="contrats-title">Facturation</h2>
                  <span className="contrats-span">Liste des facturations</span>
              </div>
          </div>
          <div className="personPdf">
            <Link className="personnel-btn" onClick={handleOpen}><PersonSearchIcon/>Selectionnez un client</Link>
            <Link className="personnel-btn-pdf" onClick={() => navigate('/facturationPdf')}><PictureAsPdfIcon/>Pdf</Link>
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
                              <FactureSearch handleModalClose={handleClose} />
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

export default Facturation