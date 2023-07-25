import './contrats.scss'
import { Link } from 'react-router-dom';
import FlakyIcon from '@mui/icons-material/Flaky';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { DeleteOutline} from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { contrats } from '../../data';

const Contrats = () => {

    const [data, setData] = useState(contrats);

    const HandleDelete = (id) =>{
        const dataFilter = data.filter(item=> item.id !== id)
        setData(dataFilter)
      }

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'type_de_contrat', headerName: 'Type de contrat', width: 120 },
        {
          field: 'duree_du_contrat',
          headerName: 'durée du contrat',
          type: 'number',
          width: 120,
        },
        {
          field: 'date_du_debut',
          headerName: 'Date du debut',
          width: 110 
        },
        {
            field: 'date_de_la_fin',
            headerName: 'Date de la fin',
            width: 110 
        },
        {
            field: 'salaire',
            headerName: 'Salaire',
            type: 'number',
            width: 80 
        },
        {
            field: 'heure_du_travail',
            headerName: 'Heure du travail',
            width: 100 
        },
        {
            field: 'avantage_social',
            headerName: 'Avantage social',
            width: 130 
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
        <div className="contrats">
            <div className="contrats-wrapper">
                <div className="contrats-top">
                    <FlakyIcon className='contrats-icon'/>
                    <div className="contrats-info">
                        <h2 className="contrats-title">Contrat</h2>
                        <span className="contrats-span">Liste des contrats</span>
                    </div>
                </div>
                <button className="contrats-btn" onClick={handleOpen}><PersonAddAlt1Icon/>Ajouter</button>
            </div>
            <DataGrid rows={data} columns={columns} pageSize={10} checkboxSelection className="contratTable" />
        </div>
    </>
  )
}

export default Contrats