import './featedList.scss'
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';
import { FadeLoader } from 'react-spinners';
import { format } from 'date-fns';
import config from '../../config'

const FeatedList = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showSpinner, setShowSpinner] = useState(true);
    const spinnerDuration = 2000;
    const navigate = useNavigate();

    const columns = [
        { field: 'first_name', headerName: 'Nom', width: 110 },
        { field: 'last_name', headerName: 'Prenom', width: 110 },
        {
          field: 'phone_number',
          headerName: 'Telephone',
          width: 100,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 120,
          },
        {
            field: 'date_of_birth',
            headerName: 'Date de naissance',
            width: 110,
            valueGetter: (params) =>
            format(new Date(params.row.date_of_birth), 'dd-MM-yyyy'),
        },
        { field: 'gender', headerName: 'Genre', width: 50 },
        { field: 'phone_number', headerName: 'Telephone', width: 120 },
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
                    <DataGrid rows={data} columns={columns} initialState={{
                      pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                        },
                      }} checkboxSelection className="userTable" 
                    />
                )}
            </div>
        </div>
    </>
  )
}

export default FeatedList