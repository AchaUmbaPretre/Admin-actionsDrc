import React, { useEffect, useState } from 'react'
import './rapportRow.scss'
import { Select,DatePicker } from 'antd';
import config from '../../../config'
import axios from 'axios'
import moment from 'moment'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const RapportRow = ({setDataTable, setLoading}) => {
    const [date, setDate] = useState({});
    const [data, setData] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [agentsAffectes, setAgentsAffectes] = useState([]);
    const [employesAffecte, setEmployesAffecte] = useState([]);
    const [optionsClient, setOptionsClient] = useState([]);
    const navigate = useNavigate();
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN
  
    const handleChange = (name, value) => {
        if (name === 'start_date' || name === 'end_date') {
          const formattedDate = moment(value).format('YYYY-MM-DD');
          setDate((prev) => ({ ...prev, [name]: formattedDate }));
        } else {
          setDate((prev) => ({ ...prev, [name]: value }));
        }
      };

      const handleSearch = (input, option) => {
        return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
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
console.log(date.employee_id)
    const handleClick = async (e) => {
        e.preventDefault();
    
        if (!date.startDate || !date.endDate ) {
          Swal.fire({
            title: 'Error',
            text: 'Veuillez remplir tous les champs requis',
            icon: 'error',
            confirmButtonText: 'OK',
          });
          return;
        }
        try {
          const {data} = await axios.get(`${DOMAIN}/api/admin/rapportPresence?startDate=${date.startDate}&endDate=${date.endDate}&employee_id=${date.employee_id}`);
          setDataTable(data)
          setLoading(false)
          navigate('/rapportPresence');
        } catch (err) {
          Swal.fire({
            title: 'Error',
            text: err.message,
            icon: 'error',
            confirmButtonText: 'OK',
          });
    
          console.log(err);
        }
    }

    useEffect(() => {
      const fetchData = async () => {
        try {
          const {data} = await axios.get(`${DOMAIN}/api/admin/client`);
          setOptionsClient(data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }, []);

    useEffect(() => {
      const fetchAgentsAffectes = async () => {
        try {
          const response = await axios.get(`${DOMAIN}/api/admin/missionContrat/${date.client_id}`);
    
          setAgentsAffectes(response.data);
        } catch (error) {
          console.log(error);
        }
      };
    
      fetchAgentsAffectes();
    }, [date.client_id]);

    useEffect(() => {
      const fetchEmployesAffecte = async () => {
        try {
          const response = await axios.get(`${DOMAIN}/api/admin/contrats/${date?.contrat_id}/agents`);
          setEmployesAffecte(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchEmployesAffecte();
    }, [date?.contrat_id]);

    console.log(date.contrat_id)
  return (
    <>
        <div className="rapportRow">
            <div className="rapportRow-wrapper">
                <h2 className="rapportRow-h2">Rapport des présences</h2>
                <div className="rapport-container">
                  <Select
                    name="client_id"
                    onChange={(value) => handleChange('client_id', value)}
                    placeholder="Sélectionnez un client"
                    showSearch
                    filterOption={handleSearch}
                  >
                  {optionsClient.map((item) => (
                    <Option key={item.id} value={item.id}>
                      {`${item.company_name}`}
                    </Option>
                    ))}
                  </Select>
                  <Select
                    name="contrat_id"
                    onChange={(value) => handleChange('contrat_id', value)}
                    placeholder="Sélectionnez un contrat"
                    showSearch
                    filterOption={handleSearch}
                  >
                  {agentsAffectes.map((item) => (
                    <Option key={item.id} value={item.id}>
                      {`Contrat N° ${item.id} ${item.contract_type}`}
                    </Option>
                    ))}
                  </Select>
                  <Select
                    name="employee_id"
                    onChange={(value) => handleChange('employee_id', value)}
                    placeholder="Sélectionnez un employé"
                    showSearch
                    filterOption={handleSearch}
                  >
                  {employesAffecte.map((item) => (
                    <Option key={item.id} value={item.id}>
                      {`${item.first_name} ${item.last_name}`}
                    </Option>
                    ))}
                  </Select>
                  <DatePicker
                    className="rapport-input"
                    name="startDate"
                    placeholder="Date de début"
                    onChange={(value) => handleChange('startDate', value)}
                  />
                  de
                  <DatePicker
                    className="rapport-input"
                    name="endDate"
                    placeholder="Date de fin"
                    onChange={(value) => handleChange('endDate', value)}
                  />
                  <button className="rapport-btn" onClick={handleClick}>Valider</button>
                </div>
            </div>
        </div>

    </>
  )
}

export default RapportRow