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

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'background.paper',
    border: '1px solid #FFF',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    outline: 'none'
  }

const Mission = () => {
    const [data, setData] = useState({});
    const [name,setName] = useState();
    const [date, setDate] = useState();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const navigate = useNavigate();

    const handChange = (e) =>{
        setName(prev=>({...prev, [e.target.name]: e.target.value}))
    }


    useEffect(()=>{

        const fetchData = async ()=> {
            try{
                const res = await axios.get("http://localhost:8080/api/admin/mission");
                setData(res.data)
        
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
            await axios.delete(`http://localhost:8080/api/admin/mission/${id}`);
            window.location.reload();
          }
        } catch (err) {
          console.log(err);
        }
      };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'agent_id', headerName: 'Agent', width: 130 },
        { field: 'client_id', headerName: 'Client', width: 130 },
        {
          field: 'date',
          headerName: 'Date',
          width: 130,
        },
        {
            field: 'duree',
            headerName: 'Durée',
            width: 130,
        },
        { field: 'montant', headerName: 'Montant', width: 130 },
        {field: 'action', HeaderName: 'Action', width: 150, renderCell: (params) =>{
            return(
              <>
                <div className="table-icons-row">
                    <Link to={`/edit/${params.row.id}`}><ModeEditOutlineIcon className='userListBtn'/></Link>
                    <VisibilityIcon className='userEye' onClick={() => navigate(`/views/${params.row.id}`)} />
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
                <button className="personnel-btn" onClick={()=>(navigate('/missionForm'))}><PersonAddAlt1Icon/>Ajouter</button>
            </div>
            <DataGrid rows={data} columns={columns} pageSize={10} checkboxSelection className="userTable" />
        </div>
    </>
  )
}

export default Mission