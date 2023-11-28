import { DataGrid } from '@mui/x-data-grid'
import { Link, useNavigate } from 'react-router-dom';
import { DeleteOutline, EditOutlined, VisibilityOutlined} from '@mui/icons-material';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { useEffect, useState } from 'react';
import './facturation.scss'
import Swal from 'sweetalert2';
import axios from 'axios';
import { FadeLoader } from 'react-spinners';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import config from '../../config'
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import FactureSearch from './factureSearch/FactureSearch';
import moment from 'moment';
import BarReturn from '../../components/barReturn/BarReturn';
import {FileExcelOutlined} from '@ant-design/icons';
import { DollarOutlined, HourglassOutlined } from '@ant-design/icons';
import { MinusOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';

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
        await axios.put(`${DOMAIN}/api/admin/factures/${id}`);
        window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const columns = [
    { field: 'id', headerName: 'N° de facture', width: 130 },
    { field: 'company_name', headerName: 'Client', width: 160 },
    {
      field: 'created_at',
      headerName: 'Date de la facture',
      width: 160,
      valueGetter: (params) =>
        moment(params.row.created_at).format('DD-MM-yyyy'),
    },
    {
      field: 'total_amount',
      headerName: 'Montant total',
      width: 160,
      renderCell: (params) => {
        const amount = params.value || 0;
        let backgroundColor = 'gray'; // Couleur neutre pour les montants nuls
        let icon = null;
    
        if (amount > 0) {
          backgroundColor = '#4caf50'; // Couleur verte pour les montants positifs
          icon = <DollarOutlined style={{ marginRight: '5px' }} />;
        } else if (amount < 0) {
          backgroundColor = 'red'; // Couleur rouge pour les montants négatifs
          icon = <MinusOutlined style={{ marginRight: '5px' }} />;
        }
    
        return (
          <div
            style={{
              backgroundColor: backgroundColor,
              padding: '5px 10px',
              borderRadius: '50px',
              display: 'flex',
              alignItems: 'center',
              color : '#fff'
            }}
          >
            {`${amount} $`}
          </div>
        );
      },
    },
    {
      field: 'status',
      headerName: 'Statut de la facture',
      width: 160,
      renderCell: (params) => {
        let color, icon, backgroundColor;
        switch (params.value) {
          case 'Payée':
            backgroundColor = 'blue';
            icon = <DollarOutlined style={{ marginRight: '5px' }} />;
            break;
          case 'En attente':
            backgroundColor = '#4caf50';
            icon = <HourglassOutlined style={{ marginRight: '5px' }} />;
            break;
          default:
            return null;
        }
  
        return (
          <span
            style={{
              backgroundColor: backgroundColor,
              color: 'white',
              border: `1px solid ${backgroundColor}`,
              padding: '3px 10px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '12px',
            }}
          >
            {icon}
            {params.value}
          </span>
        );
      },
    },
    {
      field: 'action',
      HeaderName: 'Action',
      width: 160,
      renderCell: (params) => {
        const handleEdit = () => {
          navigate(`/facturationPut/${params.row.id}`);
        };
        return (
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
                  <span className="userOvert">Modifier</span>
              </div>
              <div className="userOvert1">
                <VisibilityOutlined
                  className="userEye"
                  onClick={() => navigate(`/facturationView/${params.row.id}`)}
                />
                <span className="userOvert">Détail</span>
              </div>
              <div className="userOvert2">
                <Popconfirm
                  title="Êtes-vous sûr de vouloir supprimer?"
                  onConfirm={()=>{handleDelete(params.row.id)}}
                  okText="Oui"
                  cancelText="Non"
                >
                  <DeleteOutline className="userListDelete"/>
                </Popconfirm>
                <span className="userOvert">Supprimer</span>
              </div>
            </div>
          </>
        );
      },
    },
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
                            <Box component="form" sx={{'& > :not(style)': { m: 1},}} noValidate autoComplete="off">
                              <FactureSearch handleModalClose={handleClose} />
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

export default Facturation