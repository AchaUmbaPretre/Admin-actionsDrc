import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { DeleteOutline, EditOutlined, VisibilityOutlined } from '@mui/icons-material';
import {FileExcelOutlined} from '@ant-design/icons';
import { DollarCircleOutlined, BankOutlined, CreditCardOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import { FadeLoader } from 'react-spinners';
import config from '../../config'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import './payement.scss'
import moment from 'moment';
import PaiementSearch from './paiementSearch/PaiementSearch';
import BarReturn from '../../components/barReturn/BarReturn';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '1px solid #FFF',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  }

const Payement = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [selected, setSelected] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleSelectionChange = (newSelection) => {
      setSelected(newSelection.selectionModel);
    }; 

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

  
     const columns = [
        { field: 'id', headerName: 'N°', width: 50},
        { field: 'first_name', headerName: 'Nom', width: 120},
        { field: 'last_name', headerName: 'Prenom', width: 120},
        {
          field: 'payment_date',
          headerName: 'Date de paiement',
          width: 170,
          valueGetter: (params) =>
          moment(params.row.payment_date).format('DD-MM-yyyy'),
        },
        {
            field: 'amount',
            headerName: 'Montant',
            width: 165,renderCell: (params) => `${params.value} $`
        },
        {
          field: 'methode_paiement',
          headerName: 'Méthode de paiement',
          width: 165,
          renderCell: (params) => {
            const status = params.value || 'Non spécifié';
            let icon, backgroundColor;
      
            switch (status) {
              case 'Virement':
                backgroundColor = 'blue';
                icon = <BankOutlined style={{ marginRight: '5px' }} />;
                break;
              case 'Espèces':
                backgroundColor = '#4caf50';
                icon = <DollarCircleOutlined style={{ marginRight: '5px' }} />;
                break;
              case 'Chèque':
                backgroundColor = '#ff9800';
                icon = <CreditCardOutlined style={{ marginRight: '5px' }} />;
                break;
              default:
                return null;
            }
      
            return (
              <div
                className="payment-method-cell"
                style={{
                  backgroundColor: backgroundColor,
                  color: 'white',
                  border: `1px solid ${backgroundColor}`,
                  padding: '3px 10px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {icon}
                {status}
              </div>
            );
          },
        },
      {field: 'action', HeaderName: 'Action', width: 175, renderCell: (params) =>{
          return(
              <>
                <div className="table-icons-row">
                  <div className="userOvert0">
                    <Link onClick={''}>
                      <EditOutlined className="userListBtn" onClick={() => navigate(`/payementEdit/${params.row.id}`)} />
                      <span className='userOvert'>Modifier</span>
                    </Link>
                  </div>
                  <div className="userOvert1">
                    <VisibilityOutlined className='userEye' onClick={() => navigate(`/payementView/${params.row.id}`)} />
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

     useEffect(()=>{
        const fetchData = async ()=> {
            try{
                const res = await axios.get(`${DOMAIN}/api/admin/payement`);
                setData(res.data)
                setLoading(false);
              }catch(error){
                console.log(error)
              };
        }
        fetchData()
     }, [])

     const exportToExcel = () => {
        
      const excelData = data.map(row => ({
        'ID_facture': row.invoice_id,
        "Date de payement": format(new Date(row.payment_date), 'yyyy-MM-dd'),
        Montant: row.amount,
        "Methode de payement": row.payment_method
      }));
    

      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(excelData);
    
 
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Feuille 1');
    

      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const excelBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      

      const excelFilename = 'tableau.xlsx';
      saveAs(excelBlob, excelFilename);
    };
     

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
        await axios.delete(`${DOMAIN}/api/admin/payement/${id}`);
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
        <div className="contrats">
            <div className="contrats-wrapper">
                <div className="contrats-top">
                    <AttachMoneyIcon className='contrats-icon'/>
                    <div className="contrats-info">
                        <h2 className="contrats-title">Paiement</h2>
                        <span className="contrats-span">Liste des paiements</span>
                    </div>
                </div>
                <div className="personPdf">
                  <Link className="personnel-btn" onClick={handleOpen}><PersonSearchIcon/>Selectionnez un client</Link>
                  <Link className="personnel-btn-pdf" onClick={() => navigate('/payementPdf')}><PictureAsPdfIcon/>Pdf</Link>
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
                            <Box component="form" sx={{'& > :not(style)': { m: 1, width: '250ch' }, display:'flex', flexWrap:'wrap'}} noValidate autoComplete="off">
                              <PaiementSearch handleModalClose={handleClose} />
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
            <div className="contrats-left">
              <DataGrid rows={data} columns={columns}  pageSize={10}  checkboxSelection
                selectionModel={selected}
                onSelectionModelChange={handleSelectionChange} className="contratTable" />
            </div>
            )}
        </div>
            
    </>
  )
}

export default Payement;