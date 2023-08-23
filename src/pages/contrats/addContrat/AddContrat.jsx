import { DataGrid } from '@mui/x-data-grid'
import { Link, useParams } from 'react-router-dom';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import React, { useEffect, useState } from 'react';
import './addContrat.scss'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Checkbox } from '@mui/material';
import Swal from 'sweetalert2';
import config from '../../../config';

const AddContrat = () => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN
  const navigate = useNavigate();
  const HandleDelete = (id) => {
    const dataFilter = data.filter(item => item.id !== id)
    setData(dataFilter)
  }
  const [selectData, setSelectData] = useState();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selects, setSelects] = useState()
  const [selected, setSelected] = useState([]);
  const [selectedx, setSelectedx] = useState([]);
  const [selectedFunctionDetails, setSelectedFunctionDetails] = useState(null);
  const { id } = useParams();
  const [setSelectedFunction,selectedFunction] = useState([]);
  const [functionId, setFunctionId] = useState(null);
  const [employees, setEmployees] = useState([]);


  const handleSelectionChange = (event, id) => {
    if (event.target.checked) {
      setSelected([...selected, id]);
    } else {
      setSelected(selected.filter((selectedId) => selectedId !== id));
    }
  };
  const renderEmployeeStatus = (employee) => {
    if (employee.contrat_id === null || new Date(employee.date_fin) < new Date()) {
      return <span className="dot green"></span>;
    } else {
      return <span className="dot red"></span>;
    }
  };
  

  useEffect(() => {
    axios.get(`${DOMAIN}/api/admin/emploieDispo`).then((response) => {
      const transformedEmployees = response.data.map((employee) => ({
        id: employee.id,
        nom: employee.nom,
        prenom: employee.prenom,
        email: employee.email,
        gender: employee.gender,
        skills: employee.skills,
        contrat_id: employee.contrat_id,
        date_debut: employee.date_debut,
        date_fin: employee.date_fin,
        disponibilite: employee.contrat_id === null || new Date(employee.date_fin) < new Date() ? 'disponible' : 'indisponible',
        disponibiliteIcon: employee.contrat_id === null || new Date(employee.date_fin) < new Date() ? '🟢' : '🔴'
      }));
      setEmployees(transformedEmployees);
    });
  }, []);
  console.log(employees)
  

  
  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 70,
      renderCell: (params) => (
        <Checkbox
          checked={selected.includes(params.row.id)}
          onChange={(event) => handleSelectionChange(event, params.row.id)}
          inputProps={{ 'arial-label': 'controlled' }}
        />
      )
    },
    {
      field: 'nom',
      headerName: 'Nom',
      width: 120,
    },
    {
      field: 'prenom',
      headerName: 'Prenom',
      width: 120,
    },
    {
      field: 'skills',
      headerName: 'Competence',
      width: 120,
    },
    {
      field: 'disponibilite',
      headerName: 'Disponibilité',
      width: 120,
      cellClassName: (params) => {
        return params.value === 'disponible' ? 'disponible' : 'indisponible';
      },
      renderCell: (params) => (
        <React.Fragment>
          {params.row.disponibiliteIcon} {params.row.disponibilite}
        </React.Fragment>
      )
    },
  ];


  const [selectedData, setSelectedData] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const selectedItems = data.filter((item) => selected.includes(item.id));
    const selectedIds = selectedItems.map((item) => item.id);
    const newSelectedx = selectedItems.map((item) => ({
      agent: item.id,
      fonction: selectedFunctionDetails[0].id,
      contrat: id
    }));
    setSelectedx(selectedx.concat(newSelectedx));
    setSelectedData([...selectedData, ...selectedItems]);
  
    selectedx.map((dd) => {
      axios
        .post(`${DOMAIN}/api/admin/affectations`, {
          fonction_id: dd.fonction,
          emploie_id: dd.agent,
          contrat_id: dd.contrat
        })
        .then((response) => {
          axios
            .put(`${DOMAIN}/api/admin/employeFonctionPut/${dd.agent}`, { contrat_id: dd.contrat })
            .then((response) => {
              Swal.fire({
                title: 'Success',
                text: 'Affectation réussie!',
                icon: 'success',
                confirmButtonText: 'OK'
              });
              navigate('/affectation');
            })
            .catch((error) => {
              Swal.fire({
                title: 'Error',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'OK'
              });
            });
        });
    });
  };
    useEffect(() => {

    const fetchData = async () => {
      try {
        const res = await axios.get(`${DOMAIN}/api/admin`);
        setData(res.data)

      } catch (error) {
        console.log(error)
      };
    }
    fetchData()
  }, [])

    
    const filteredEmployees = employees.filter((employee) => {
      if (selectedFunctionDetails) {
        return employee.skills === selectedFunctionDetails[0]?.nom;
      }
      return true;
    });

  useEffect(()=>{

    const fetchDatas = async ()=> {
        try{
            const {data} = await axios.get(`${DOMAIN}/api/admin/fonction`);
            setSelectData(data)
    
          }catch(error){
            console.log(error)
          };
    }
    fetchDatas()
 }, [])

 const handleFunctionSelect = async (event) => {
const functionIdData = event.target.value;


  try {
    const response = await axios.get(`${DOMAIN}/api/admin/fonctionDetail/${functionIdData}`);
    const selectedFunctionDetails = response.data;
    console.log(selectedFunctionDetails)

    setSelectedFunctionDetails(selectedFunctionDetails);

    const newData = selectedx.map((item) => ({
      ...item,
      prix: selectedFunctionDetails.prix,
      salaire: selectedFunctionDetails.salaire,
      avantages: selectedFunctionDetails.avantages,
      horaire_conge: selectedFunctionDetails.horaire_conge,
    }));
    setSelectedx(newData);
  } catch (error) {
    console.log(error);
  } 
};

