import './clientForm.scss'
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const FactureForm = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [clientId, setClientId] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [status, setStatus] = useState('');


  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/admin/factures', {
        client_id: clientId,
        invoice_date: invoiceDate,
        due_date: dueDate,
        total_amount: totalAmount,
        status: status,
      });

      const invoiceId = response.data.id;
      Swal.fire({
        icon: 'success',
        title: 'Facture créée avec succès',
        text: `ID de la facture : ${invoiceId}`,
      });

      setClientId('');
      setInvoiceDate('');
      setDueDate('');
      setTotalAmount('');
      setStatus('');

      navigate('/facturation')

    } catch (error) {
      console.error('Erreur lors de la création de la facture :', error);
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
                      <label htmlFor="" className="label-form">Client <span>*</span></label>
                      <input type="text"  name='company_name'  className="input-form" />
                    </div>
                    <div className="form-row">
                      <label htmlFor="" className="label-form">Date de la facture <span>*</span></label>
                      <input type="date" name="address" className="input-form" onChange={(e)=>setInvoiceDate(e.target.value)}  />
                    </div>
                </div>

                <div className="form-rows">
                    <div className="form-row">
                        <label htmlFor="" className="label-form">Date d'échéance de la facture<span>*</span></label>
                        <input type="date"  name='phone_number' className="input-form" onChange={(e)=>setDueDate(e.target.value)}/>
                    </div>
                    <div className="form-row">
                        <label htmlFor="" className="label-form">Montant total de la facture<span>*</span></label>
                        <input type="number"  name='contact_name' className="input-form" onChange={(e)=>setTotalAmount(e.target.value)} />
                    </div>
                </div>

                <div className="form-rows">
                    <div className="form-row">
                        <label htmlFor="" className="label-form">Date d'échéance de la facture<span>*</span></label>
                        <input type="date"  name='phone_number' className="input-form" onChange={(e)=>setDueDate(e.target.value)}/>
                    </div>
                    <div className="form-row">
                        <label htmlFor="" className="label-form">Statut de la facture<span>*</span></label>
                        <select id="pet-select" name="status" required className='input-form' onChange={(e)=>setStatus(e.target.value)}>
                            <option disabled>selectionnez le status..</option>
                            <option value="en attente">en attente</option>
                            <option value="payée">payée</option>
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

export default FactureForm