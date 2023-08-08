import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import SendIcon from '@mui/icons-material/Send';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PresenceForm = () => {

  const [data, setData] = useState([]);
  const [employeeId, setEmployeeId] = useState('');
  const [clientEtat, setClientEtat] = useState([]);
  const [clientId, setClientId] = useState([]);
  const [checkInTime, setCheckInTime] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');
  const [date, setDate] = useState(null);
  const [selected, setSelected] = useState([]);

console.log(employeeId,clientId,checkInTime,checkOutTime,date)
  const navigate = useNavigate();

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
          await axios.post(`http://localhost:8080/api/admin/presences`, {
            employee_id : employeeId,
            client_id : clientId,
            date : date,
            check_in_time: { day: 'lundi', time: checkInTime },
            check_out_time: { day: 'lundi', time: checkOutTime },
           });
    
          Swal.fire({
            title: 'Success',
            text: 'La presence est enregistrée avec succès!',
            icon: 'success',
            confirmButtonText: 'OK'
          });
    
          navigate('/personnel');
        } catch (error) {
          Swal.fire({
            title: 'Error',
            text: error,
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
                      <select id="pet-select" name="employee_id" onChange={(e)=>setEmployeeId(e.target.value)} required className="input-form">
                      <option value={''}>selectionez l'emploie</option>
                      { selected?.map(item =>( 
                        <option value={item.id}>{item.first_name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-row">
                      <label htmlFor="" className="label-form">Client <span>*</span></label>
                      <select id="pet-select" name="client_id " onChange={(e)=>setClientId(e.target.value)} required className="input-form">
                      <option value={''}>selectionez le client..</option>
                      { clientEtat?.map(item =>( 
                        <option value={item.id}>{item.company_name}</option>
                        ))}
                      </select>
                    </div>
                </div>

                <div className="form-rows">
                    <div className="form-row">
                        <label htmlFor="" className="label-form">Date de presence<span>*</span></label>
                        <input type="date"  name='phone_number' className="input-form" required  onChange={(e)=>setDate(e.target.value)} />
                    </div>
                </div>

                <div className="form-rows">
                  <div className="form-row">
                    <label htmlFor="" className="label-form">Heure d'arrivée<span>*</span></label>
                    <input type="time"  className="input-form" required onChange={(e)=>setCheckInTime(e.target.value)} />
                  </div>

                  <div className="form-row">
                    <label htmlFor="" className="label-form">Heure de départ<span>*</span></label>
                    <input type="time" className="input-form" required onChange={(e)=>setCheckOutTime(e.target.value)} />
                  </div>
                </div>
                        
                <button className="form-btn" onClick={handleClick}>Envoyer <SendIcon className='form-icon' /></button>
              </form>
            </div>
        </div>

    </>
  )
}

export default PresenceForm