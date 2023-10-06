import Highlighter from 'react-highlight-words';
import { Button, Input, Space, Table, TimePicker } from 'antd';
import Select from 'react-select';
import { DatePicker } from 'antd'
import './presentEdit.scss'
import { useEffect, useState } from 'react';
import config from '../../../config';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import moment from 'moment';

const PresentEdit = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [checkTime, setCheckTime] = useState('');
    const [checkout, setCheckout] = useState('');
    const [dates, setdates] = useState('');
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const {check_in_time, check_out_time, date} = data;
    const momentDate = moment.utc(date).local()
  

    const handleChange = (e) =>{
        setData((prev)=> ({...prev, [e.target.name]: e.target.value}))
    }

    const onChange = (date, dateString) => {
        setData({ ...data, date: dateString });
      };

      console.log(data)
      useEffect(()=>{
        const fetchData = async ()=> {
            try{
                const res = await axios.get(`${DOMAIN}/api/admin/presenceAllView/${id}`);
                setData(res.data[0])
        
              }catch(error){
                console.log(error)
              };
        }
        fetchData()
    }, [id]);

    const handleClick = async (e) => {
        e.preventDefault();
    
        try {
          await axios.put(`${DOMAIN}/api/admin/presencePut/${id}`, data);
          navigate("/presence");
          Swal.fire({
            title: 'Success',
            text: 'Presence a été modifiée avec succès!',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        } catch (err) {
            Swal.fire({
                title: 'Error',
                text: err.message,
                icon: 'error',
                confirmButtonText: 'OK'
              });
    
          console.log(err);
        }
      }


  return (
    <>
        <div className="personnel-aff-bottom">
            <div className="personnel-row">
                <h2 className='personnel-h2'>Modifier la presence</h2>
                <div className="presence-control">
                    <label htmlFor="">Date <span>*</span></label>
                    <input type="date" name='date' className='input-date' value={moment(date).format('YYYY-MM-DD') || ''} onChange={handleChange}/>
                </div>
                <div className="presence-control">
                    <div className="presence-rows-heure">
                      <div className="presence-rows">
                        <label htmlFor="">Heure début <span>*</span></label>
                        <input type="time" value={check_in_time?.substring(0, 5)} name='check_in_time' className="presence-input" onChange={handleChange}/>
                      </div>
                      <div className="presence-rows">
                        <label htmlFor="">Heure fin <span>*</span></label>
                        <input type="time" value={check_out_time?.substring(0, 5)} name='check_out_time' className="presence-input" onChange={handleChange} />
                      </div>
                    </div>
                </div>
                <button className="presence-btn" onClick={handleClick}>Envoyer</button>
            </div>
         </div>
    </>
  )
}

export default PresentEdit