import { DataGrid } from '@mui/x-data-grid'
import { useParams } from 'react-router-dom';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { useEffect, useState } from 'react';
import './addContrat.scss'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Checkbox } from '@mui/material';
import Swal from 'sweetalert2';
import config from '../../../config'
import FormAdd from './formAdd/FormAdd';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import DoDisturbOutlinedIcon from '@mui/icons-material/DoDisturbOutlined';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '1px solid #FFF',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  outline: 'none'
}
const AddContrat = () => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN
  const navigate = useNavigate();
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
  const [selectedData, setSelectedData] = useState([]);


/*   const handleChange = (e) => {
    setSelectedFunction(e.target.value);
  }; */

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 70,
    },
    { field: 'first_name', headerName: 'Nom', width: 110 },
    { field: 'last_name', headerName: 'Prénom', width: 110 },
    {
      field: 'skills',
      headerName: 'Compétence',
      width: 110,
    },
    {
      field: 'availability',
      headerName: 'Disponibilité',
      width: 80,
      renderCell: (params) => (
        params.row.contrat_id ? <DoDisturbOutlinedIcon style={{ color: 'red' }} /> : <CheckCircleOutlinedIcon style={{ color: 'green' }} />
      ),
    },
    {
      field: '',
      headerName: 'Sélectionnez',
      width: 100,
      renderCell: (params) => (
        <Checkbox
          checked={selected.includes(params.row.id)}
          onChange={(event) => handleSelectionChange(event, params.row.id)}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      ),
    },
  ];


  const handleSelectionChange = (event, id) => {
    if (event.target.checked) {
      setSelected([...selected, id])
    } else {
      setSelected(selected.filter((row) => row !== id))
    }
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
            const {data} = await axios.get(`${DOMAIN}/api/admin/ContratInfo/${id}`);
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

const handleSubmit = async (e) => {
  e.preventDefault();

  const selectedItems = data.filter((item) => selected.includes(item.id));
  const selectedIds = selectedItems.map((item) => item.id);
  const newSelectedx = selectedItems.map((item) => ({
    agent: item.id,
    fonction: informationsSelectionnees,
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
      axios.put(`${DOMAIN}/api/admin/employeFonctionPut/${dd.agent}`,{
          contrat_id : dd.contrat
      })
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
        </div>
        <div className="add-rows">
          <div className="add-row1">
            <DataGrid rows={filteredEmployees} columns={columns} pageSize={10} checkboxSelection className="presenceTable" />
          </div>
          <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                    }} 
                >
                    <Fade in={open}>
                        <Box sx={style}>
                            <Box component="form" sx={{'& > :not(style)': { m: 1},}} noValidate autoComplete="off">
                              <FormAdd handleClose={handleClose} contratId={id} employeesId={selected} fonction={informationsSelectionnees} />
                            </Box>
                        </Box>
                    </Fade>
          </Modal>
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
                            Prix : {information.prix} $
                          </div>
                          <div>
                            Salaire : {information.salaire} $
                          </div>
                        </div>
                    </label>
                  </div>
                ))}
                  <div className="rows-btn">
                    <button onClick={handleSubmit}>Envoyer</button>
                    <button onClick={handleOpen} className='ajouter'>Ajouter tes info</button>
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