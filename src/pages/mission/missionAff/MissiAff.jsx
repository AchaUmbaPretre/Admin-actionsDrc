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
import Swal from 'sweetalert2';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { Button, Input, Space, Table } from 'antd';
import moment from 'moment'
import * as React from 'react';


const MissiAff = () => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN
  const [data, setData] = useState({});
  const [datas, setDatas] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [agentsAffectes, setAgentsAffectes] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedIds1, setSelectedIds1] = useState([]);
  const [sites, SetSites] = useState([]);
  const [idEmployee, setIdEmployee] = useState('');
  const [jourSemaine, setJourSemaine] = useState('');
  const [heureDebut, setHeureDebut] = useState('');
  const [heureFin, setHeureFin] = useState('');
  const [missionWeek, setMissionWeek] = useState([])
  const [horaireTables, setHoraireTables] = useState( [
    { id: 2, start_time: '00:00', end_time: '00:00' },
    { id: 3, start_time: '00:00', end_time: '00:00' },
    { id: 4, start_time: '00:00', end_time: '00:00' },
    { id: 5, start_time: '00:00', end_time: '00:00' },
    { id: 6, start_time: '00:00', end_time: '00:00' },
    { id: 7, start_time: '00:00', end_time: '00:00' },
    { id: 8, start_time: '00:00', end_time: '00:00' },
  ])
  const clientId = searchParams.get('client_id');
  const [value, setValue] = React.useState('1');
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = React.useRef(null);
  const scroll = { x: 400 };
  const scrollY = { y: 200 };
 
 
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


  const handleTimeChange = (id, field, value) => {
    setHoraireTables((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };
  
  
  const handleCheckboxChange = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };



  const handleCheckboxChange1 = (id) => {
    if (selectedIds1.includes(id)) {
      setSelectedIds1(selectedIds1.filter((selectedId1) => selectedId1 !== id));
      
    } else {
      setSelectedIds1([...selectedIds1, id]);
    }
  };


  const handleChange = (e) => {
    setDatas((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };


/*   const columns = [
    { field: 'first_name', headerName: "Employé(e)", width: 125 },
    { field: 'last_name', headerName: 'Prenom', width: 125 },
    {
      field: 'checkbox',
      headerName: 'Sélectionner',
      width: 80,
      renderCell: (params) => {
        const isChecked = selectedIds.includes(params.row.id);
    
        return (
          <>
            {isChecked ? (
              <ToggleOnIcon
                color="primary"
                style={{ fontSize: '40px', cursor: 'pointer' }}
                onClick={() => handleCheckboxChange(params.row.id)}
              />
            ) : (
              <ToggleOffIcon
                color="disabled"
                style={{ fontSize: '40px', cursor: 'pointer' }}
                onClick={() => handleCheckboxChange(params.row.id)}
              />
            )}
          </>
        );
      },
    },
  ]; */

  const columns = [
    {
      title: 'Code',
      dataIndex: 'id',
      key: 'id',
      width: '2%',
    },
    {
      title: 'Employé(e)',
      dataIndex: 'first_name',
      key: 'first_name',
      width: '20%',
      ...getColumnSearchProps('start_date'),
    },
    {
      title: 'Sélectionner',
      dataIndex: 'checkbox',
      width: '20%',
      render: (text, record) => {
        const isChecked = selectedIds.includes(record.id);
        return (
          <>
            {isChecked ? (
              <ToggleOnIcon
                color="primary"
                style={{ fontSize: '40px', cursor: 'pointer' }}
                onClick={() => handleCheckboxChange(record.id)}
              />
            ) : (
              <ToggleOffIcon
                color="disabled"
                style={{ fontSize: '40px', cursor: 'pointer' }}
                onClick={() => handleCheckboxChange(record.id)}
              />
            )}
          </>
        );
      },
    },

  ];

 
/*   const horaireTable = [
    { field: 'days', headerName: 'Jour de la semaine', width: 100 },
    {
      field: 'start_time',
      headerName: 'Heure début',
      width: 150,
      renderCell: (params) => {
        return (
          <input
            type="time"
            className='input-time'
            value={params.row.start_time}
            onChange={(e) => handleTimeChange(params.row.id, 'start_time', e.target.value)}
          />
        );
      },
    },
    {
      field: 'end_time',
      headerName: 'Heure fin',
      width: 150,
      renderCell: (params) => {
        return (
          <input
            type="time"
            className='input-time'
            value={params.row.end_time}
            onChange={(e) => handleTimeChange(params.row.id, 'end_time', e.target.value)}
          />
        );
      },
    },
    {
      field: 'checkbox',
      headerName: 'Sélectionner',
      width: 100,
      renderCell: (params) => {
        const isChecked = selectedIds1.includes(params.row.id);
        return (
          <>
            {isChecked ? (
              <ToggleOnIcon
                color="primary"
                style={{ fontSize: '40px', cursor: 'pointer' }}
                onClick={() => handleCheckboxChange1(params.row.id)}
              />
            ) : (
              <ToggleOffIcon
                color="disabled"
                style={{ fontSize: '40px', cursor: 'pointer' }}
                onClick={() => handleCheckboxChange1(params.row.id)}
              />
            )}
          </>
        );
      },
    },
  ]; */

  const horaireTable = [
    {
      title: 'Jour de la semaine',
      dataIndex: 'days',
      key: 'id',
      width: '30%',
    },
    {
      title: 'Heure début',
      dataIndex: 'start_time',
      key: 'start_time',
      width: '25%',
      render: (text, record) =>{
        return (
          <input
            type="time"
            className='input-time'
            value={record.start_time}
            onChange={(e) => handleTimeChange(record.id, 'start_time', e.target.value)}
          />
        );
      }
    },
    {
      title: 'Heure fin',
      dataIndex: 'end_time',
      key: 'end_time',
      width: '20%',
      render: (text, record) =>{
        return (
          <input
            type="time"
            className='input-time'
            value={record.end_time}
            onChange={(e) => handleTimeChange(record.id, 'end_time', e.target.value)}
          />
        );
      }
    },
    {
      title: 'Sélectionner',
      dataIndex: 'checkbox',
      width: '25%',
      render: (text, record) => {
        const isChecked = selectedIds1.includes(record.id);
        return (
          <>
            {isChecked ? (
              <ToggleOnIcon
                color="primary"
                style={{ fontSize: '40px', cursor: 'pointer' }}
                onClick={() => handleCheckboxChange1(record.id)}
              />
            ) : (
              <ToggleOffIcon
                color="disabled"
                style={{ fontSize: '40px', cursor: 'pointer' }}
                onClick={() => handleCheckboxChange1(record.id)}
              />
            )}
          </>
        );
      },
    },

  ];



  useEffect(()=>{
    
    const fetchData = async ()=> {
      try{
          const res = await axios.get(`${DOMAIN}/api/admin/missionWeek`);
          setMissionWeek(res.data)
  
        }catch(error){
          console.log(error)
        };
  }
  fetchData()
  }, [DOMAIN])


  useEffect(() => {
    const fetchDatas = async () => {
      try {
        const {data} = await axios.get(`${DOMAIN}/api/admin/sites/${clientId}`);
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


  const handleClick = async (e) => {
    e.preventDefault();
  
    try {
      const requestDataArray = [];
  
      for (let i = 0; i < horaireTables.length; i++) {
        const requestData = {
          agent_id: selectedIds,
          client_id: clientId,
          jour: horaireTables[i].id,
          site: datas.site,
          heureEntrant: horaireTables[i].start_time,
          heureSortant: horaireTables[i].end_time
        };
  
        requestDataArray.push(requestData);
      }
  
      await Promise.all(requestDataArray.map(requestData => axios.post(`${DOMAIN}/api/admin/missions`, requestData)));
  
      Swal.fire({
        title: 'Success',
        text: 'Missions créées avec succès!',
        icon: 'success',
        confirmButtonText: 'OK'
      });

      navigate('/mission');
    } catch (err) {
      Swal.fire({
        title: 'Error',
        text: err.message,
        icon: 'error',
        confirmButtonText: 'OK'
      });
      console.log(err);
    }
  };


  return (
    <>
      <div className="missAff">
        <div className="facturation-wrapper">
          <div className="contrats-top">
              <AccessTimeIcon className='contrats-icon'/>
              <div className="contrats-info">
                  <h2 className="contrats-title">Liste des agents  qui sont affectés dans ce contrat</h2>
                  <span className="contrats-span">Liste des agents affectés</span>
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
            <Table columns={columns} dataSource={agentsAffectes} className="presenceTable" scroll={scroll} pagination={{ pageSize: 7}}/>
          )}
          <div className="personnel-aff-bottom">
            <div className="personnel-bottom">
              <h2 htmlFor="" className='personnel-bottom-title'>Sites <span>*</span></h2>
              <Select
                  className='bottom-select'
                  name="site"
                  onChange={(selectedOption) =>handleChange({ target: { name: 'site', value: selectedOption.value } })}
                  options={sites.map((item) => ({
                    value: item.id,
                    label: item.nom_site
                  }))}
                />
            </div>
            <div className="personnel-horaire">
                  <div className="personnel-date">
                    <h2 className='personnel-bottom-title'>Jour de la semaine<span>*</span></h2>
                    <div className="person-scroll-tab">
                      <Table columns={horaireTable} dataSource={missionWeek} className="presenceTable" scroll={scrollY} pagination={{ pageSize: 7}}/>
                    </div>
                  </div>
                  <button className="person-btn" onClick={handleClick} >Envoyer</button>
            </div>
          </div>
        </div>
        
      </div>
    </>
  )
}

export default MissiAff