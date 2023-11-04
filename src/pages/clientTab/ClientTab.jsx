import './clientTab.scss'
import GroupsIcon from '@mui/icons-material/Groups';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { DataGrid } from '@mui/x-data-grid'
import { Link } from 'react-router-dom';
import { DeleteOutline, EditOutlined, AddCircleOutline, VisibilityOutlined } from '@mui/icons-material';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import ClientForm from './form/ClientForm';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'
import { FadeLoader } from 'react-spinners';
import config from '../../config'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import BarReturn from '../../components/barReturn/BarReturn';
import {FileExcelOutlined} from '@ant-design/icons';
import { Popconfirm } from 'antd';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 840,
  bgcolor: 'background.paper',
  p: 2,
  borderRadius: 2,
  outline: 'none'
}

const ClientTab = () => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN

  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const columns = [
    { field: 'id', headerName: "Code client", width: 50 },
    { field: 'company_name', headerName: "Compagnie", width: 130 },
    {
      field: 'address',
      headerName: 'Adresse',
      width: 130 
    },
    {
        field: 'phone_number',
        headerName: "Tel de la compagnie",
        width: 130 
    },
    {
        field: 'contact_name',
        headerName: "Nom du contact principal",
        width: 130 
    },
    {
      field: 'contact_email',
      headerName: "Email",
      width: 130 
  },
    {
      field: 'contact_phone',
      headerName: 'Tel principal',
      width: 130 
    },
    {field: 'action', HeaderName: 'Action', width: 150, renderCell: (params) =>{
      const handleEdit = () => {
            navigate(`/clientUpdate/${params.row.id}`);
      }
        return(
          <>
            <div className="table-icons-row">
                <div className="userOvert0">
                  <Popconfirm
                        title="Êtes-vous sûr de vouloir modifier?"
                        onConfirm={handleEdit}
                        okText="Oui"
                        cancelText="Non"
                  >
                    <EditOutlined className='userListBtn'/>
                  </Popconfirm>
                    <span className='userOvert'>Modifier</span>
                </div>
                <div className="userOvert1">
                  <VisibilityOutlined className='userEye' onClick={() => navigate(`/viewsClient/${params.row.id}`)} />
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

  useEffect(()=>{
    
    const fetchData = async ()=> {
      try{
          const {data} = await axios.get(`${DOMAIN}/api/admin/client`);
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
        await axios.delete(`${DOMAIN}/api/admin/client/${id}`);
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const exportToExcel = () => {
        
    const excelData = data.map(row => ({
      ID: row.id,
      Compagnie: row.company_name,
      Adresse: row.address,
      'Tel contact principal': row.contact_name,
      'Tel principal': row.contact_phone,
      Email: row.contact_email,
      APR : row.apr,
      'ID NATE' : row.idnate,
      Pyas : row.pays,
      Province : row.province
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
        <div className="clientTab">
          <div className="client-wrapper">
            <div className="contrats-top">
              <GroupsIcon className='contrats-icon'/>
              <div className="contrats-info">
                <h2 className="contrats-title">Client</h2>
                <span className="contrats-span">Liste des clients</span>
              </div>
            </div>
            <div className="personPdf">
              <Link className="personnel-btn" onClick={handleOpen}><PersonAddAlt1Icon/>Nouveau</Link>
              <Link className="personnel-btn-pdf" onClick={() => navigate('/clientPdf')}><PictureAsPdfIcon/>Pdf</Link>
              <Link className="personnel-btn-excel" onClick={exportToExcel}><FileExcelOutlined />Export Excel</Link>
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
                <Box component="form" sx={{ '& > :not(style)': { m: 1 } }}>
                  <ClientForm handleModalClose={handleClose} />
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

export default ClientTab