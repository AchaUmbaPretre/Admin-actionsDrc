import { useEffect, useState } from 'react';
import './horaires.scss'
import Swal from 'sweetalert2';
import SendIcon from '@mui/icons-material/Send';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Horaires = () => {

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
    const handleWeekdayChange = (event) => {
        setWeekday(event.target.value);
      };
console.log(employeeId,clientId, startDate,endDate,weekday,startTime,endTime)

      useEffect(() => {

        const fetchData = async () => {
          try {
            const res = await axios.get("http://localhost:8080/api/admin");
            setSelected(res.data)
    
          } catch (error) {
            console.log(error)
          };
        }
        fetchData()
      }, [])

      useEffect(()=>{
    
        const fetchData = async ()=> {
          try{
              const res = await axios.get("http://localhost:8080/api/admin/client");
              setClientEtat(res.data)
      
            }catch(error){
              console.log(error)
            };
      }
      fetchData()
      }, [])

      const handleClick = async (e) => {
        e.preventDefault();
    
        try {
          await axios.post(`http://localhost:8080/api/admin//horairesPost`, {
            employee_id : employeeId,
            client_id : clientId,
            start_date : startDate,
            end_date : endDate,
            weekday : weekday,
            start_time : startTime,
            end_time : endTime 
           });
    
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
                      <select id="pet-select" name="fonction" onChange={(e)=>setEmployeeId(e.target.value)} className="input-form">
                      { selected?.map(item =>( 
                        <option value={item.id}>{item.first_name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-row">
                      <label htmlFor="" className="label-form">Client <span>*</span></label>
                      <select id="pet-select" name="fonction" onChange={(e)=>setClientId(e.target.value)} className="input-form">
                      { clientEtat?.map(item =>( 
                        <option value={item.id}>{item.company_name}</option>
                        ))}
                      </select>
                    </div>
                </div>

                <div className="form-rows">
                    <div className="form-row">
                        <label htmlFor="" className="label-form">Date de debut<span>*</span></label>
                        <input type="date"  name='phone_number' className="input-form"  onChange={(e)=>setStartDate(e.target.value)} />
                    </div>
                    <div className="form-row">
                        <label htmlFor="" className="label-form">Date de la fin<span>*</span></label>
                        <input type="date"  name='contact_name' className="input-form" onChange={(e)=>setEndDate(e.target.value)} />
                    </div>
                </div>

                <div className="form-rows">
                    <div className="form-row">
                        <label htmlFor="" className="label-form">Week-end<span>*</span></label>
                        <select value={weekday} onChange={handleWeekdayChange} className="input-form">
                            <option value="">Sélectionnez un jour de la semaine</option>
                            <option value="Lundi">Lundi</option>
                            <option value="Mardi">Mardi</option>
                            <option value="Mercredi">Mercredi</option>
                            <option value="Jeudi">Jeudi</option>
                            <option value="Vendredi">Vendredi</option>
                            <option value="Samedi">Samedi</option>
                            <option value="Dimanche">Dimanche</option>
                        </select>
                    </div>
                  <div className="form-row">
                    <label htmlFor="" className="label-form">Heure d'arrivée<span>*</span></label>
                    <input type="time"  className="input-form" onChange={(e)=>setStartTime(e.target.value)} />
                  </div>
                </div>

                <div className="form-rows">
                  <div className="form-row">
                    <label htmlFor="" className="label-form">Heure de départ<span>*</span></label>
                    <input type="time" className="input-form" onChange={(e)=>setEndTime(e.target.value)} />
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