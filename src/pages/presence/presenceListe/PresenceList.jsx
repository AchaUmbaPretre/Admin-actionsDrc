import { useNavigate } from 'react-router-dom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useEffect, useState } from 'react';
import './presenceList.scss'
import axios from 'axios';
import { FadeLoader } from 'react-spinners';
import config from '../../../config'
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { Button, Input, Space, Table, TimePicker } from 'antd';
import * as React from 'react';
import Select from 'react-select';
import { DatePicker } from 'antd'



const PresenceList = () => {
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
  const [missionWeek, setMissionWeek] = useState([])

  const [title, setTitle] = useState({});
  const clientId = searchParams.get('client_id');
  const [value, setValue] = React.useState('1');
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [total, setTotal] = useState({});
  const searchInput = React.useRef(null);
  const scroll = { x: 400 };
  const [checkTime, setCheckTime] = useState('');
  const [checkout, setCheckout] = useState('');
  const [date, setdate] = useState('');
  const contratId = searchParams.get('contrat_id');
  const [factureContratCount, setFactureContratCount] = useState ([]);

  const onChange = (date, dateString) => {
    setdate(dateString);
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
  
  
  const handleCheckboxChange = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };



  const handleChange = (e) => {
/*     let formattedValue = value;
  
    if (typeof value === 'string' && value.length > 0) {
      formattedValue = value.charAt(0).toUpperCase() + value.slice(1);
    } */
  
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }


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
      ...getColumnSearchProps('start_date'),
    },
    {
        title: 'Prenom',
        dataIndex: 'last_name',
        key: 'last_name',
        width: '20%',
        ...getColumnSearchProps('last_name'),
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

  useEffect(() => {
    const fetchAgentsAffectes = async () => {
      try {
        const contratId = searchParams.get('contrat_id');
  
        const response = await axios.get(`${DOMAIN}/api/admin/factureCalcul/${contratId}`);
  
        setAgentsAffectes(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAgentsAffectes();
  }, []);



  useEffect(() => {
    const factureCount = async () => {
      try {
        const contratId = searchParams.get('contrat_id');
  
        const {data} = await axios.get(`${DOMAIN}/api/admin/factureContratCount/${contratId}`);
        setFactureContratCount(data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    factureCount();
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
  
    try {

      await Promise.all(
        selectedIds.map(async (dd) => {
          await axios.post(`${DOMAIN}/api/admin/presences`, {
            employee_id: dd,
            client_id : clientId,
            date: date,
            check_in_time: checkTime,
            check_out_time: checkout
          });
        })
      );
  
      Swal.fire({
        title: 'Success',
        text: 'Presence créé avec succès!',
        icon: 'success',
        confirmButtonText: 'OK',
      });
  
      navigate('/presence');
    } catch (err) {
      Swal.fire({
        title: 'Error',
        text: err.message,
        icon: 'error',
        confirmButtonText: 'OK',
      });
  
      console.log(err);
    }
  };

  return (
    <>
      <div className="factureCalcul">
        <div className="facturation-wrapper">
          <div className="contrats-top">
              <AccessTimeIcon className='contrats-icon'/>
              <div className="contrats-info">
                  <h2 className="contrats-title">Presence des agents de {title.company_name}</h2>
                  <span className="contrats-span">Liste de presence des agents qui sont affectés à {title.company_name}</span>
              </div>
          </div>
        </div>
        <div className="personnel-aff">
          {loading ? (
          <div className="spinner-container">
              <FadeLoader color={'#36D7B7'} loading={loading} />
          </div>
          ) : (
            <Table columns={columns} dataSource={agentsAffectes} className="presenceTable" scroll={scroll} pagination={{ pageSize: 5}}/>
          )}
          <div className="personnel-aff-bottom">
            <div className="personnel-row">
                <h2 className='personnel-h2'>Formulaire de presence</h2>
                <div className="presence-control">
                    <label htmlFor="">Date <span>*</span></label>
                    <DatePicker name={date} onChange={onChange}/>
                </div>
                <div className="presence-control">
                    <div className="presence-rows-heure">
                      <div className="presence-rows">
                        <label htmlFor="">Heure début <span>*</span></label>
                        <input type="time" name='check_in_time' className="presence-input" onChange={(e)=>{setCheckTime(e.target.value)}}/>
                      </div>
                      <div className="presence-rows">
                        <label htmlFor="">Heure fin <span>*</span></label>
                        <input type="time" name='check_out_time' className="presence-input" onChange={(e)=>{setCheckout(e.target.value)}} />
                      </div>
                    </div>
                     
                </div>
                <button className="presence-btn" onClick={handleClick}>Envoyer</button>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default PresenceList