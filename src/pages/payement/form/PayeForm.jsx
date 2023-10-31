import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Select from 'react-select';
import config from '../../../config'


const PayeForm = ({handleModalClose}) => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN
  const navigate = useNavigate();
  const [invoiceIds, setInvoiceIds] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState([]);
  

  const handleClick = async (e) => {
    e.preventDefault();
    handleModalClose();

    try {
      const response = await axios.post(`${DOMAIN}/api/admin/payementPost`,{
        invoice_id: invoiceIds,
        payment_date: paymentDate,
        amount: amount,
        payment_method	: paymentMethod,
      });

      const paymentId = response.data.payment_id;
      Swal.fire({
        icon: 'success',
        title: 'Facture créée avec succès',
        text: `ID du paiement : ${paymentId}`,
      }).then(() => {
        Swal.close(); 
      });

      setInvoiceIds('');
      setPaymentDate('');
      setAmount('');
      setPaymentMethod('');

      navigate('/payement')
      window.location.reload();
    } catch (error) {
      console.error('Erreur lors de la création du payement :', error);
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Une erreur s\'est produite lors de la création de la facture.',
      });
    }
  };
  
  useEffect(()=>{
    const fetchData = async ()=> {
      try{
          const res = await axios.get(`${DOMAIN}/api/admin/paiementMethode`);
          setPaymentMethod(res.data)
  
        }catch(error){
          console.log(error)
        };
  }
  fetchData()
  }, [])

  console.log(paymentMethod)
  return (
    <>
        <div className="clientForm">
            <div className="clientForm-wrapper">
              <form action="" className="form-center">
                <h2>Paiement</h2>
                <div className="form-rows">
                    <div className="form-row">
                      <label htmlFor="" className="label-form">ID de la facture : <span>*</span></label>
                      <input
                        type="text"
                        value={invoiceIds}
                        onChange={(e) => setInvoiceIds(e.target.value)}
                        className="input-form"
                      />
                    </div>
                    <div className="form-row">
                      <label htmlFor="" className="label-form">Date du paiement <span>*</span></label>
                      <input type="date" name="" className="input-form"  
                        value={paymentDate}
                        onChange={(e) => setPaymentDate(e.target.value)}  />
                    </div>
                </div>

                <div className="form-rows">
                    <div className="form-row">
                        <label htmlFor="" className="label-form">Montant du paiement<span>*</span></label>
                        <input
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="input-form"
                        />
                    </div>
                </div>

                <div className="form-rows">
                    <div className="form-row">
                        <label htmlFor="" className="label-form">Méthode de paiement <span>*</span></label>
                        <Select
                          options={paymentMethod && Array.isArray(paymentMethod) ? paymentMethod.map(item => ({
                            value: item.id,
                            label: item.nom
                          })) : []}
                          onChange={(selectedOption) => setPaymentMethod(selectedOption.value)}
                        />
                    </div>
                </div>
                        
                <button className="form-btn" onClick={handleClick}>Envoyer <SendIcon className='form-icon' /></button>
              </form>
            </div>
        </div>

    </>
  )
}

export default PayeForm