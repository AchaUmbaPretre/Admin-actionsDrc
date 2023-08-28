import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { DeleteOutline} from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { useState } from 'react';
import * as React from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { useEffect } from 'react';
import { format } from 'date-fns';
import { FadeLoader } from 'react-spinners';
import config from '../../config'
import MissionForm from './form/MissionForm';
import { Box, Fade, Modal } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';

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

const Mission = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const navigate = useNavigate();


     useEffect(()=>{

      const fetchData = async ()=> {
          try{
              const {data} = await axios.get(`${DOMAIN}/api/admin/allmission`);
              setData(data)
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
            await axios.delete(`${DOMAIN}/api/admin/mission/${id}`);
            window.location.reload();
          }
        } catch (err) {
          console.log(err);
        }
      };

    const columns = [
        { field: 'id', headerName: 'ID', width: 80 },
        { field: 'company_name', headerName: 'Client', width: 150 },
        { field: 'first_name', headerName: 'Agent', width: 150 },
        { field: 'days', headerName: 'Jour', width: 150 },
        {
          field: 'heureEntrant',
          headerName: 'Heure de début',
          width: 150,valueGetter: (params) => params.row.heureEntrant.substring(0, 5)
        },
        {
          field: 'heureSortant',
          headerName: 'Heure de fin',
          width: 150, valueGetter: (params) => params.row.heureSortant.substring(0, 5)
        },

        {field: 'action', HeaderName: 'Action', width: 160, renderCell: (params) =>{
            return(
              <>
                <div className="table-icons-row">
                    <Link to={`/missionEdite/${params.row.id}`}><ModeEditOutlineIcon className='userListBtn'/></Link>
                    <VisibilityIcon className='userEye' onClick={() => navigate(`/missionView/${params.row.id}`)} />
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
                        <h2 className="personnel-title">Mission</h2>
                        <span className="personnel-span"></span>
                    </div>
                </div>
                <button className="personnel-btn" onClick={handleOpen}><PersonAddAlt1Icon/>Ajouter</button>
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
                              <MissionForm handleModalClose={handleClose} />
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

export default Mission