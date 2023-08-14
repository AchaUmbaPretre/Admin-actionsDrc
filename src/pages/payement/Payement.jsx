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
import { DeleteOutline} from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from "react-router-dom";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import { FadeLoader } from 'react-spinners';
import PayeForm from './form/PayeForm';

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
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'invoice_id', headerName: 'ID_facture', width: 180 },

        {
          field: 'payment_date',
          headerName: 'Date de payement',
          width: 180,
          valueGetter: (params) =>
          format(new Date(params.row.payment_date), 'yyyy-MM-dd'),
        },
        {
            field: 'amount',
            headerName: 'Montant',
            width: 180,
        },
        {
          field: 'payment_method',
          headerName: "Methode de payement",
          width: 180,
      },
        {field: 'action', HeaderName: 'Action', width: 190, renderCell: (params) =>{
            return(
              <>
                <div className="table-icons-row">
                    <Link to={`/editContrat/${params.row.id}`}><ModeEditOutlineIcon className='userListBtn'/></Link>
                    <DeleteOutline className="userListDelete" onClick={()=>{handleDelete(params.row.id)}} />
                    <Link to={`addContrat/${params.row.id}`}><AddCircleOutlineIcon className="userListDelete"  /></Link>
                </div>
              </>
    
            )
        }},
      ]; 

/*        useEffect(()=>{

        const fetchData = async ()=> {
            try{
                const res = await axios.get("http://localhost:8080/api/admin/payement");
                setData(res.data)
                setLoading(false);
              }catch(error){
                console.log(error)
              };
        }
        fetchData()
     }, []) */

     useEffect(()=>{

        const fetchData = async ()=> {
            try{
                const res = await axios.get("http://localhost:8080/api/admin/payementAll");
                setData(res.data)
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
        await axios.delete(`http://localhost:8080/api/admin/payemen/${id}`);
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
                        <h2 className="contrats-title">Payement</h2>
                        <span className="contrats-span">Liste des payements</span>
                    </div>
                </div>
                <button className="contrats-btn" onClick={handleOpen}><PersonAddAlt1Icon/>Ajouter</button>
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
                              <PayeForm/>
                            </Box>
                        </Box>
                    </Fade>
                </Modal>
            </div>
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