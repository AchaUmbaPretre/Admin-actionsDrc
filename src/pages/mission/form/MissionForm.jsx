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
const [selected, setSelected] = useState();
const [selecteds, setSelecteds] = useState();
const [duration, setDuration] = useState([]);
const [salaires, setSalaires] = useState([]);

const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

const handleChange1 = (e)=> {
    setSelected(e.value);
}
const Optionsautocomplete = () =>{
    const optionss = options.map((opt)=> ({
        label : opt.first_name,
        value : opt.id
    }));
    return (
        <Select options = {optionss} onChange={handleChange1}/>
    )
}
const handleChange2 = (e)=> {
    setSelecteds(e.value);
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

const handleChange3 = (e)=> {
  setSelecteds(e.value);
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

    try {
      await axios.post(`http://localhost:8080/api/admin/missions`,{...data,

      agent_id: selected,
      client_id	: selecteds,
      date : "",
      duree : "",
      montant: ""
        
    });
      navigate("/");
    } catch (err) {

      console.log(err);
    }
  }

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
            const res = await axios.get("http://localhost:8080/api/admin/fonction");
            setSalaires(res.data)
    
          }catch(error){
            console.log(error)
          };
    }
    fetchDatas()
 }, [])



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
                            <Optionsautocomplete />
                        </div>
                        <div className="edit-row">
                            <label htmlFor="" className="label-edit">Client <span>*</span></label>
                            <Clientautocomplete/>
                        </div>
                    </div>

                    <div className="edit-rows">
                        <div className="edit-row">
                            <label htmlFor="" className="label-edit">Date entrant<span>*</span></label>
                            <input type="date" data-format="MM /jj/aaaa"  name='date' className="input-form" onChange={handleChange} />
                        </div>
                        <div className="edit-row">
                            <label htmlFor="" className="label-edit">Date sortant<span>*</span></label>
                            <input type="number" name='duree' className="input-form" onChange={handleChange} />
                        </div>
                    </div>

                    <div className="edit-rows">
                        <div className="edit-row">
                            <label htmlFor="" className="label-edit">Durée <span>*</span></label>
                            <input type="number" name='duree' className="input-form" onChange={handleChange} />
                        </div>
                        <div className="edit-row">
                            <label htmlFor="" className="label-edit">Montant <span>*</span></label>
                            <Salaireautocomplete/>
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