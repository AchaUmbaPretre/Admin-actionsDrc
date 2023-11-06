import GroupsIcon from '@mui/icons-material/Groups';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { DataGrid } from '@mui/x-data-grid'
import { Link } from 'react-router-dom';
import { ApartmentOutlined, DeleteOutline,VisibilityOutlined } from '@mui/icons-material';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
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
import { Table, Space, Button, Popconfirm} from 'antd';
import { EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import DepartementForm from './form/DepartementForm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 650,
  bgcolor: 'background.paper',
  p: 2,
  borderRadius: 2,
  outline: 'none'
}

const Departement = () => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN
  const { confirm } = Modal;
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const handleEdit = (id) => {
        navigate(`/departementEdite/${id}`);
  };

  const actionColumnStyle = { display: 'flex', alignItems: 'center' };
  const renderActionColumn = (_, record) => (
    <Space size="middle" style={actionColumnStyle}>
        <Button type="primary" icon={<EditOutlined />} onClick={()=> handleEdit(record.id)}>
          Modifier
        </Button>
      <Popconfirm
        title="Êtes-vous sûr de vouloir supprimer?"
        onConfirm={() => handleDelete(record.id)}
        okText="Oui"
        cancelText="Non"
      >
        <Button type="danger" icon={<DeleteOutlined />}  style={{"background" : "red", "color" : "#fff"}}>
          Supprimer
        </Button>
      </Popconfirm>
    </Space>
  );

  useEffect(()=>{
    const fetchData = async ()=> {
      try{
          const {data} = await axios.get(`${DOMAIN}/api/admin/departement`);
          setData(data)
          setLoading(false);
        }catch(error){
          console.log(error)
        };
  }
  fetchData()
  }, [])
  
  const columns = [
    { title: '#', dataIndex: 'index', key: 'index', width: 50, render: (_, __, index) => index + 1 },
    { title: 'Nom de département', dataIndex: 'nom_departement', key: 'nom', width: 500 },
    { title: 'Action', key: 'action', width: 80, render: renderActionColumn },
  ];


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
        await axios.delete(`${DOMAIN}/api/admin/departement/${id}`);
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
              <ApartmentOutlined className='contrats-icon'/>
              <div className="contrats-info">
                <h2 className="contrats-title">Département</h2>
                <span className="contrats-span">Liste des département</span>
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
                  <DepartementForm handleModalClose={handleClose} />
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
            <Table columns={columns} loading={loading} dataSource={data} className="presenceTable"/>
          )}
        </div>
    </>
  )
}

export default Departement