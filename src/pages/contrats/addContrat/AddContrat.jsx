import { useParams } from 'react-router-dom';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { useEffect, useRef, useState } from 'react';
import './addContrat.scss'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Switch } from '@mui/material';
import Swal from 'sweetalert2';
import config from '../../../config'
import FormAdd from './formAdd/FormAdd';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import DoDisturbOutlinedIcon from '@mui/icons-material/DoDisturbOutlined';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { Button, Input, Space, Table } from 'antd';
import { FadeLoader } from 'react-spinners';

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
  const [selected, setSelected] = useState([]);
  const [selectedx, setSelectedx] = useState([]);
  const { id } = useParams();
  const [informationsSelectionnees,setInformationsSelectionnees] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [title, setTitle] = useState({});
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [loading, setLoading] = useState(true);

  const handleSelectionChange = (event, id) => {
    if (event.target.checked) {
      setSelected([...selected, id])
    } else {
      setSelected(selected.filter((row) => row !== id))
    }
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Recherche...`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 100,
            }}
          >
            Recherche
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            supprimer
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filtre
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Fermer
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });


  const columns = [
    {
      title: 'Code',
      dataIndex: 'id',
      key: 'id',
      width: '10%',
    },
    {
      title: 'Nom',
      dataIndex: 'first_name',
      key: 'first_name',
      width: '10%',
      ...getColumnSearchProps('first_name'),
    },
    {
      title: 'Prénom',
      dataIndex: 'last_name',
      key: 'last_name',
      width: '15%',
      ...getColumnSearchProps('last_name'),
    },
    {
      title: 'Compétence',
      dataIndex: 'nom_departement',
      key: 'skills',
      width: '20%',
      ...getColumnSearchProps('skills'),
    },
    {
      dataIndex: 'availability',
      title: 'Disponibilité',
      width: '20%',
      render: (text, record) =>
        record.contrat_id ? (
          <div className="indisponible">Indisponible
          <DoDisturbOutlinedIcon style={{ color: 'red' }} />
          </div>
        ) : (
          <div className="disponible">Disponible
          <CheckCircleOutlinedIcon style={{ color: 'green' }} />
          </div>
        ),
    },
    {
      dataIndex: '',
      title: 'Sélectionnez',
      width: '15%',
      render: (_, record) => (
        <Switch
          checked={selected.includes(record.id)}
          onChange={(event) => handleSelectionChange(event, record.id)}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      ),
    }
  ];

useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${DOMAIN}/api/admin`);
        setData(res.data)
        setLoading(false);
      } catch (error) {
        console.log(error)
      };
    }
    fetchData()
  }, [])

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
},[id])

 useEffect(()=>{
  const fetchDatas = async ()=> {
      try{
          const {data} = await axios.get(`${DOMAIN}/api/admin/contratTitle/${id}`);
          setTitle(data[0])
        }catch(error){
          console.log(error)
        };
  }
  fetchDatas()
}, [id])


/*     const filteredEmployees = data.filter((employee) => {
      if (selectedFunctionDetails) {
        return employee.skills === selectedFunctionDetails[0]?.nom;
      }
      return true;
    }); */


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

  if (selected.length === 0) {
    Swal.fire({
      title: 'Aucun agent n\'est sélectionné',
      icon: 'warning',
      text: 'Veuillez sélectionner au moins un agent.',
      confirmButtonText: 'OK',
    });
    return;
  }

  if (informationsSelectionnees.length === 0) {
    Swal.fire({
      title: 'Aucune fonction n\'est sélectionnée',
      icon: 'warning',
      text: 'Veuillez sélectionner une fonction.',
      confirmButtonText: 'OK',
    });
    return;
  }

  const selectedItems = data.filter((item) => selected.includes(item.id));
  const newSelectedx = selectedItems.map((item) => ({
    agent: item.id,
    fonction: informationsSelectionnees,
    contrat: id
  }));
  setSelectedx(selectedx.concat(newSelectedx));
  setSelectedData([...selectedData, ...selectedItems]);

  await Promise.all(
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
  }));
};

  return (
    <>
      <div className="facturation">
        <div className="facturation-wrapper">
          <div className="contrats-top">
            <ChecklistRtlIcon className='contrats-icon' />
            <div className="contrats-info">
              <h2 className="contrats-title">Client : {title.company_name}</h2>
              <span className="contrats-span"></span>
            </div>
          </div>
        </div>
        {loading ? (
          <div className="spinner-container">
            <FadeLoader color={'#36D7B7'} loading={loading} />
          </div>
            ) : (
        <div className="add-rows">
          <div className="add-row1">
            <Table columns={columns} dataSource={data}  pagination={{ pageSize: 5}}/>
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
                          {information.nom_departement}
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
        </div>) }
      </div>
    </>
  )
}

export default AddContrat