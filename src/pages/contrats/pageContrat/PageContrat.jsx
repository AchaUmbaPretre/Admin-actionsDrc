import './pageContrat.scss'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid'

const PageContrat = () => {
    const [data, setData] = useState({});
    const navigate = useNavigate();

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'first_name', headerName: 'Nom', width: 110 },
        { field: 'last_name', headerName: 'Prenom', width: 100 },
        {
            field: 'email',
            headerName: 'Email',
            type: 'number',
            width: 120,
          },
        {
          field: 'skills',
          headerName: 'Competence',
          width: 120,
        },
      ]

  return (
    <>
        <div className="facturation">
            <div className="facturation-wrapper">
                <div className="contrats-top">
                    <ChecklistRtlIcon className='contrats-icon'/>
                    <div className="contrats-info">
                        <h2 className="contrats-title">Contrat</h2>
                        <span className="contrats-span"></span>
                    </div>
                </div>
                <button className="personnel-btn" ><PersonAddAlt1Icon/>Ajouter</button>
            </div>
            <DataGrid rows={data} columns={columns} pageSize={10} checkboxSelection className="presenceTable" />
        </div>
  </>
  )
}

export default PageContrat