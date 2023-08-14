import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Select from 'react-select';


const PayeForm = () => {
  const navigate = useNavigate();
  const [invoiceIds, setInvoiceIds] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

console.log(invoiceIds, paymentMethod, paymentDate, amount)
  

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/admin/payementPost',{
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

    } catch (error) {
      console.error('Erreur lors de la création du payement :', error);
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Une erreur s\'est produite lors de la création de la facture.',
      });
    }
  };

  return (
    <>
        <div className="clientForm">
            <div className="clientForm-wrapper">
              <form action="" className="form-center">
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
                        <select id="pet-select" className='input-form' required value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                          <option value="espèces">espèces</option>
                          <option value="chèque">chèque</option>
                          <option value="virement">virement</option>
                        </select>
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