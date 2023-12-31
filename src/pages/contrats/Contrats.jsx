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
import ContratForm from './formContrat/ContratForm';
import { format } from 'date-fns';
import { FadeLoader } from 'react-spinners';
import config from '../../config'
import { FileOutlined, UserOutlined, BankOutlined, SolutionOutlined } from '@ant-design/icons';
import { DeleteOutline, EditOutlined, AddCircleOutline, VisibilityOutlined, DeleteOutlined, HomeOutlined } from '@mui/icons-material';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import BarReturn from '../../components/barReturn/BarReturn';
import {FileExcelOutlined} from '@ant-design/icons';
import { Breadcrumb, Popconfirm } from 'antd';
import { notification } from 'antd';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '1px solid #FFF',
    boxShadow: 24,
    p: 3,
    borderRadius: 2,
  }

const Contrats = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [selected, setSelected] = useState([]);
    const [loading, setLoading] = useState(true);
    const [endDate, setEndDate] = useState(null);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSelectionChange = (newSelection) => {
      setSelected(newSelection.selectionModel);
    };
  
    const columns = [
      { field: 'id', headerName: 'N° du contrat', width: 80 },
      { field: 'company_name', headerName: 'Client', width: 130 },
      {
        field: 'contract_type',
        headerName: 'Type de contrat',
        width: 120,
        renderCell: (params) => {
          let color, icon, backgroundColor;
          
          switch (params.value) {
            case 'Journalier':
              backgroundColor = '#4caf50'; // Vert
              icon = <FileOutlined style={{ fontSize: '16px', marginRight: '5px' }} />;
              break;
            case 'Interim':
              backgroundColor = '#2196f3'; // Bleu
              icon = <UserOutlined style={{ fontSize: '16px', marginRight: '5px' }} />;
              break;
            case 'CDI':
              backgroundColor = '#ff9800'; // Orange
              icon = <BankOutlined style={{ fontSize: '16px', marginRight: '5px' }} />;
              break;
            case 'CDD':
              backgroundColor = '#9c27b0'; // Violet
              icon = <SolutionOutlined style={{ fontSize: '16px', marginRight: '5px' }} />;
              break;
            default:
              return null;
          }
      
          return (
            <span style={{ backgroundColor: backgroundColor, color: 'white', border: `1px solid ${backgroundColor}`, padding: '3px 10px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
              {icon}
              {params.value}
            </span>
          );
        },
      },
      {
        field: 'start_date',
        headerName: 'Date du debut',
        width: 130,
        valueGetter: (params) => format(new Date(params.row.start_date), 'dd-MM-yyyy'),
      },
      {
        field: 'end_date',
        headerName: 'Date de la fin',
        width: 130,
        valueGetter: (params) => format(new Date(params.row.end_date), 'dd-MM-yyyy'),
      },
      {
        field: 'duree',
        headerName: 'Durée',
        width: 100,
        valueGetter: (params) => `${params.value} mois`,
      },
      {
        field: 'status',
        headerName: 'Statut du contrat',
        width: 120,
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
                  <PendingIcon style={{ fontSize: '16px' }} />
                </span>
              );
            case 'En cours':
              return (
                <span style={{ color: 'blue', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: "5px" }}>
                  En cours
                  <CheckCircleIcon style={{ fontSize: '16px' }} />
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
          const handleEdit = () => {
            navigate(`/editContrat/${params.row.id}`);
          }
          return (
            <>
              <div className="table-icons-row">
              
                <div className="userOvert0">
                    <EditOutlined className='userListBtn' onClick={handleEdit}/>
                    <span className='userOvert'>Modifier</span>
                </div>
                <div className="userOvert1">
                  <VisibilityOutlined className='userEye' onClick={() => navigate(`/contratsView/${params.row.id}`)} />
                  <span className='userOvert'>détail</span>
                </div>
                <div className="userOvert2">
                  <Popconfirm
                    title="Êtes-vous sûr de vouloir supprimer?"
                    onConfirm={() => { handleDelete(params.row.id)}}
                    okText="Oui"
                    cancelText="Non"
                  >
                    <DeleteOutline className="userListDelete"/>
                  </Popconfirm>
                  <span className='userOvert'>Supprimer</span>
                </div>
                <div className="userOvert3">
                  <Link to={`addContrat/${params.row.id}`}>
                    <AddCircleOutline className="userListAjout" />
                    <span className='userOvert'>Ajouter</span>
                  </Link>
                </div>
              </div>
            </>
          );
        },
      },
    ];

    const exportToExcel = () => {
        
      const excelData = data.map(row => ({
        Client : row.company_name,
        "Type de contrat": row.contract_type,
        'Date du debut': format(new Date(row.start_date), 'dd-MM-yyyy'),
        'Date de la fin': format(new Date(row.end_date), 'dd-MM-yyyy'),
      }));
    
  
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(excelData);
    
  
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Feuille 1');
    
  
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const excelBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      
  
      const excelFilename = 'tableau.xlsx';
      saveAs(excelBlob, excelFilename);
    };

      // eslint-disable-next-line react-hooks/exhaustive-deps
      useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/admin/contrat`);
            setData(data);
            const finContrat = data.filter((d) => new Date(d.end_date) < new Date());
            finContrat.forEach((contrat) => {
              const { company_name, contract_type } = contrat;
              notification.info({
                message: 'Contrat arrivé à sa fin',
                description: `Le contrat ${contract_type} de l'entreprise ${company_name} est terminé. Veuillez prendre les mesures nécessaires.`,
              });
            });
            setLoading(false);
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchData();
      }, []);


  const handleDelete = async (id) => {
    try {
        await axios.put(`${DOMAIN}/api/admin/contrats/${id}`);
        window.location.reload();
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
                <div className="personPdf">
                  <Link className="personnel-btn" onClick={handleOpen}><PersonAddAlt1Icon/>Nouveau</Link>
                  <Link className="personnel-btn-pdf" onClick={() => navigate('/contratsPdf')}><PictureAsPdfIcon/>Pdf</Link>
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
                      <Box component="form" sx={{'& > :not(style)': { m: 1, width: '300ch' }, display:'flex', flexWrap:'wrap'}} noValidate autoComplete="off">
                        <ContratForm handleClose={handleClose} />
                      </Box>
                    </Box>
                  </Fade>
                </Modal>
            </div>
            <div className="bread">
                <Breadcrumb
                  items={[
                    {
                      href: '/',
                      title: (
                        <div style={{display: 'flex', alignItems:'center'}}>
                          <HomeOutlined />
                          <span>Accueil</span>
                        </div>
                      ),
                    },{
                    href: '/personnel',
                    title: (
                    <>
                    <UserOutlined />
                    <span>Liste des employés</span>
                    </>
                    ),
                },
                  ]}
                />
                <div className="bread-corbeille" onClick={() => navigate('/contrats-corbeille')}>
                  <DeleteOutlined />
                  <span className="title-corbeille">Corbeille</span>
                </div>
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