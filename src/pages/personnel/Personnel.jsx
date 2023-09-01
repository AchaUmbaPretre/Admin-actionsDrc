import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import './personnel.scss'
import { DeleteOutline} from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
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
import Backdrop from '@mui/material/Backdrop';
import Formulaire from './formulaire/Formulaire';


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
      await axios.put(`${DOMAIN}/api/admin/employes/${id}`);
      window.location.reload();
    }
  } catch (err) {
    console.log(err);
  }
};

    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'first_name', headerName: 'Nom', width: 100, renderCell: (params) =>{
          return <div className="userList">
                    <img src={params.row.source ? `../upload/${params.row.source}`: userImg} alt="" className="userImg" />
                    {params.row.first_name}
                 </div>
        }},
        {
          field: 'last_name',
          headerName: 'Postnom',
          width: 100,
        },        
        {
          field: 'phone_number',
          headerName: 'Telephone',
          width: 100,
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
        { field: 'address', headerName: 'Adresse', width: 100 },
        {
          field: 'skills',
          headerName: 'Competence',
          width: 100,
        },
        {field: 'action', HeaderName: 'Action', width: 130, renderCell: (params) =>{
            return(
              <>
                <div className="table-icons-row">
                    <Link to={`/edit/${params.row.id}`}><ModeEditOutlineIcon className='userListBtn'/></Link>
                    <VisibilityIcon className='userEye' onClick={() => navigate(`/views/${params.row.id}`)} />
                    <PictureAsPdfIcon className="userListDelete" onClick={() => navigate(`/personpdf/${params.row.id}`)} />
                    <DeleteOutline className="userListDelete" onClick={()=>{handleDelete(params.row.id)}} />
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
                        <h2 className="personnel-title">Employé</h2>
                        <span className="personnel-span">Liste des employés</span>
                    </div>
                </div>
                <div className="personPdf">
                  <Link className="personnel-btn" onClick={handleOpen}><PersonAddAlt1Icon/>Ajouter</Link>
                  <Link className="personnel-btn-pdf" onClick={() => navigate('/personpdfTable')}><PictureAsPdfIcon/>Pdf</Link>
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
                            <Box component="form" sx={{'& > :not(style)': { m: 1, }, display:'flex', flexWrap:'wrap'}} noValidate autoComplete="off">
                              <Formulaire handleModalClose={handleClose} />
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
          <DataGrid rows={data} columns={columns} pageSize={10} checkboxSelection className="userTable" />
          
        )}
        </div>
    </>
  )
}

export default Personnel