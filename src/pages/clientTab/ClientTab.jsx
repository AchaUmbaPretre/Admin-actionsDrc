import './clientTab.scss'
import GroupsIcon from '@mui/icons-material/Groups';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { DataGrid } from '@mui/x-data-grid'
import { Link } from 'react-router-dom';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import { DeleteOutline} from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { useState } from 'react';

const ClientTab = () => {


  const HandleDelete = (id) =>{
    const dataFilter = data.filter(item=> item.id !== id)
    setData(dataFilter)
  }
  const [data, setData] = useState({});

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'company_name', headerName: "Company", width: 120 },

    {
      field: 'address',
      headerName: 'Adresse',
      width: 130 
    },
    {
        field: 'phone_number',
        headerName: "Tel de la compagnie",
        width: 150 
    },
    {
        field: 'contact_name',
        headerName: "Nom du contact principal",
        width: 140 
    },
    {
      field: 'contact_email',
      headerName: "Email",
      width: 140 
  },
    {
      field: 'contact_phone',
      headerName: 'Tel principal',
      width: 140 
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
        <div className="clientTab">
          <div className="client-wrapper">
            <div className="contrats-top">
              <GroupsIcon className='contrats-icon'/>
              <div className="contrats-info">
                <h2 className="contrats-title">Client</h2>
                <span className="contrats-span">Liste des clients</span>
              </div>
            </div>
            <button className="contrats-btn" onClick={''}><PersonAddAlt1Icon/>Ajouter</button>
            
          </div>
          <DataGrid rows={data} columns={columns} pageSize={10} checkboxSelection className="presenceTable" />
        </div>

    </>
  )
}

export default ClientTab