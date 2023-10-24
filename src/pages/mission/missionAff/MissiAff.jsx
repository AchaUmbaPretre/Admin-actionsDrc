import { useNavigate } from 'react-router-dom';
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
  const [horaireTables, setHoraireTables] = useState([
    { id: 2, days: 'Lundi', start_time: '00:00', end_time: '00:00' },
    { id: 3, days: 'Mardi', start_time: '00:00', end_time: '00:00' },
    { id: 4, days: 'Mercredi', start_time: '00:00', end_time: '00:00' },
    { id: 5, days: 'Jeudi', start_time: '00:00', end_time: '00:00' },
    { id: 6, days: 'Vendredi', start_time: '00:00', end_time: '00:00' },
    { id: 7, days: 'Samedi', start_time: '00:00', end_time: '00:00' },
    { id: 8, days: 'Dimanche', start_time: '00:00', end_time: '00:00' },
  ])
  const [title, setTitle] = useState({});
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

  console.log(horaireTables)
  
  
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

  const columns = [
    {
      title: 'Code',
      dataIndex: 'id',
      key: 'id',
      width: '2%',
    },
    {
      title: 'Nom',
      dataIndex: 'first_name',
      key: 'first_name',
      width: '20%',
      ...getColumnSearchProps('first_name'),
    },
    {
      title: 'Post-nom',
      dataIndex: 'last_name',
      key: 'last_name',
      width: '20%',
      ...getColumnSearchProps('last_name'),
    },
    {
      title: 'Sélectionner',
      dataIndex: 'checkbox',
      width: '10%',
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

  const horaireTable = [
    {
      title: 'Jour',
      dataIndex: 'days',
      width: '25%',
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
      width: '25%',
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
    const fetchDatas = async ()=> {
        try{
            const clientId = searchParams.get('client_id');
            const {data} = await axios.get(`${DOMAIN}/api/admin/missionContratTitle/${clientId}`);
            setTitle(data[0])
            
          }catch(error){
            console.log(error)
          };
    }
    fetchDatas()
  }, [clientId])

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

        console.log(data)
      } catch (error) {
        console.log(error);
      }
    };
    fetchDatas();
  }, [clientId]);

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
    const sortedHoraireTables = horaireTables.sort((a, b) => a.id - b.id)
  
    try {
      const requestDataArray = [];
      for (let i = 0; i < sortedHoraireTables.length; i++){
        const table = sortedHoraireTables[i];
        selectedIds.map((item)=>{
        const requestData = {
          agent_id: item,
          client_id: clientId,
          jour: table.id,
          site: datas.site,
          heureEntrant: table.start_time,
          heureSortant: table.end_time,
        };
        requestDataArray.push(requestData);
      })}
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
                  <h2 className="contrats-title">Client : {title.company_name}</h2>
                  <span className="contrats-span">Liste des agents qui sont affectés à {title.company_name}</span>
              </div>
          </div>
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
                    label:`Nom du site : ${item.description} Av/ ${item.avenue} Q/${item.quartier} C/${item.commune} N°${item.numero}`
                  }))}
                />
            </div>
            <div className="personnel-horaire">
                  <div className="personnel-date">
                    <h2 className='personnel-bottom-title'>Jour de la semaine<span>*</span></h2>
                    <div className="person-scroll-tab">
                      <Table columns={horaireTable} dataSource={horaireTables} className="presenceTable" scroll={scrollY} pagination={{ pageSize: 7}}/>
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