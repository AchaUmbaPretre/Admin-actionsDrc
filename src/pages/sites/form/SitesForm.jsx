import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Select from 'react-select';
import config from '../../../config';
import moment from 'moment';
import 'moment/locale/fr';
import './sitesForm.scss'

const SitesForm = ({ handleModalClose }) => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN;

  const [data, setData] = useState({});
  const navigate = useNavigate();
  const [selectedAv, setSelectedAv] = useState([]);
  const [clientEtat, setClientEtat] = useState([]);
  const [statusContrat, setStatusContrat] = useState([]);
  const [typeContrat, setTypeContrat] = useState([]);


  const handleChange = (value, name) => {
    let formattedValue = value;
  
    if (typeof value === 'string' && value.length > 0) {
      formattedValue = value.charAt(0).toUpperCase() + value.slice(1);
    }
  
    setData((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    handleModalClose();

    if (!data.client_id || !data.avenue || !data.quartier || !data.commune || !data.numero || !data.description) {
      Swal.fire({
        title: 'Error',
        text: 'Veuillez remplir tous les champs requis',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    try {
      await axios.post(`${DOMAIN}/api/admin/sites`, data);

      Swal.fire({
        title: 'Success',
        text: 'Site créé avec succès!',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      window.location.reload();
      navigate('/contrats');
    } catch (err) {
      Swal.fire({
        title: 'Error',
        text: err.message,
        icon: 'error',
        confirmButtonText: 'OK',
      });

      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${DOMAIN}/api/admin/client`);
        setClientEtat(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${DOMAIN}/api/admin/avantages`);
        setSelectedAv(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${DOMAIN}/api/admin/contratType`);
        setTypeContrat(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${DOMAIN}/api/admin/statusContrat`);
        setStatusContrat(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="sitesForm">
        <div className="contrat-wrapper">
          <div className="edit-title">
            <h2 className="edit-h2">Lieu du travail</h2>
          </div>
          <form action="" className="formulaire-edit">
            <div className="edit-rows">
              <div className="edit-row">
                <label htmlFor="" className="label-edit">
                  Client(e) <span>*</span>
                </label>
                <Select
                  options={clientEtat?.map((item) => ({
                    value: item.id,
                    label: item.company_name,
                  }))}
                  onChange={(selectedOption) =>
                    handleChange(selectedOption.value, 'client_id')
                  }
                  placeholder="Sélectionnez un client"
                />
              </div>
              <div className="edit-row">
                <label htmlFor="" className="label-edit">Nom du site <span>*</span></label>
                <input type="text" name='description' className="input-form" onChange={(e) =>handleChange(e.target.value, 'description')} placeholder='Entrez la description' />
              </div>  
            </div>
            <div className="edit-rows">
              <div className="edit-row">
                <label htmlFor="" className="label-edit">Avenue <span>*</span></label>
                <input type="text" name='avenue' className="input-form" onChange={(e) =>handleChange(e.target.value, 'avenue')} placeholder="Entrez le nom de l'avenue" />
              </div>
              <div className="edit-row">
                <label htmlFor="" className="label-edit">Quartier <span>*</span></label>
                <input type="text" name="quartier" className="input-form" onChange={(e) =>handleChange(e.target.value, 'quartier')} placeholder="Entrez le nom du quartier" />
              </div>
            </div>
            <div className="edit-rows">
              <div className="edit-row">
                <label htmlFor="number" className="label-edit">N° <span>*</span></label>
                <input type="text" name='numero' className="input-form" onChange={(e) =>
                    handleChange(e.target.value, 'numero')
                  } placeholder='Entrez le N° du parcelle' />
              </div>
              <div className="edit-row">
                <label htmlFor="" className="label-edit">Commune <span>*</span></label>
                <input type="text" name='commune' className="input-form" onChange={(e) =>handleChange(e.target.value, 'commune')} placeholder="Entrez le nom de votre commune" />
              </div>  
            </div>
            <button className="edit-btn" onClick={handleClick}>
              Envoyer
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SitesForm;