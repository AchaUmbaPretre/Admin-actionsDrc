import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './missionEdit.scss';
import Swal from 'sweetalert2';
import moment from 'moment';
import config from '../../../config'

const MissionEdit = () => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN
  const [data, setData] = useState([]);
  const { heureEntrant, heureSortant } = data;
  const navigate = useNavigate();
  const [options, setOptions] = useState([]);
  const [optionsClient, setOptionsClient] = useState([]);
  const [duration, setDuration] = useState([]);
  const [salaires, setSalaires] = useState([]);
  const location = useLocation();
  const id = location.pathname.split("/")[2];


  const handleChange = (selectedOption, name) => {
      setData((prev) => ({ ...prev, [name]: selectedOption }));
  };

  const handleDateChange = (selectedDate, name) => {
    const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
    setData((prev) => ({ ...prev, [name]: formattedDate }));
  };


  useEffect(()=>{
    const fetchData = async ()=> {
        try{
            const res = await axios.get(`${DOMAIN}/api/admin/missionAllView/${id}`);
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
      await axios.put(`${DOMAIN}/api/admin/updateMission/${id}`, data);
      navigate("/mission");
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
      <div className="missionEdite">
        <div className="contrat-wrapper">
          <div className="edit-title">
            <h2 className="edit-h2">Modifier l'horaire</h2>
          </div>
          <form action="" className="formulaire-edit">
            <div className="edit-rows">
              {/* <div className="edit-row">
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
              </div> */}
{/*               <div className="edit-row">
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
              </div> */}
            </div>

            <div className="edit-rows">
              <div className="edit-row">
                <label htmlFor="" className="label-edit">Heure de début<span>*</span></label>
                <input
                  type="time"
                  name="heureEntrant"
                  onChange={(e) => handleChange(e.target.value, "heureEntrant")}
                  className="input-form"
                  value={heureEntrant}
                />
              </div>
              <div className="edit-row">
                <label htmlFor="" className="label-edit">Heure de fin <span>*</span></label>
                <input
                  type="time"
                  name="heureSortant"
                  onChange={(e) => handleChange(e.target.value, "heureSortant")}
                  className="input-form"
                  value={heureSortant}
                />
              </div>
            </div>

{/*             <div className="edit-rows">
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
            </div> */}
            <button className="edit-btn" onClick={handleClick}>Envoyer</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default MissionEdit;