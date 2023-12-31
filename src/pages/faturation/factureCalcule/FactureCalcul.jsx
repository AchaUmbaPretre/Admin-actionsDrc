import { useNavigate } from 'react-router-dom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useEffect, useState } from 'react';
import './facureCalcul.scss'
import axios from 'axios';
import { FadeLoader } from 'react-spinners';
import config from '../../../config'
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { Button, Input, Space, Table } from 'antd';
import * as React from 'react';
import Select from 'react-select';


const FactureCalcul = () => {
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
  const [status, setStatus] = useState([]);
  const [optionsStatus, setOptionsStatus] = useState([]);
  const montantTotals = total[0]?.montant_total;
  const [montantTotal, setMontantTotal] = useState(0);
  const contratId = searchParams.get('contrat_id');
  const [factureContratCount, setFactureContratCount] = useState ([]);

useEffect(() => {
  setMontantTotal(montantTotals);
  }, [montantTotals]);

  const handleOnchange = (e) => {
      setMontantTotal(e.target.value);
  }

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

  const handleSelectChanges = (selectedOptionClient) => {
    setStatus(selectedOptionClient.value);
  };

  const handleChange = (value, name) => {
    let formattedValue = value;
  
    if (typeof value === 'string' && value.length > 0) {
      formattedValue = value.charAt(0).toUpperCase() + value.slice(1);
    }  
    setData((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const columns = [
    {
      title: 'Code',
      dataIndex: 'id',
      key: 'id',
      width: '2%',
    },
    {
      title: 'Client',
      dataIndex: 'nom_client',
      key: 'first_name',
      width: '20%',
      ...getColumnSearchProps('nom_client'),
    },
    {
        title: 'Prix',
        dataIndex: 'prix',
        key: 'prix',
        width: '20%',
        ...getColumnSearchProps('prix'),
        render: (text) => `${text} $`,
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

  useEffect(()=>{
    const fetchData = async ()=> {
      try{
          const res = await axios.get(`${DOMAIN}/api/admin/statusFacture`);
          setOptionsStatus(res.data)
        }catch(error){
          console.log(error)
        };
  }
  fetchData()
  }, [])

  useEffect(() => {
    const fetchAgentsAffectes = async () => {
      try {
        const contratId = searchParams.get('contrat_id');
        const response = await axios.get(`${DOMAIN}/api/admin/factureCalculTotal/${contratId}`);
        setTotal(response.data);
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
      const response = await axios.post(`${DOMAIN}/api/admin/factures`, {
        status : data.status,
        client_id: clientId,
        total_amount: montantTotal,
      });
      const invoiceId = response.data.invoice_id;
      navigate('/facturation')
      Swal.fire({
        icon: 'success',
        title: 'Facture créée avec succès',
        text: `ID de la facture : ${invoiceId}`,
      }).then(() => {
        Swal.close(); 
      });

    } catch (error) {
      console.error('Erreur lors de la création de la facture :', error);
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Une erreur s\'est produite lors de la création de la facture.',
      });
    }
  };

  return (
    <>
      <div className="factureCalcul">
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
            <Table columns={columns} dataSource={agentsAffectes} className="presenceTable" scroll={scroll} pagination={{ pageSize: 5}}/>
          )}
          <div className="personnel-aff-bottom">
            <div className="personnel-row">
                <h2 className="personnel-total-title"><span>Facture à </span><span className='facture-color'>{title.company_name}</span></h2>
                <span className="ligne"></span>
                <h2 className="personnel-total-title"><span>Contrat N° : </span><span className='facture-color'>{contratId}</span></h2>
                <span className="ligne"></span>
                <h2 className="personnel-total-title"><span>Type du contrat : </span><span className='facture-color'>{title.contract_type}</span></h2>
                <span className="ligne"></span>
                <h2 className="personnel-total-title"><span>Nombre d'agents : </span><span className='facture-color'>{factureContratCount.total} Agent(s)</span></h2>
                <span className="ligne"></span>
                <h2 className="personnel-total-title"><span>Prix total : </span><span><input type="text" name='total_amount' value={montantTotal} onChange={handleOnchange} className="form-input-montant"/>$</span></h2>
            </div>
            <div className="personnel-row-input">
                <div className="form-row">
                    <label htmlFor="" className="label-form">Statut de la facture<span>*</span></label>
                    <Select
                        onChange={(selectedOption) =>
                      handleChange(selectedOption.value, 'status')
                      }
                        options={optionsStatus.map((item) => ({
                            value: item.status,
                            label: item.status
                        }))}
                        placeholder="Selectionnez un status..."
                    />
                </div>
                <button className="person-btn" onClick={handleClick} >Envoyer</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FactureCalcul