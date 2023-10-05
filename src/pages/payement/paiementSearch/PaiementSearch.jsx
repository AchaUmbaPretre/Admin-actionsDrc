import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';
import Swal from 'sweetalert2';
import moment from 'moment';
import config from '../../../config'

const PaiementSearch = ({handleModalClose}) => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [options, setOptions] = useState([]);
  const [optionsClient, setOptionsClient] = useState([]);
  const [duration, setDuration] = useState([]);
  const [salaires, setSalaires] = useState([]);

  const handleChange = (selectedOption, name) => {
    if (name === 'montant') {
      const amount = parseFloat(selectedOption);
      setData((prev) => ({ ...prev, [name]: isNaN(amount) ? null : amount }));
    } else {
      setData((prev) => ({ ...prev, [name]: selectedOption.value }));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${DOMAIN}/api/admin/contrat`);
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
        const {data} = await axios.get(`${DOMAIN}/api/admin/client`);
        setOptionsClient(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    handleModalClose()
    try {

      const params = new URLSearchParams();
      Object.entries(data).forEach(([key, value]) => {
        params.append(key, value);
      });
  
      
      navigate(`/paiementContrat?${params.toString()}`);
    } catch (err) {
      Swal.fire({
        title: 'Error',
        text: err.message,
        icon: 'error',
        confirmButtonText: 'OK'
      });
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${DOMAIN}/api/admin/duration`);
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
        const {data} = await axios.get(`${DOMAIN}/api/admin/salaireMission`);
        setSalaires(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDatas();
  }, []);

  return (
    <>
      <div className="factureSearch">
        <div className="contrat-wrapper">
          <div className="edit-title">
            <h2 className="edit-h2">Selectionnez un Client</h2>
          </div>
          <form action="" className="formulaire-edit">
            <div className="edit-rows">
              <div className="edit-row">
                <label htmlFor="" className="label-edit">Client <span>*</span></label>
                <Select
                  name="client_id"
                  onChange={(selectedOption) => handleChange(selectedOption, "client_id")}
                  options={optionsClient.map((item) => ({
                    value: item.id,
                    label: item.company_name
                  }))}
                />
              </div>
            </div>
            <button className="edit-btn" onClick={handleClick}>Recherche</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PaiementSearch;