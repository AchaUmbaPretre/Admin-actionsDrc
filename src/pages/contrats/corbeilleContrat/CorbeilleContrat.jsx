import './../contrats.scss'
import { Link } from 'react-router-dom';
import FlakyIcon from '@mui/icons-material/Flaky';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { format } from 'date-fns';
import { FadeLoader } from 'react-spinners';
import { FileOutlined, UserOutlined, BankOutlined, SolutionOutlined } from '@ant-design/icons';
import { DeleteOutline, EditOutlined, AddCircleOutline, VisibilityOutlined, DeleteOutlined, HomeOutlined } from '@mui/icons-material';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import { Breadcrumb, Popconfirm } from 'antd';
import config from '../../../config';

const CorbeilleContrat = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [selected, setSelected] = useState([]);
    const [loading, setLoading] = useState(true);
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
              </div>
            </>
          );
        },
      },
    ];

      // eslint-disable-next-line react-hooks/exhaustive-deps
      useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/admin/contrat-corbeille`);
            setData(data);
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
                </div>
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

export default CorbeilleContrat