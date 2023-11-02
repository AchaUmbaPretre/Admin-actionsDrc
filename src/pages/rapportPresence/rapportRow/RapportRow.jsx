import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import './rapportRow.scss'
import { DatePicker } from 'antd'
import config from '../../../config'
import axios from 'axios'
import moment from 'moment'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

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
          Swal.fire({
            title: 'Success',
            text: 'Rapport succès!',
            icon: 'success',
            confirmButtonText: 'OK',
          });
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


  return (
    <>
        <div className="rapportRow">
            <div className="rapportRow-wrapper">
                <h2 className="rapportRow-h2">Rapport des présences</h2>
                <div className="rapport-container">
                    <input type="date" name="startDate" className='rapport-input' placeholder='date de debut' onChange={(e) =>
                    handleChange(e.target.name, e.target.value)
                  }/>
                    <input type="date" name="endDate" className='rapport-input' placeholder='date de fin' onChange={(e) =>
                    handleChange(e.target.name, e.target.value)
                  } />
                    <Select className="rapport-select"
                        name="employee_id"
                        onChange={(selectedOption) => handleChange('employee_id',selectedOption.value)}
                        options={data.map((item) => ({
                            value: item.id,
                            label: item.first_name + ' ' + item.last_name
                        }))}
                    />
                    <button className="rapport-btn" onClick={handleClick}>Valider</button>
                </div>
            </div>
        </div>

    </>
  )
}

export default RapportRow