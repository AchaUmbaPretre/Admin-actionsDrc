import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './paiementEdit.scss';
import config from '../../../config'
import moment from 'moment';


const PaiementEdit = ({handleModalClose}) => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState({});
  const id = location.pathname.split('/')[2];
  const {amount,methode_paiement,payment_date,payment_method} = data;


  const handleChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
  
    if (fieldName === "email") {
      const lowercaseValue = fieldValue.charAt(0).toLowerCase() + fieldValue.slice(1);
      setData((prev) => ({ ...prev, [fieldName]: lowercaseValue }));
    } else if (Number.isNaN(Number(fieldValue))) {
      const capitalizedValue = fieldValue.charAt(0).toUpperCase() + fieldValue.slice(1);
      setData((prev) => ({ ...prev, [fieldName]: capitalizedValue }));
    } else {
      setData((prev) => ({ ...prev, [fieldName]: fieldValue }));
    }
  }
  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`${DOMAIN}/api/admin/payementPut/${id}`,data);
      Swal.fire({
        icon: 'success',
        title: 'Paiement Modifié avec succès',
        text: `Succès`,
      }).then(() => {
        Swal.close(); 
      });
      navigate('/payement')

    } catch (error) {
      console.error('Erreur lors de la création du payement :', error);
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Une erreur s\'est produite lors de la création de la facture.',
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${DOMAIN}/api/admin/payementView/${id}`);
        setData(res.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <>
        <div className="paiementEdit">
            <div className="clientForm-wrapper">
              <form action="" className="form-center">
                <h2>Modifier le paiement</h2>
                <div className="form-rows">
                    <div className="form-row">
                      <label htmlFor="" className="label-form">Date du paiement <span>*</span></label>
                      <input type="date" className="input-form" 
                        name='payment_date' 
                        value={moment(payment_date).format('YYYY-MM-DD') || ''}
                        onChange={handleChange}  />
                    </div>
                </div>

                <div className="form-rows">
                    <div className="form-row">
                        <label htmlFor="" className="label-form">Montant du paiement<span>*</span></label>
                        <input
                          type="number"
                          value={amount}
                          name='amount'
                          onChange={handleChange}
                          className="input-form"
                        />
                    </div>
                </div>

{/*                 <div className="form-rows">
                    <div className="form-row">
                        <div className="personnel-paiement-row">
                              <label htmlFor="" className="label-form">Méthode de paiement :</label>
                              <Select
                                options={ paymentMethod?.map(item => ({
                                  value: item.id,
                                  label: item.nom
                                }))}
                                onChange={(selectedOption) => handleChange(selectedOption.value, 'payment_method')}
                              />
                          </div>
                    </div>
                </div> */}
                        
                <button className="form-btn" onClick={handleClick}>Envoyer <SendIcon className='form-icon' /></button>
              </form>
            </div>
        </div>

    </>
  )
}

export default PaiementEdit