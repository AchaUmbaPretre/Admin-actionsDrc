import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import './personnel.scss'
import { DeleteOutline} from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { useState } from 'react';
import { rows } from '../../data';


const Personnel = () => {
    const [data, setData] = useState(rows);

    const HandleDelete = (id) =>{
      const dataFilter = data.filter(item=> item.id !== id)
      setData(dataFilter)
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'nom', headerName: 'Nom', width: 110 },
        { field: 'prenom', headerName: 'Prenom', width: 110 },
        {
          field: 'age',
          headerName: 'Age',
          type: 'number',
          width: 90,
        },
        {
            field: 'genre',
            headerName: 'Genre',
            width: 90,
        },
        { field: 'adresse', headerName: 'Adresse', width: 120 },
        { field: 'telephone', headerName: 'Telephone', width: 120 },
        {
          field: 'competence',
          headerName: 'Competence',
          width: 120,
        },
        {field: 'action', HeaderName: 'Action', width: 150, renderCell: (params) =>{
            return(
              <>
                <div className="table-icons-row">
                    <Link to={`/users/${params.row.id}`}><ModeEditOutlineIcon className='userListBtn'/></Link>
                    <VisibilityIcon className='userEye'/>
                    <DeleteOutline className="userListDelete" onClick={()=>{HandleDelete(params.row.id)}} />
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
                    <PeopleIcon/>
                    <div className="personnel-info">
                        <h2 className="personnel-title">Employé</h2>
                        <span className="personnel-span">Liste des employés</span>
                    </div>
                </div>
                <div className="personnel-bottom">
                    <button className="personnel-btn"><PersonAddAlt1Icon/></button>
                </div>
            </div>
            <DataGrid rows={data} columns={columns} pageSize={10} checkboxSelection className="userTable" />
        </div>
    </>
  )
}

export default Personnel