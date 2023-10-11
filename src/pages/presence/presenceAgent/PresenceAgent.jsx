import { useNavigate } from 'react-router-dom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useEffect, useState } from 'react';
import './../../horaire/horaireAll.scss'
import axios from 'axios';
import Swal from 'sweetalert2';
import { FadeLoader } from 'react-spinners';
import config from '../../../config'
import { useLocation } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { Button, Input, Space, Table, Tag } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined, StopOutlined } from '@ant-design/icons';
import { EyeOutlined } from '@ant-design/icons';
import { Switch } from 'antd';
import moment from 'moment'
import * as React from 'react';

const PresenceAgent = ({}) => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);;
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const clientId = searchParams.get('client_id');
  const [agentsAffectes, setAgentsAffectes] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [title, setTitle] = useState({});
  const [value, setValue] = React.useState('1');
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = React.useRef(null);
  const scroll = { x: 400 };
 
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

  const columns = [
    {
      title: 'Code',
      dataIndex: 'id',
      key: 'id',
      width: '2%',
    },
    {
      title: 'Date de debut',
      dataIndex: 'start_date',
      key: 'start_date',
      width: '20%',
      ...getColumnSearchProps('start_date'),
      sorter: (a, b) => moment(a.start_date) - moment(b.start_date),
      sortDirections: ['descend', 'ascend'],
      render: (text) => moment(text).locale('fr').format('DD-MM-YYYY')
    },
    {
      title: 'Date de la fin',
      dataIndex: 'end_date',
      key: 'end_date',
      width: '20%',
      ...getColumnSearchProps('end_date'),
      sorter: (a, b) => moment(a.end_date) - moment(b.end_date),
      sortDirections: ['descend', 'ascend'],
      render: (text) => moment(text).locale('fr').format('DD-MM-YYYY')
    },
    {
      title: 'Type du contrat',
      dataIndex: 'contract_type',
      key: 'contract_type',
      width: '20%',
      render: (text) => {
        let color = '';
        let icon = null;
  
        if (text === 'Journalier') {
          color = 'green';
        } else if (text === 'Interim') {
          color = 'blue';
        } else if (text === 'Resilié') {
          color = 'red';
        }
  
        return (
          <Space>
            <Tag color={color}>{text}</Tag>
          </Space>
        );
      },
    },
    {
      title: 'Statut du contrat',
      dataIndex: 'status',
      key: 'status',
      width: '20%',
      ...getColumnSearchProps('status'),
      render: (text) => {
        let icon = null;
        let color = '';
        
        if (text === 'En attente') {
          icon = <ClockCircleOutlined />;
          color = 'blue';
        } else if (text === 'En cours') {
          icon = <CheckCircleOutlined />;
          color = 'green';
        } else if (text === 'Résilié') {
          icon = <StopOutlined />;
          color = 'red';
        }
        return (
          <span style={{ color }}>
            {icon} {text}
          </span>
        );
      },
    },
    {
      title: 'Sélectionner',
      dataIndex: 'checkbox',
      render: (text, record) => {
        return (
          <>
            <div className="table-icons-row">
              <Switch
                checked={selectedIds.includes(record.id)}
                onChange={() => handleCheckboxChange(record.id)}
                size="small"
              />
            </div>
          </>
        );
      },
    }

  ];


 /*  const columns = [
    { field: 'id', headerName: 'ID', width: 60 },
    { field: 'start_date', headerName: "Date de debut", width: 160 , valueGetter: (params) =>
    format(new Date(params.row.start_date), 'yyyy-MM-dd'), },
    { field: 'end_date', headerName: 'Date de la fin', width: 160,  valueGetter: (params) =>
    format(new Date(params.row.end_date), 'yyyy-MM-dd')},
    { field: 'contract_type', headerName: "Type du contrat", width: 160 },
    { field: 'status', headerName: "status du contrat", width: 150, renderCell: (params) => {
    
      switch (params.value) {
        case 'Résilié':
          return (
            <span style={{ color: 'red', display: 'flex', alignItems: 'center', justifyContent: 'space-between',gap: "5px"}}>
              Résilié
              <CancelIcon style={{ fontSize: '16px' }} />
            </span>
          );
        case 'En attente':
          return (
            <span style={{ color: 'green', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: "5px" }}>
              En attente
              <CheckCircleIcon style={{ fontSize: '16px' }} />
            </span>
          );
        case 'En cours':
          return (
            <span style={{ color: 'blue', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: "5px" }}>
              En cours
              <PendingIcon style={{ fontSize: '16px' }} />
            </span>
          );
        default:
          return null;
      }
    }, },
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
  ]; */

  useEffect(() => {
    const fetchAgentsAffectes = async () => {
      try {
        const clientId = searchParams.get('client_id');
  
        const response = await axios.get(`${DOMAIN}/api/admin/missionContrat/${clientId}`);
  
        setAgentsAffectes(response.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchAgentsAffectes();
  }, []);

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

  const handleClick = async (e) => {
    e.preventDefault();

    if (selectedIds.length === 0) {
      Swal.fire({
        title: 'Aucun agent n\'est sélectionné',
        icon: 'warning',
        text: 'Veuillez sélectionner au moins un agent.',
        confirmButtonText: 'OK',
      });
      return;
    }
    if (selectedIds.length > 1) {
      Swal.fire({
        title: 'Sélectionner un contrat',
        icon: 'warning',
        text: 'Veuillez sélectionner un contrat pas plus de 1 .',
        confirmButtonText: 'OK',
      });
      return;
    }

    try {
      const selectedAgentIds = selectedIds.join(',');
      const params = new URLSearchParams({
        contrat_id: selectedAgentIds,
        client_id: clientId
      });
  
      navigate(`/presenceList?${params.toString()}`);
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
      <div className="facturation">
        <div className="facturation-wrapper">
          <div className="contrats-top">
              <AccessTimeIcon className='contrats-icon'/>
              <div className="contrats-info">
                  <h2 className="contrats-title">Client : {title.company_name} </h2>
                  <span className="contrats-span">Liste des contrats de notre client {title.company_name} </span>
              </div>
          </div>
        </div>
        {loading ? (
        <div className="spinner-container">
            <FadeLoader color={'#36D7B7'} loading={loading} />
        </div>
        ) : (
          <Table columns={columns} dataSource={agentsAffectes} className="presenceTable" scroll={scroll} pagination={{ pageSize: 7}}/>
        )}
            <button className="personnel-btn" onClick={handleClick}>voir les agents du contrat..</button>
      </div>
    </>
  )
}

export default PresenceAgent