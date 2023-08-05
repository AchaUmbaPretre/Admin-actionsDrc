import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import Select from 'react-select';
import './missionForm.scss'

const MissionForm = () => {

const [data, setData] = useState({});
const navigate = useNavigate();
const [options, setOptions] = useState([]);
const [optionsClient, setOptionsClient] = useState([]);
const [selected, setSelected] = useState("");
const [selecteds, setSelecteds] = useState("");
const [duration, setDuration] = useState([]);
const [salaires, setSalaires] = useState([]);
const [dateEntrant, setDateEntrant] = useState('');
const [dateSortant, setDateSortant] = useState('')

const handleChange = (e) => {
  setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
}
/* const Optionsautocomplete = () =>{
    const optionss = options.map((opt)=> ({
        label : opt.first_name,
        value : opt.id
    }));
    return (
        <Select options = {optionss} onChange={handleChange1}/>
    )
}
const handleChange1 = (e)=> {
  setSelected(e.value);
  console.log(selected)
}


const Clientautocomplete = () =>{
    const optionsV = optionsClient.map((opt)=> ({
        label : opt.company_name,
        value : opt.id
    }));
    return (
        <Select options = {optionsV} onChange={handleChange2}/>
    )
}
const handleChange2 = (e)=> {
  setSelecteds(e.value);
  console.log(selecteds)
}


const Salaireautocomplete = () =>{
  const options2 = salaires.map((opts)=> ({
      label : opts.salaire,
      value : opts.id
  }));
  return (
      <Select options = {options2} onChange={handleChange3}/>
  )
}
const handleChange3 = (e)=> {
  setSalaires(e.value);
  console.log(salaires)
}


useEffect(() => {
  console.log(dateEntrant);
}, [dateEntrant]);
const DurationAutocomplete = () =>{
  const options2 = duration.map((opts)=> ({
      label : opts.start_date,
      value : opts.id
  }));
  return (
      <Select options = {options2} onChange={handleChange4}/>
  )
}
const handleChange4 = (e)=> {
  setDateEntrant(e.value);
} */


  useEffect(()=>{

    const fetchData = async ()=> {
        try{
            const res = await axios.get("http://localhost:8080/api/admin");
            setOptions(res.data)
    
          }catch(error){
            console.log(error)
          };
    }
    fetchData()
 }, [])

 useEffect(()=>{
    
    const fetchData = async ()=> {
      try{
          const res = await axios.get("http://localhost:8080/api/admin/client");
          setOptionsClient(res.data)
  
        }catch(error){
          console.log(error)
        };
  }
  fetchData()
  }, [])

  const handleClick = async (e) => {
    e.preventDefault();
  console.log(selected)
    try {
      await axios.post(`http://localhost:8080/api/admin/missions`,data);
      navigate("/mission");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(()=>{
    
    const fetchData = async ()=> {
      try{
          const res = await axios.get("http://localhost:8080/api/admin/duration");
          setDuration(res.data)
  
        }catch(error){
          console.log(error)
        };
  }
  fetchData()
  }, [])

  useEffect(()=>{

    const fetchDatas = async ()=> {
        try{
            const res = await axios.get("http://localhost:8080/api/admin/salaireMission");
            setSalaires(res.data)
    
          }catch(error){
            console.log(error)
          };
    }
    fetchDatas()
 }, [])

console.log(data)

  return (
    <>
        <div className="contratForm">
            <div className="contrat-wrapper">
                <div className="edit-title">
                    <h2 className="edit-h2">Mission</h2>
                </div>
                <form action="" className="formulaire-edit">
                    <div className="edit-rows">
                        <div className="edit-row">
                            <label htmlFor="" className="label-edit">Agent <span>*</span></label>
                            <select id="pet-select" name="agent_id" onChange={handleChange} className="input-form">
                            { options?.map(item =>( 
                              <option value={item.id}>{item.first_name}</option>
                              ))}
                            </select>
                        </div>
                        <div className="edit-row">
                            <label htmlFor="" className="label-edit">Client <span>*</span></label>
                            <select id="pet-select" name="client_id"  onChange={handleChange}  className="input-form">
                            { optionsClient?.map(item =>( 
                              <option value={item.id}>{item.company_name}</option>
                              ))}
                            </select>
                        </div>
                    </div>

                    <div className="edit-rows">
                        <div className="edit-row">
                            <label htmlFor="" className="label-edit">Date entrant<span>*</span></label>
                              <select id="pet-select" name="date" onChange={handleChange} className="input-form">
                                {duration?.map(item =>( 
                                  <option value={item.id}>{item.end_date}</option>
                                ))}
                              </select>
                        </div>
                        <div className="edit-row">
                            <label htmlFor="" className="label-edit">Date sortant<span>*</span></label>
                            <select id="pet-select" name="duree" onChange={handleChange} className="input-form">
                              {duration?.map(item =>( 
                                <option value={item.id}>{item.start_date}</option>
                              ))}
                            </select>
                        </div>
                    </div>

                    <div className="edit-rows">
                        <div className="edit-row">
                            <label htmlFor="" className="label-edit">Montant <span>*</span></label>
                            <input type="number" name='montant' className="input-form" onChange={handleChange}/>
                        </div>
                    </div>
                    <button className="edit-btn" onClick={handleClick}>Envoyer</button>
                </form>
            </div>
        </div>

    </>
  )
}

export default MissionForm