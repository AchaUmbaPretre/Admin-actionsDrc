import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import './../personnel.scss'
import PeopleIcon from '@mui/icons-material/People';
import { DeleteOutline, DeleteOutlined, EditOutlined, VisibilityOutlined } from '@mui/icons-material';
import { useState } from 'react';
import * as React from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { format } from 'date-fns';
import { FadeLoader } from 'react-spinners';
import userImg from './../../../assets/user.png'
import { Breadcrumb } from 'antd';
import { HomeOutlined, UserOutlined, FileExcelOutlined} from '@ant-design/icons';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { Table, Button, Space, Popconfirm } from 'antd';
import config from '../../../config';

const Corbeille = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [showSpinner, setShowSpinner] = useState(true);
    const spinnerDuration = 2000;
    const navigate = useNavigate();

// eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(()=>{
    const fetchData = async ()=> {
        try{
            const res = await axios.get(`${DOMAIN}/api/admin/corbeille-employe`);
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
      await axios.delete(`${DOMAIN}/api/admin/employes-corbeille/${id}`);
      window.location.reload();
  } catch (err) {
    console.log(err);
  }
};

const columns = [
        { field: 'first_name', headerName: 'Nom', width: 120, renderCell: (params) =>{
          return <div className="userList">
                    <img src={params.row.source ? `${params.row.source}` : userImg } alt="" className="userImg" />
                    {params.row.first_name}
                 </div>
        }},
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
          field: 'nom_departement',
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
                      <Link><EditOutlined className='userListBtn' onClick={handleEdit}/></Link>
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
      

  return (
    <>
        <div className="personnel">
            <div className="personnel-rows">
                <div className="personnel-top">
                    <PeopleIcon className='personnel-icon'/>
                    <div className="personnel-info">
                        <h2 className="personnel-title">Corbeille des Employés</h2>
                        <span className="personnel-span">Liste de corbeille des employés</span>
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

export default Corbeille