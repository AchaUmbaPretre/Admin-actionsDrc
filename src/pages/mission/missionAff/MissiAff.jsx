import { DataGrid } from '@mui/x-data-grid'
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useEffect, useState } from 'react';
import './../../horaire/horaireAll.scss'
import axios from 'axios';
import { FadeLoader } from 'react-spinners';
import config from '../../../config'
import { useLocation } from 'react-router-dom';
import Select from 'react-select';
import './missioAff.scss'


const MissiAff = () => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [agentsAffectes, setAgentsAffectes] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [sites, SetSites] = useState([]);

  const handleChange = ()=>{

  }

  const handleCheckboxChange = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  console.log(selectedIds)
  const columns = [
    { field: 'id', headerName: 'ID', width: 60 },
    { field: 'first_name', headerName: "Employé(e)", width: 140 },
    { field: 'last_name', headerName: 'Prenom', width: 140 },
    { field: 'phone_number', headerName: "Telephone", width: 140 },
    {
      field: 'checkbox',
      headerName: 'Sélectionner',
      width: 120,
      renderCell: (params) => {
        return (
          <input
            type="checkbox"
            checked={selectedIds.includes(params.row.id)}
            onChange={() => handleCheckboxChange(params.row.id)}
          />
        );
      },
    },
  ];

  useEffect(() => {
    const fetchDatas = async () => {
      try {
        const {data} = await axios.get(`${DOMAIN}/api/admin/sites`);
        SetSites(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDatas();
  }, []);

  useEffect(() => {
    const fetchAgentsAffectes = async () => {
      try {
        const contratId = searchParams.get('contrat_id');
  
        const response = await axios.get(`${DOMAIN}/api/admin/contrats/${contratId}/agents`);
  
        setAgentsAffectes(response.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchAgentsAffectes();
  }, []);


  return (
    <>
      <div className="missAff">
        <div className="facturation-wrapper">
          <div className="contrats-top">
              <AccessTimeIcon className='contrats-icon'/>
              <div className="contrats-info">
                  <h2 className="contrats-title">Liste des agents  qui sont affectés dans ce contrat</h2>
                  <span className="contrats-span">Liste agents affectés</span>
              </div>
          </div>
          <button className="personnel-btn" onClick={''}><PersonAddAlt1Icon/>Ajouter</button>
        </div>
        <div className="personnel-aff">
          {loading ? (
          <div className="spinner-container">
              <FadeLoader color={'#36D7B7'} loading={loading} />
          </div>
          ) : (
          <DataGrid rows={agentsAffectes} columns={columns} pageSize={10} checkboxSelection className="presenceTable" />
          )}
          <div className="personnel-aff-bottom">
            <div className="personnel-bottom">
              <label htmlFor="" className='personnel-bottom-title'>Sites <span>*</span></label>
              <Select
                  className='bottom-select'
                  name="nom_site"
                  onChange={(selectedOption) => handleChange(selectedOption, "nom_site")}
                  options={sites.map((item) => ({
                    value: item.id,
                    label: item.nom_site
                  }))}
                />
            </div>
          </div>
        </div>
        
      </div>
    </>
  )
}

export default MissiAff