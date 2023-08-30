import { DataGrid } from '@mui/x-data-grid'
import { Link, useParams } from 'react-router-dom';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { useEffect, useState } from 'react';
import './addContrat.scss'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Checkbox } from '@mui/material';
import Swal from 'sweetalert2';
import config from '../../../config'
import { de } from 'date-fns/locale';

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

  const handleChange = (e) => {
    setSelectedFunction(e.target.value);
  };
  console.log(selectedx)
  const columns = [
    {
      field: 'id', headerName: 'ID', width: 70,
      renderCell: (params) => (
        <Checkbox
          checked={selected.includes(params.row.id)}
          onChange={(event) => handleSelectionChange(event, params.row.id)}
          inputProps={{ 'arial-label': 'controlled' }}
        />
      )
    },
    { field: 'first_name', headerName: 'Nom', width: 110 },
    { field: 'last_name', headerName: 'Prenom', width: 100 },
    {
      field: 'email',
      headerName: 'Email',
      type: 'number',
      width: 120,
    },
    { field: 'gender', headerName: 'Genre', width: 50 },
    {
      field: 'skills',
      headerName: 'Competence',
      width: 120,
    },
  ];
  const [selectedData, setSelectedData] = useState([]);

  const handleSelectionChange = (event, id) => {
    if (event.target.checked) {
      setSelected([...selected, id])
    } else {
      setSelected(selected.filter((row) => row !== id))
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

/*     if (!selects || !selects.fonction) {
      Swal.fire({
        title: 'Erreur',
        text: 'Veuillez sélectionner une fonction',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    } */

    const selectedItems = data.filter((item) => selected.includes(item.id));
    const selectedIds = selectedItems.map((item) => item.id);
    const newSelectedx = selectedItems.map((item) => ({
      agent: item.id,
      fonction: selectedFunctionDetails.id,
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
          Swal.fire({
            title: 'Success',
            text: 'Affectation réussie!',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          navigate('/contrats');
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

    const filteredEmployees = data.filter((employee) => {
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
const functionId = event.target.value;


  try {
    const response = await axios.get(`${DOMAIN}/api/admin/fonctionDetail/${functionId}`);
    const selectedFunctionDetails = response.data;
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

console.log(selectedFunctionDetails)
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