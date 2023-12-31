import { useNavigate } from 'react-router-dom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useEffect, useState } from 'react';
import './paiementAgent.scss'
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
import CardTravelIcon from '@mui/icons-material/CardTravel';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import Select from 'react-select';
import BarChart from '../../barChart/BarChart';


const PaiementAgent = () => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [agentsAffectes, setAgentsAffectes] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [totalCount, setTotalCount] = useState([])
  const [title, setTitle] = useState({});
  const clientId = searchParams.get('client_id');
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [total, setTotal] = useState([]);
  const searchInput = React.useRef(null);
  const scroll = { x: 400 };
  const [status, setStatus] = useState([]);
  const [optionsStatus, setOptionsStatus] = useState([]);
  const [montantTotal, setMontantTotal] = useState('')
  const contratId = searchParams.get('contrat_id');
  const [factureContratCount, setFactureContratCount] = useState ([]);
  const [invoiceIds, setInvoiceIds] = useState('');
  const [paymentMethod, setPaymentMethod] = useState([]);
  const [employeeId, setEmployeeId] = useState([]);
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const months = [
    { value: 1, label: 'Janvier' },
    { value: 2, label: 'Février' },
    { value: 3, label: 'Mars' },
    { value: 4, label: 'Avril' },
    { value: 5, label: 'Mai' },
    { value: 6, label: 'Juin' },
    { value: 7, label: 'Juillet' },
    { value: 8, label: 'Août' },
    { value: 9, label: 'Septembre' },
    { value: 10, label: 'Octobre' },
    { value: 11, label: 'Novembre' },
    { value: 12, label: 'Décembre' },
  ];

  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value, 10));
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

  const handleInputChange = (e) => {
    const inputValue = parseFloat(e.target.value);
    setTotal(inputValue);
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
        title: 'Salaire',
        dataIndex: 'salaire',
        key: 'prix',
        width: '20%',
        ...getColumnSearchProps('salaire'),
        render: (text) => `${text} $`,
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

  useEffect(() => {
    const factureCount = async () => {
      try {
        const requests = selectedIds.map(async (id) => {
          const { data } = await axios.get(`${DOMAIN}/api/admin/payementTotalSelect/${id}/${selectedMonth}`);
          return data;
        });
        Promise.all(requests)
          .then((results) => {
            const paieValues = results.map((innerArray) => {
              return innerArray.map((item) => item.paie);
            });
            setTotal(paieValues)
            setTotalCount(results);
          })
          .catch((error) => {
            console.error('Une erreur s\'est produite:', error);
          });
      } catch (error) {
        console.log(error);
      }
    };
    factureCount();
  }, [selectedMonth]);


  useEffect(() => {
    const fetchDatas = async () => {
      try {
        if (selectedIds.length > 1) {
          setSelectedIds([])
          Swal.fire({
            icon: 'warning',
            title: 'Sélectionnez un employé',
            text: 'Veuillez sélectionner un seul employé à la fois.'
          });
          return;
        }

        if (selectedIds.length > 0) {
          const requests = selectedIds.map(id =>
            axios.get(`${DOMAIN}/api/admin/payementTotal/${id}`)
          );
          const responses = await Promise.all(requests);
          const totalCountData = responses.map(response => response.data);

          const paieValues = totalCountData.map((innerArray) => {
            return innerArray.map((item) => item.paie);
          });

          const paieId = totalCountData.map((innerArray) => {
            return innerArray.map((item) => item.id);
          });
  
          setTotalCount(totalCountData);
          setTotal(paieValues);
          setEmployeeId(paieId);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchDatas();
  }, [selectedIds]);

  console.log(employeeId)
  useEffect(()=>{
    const fetchData = async ()=> {
      try{
          const res = await axios.get(`${DOMAIN}/api/admin/paiementMethode`);
          setPaymentMethod(res.data)
  
        }catch(error){
          console.log(error)
        };
  }
  fetchData()
  }, [])

  const handleClick = async (e) => {
    e.preventDefault();

    if (!data.payment_method) {
      Swal.fire({
        title: 'Error',
        text: 'Veuillez selectionner une methode de paiement',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }
    try {
      await Promise.all(selectedIds.map(async (dd) => {
        const response = await axios.post(`${DOMAIN}/api/admin/payementPost`, {
          employeId: dd,
          amount: total,
          payment_method: data.payment_method,
        });

      const paymentId = response.data.payment_id;
      Swal.fire({
        icon: 'success',
        title: 'Facture créée avec succès',
        text: `ID du paiement : ${paymentId}`,
      }).then(() => {
        Swal.close(); 
      });

      navigate('/paiement') }));
    } catch (error) {
      console.error('Erreur lors de la création du payement :', error);
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Une erreur s\'est produite lors de la création de la facture.',
      });
    }
  };

  return (
    <>
      <div className="paiementAgent">
        <div className="facturation-wrapper">
          <div className="contrats-top">
              <AccessTimeIcon className='contrats-icon'/>
              <div className="contrats-info">
                  <h2 className="contrats-title">Client : {title.company_name}</h2>
                  <span className="contrats-span">Liste des agents qui sont affectés à {title.company_name}</span>
              </div>
          </div>
            <div className="contrats-top">
                <AttachMoneyIcon className='contrats-icon'/>
                <div className="contrats-info">
                    <h2 className="contrats-title">Paiement</h2>
                    <span className="contrats-span"></span>
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
            {selectedIds > 1 &&  <div className="paiement-row-select">
              <label htmlFor="">Selectionnez le mois <span>*</span></label>
              <select id="month" value={selectedMonth} onChange={handleMonthChange}>
                  <option disabled >selectionnez un mois </option>
                  {months.map((month) => (
                  <option key={month.value} value={month.value}>{month.label}</option>
                ))}
              </select>
            </div> }
          {totalCount.length > 0 ? <div className="personnel-row">
            {totalCount.map((innerArray, index) => (
                <React.Fragment key={index}>
                    {innerArray.map(data => (
                    <React.Fragment key={data.year + data.month}>
                        <h2 className="personnel-total-title"><CardTravelIcon/> PAIEMENT</h2>
                          <hr />
                        <div className="personnel-paiement-row">
                            <span className="paiement-name">Nom :</span>
                            <span className="paiement-name1">{data.first_name} {data.last_name}</span>
                        </div>
                        <hr />
                        <div className="personnel-paiement-row">
                            <span className="paiement-name">Mois :</span>
                            <span className="paiement-name1">{data.month}</span>
                        </div>
                        <hr />
                        <div className="personnel-paiement-row">
                            <span className="paiement-name">Nombre de présence du mois :</span>
                            <span className="paiement-name1">{data.presence_count}</span>
                        </div>
                        <hr />
                        <div className="personnel-paiement-row">
                            <span className="paiement-name">Salaire :</span>
                            <div className="paiement-name1">
                              <input type="number" value={total} onChange={handleInputChange} className="paiement-name1-input" />
                              <span className="paiement-name1"> $</span>
                            </div>
                        </div>
                        <div className="personnel-paiement-row">
                          <label htmlFor="" className="label-form">Méthode de paiement :</label>
                          <Select
                            options={ paymentMethod?.map(item => ({
                              value: item.id,
                              label: item.nom
                            }))}
                            onChange={(selectedOption) => handleChange(selectedOption.value, 'payment_method')}
                          />
                        </div>

                        <div className="personnel-paiement-row">
                           <button className="btn-paiement" onClick={handleClick}>Envoyer</button>
                        </div>
                    </React.Fragment>
                    ))}
                </React.Fragment>
                ))}
            </div>
          : <div className="personnel-row2">
            <BarChart datas = {agentsAffectes}/>
          </div> }
          </div>
        </div>
      </div>
    </>
  )
}

export default PaiementAgent