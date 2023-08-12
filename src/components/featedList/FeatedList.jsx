import './featedList.scss'
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import {data} from '../../data'
import { useEffect, useState } from 'react'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import InfoIcon from '@mui/icons-material/Info';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useNavigate } from 'react-router-dom';
import { DeleteOutline} from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import axios from 'axios';
import { FadeLoader } from 'react-spinners';
import { format } from 'date-fns';

const FeatedList = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showSpinner, setShowSpinner] = useState(true);
    const spinnerDuration = 2000;
    const navigate = useNavigate();

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'first_name', headerName: 'Nom', width: 110 },
        { field: 'last_name', headerName: 'Prenom', width: 100 },
        {
          field: 'phone_number',
          headerName: 'Telephone',
          type: 'number',
          width: 100,
        },
        {
            field: 'email',
            headerName: 'Email',
            type: 'number',
            width: 120,
          },
        {
            field: 'date_of_birth',
            headerName: 'Date de naissance',
            width: 110,
            valueGetter: (params) =>
            format(new Date(params.row.date_of_birth), 'yyyy-MM-dd'),
        },
        { field: 'gender', headerName: 'Genre', width: 50 },
        { field: 'phone_number', headerName: 'Telephone', width: 100 },
        {
          field: 'skills',
          headerName: 'Competence',
          width: 120,
        },
        {field: 'action', HeaderName: 'Action', width: 150, renderCell: (params) =>{
            return(
              <>
                <div className="table-icons-row">
                    <VisibilityIcon className='userEye' onClick={() => navigate(`/views/${params.row.id}`)} />
                </div>
              </>
    
            )
        }},
      ];

    useEffect(()=>{

        const fetchData = async ()=> {
            try{
                const res = await axios.get("http://localhost:8080/api/admin");
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
  return (
    <>
        <div className="featedList">
            <h2 className="title-h2"><PersonOutlineIcon className='icon-title'/>Employé(e)</h2>
            <div className="feated-container">
                {loading ? (
                <div className="spinner-container">
                    <FadeLoader color={'#36D7B7'} loading={loading} />
                </div>
                ) : (
                    <DataGrid rows={data} columns={columns} pageSize={10} checkboxSelection className="userTable" />
                )}
            </div>
        </div>
    </>
  )
}

export default FeatedList