import './featedView.scss'
import GroupsIcon from '@mui/icons-material/Groups';
import {data} from '../../data'
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import InfoIcon from '@mui/icons-material/Info';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { PhoneAndroid } from '@mui/icons-material';
import { FadeLoader } from 'react-spinners';
import { DataGrid } from '@mui/x-data-grid'
import { DeleteOutline} from '@mui/icons-material';
import {Link, useNavigate} from 'react-router-dom'

const FeatedView = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
    
        const fetchData = async ()=> {
          try{
              const res = await axios.get("http://localhost:8080/api/admin/client");
              setData(res.data)
              setLoading(false);
      
            }catch(error){
              console.log(error)
            };
      }
      fetchData()
      }, [])

      const columns = [
        { field: 'company_name', headerName: "Company", width: 100 },
        {
            field: 'phone_number',
            headerName: "Tel de la compagnie",
            width: 90 
        },
        {field: 'action', HeaderName: 'Action', width: 110, renderCell: (params) =>{
            return(
              <>
                <div className="table-icons-row">
                    <VisibilityIcon className='userEye' onClick={() => navigate(`/viewsClient/${params.row.id}`)}/>
                </div>
              </>
    
            )
        }},
      ];
  return (
    <>
        <div className="featedView">
            <h2 className="title-h2"><GroupsIcon className='icon-title'/>Client(e)</h2>
            <div className="feated-wrapper">
                    {loading ? (
              <div className="spinner-container">
                  <FadeLoader color={'#36D7B7'} loading={loading} />
              </div>
              ) : (
              <DataGrid rows={data} columns={columns} pageSize={10} checkboxSelection className="presenceTable" />
              )}
            </div>
        </div>

    </>
  )
}

export default FeatedView