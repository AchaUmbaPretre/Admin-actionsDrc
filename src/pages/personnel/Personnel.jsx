import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import './personnel.scss'
import PeopleIcon from '@mui/icons-material/People';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { DeleteOutline, EditOutlined, VisibilityOutlined } from '@mui/icons-material';
import { useState } from 'react';
import * as React from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import Swal from 'sweetalert2'
import { format } from 'date-fns';
import { FadeLoader } from 'react-spinners';
import userImg from './../../../src/assets/user.png'
import config from '../../config'
import { Box, Fade, Modal } from '@mui/material';
import Formulaire from './formulaire/Formulaire';
import { Breadcrumb } from 'antd';
import { HomeOutlined, UserOutlined, FileExcelOutlined} from '@ant-design/icons';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { Table, Button, Space, Popconfirm } from 'antd';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1200,
  bgcolor: 'background.paper',
  border: '1px solid #FFF',
  boxShadow: 24,
  p: 2,
  borderRadius: 2,
}

const Personnel = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [showSpinner, setShowSpinner] = useState(true);
    const spinnerDuration = 2000;
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

// eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(()=>{
        const fetchData = async ()=> {
            try{
                const res = await axios.get(`${DOMAIN}/api/admin`);
                setData(res.data)
                setLoading(false);
                setTimeout(() => {
                  setShowSpinner(false);
                }, spinnerDuration);
        
              }catch(error){
                console.log(error)
              };
        }
        fetchData()
     }, [])

const handleDelete = async (id) => {
  try {
      await axios.put(`${DOMAIN}/api/admin/employes/${id}`);
      window.location.reload();
  } catch (err) {
    console.log(err);
  }
};

const columns = [
        { field: 'first_name', headerName: 'Nom', width: 120, renderCell: (params) =>{
          return <div className="userList">
                    <img src={params.row.source} alt="" className="userImg" />
                    {console.log(params.row.source)}
                    {params.row.first_name}
                 </div>
        }},
        {
          field: 'last_name',
          headerName: 'Prenom',
          width: 110,
        },        
        {
          field: 'last_name',
          headerName: 'Prenom',
          width: 110,
        },        
        {
          field: 'phone_number',
          headerName: 'Telephone',
          width: 110,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 110,
        },
        {
            field: 'date_of_birth',
            headerName: 'Date de naissance',
            width: 110,
            valueGetter: (params) =>
            format(new Date(params.row.date_of_birth), 'dd-MM-yyyy'),
        },
        { field: 'gender', headerName: 'Genre', width: 50 },
        { field: 'address', headerName: 'Adresse', width: 110 },
        {
          field: 'skills',
          headerName: 'Domaine',
          width: 110,
        },
        {field: 'action', HeaderName: 'Action', width: 130, renderCell: (params) =>{
          
          const handleEdit = () => {
            navigate(`/edit/${params.row.id}`);
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
                      <Link><EditOutlined className='userListBtn'/></Link>
                      </Popconfirm>
                      <span className='userOvert'>Modifier</span>
                    </div>
                    <div className="userOvert1">
                      <VisibilityOutlined className='userEye' onClick={() => navigate(`/views/${params.row.id}`)} />
                      <span className='userOvert'>détail</span>
                    </div>
                    <div className="userOvert2">
                    <Popconfirm
                      title="Êtes-vous sûr de vouloir supprimer?"
                      onConfirm={()=>{handleDelete(params.row.id)}}
                      okText="Oui"
                      cancelText="Non"
                    >
                      <DeleteOutline className="userListDelete" />
                    </Popconfirm>
                      <span className='userOvert'>Supprimer</span>
                    </div>
                </div>
              </>
            )
        }},
  ];
      
const exportToExcel = () => {
        
        const excelData = data.map(row => ({
          Nom: row.first_name,
          Postnom: row.last_name,
          Telephone: row.phone_number,
          Email: row.email,
          'Date de naissance': format(new Date(row.date_of_birth), 'dd-MM-yyyy'),
          Genre: row.gender,
          Adresse: row.address,
          Competence: row.skills,
          certifications : row.certifications,
          Status: row.employment_status,
          "Etat civil" : row.etat_civil,
          Genre : row.gender,
          "Type de l'identité" : row.identification_type,
          "Nombre d'enfant": row.nombre_enfant,
          "CNSS": row.number_cnss,
          "INPP": row.number_inpp,
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
        <div className="personnel">
            <div className="personnel-rows">
                <div className="personnel-top">
                    <PeopleIcon className='personnel-icon'/>
                    <div className="personnel-info">
                        <h2 className="personnel-title">Employé</h2>
                        <span className="personnel-span">Liste des employés</span>
                    </div>
                </div>
                <div className="personPdf">
                  <Link className="personnel-btn" onClick={() => navigate('/formulaire2')}><PersonAddAlt1Icon/>Nouveau</Link>
                  <Link className="personnel-btn-pdf" onClick={() => navigate('/personpdfTable')}><PictureAsPdfIcon/>Pdf</Link>
                  <Link className="personnel-btn-excel" onClick={exportToExcel}><FileExcelOutlined />Export Excel</Link>
                </div>
            </div>
            <div className="bread">
                <Breadcrumb
                  items={[
                    {
                      href: '/',
                      title: (
                        <>
                          <HomeOutlined />
                          <span>Accueil</span>
                        </>
                      ),
                    }
                  ]}
                />
              </div>
                {loading ? (
          <div className="spinner-container">
            <FadeLoader color={'#36D7B7'} loading={loading} />
          </div>
        ) : (
          <DataGrid rows={data} columns={columns} pageSize={6} checkboxSelection className="userTable" />
        )}
        </div>
    </>
  )
}

export default Personnel