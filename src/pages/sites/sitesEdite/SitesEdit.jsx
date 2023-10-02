import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Select from 'react-select';
import config from '../../../config';
import moment from 'moment';
import 'moment/locale/fr';

const SitesEdit = ({ handleModalClose }) => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN;

  const [data, setData] = useState({});
  const navigate = useNavigate();
  const [selectedAv, setSelectedAv] = useState([]);
  const [clientEtat, setClientEtat] = useState([]);
  const [statusContrat, setStatusContrat] = useState([]);
  const [typeContrat, setTypeContrat] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const id = location.pathname.split('/')[2];


  const handleChange = (value, name) => {
    let formattedValue = value;
  
    if (typeof value === 'string' && value.length > 0) {
      formattedValue = value.charAt(0).toUpperCase() + value.slice(1);
    }
  
    setData((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${DOMAIN}/api/admin/sitesUpdate/${id}`,data);

      Swal.fire({
        title: 'Success',
        text: 'Site est modifié avec succès!',
        icon: 'success',
        confirmButtonText: 'OK',
      });

      navigate('/sites');
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

  useEffect(()=>{
    const fetchData = async ()=> {
        try{
            const {data} = await axios.get(`${DOMAIN}/api/admin/sites`);
            setData(data[0])
            setLoading(false);
          }catch(error){
            console.log(error)
          };
    }
    fetchData()
 }, [])

  return (
    <>
      <div className="sitesForm">
        <div className="contrat-wrapper">
          <div className="edit-title">
            <h2 className="edit-h2">Modifier le lieu du travail</h2>
          </div>
          <form action="" className="formulaire-edit">
            <div className="edit-rows">
              <div className="edit-row">
                <label htmlFor="" className="label-edit">
                  Client(e) <span>*</span>
                </label>
                <select
                    value={data?.client_id}
                    onChange={(event) => handleChange(event.target.value, 'client_id')}
                    className="input-form"
                    >
                    <option value="">Sélectionnez un client</option>
                    {clientEtat?.map((item) => (
                        <option key={item.id} value={item.id}>
                        {item.company_name}
                        </option>
                    ))}
                    </select>
              </div>
              <div className="edit-row">
                <label htmlFor="" className="label-edit">Avenue <span>*</span></label>
                <input type="text" value={data?.avenue} name='avenue' className="input-form" onChange={(e) =>handleChange(e.target.value, 'avenue')} placeholder="Entrez le nom de l'avenue" />
              </div>
            </div>
            <div className="edit-rows">
              <div className="edit-row">
                <label htmlFor="" className="label-edit">Quartier <span>*</span></label>
                <input type="text" value={data?.quartier} name="quartier" className="input-form" onChange={(e) =>handleChange(e.target.value, 'quartier')} placeholder="Entrez le nom du quartier" />
              </div>
              <div className="edit-row">
                <label htmlFor="" className="label-edit">Commune <span>*</span></label>
                <input type="text" value={data?.commune} name='commune' className="input-form" onChange={(e) =>handleChange(e.target.value, 'commune')} placeholder="Entrez le nom de votre commune" />
              </div>  
            </div>
            <div className="edit-rows">
              <div className="edit-row">
                <label htmlFor="number" className="label-edit">N° <span>*</span></label>
                <input type="text" name='numero' value={data.numero} className="input-form" onChange={(e) =>
                    handleChange(e.target.value, 'numero')
                  } placeholder='Entrez le N° du parcelle' />
              </div>
              <div className="edit-row">
                <label htmlFor="" className="label-edit">Description <span>*</span></label>
                <input type="text" value={data?.description} name='description' className="input-form" onChange={(e) =>handleChange(e.target.value, 'description')} placeholder='Entrez la description' />
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

export default SitesEdit;