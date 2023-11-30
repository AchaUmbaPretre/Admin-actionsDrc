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

      console.log(date)


  return (
    <>
        <div className="rapportRow">
            <div className="rapportRow-wrapper">
                <h2 className="rapportRow-h2">Rapport des présences</h2>
                <div className="rapport-container">
                  <DatePicker
                    className="rapport-input"
                    name="startDate"
                    placeholder="Date de début"
                    onChange={(value) => handleChange('start_date', value)}
                  />
                  de
                  <DatePicker
                    className="rapport-input"
                    name="endDate"
                    placeholder="Date de fin"
                    onChange={(value) => handleChange('end_date', value)}
                  />
                  <Select
                    className="rapport-input"
                    name="employee_id"
                    onChange={(value) => handleChange('employee_id', value)}
                    placeholder="Sélectionnez un contrat"
                    showSearch
                    filterOption={handleSearch}
                  >
                  {data.map((item) => (
                    <Option key={item.id} value={item.id}>
                      {`${item.first_name} ${item.last_name}`}
                    </Option>
                    ))}
                  </Select>
                  <Select
                    className="rapport-input"
                    name="employee_id"
                    onChange={(value) => handleChange('employee_id', value)}
                    placeholder="Sélectionnez un employé"
                    showSearch
                    filterOption={handleSearch}
                  >
                  {data.map((item) => (
                    <Option key={item.id} value={item.id}>
                      {`${item.first_name} ${item.last_name}`}
                    </Option>
                    ))}
                  </Select>
                  <button className="rapport-btn" onClick={handleClick}>Valider</button>
                </div>
            </div>
        </div>

    </>
  )
}

export default RapportRow