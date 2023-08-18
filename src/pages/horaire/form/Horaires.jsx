import { useEffect, useState } from 'react';
import './horaires.scss'
import Swal from 'sweetalert2';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios';
import moment from 'moment';
import config from '../../../config'

const Horaires = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN

    const [employeeId, setEmployeeId] = useState('');
    const [clientId, setClientId] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [weekday, setWeekday] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const navigate = useNavigate();
    const [selected, setSelected] = useState([]);
    const [clientEtat, setClientEtat] = useState([]);
    const [missionWeek, setMissionWeek] = useState([]);
    const [data, setData] = useState([]);

      const handleChange = (selectedOption, name) =>{
        setData((prev) => ({ ...prev, [name]: selectedOption.value }));
      }
      const handleDateChange = (selectedDate, name) => {
        const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
        setData((prev) => ({ ...prev, [name]: formattedDate }));
      };
      const handleTimeChange = (selectedTime, name) => {;
        setData((prev) => ({ ...prev, [name]: selectedTime }));
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
      useEffect(() => {

        const fetchData = async () => {
          try {
            const {data} = await axios.get(`${DOMAIN}/api/admin`);
            setSelected(data)
    
          } catch (error) {
            console.log(error)
          };
        }
        fetchData()
      }, [])

      // eslint-disable-next-line react-hooks/exhaustive-deps
      useEffect(()=>{
    
        const fetchData = async ()=> {
          try{
              const {data} = await axios.get(`${DOMAIN}/api/admin/client`);
              setClientEtat(data)
      
            }catch(error){
              console.log(error)
            };
      }
      fetchData()
      }, [])

      // eslint-disable-next-line react-hooks/exhaustive-deps
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
      }, [])

      const handleClick = async (e) => {
        e.preventDefault();
    
        try {
          await axios.post(`${DOMAIN}/api/admin//horairesPost`,data);
    
          Swal.fire({
            title: 'Success',
            text: 'Employé créé avec succès!',
            icon: 'success',
            confirmButtonText: 'OK'
          });
    
          navigate('/personnel');
        } catch (error) {
          Swal.fire({
            title: 'Error',
            text: error.message,
            icon: 'error',
            confirmButtonText: 'OK'
          });
          
          console.log(error);
        }
      };

  return (
    <>
        <div className="clientForm">
            <div className="clientForm-wrapper">
              <form action="" className="form-center">
                <div className="form-rows">
                    <div className="form-row">
                      <label htmlFor="" className="label-form">Employe(é) <span>*</span></label>
                      <Select
                        name="agent_id"
                        onChange={(selectedOption) => handleChange(selectedOption, "employee_id")}
                        options={selected.map((item) => ({
                          value: item.id,
                          label: item.first_name
                        }))}
                    />
                    </div>
                    <div className="form-row">
                      <label htmlFor="" className="label-form">Client <span>*</span></label>
                      <Select
                        name="client_id"
                        onChange={(selectedOption) => handleChange(selectedOption, "client_id")}
                        options={clientEtat.map((item) => ({
                          value: item.id,
                          label: item.company_name
                        }))}
                      />
                    </div>
                </div>

                <div className="form-rows">
                    <div className="form-row">
                        <label htmlFor="" className="label-form">Date de debut<span>*</span></label>
                        <input type="date"  name='start_date' className="input-form"  onChange={(e) => handleDateChange(e.target.value, "start_date")} />
                    </div>
                    <div className="form-row">
                        <label htmlFor="" className="label-form">Date de la fin<span>*</span></label>
                        <input type="date"  name='end_date' className="input-form" onChange={(e) => handleDateChange(e.target.value, "end_date")} />
                    </div>
                </div>

                <div className="form-rows">
                    <div className="form-row">
                        <label htmlFor="" className="label-form">Week-end<span>*</span></label>
                        <Select
                          name="client_id"
                          onChange={(selectedOption) => handleChange(selectedOption, "weekday")}
                          options={missionWeek.map((item) => ({
                            value: item.id,
                            label: item.days
                          }))}
                      />
                    </div>
                  <div className="form-row">
                    <label htmlFor="" className="label-form">Heure d'arrivée<span>*</span></label>
                    <input type="time" name='start_time'  className="input-form" onChange={(e) => handleTimeChange(e.target.value, "start_time")} />
                  </div>
                </div>

                <div className="form-rows">
                  <div className="form-row">
                    <label htmlFor="" className="label-form">Heure de départ<span>*</span></label>
                    <input type="time" name='end_time' className="input-form" onChange={(e) => handleTimeChange(e.target.value, "end_time")} />
                </div>
                </div>
                        
                <button className="form-btn" onClick={handleClick}>Envoyer <SendIcon className='form-icon' /></button>
              </form>
            </div>
        </div>

    </>
  )
}

export default Horaires