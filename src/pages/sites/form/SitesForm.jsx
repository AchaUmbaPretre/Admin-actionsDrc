import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Select from 'react-select';
import config from '../../../config';
import moment from 'moment';
import 'moment/locale/fr';
import './sitesForm.scss'

const SitesForm = ({ handleClose }) => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN;

  const [data, setData] = useState({});
  const navigate = useNavigate();
  const [selectedAv, setSelectedAv] = useState([]);
  const [clientEtat, setClientEtat] = useState([]);
  const [statusContrat, setStatusContrat] = useState([]);
  const [typeContrat, setTypeContrat] = useState([]);

  const handleChange = (name, value) => {
    if (name === 'start_date' || name === 'end_date') {
      const formattedDate = moment(value).format('YYYY-MM-DD');
      setData((prev) => ({ ...prev, [name]: formattedDate }));
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    handleClose();

    try {
      await axios.post(`${DOMAIN}/api/admin/contrat`, data);

      Swal.fire({
        title: 'Success',
        text: 'Contrat créé avec succès!',
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
                    handleChange('client_id', selectedOption.value)
                  }
                  placeholder="Sélectionnez un client"
                />
              </div>
              <div className="edit-row">
                <label htmlFor="" className="label-edit">Avenue <span>*</span></label>
                <input type="text" className="input-form" placeholder="Entrez le nom de l'avenue" />
              </div>
            </div>
            <div className="edit-rows">
              <div className="edit-row">
                <label htmlFor="" className="label-edit">Quartier <span>*</span></label>
                <input type="text" className="input-form" placeholder="Entrez le nom du quartier" />
              </div>
              <div className="edit-row">
                <label htmlFor="" className="label-edit">Commune <span>*</span></label>
                <input type="text" className="input-form" placeholder="Entrez le nom de votre commune" />
              </div>  
            </div>
            <div className="edit-rows">
              <div className="edit-row">
                <label htmlFor="number" className="label-edit">N° <span>*</span></label>
                <input type="text" className="input-form" placeholder='Entrez le N° du parcelle' />
              </div>
              <div className="edit-row">
                <label htmlFor="" className="label-edit">Description <span>*</span></label>
                <input type="text" className="input-form" placeholder='Entrez la description' />
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