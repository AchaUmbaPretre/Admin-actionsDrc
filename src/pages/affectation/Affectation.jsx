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

const Affectation = () => {

  const DOMAIN = config.REACT_APP_SERVER_DOMAIN;

  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
 const [loading, setLoading] = useState(true);

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
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
      width: 150 
    },
    {
      field: 'salaire',
      headerName: 'Salaire',
      width: 150,renderCell: (params) => `${params.value} $`
    },
    {
      field: 'end_date',
      headerName: 'Date de la fin',
      width: 150,
      valueGetter: (params) =>
      format(new Date(params.row.end_date), 'dd-MM-yyyy', { locale: fr }),
    },
    {field: 'action', HeaderName: 'Action', width: 200, renderCell: (params) =>{
        return(
          <>
            <div className="table-icons-row">
                <div className="userOvert1">
                    <VisibilityOutlined className='userEye' onClick={() => navigate(`/affectations/${params.row.id}`)} />
                  <span className='userOvert'>détail</span>
                </div>
                <DeleteOutline className="userListDelete" onClick={()=>{handleDelete(params.row.id)}} />
            </div>
          </>

        )
    }},
  ];
/*   useEffect(() => {

    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/admin/affectation");
        setData(res.data)

      } catch (error) {
        console.log(error)
      };
    }
    fetchData()
  }, []) */

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
            <Link className="personnel-btn" onClick={handleOpen}><PersonAddAlt1Icon/>Ajouter</Link>
            <Link className="personnel-btn-pdf" onClick={() => navigate('/personpdfTable')}><PictureAsPdfIcon/>Pdf</Link>
            <Link className="personnel-btn-excel" onClick={exportToExcel}>Export Excel</Link>
          </div>
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

export default Affectation