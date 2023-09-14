import './affectation.scss'
import { DataGrid } from '@mui/x-data-grid'
import { DeleteOutline, Domain, VisibilityOutlined} from '@mui/icons-material';
import { useEffect, useState } from 'react';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import Swal from 'sweetalert2'
import axios from 'axios';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { FadeLoader } from 'react-spinners';
import config from '../../config';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Link, useNavigate } from "react-router-dom";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import AdsClickIcon from '@mui/icons-material/AdsClick';

const Affectation = () => {

  const DOMAIN = config.REACT_APP_SERVER_DOMAIN;

  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);
  const [tap1, setTap1] = useState({});
  const navigate = useNavigate();
 const [loading, setLoading] = useState(true);

 const [value, setValue] = React.useState('1');

 const handleChange = (event, newValue) => {
   setValue(newValue);
 };

  const columns = [
    { field: 'client_nom', headerName: "Client", width: 120 },
    { field: 'first_name', headerName: "Nom", width: 120 },
    {
      field: 'last_name',
      headerName: "Post-nom",
      width: 120
    },
    {
      field: 'skills',
      headerName: 'Competence',
      width: 120 
    },
    {
      field: 'salaire',
      headerName: 'Salaire',
      width: 110,renderCell: (params) => `${params.value} $`
    },
    {
      field: 'prix',
      headerName: 'Prix',
      width: 110,renderCell: (params) => `${params.value} $`
    },
    {
      field: 'end_date',
      headerName: 'Date de la fin',
      width: 120,
      valueGetter: (params) =>
      format(new Date(params.row.end_date), 'dd-MM-yyyy', { locale: fr }),
    },
    {field: 'action', HeaderName: 'Action', width: 140, renderCell: (params) =>{
        return(
          <>
            <div className="table-icons-row">
                <div className="userOvert1">
                  <VisibilityOutlined className='userEye' onClick={() => navigate(`/affectations/${params.row.id}`)} />
                  <span className='userOvert'>détail</span>
                </div>
                <div className="userOvert2">
                  <DeleteOutline className="userListDelete" onClick={() => { handleDelete(params.row.id) }} />
                  <span className='userOvert'>Supprimer</span>
                </div>
            </div>
          </>

        )
    }},
  ];

  const columns2 = [
    { field: 'company2', headerName: "Client", width: 130 },
    { field: 'first2', headerName: "Nom", width: 130},
    {
      field: 'last2',
      headerName: "Post-nom",
      width: 130
    },
    {
      field: 'skills2',
      headerName: 'Competence',
      width: 120
    },
    {
      field: 'salaire2',
      headerName: 'Salaire',
      width: 100,renderCell: (params) => `${params.value} $`
    },
    {
      field: 'prix2',
      headerName: 'Prix',
      width: 100,renderCell: (params) => `${params.value} $`
    },
    {
      field: 'date2',
      headerName: 'Date de la fin',
      width: 100,
      valueGetter: (params) =>
      format(new Date(params.row.date2), 'dd-MM-yyyy', { locale: fr }),
    },
    {field: 'action', HeaderName: 'Action', width: 140, renderCell: (params) =>{
        return(
          <>
            <div className="table-icons-row">
                <div className="userOvert1">
                    <VisibilityOutlined className='userEye' onClick={() => navigate(`/affectationView/${params.row.id}`)} />
                  <span className='userOvert'>détail</span>
                </div>
                <DeleteOutline className="userListDelete" onClick={()=>{handleDelete(params.row.id)}} />
            </div>
          </>

        )
    }},
  ];


  useEffect(() => {

    const fetchDatas = async () => {
      try {
        const res = await axios.get(`${DOMAIN}/api/admin/allaffectation`);
        setData(res.data)
        setLoading(false);

      } catch (error) {
        console.log(error)
      };
    }
    fetchDatas()
  }, [])
  
  useEffect(() => {

    const fetchDatas = async () => {
      try {
        const res = await axios.get(`${DOMAIN}/api/admin/contratEmploie`);
        setTap1(res.data)
        setLoading(false);

      } catch (error) {
        console.log(error)
      };
    }
    fetchDatas()
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
      await axios.delete(`${DOMAIN}/api/admin/deleteAff/${id}`);
      window.location.reload();
    }
  } catch (err) {
    console.log(err);
  }
};

const exportToExcel = () => {
        
  const excelData = data.map(row => ({
    Client : row.client_nom,
    Nom: row.first_name,
    'Post-nom': row.last_name,
    Compténce: row.skills,
    Salaire: row.salaire,
    'Date de la fin':row.end_date
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

      <div className="listeConge">
        <div className="liste-wrapper">
          <div className="contrats-top">
              <ShowChartIcon className='contrats-icon'/>
              <div className="contrats-info">
                  <h2 className="contrats-title">Affectation</h2>
                  <span className="contrats-span">Liste des agents affectés</span>
              </div>
          </div>
          <div className="personPdf">
            <Link className="personnel-btn-pdf" onClick={() => navigate('')}><PictureAsPdfIcon/>Pdf</Link>
            <Link className="personnel-btn-excel" onClick={exportToExcel}>Export Excel</Link>
          </div>
        </div>
          {loading ? (
        <div className="spinner-container">
            <FadeLoader color={'#36D7B7'} loading={loading} />
        </div>
        ) : (
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', background:'white' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example" sx={{ display: 'flex', gap: '10px' }}>
                <Tab sx={{ display: 'flex', alignItems: 'center', fontSize: '12px' }} icon={<AdsClickIcon />} label="Liste des affectations" value="1" />
                <Tab sx={{ display: 'flex', alignItems: 'center', fontSize: '12px' }} icon={<AdsClickIcon />} label="Liste des affectations personnalisées" value="2" />
            </TabList>
            </Box>
              <TabPanel value="1" sx={{background:'white' }}>
                <DataGrid rows={data} columns={columns} pageSize={10} checkboxSelection className="presenceTable" />
              </TabPanel>
              <TabPanel value="2" sx={{background:'white' }}>
                <DataGrid rows={tap1} columns={columns2} pageSize={10} checkboxSelection className="presenceTable" />
              </TabPanel>
            </TabContext>
          </Box>
        )}
      </div>
    </>
  )
}

export default Affectation