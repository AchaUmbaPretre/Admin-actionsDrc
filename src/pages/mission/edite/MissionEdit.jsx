import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';
import Swal from 'sweetalert2';
import moment from 'moment';

const MissionEdit = () => {
  const [data, setData] = useState([]);
  const {first_name,company_name,dateEntrant,dateSortant,duree,montant} = data;
  const navigate = useNavigate();
  const [options, setOptions] = useState([]);
  const [optionsClient, setOptionsClient] = useState([]);
  const [duration, setDuration] = useState([]);
  const [salaires, setSalaires] = useState([]);
  const location = useLocation();
  const id = location.pathname.split("/")[2];


  const handleChange = (selectedOption, name) => {
    if (name === 'montant') {
      const amount = parseFloat(selectedOption);
      setData((prev) => ({ ...prev, [name]: isNaN(amount) ? null : amount }));
    } else {
      setData((prev) => ({ ...prev, [name]: selectedOption.value }));
    }
  };

  console.log(data)

  const handleDateChange = (selectedDate, name) => {
    const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
    setData((prev) => ({ ...prev, [name]: formattedDate }));
  };

  useEffect(()=>{
    const fetchData = async ()=> {
        try{
            const res = await axios.get(`http://localhost:8080/api/admin/missionAllView/${id}`);
            setData(res.data[0])
    
          }catch(error){
            console.log(error)
          };
    }
    fetchData()
}, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/admin");
        setOptions(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/admin/client");
        setOptionsClient(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/admin/duration");
        setDuration(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchDatas = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/admin/salaireMission");
        setSalaires(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDatas();
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8080/api/admin/updateMission/${id}`, data);
      navigate("/");
      Swal.fire({
        title: 'Success',
        text: 'Mission a été modifiée avec succès!',
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
      <div className="contratForm">
        <div className="contrat-wrapper">
          <div className="edit-title">
            <h2 className="edit-h2">Mission edite</h2>
          </div>
          <form action="" className="formulaire-edit">
            <div className="edit-rows">
              <div className="edit-row">
                <label htmlFor="" className="label-edit">Agent <span>*</span></label>
                <Select
                  name="agent_id"
                  onChange={(selectedOption) => handleChange(selectedOption, "agent_id")}
                  options={options.map((item) => ({
                    value: item.id,
                    label: item.first_name
                  }))}
                  value={first_name}
                  
                />
              </div>
              <div className="edit-row">
                <label htmlFor="" className="label-edit">Client <span>*</span></label>
                <Select
                  name="client_id"
                  onChange={(selectedOption) => handleChange(selectedOption, "client_id")}
                  options={optionsClient.map((item) => ({
                    value: item.id,
                    label: item.company_name
                  }))}
                  value={company_name}
                />
              </div>
            </div>

            <div className="edit-rows">
              <div className="edit-row">
                <label htmlFor="" className="label-edit">Date de début<span>*</span></label>
                <input
                  type="date"
                  name="dateEntrant"
                  onChange={(e) => handleDateChange(e.target.value, "dateEntrant")}
                  className="input-form"
                  value={dateEntrant}
                />
              </div>
              <div className="edit-row">
                <label htmlFor="" className="label-edit">Date de fin <span>*</span></label>
                <input
                  type="date"
                  name="dateSortant"
                  onChange={(e) => handleDateChange(e.target.value, "dateSortant")}
                  className="input-form"
                  value={dateSortant}
                />
              </div>
            </div>

            <div className="edit-rows">
              <div className="edit-row">
                <label htmlFor="" className="label-edit">Montant <span>*</span></label>
                <input
                  type="number"
                  name="montant"
                  className="input-form"
                  onChange={(e) => handleChange(e.target.value, "montant")}
                  value={montant}
                />
              </div>
            </div>
            <button className="edit-btn" onClick={handleClick}>Envoyer</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default MissionEdit;