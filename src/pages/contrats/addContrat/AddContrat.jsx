import { DataGrid } from '@mui/x-data-grid'
import { Link, useLocation, useParams } from 'react-router-dom';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { useEffect, useState } from 'react';
import './addContrat.scss'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Checkbox } from '@mui/material';
import Swal from 'sweetalert2';
const AddContrat = () => {

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
  const { id } = useParams();
  const handleChange = (e) => {
    setSelects((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

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

    const selectedItems = data.filter((item) => selected.includes(item.id));
    const selectedIds = selectedItems.map((item) => item.id);
    const newSelectedx = selectedItems.map((item) => ({
      agent: item.id,
      fonction: selects.fonction,
      contrat: id
    }));
    setSelectedx(selectedx.concat(newSelectedx));
    setSelectedData([...selectedData, ...selectedItems]);

    selectedx.map((dd) => {
      axios
        .post('http://localhost:8080/api/admin/affectations', {
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

/*   const handleSubmit = async(e) => {
    e.preventDefault();

    const selectedItems = data.filter((item) => selected.includes(item.id));
    const selectedIds = selectedItems.map((item) => item.id);
    const newSelectedx = selectedItems.map((item) => ({ agent: item.id, fonction: selects.fonction, contrat: id }));
    setSelectedx(selectedx.concat(newSelectedx));
    setSelectedData([...selectedData, ...selectedItems]);

  
    selectedx.map((dd) => {
        axios.post('http://localhost:8080/api/admin/affectations', 
        {
          fonction_id : dd.fonction,
          emploie_id : dd.agent,
          contrat_id : dd.contrat
        }).then((response) => {
           navigate('/contrats')
        }).catch((error) => {
          alert(error)
        })
    })
  } */


    useEffect(() => {

    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/admin");
        setData(res.data)

      } catch (error) {
        console.log(error)
      };
    }
    fetchData()
  }, [])


  useEffect(()=>{

    const fetchDatas = async ()=> {
        try{
            const res = await axios.get("http://localhost:8080/api/admin/fonction");
            setSelectData(res.data)
    
          }catch(error){
            console.log(error)
          };
    }
    fetchDatas()
 }, [])

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
            <DataGrid rows={data} columns={columns} pageSize={10} checkboxSelection className="presenceTable" />
          </div>
          <div className="add-row2">
            <div className="add-row-top">
              <label htmlFor="" className="add-label">Fonction</label>
              
              <select id="pet-select" name="fonction" onChange={handleChange} className='form-select'>
              { selectData?.map(item =>( 
                <option value={item.id}>{item.nom}</option>
                ))}
              </select>
            </div>
            <div className="add-row-bottom">
              <Link className="add-btn" onClick={handleSubmit} >Envoyer</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddContrat