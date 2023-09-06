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
  const [informationsSelectionnees,setInformationsSelectionnees] = useState([]);
  const [nouvelleInformation,setNouvelleInformation] = useState([]);

  const handleChange = (e) => {
    setSelectedFunction(e.target.value);
  };

  const columns = [
    {
      field: 'id', headerName: 'ID', width: 70,
    },
    { field: 'first_name', headerName: 'Nom', width: 120 },
    { field: 'last_name', headerName: 'Prenom', width: 120 },
    {
      field: 'skills',
      headerName: 'Competence',
      width: 120,
    },
    {
      field: '',
      headerName: 'Selectionnez',
      width: 110,
      renderCell: (params) => (
        <Checkbox
          checked={selected.includes(params.row.id)}
          onChange={(event) => handleSelectionChange(event, params.row.id)}
          inputProps={{ 'arial-label': 'controlled' }}
        />
      )
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

 const handleSelectionInformation = (informationId) => {
  if (informationsSelectionnees.includes(informationId)) {
    setInformationsSelectionnees((prevSelections) =>
      prevSelections.filter((id) => id !== informationId)
    );
  } else {
    setInformationsSelectionnees((prevSelections) => [...prevSelections, informationId]);
  }
};

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
                <h2>Sélectionnez les informations qui vous intéressent</h2>
                {selectData?.map((information) => (
                  <div key={information.id} className='input-row'>
                    <label>
                      <div className='info-name'>
                        <input
                          className='input-radio'
                          type="checkbox"
                          checked={informationsSelectionnees.includes(information.id)}
                          onChange={() => handleSelectionInformation(information.id)}
                        />
                          {information.nom}
                      </div>
                        <div className="label-info">
                          <div>
                            Avantage : {information.avantages}
                          </div>
                          <div>
                            Prix : {information.prix}
                          </div>
                          <div>
                            Salaire : {information.salaire}
                          </div>
                        </div>
                    </label>
                  </div>
                ))}
                  <div className="rows-btn">
{/*                     <h2>Ajouter vos propres informations</h2>
                  <input
                    type="text"
                    value={nouvelleInformation}
                    onChange={(e) => setNouvelleInformation(e.target.value)}
                  /> */}
                    <button onClick={''}>Envoyer</button>
                    <button onClick={''} className='ajouter'>Ajoute tes info</button>
                </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddContrat