import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Select from 'react-select';
import config from '../../../config'


const FactureForm = ({handleModalClose}) => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN

  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [clientId, setClientId] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [status, setStatus] = useState([]);
  const [optionsClient, setOptionsClient] = useState([]);
  const [optionsStatus, setOptionsStatus] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionClient, SetSelectedOptionClient] = useState(null);

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setClientId(selectedOption.value);
  };

  const handleSelectChanges = (selectedOptionClient) => {
    SetSelectedOptionClient(selectedOptionClient);
    setStatus(selectedOptionClient.value);
  };

  useEffect(()=>{
    
    const fetchData = async ()=> {
      try{
          const {data} = await axios.get(`${DOMAIN}/api/admin/client`);
          setOptionsClient(data)
  
        }catch(error){
          console.log(error)
        };
  }
  fetchData()
  }, [])


  useEffect(()=>{
    
    const fetchData = async ()=> {
      try{
          const res = await axios.get(`${DOMAIN}/api/admin/statusFacture`);
          setOptionsStatus(res.data)
  
        }catch(error){
          console.log(error)
        };
  }
  fetchData()
  }, [])

  

  const handleClick = async (e) => {
    e.preventDefault();
    handleModalClose();

    try {
      const response = await axios.post(`${DOMAIN}/api/admin/factures`, {
        client_id: clientId,
        invoice_date: invoiceDate,
        due_date: dueDate,
        total_amount: totalAmount,
        status: status,
      });

      const invoiceId = response.data.invoice_id;
      window.location.reload();
      navigate('/facturation')
      Swal.fire({
        icon: 'success',
        title: 'Facture créée avec succès',
        text: `ID de la facture : ${invoiceId}`,
      }).then(() => {
        Swal.close(); 
      });

      setClientId('');
      setInvoiceDate('');
      setDueDate('');
      setTotalAmount('');
      setStatus('');


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
              <h2>Facture</h2>
                <div className="form-rows">
                    <div className="form-row">
                      <label htmlFor="" className="label-form">Client <span>*</span></label>
                      <Select
                      value={selectedOption}
                      onChange={handleSelectChange}
                      options={optionsClient.map((item) => ({
                        value: item.id,
                        label: item.company_name
                      }))}
                      placeholder="Selectionnez un client..."
                      className=""
                    />
                    </div>
                    <div className="form-row">
                      <label htmlFor="" className="label-form">Date de la facture <span>*</span></label>
                      <input type="date" name="" className="input-form" onChange={(e)=>setInvoiceDate(e.target.value)}  />
                    </div>
                </div>

                <div className="form-rows">
                    <div className="form-row">
                        <label htmlFor="" className="label-form">Date d'échéance de la facture<span>*</span></label>
                        <input type="date"  name='phone_number' className="input-form" onChange={(e)=>setDueDate(e.target.value)}/>
                    </div>
                    <div className="form-row">
                        <label htmlFor="" className="label-form">Montant total de la facture<span>*</span></label>
                        <input type="number"  name='total_amount' className="input-form" onChange={(e)=>setTotalAmount(e.target.value)} />
                    </div>
                </div>

                <div className="form-rows">
                    <div className="form-row">
                        <label htmlFor="" className="label-form">Statut de la facture<span>*</span></label>
                        <Select
                        value={selectedOptionClient}
                        onChange={handleSelectChanges}
                        options={optionsStatus.map((item) => ({
                          value: item.status,
                          label: item.status
                        }))}
                        placeholder="Selectionnez un status..."
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

export default FactureForm