/* console.log(selectedFunctionDetails) */
  return (
    <>
      <div className="facturation">
        <div className="facturation-wrapper">
          <div className="contrats-top">
            <ChecklistRtlIcon className='contrats-icon' />
            <div className="contrats-info">
              <h2 className="contrats-title">Contrat</h2>
              <span className="contrats-span"></span>
            </div>
          </div>
          <button className="personnel-btn" onClick={handleOpen}><PersonAddAlt1Icon />Ajouter</button>
        </div>
        <div className="add-rows">
          <div className="add-row1">
            <DataGrid rows={filteredEmployees} columns={columns} pageSize={10} checkboxSelection className="presenceTable" />
          </div>
          <div className="add-row2">
            <div className="add-container-rows">
              <div className="add-row-top">
                <label htmlFor="" className="add-label">Fonction</label>
                
                <select id="pet-select" name="fonction" onChange={handleFunctionSelect} className='form-select'>
                  <option>selectionnez la fonction...</option>
                  {selectData?.map(item => (
                    <option value={item.id} key={item.id}>{item.nom}</option>
                  ))}
                </select>
              </div>
              { selectedFunctionDetails ?
              <div className="add-row-bottom">
                <div className="add-row-bottom1">
                  <h2 className="add-row-h2">Fonction : {selectedFunctionDetails[0]?.nom}</h2>
                  <span className="add-row-span"><strong>Prix :</strong> {selectedFunctionDetails[0]?.prix}</span>
                  <span className="add-row-span"><strong>Salaire :</strong> {selectedFunctionDetails[0]?.salaire}</span>
                  <span className="add-row-span"><strong>Avantages :</strong> {selectedFunctionDetails[0]?.avantages}</span>
                  <span className="add-row-span"><strong>Horaires :</strong> {selectedFunctionDetails[0]?.horaire_conge}</span>
                </div>
                <button className='add-row-btn' onClick={handleSubmit}>Affecter</button>
              </div>
            : ''}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddContrat