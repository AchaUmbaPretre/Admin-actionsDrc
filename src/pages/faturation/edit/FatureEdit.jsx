import React, { useEffect, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import moment from 'moment';
import Select from 'react-select';
import config from '../../../config'

const FatureEdit = () => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN
  const [data, setData] = useState({});
  const { client_id, invoice_date, due_date, total_amount, status } = data;
  const location = useLocation();
  const navigate = useNavigate();
  const [optionsClient, setOptionsClient] = useState([]);
  const [optionsStatus, setOptionsStatus] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionClient, setSelectedOptionClient] = useState(null);
  const [invoiceDate, setInvoiceDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [totalAmount, setTotalAmount] = useState('');

  const id = location.pathname.split('/')[2];

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setData((prev) => ({ ...prev, client_id: selectedOption.value }));
  };

  const handleSelectChanges = (selectedOption) => {
    setSelectedOptionClient(selectedOption);
    setData((prev) => ({ ...prev, status: selectedOption.value }));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${DOMAIN}/api/admin/factureAllView/${id}`);
        setData(res.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${DOMAIN}/api/admin/client`);
        setOptionsClient(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  console.log(data)

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${DOMAIN}/api/admin/factureUpdate/${id}`, data);

      Swal.fire({
        title: 'Success',
        text: 'La facture a été modifiée avec succès!',
        icon: 'success',
        confirmButtonText: 'OK',
      });

      navigate('/facturation');
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

  return (
    <>
          <div className="clientForm">
            <div className="clientForm-wrapper">
              <form action="" className="form-center">
              <h2>Editer la Facture</h2>
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
                      <input type="date" value={moment(invoice_date).format('YYYY-MM-DD') || ''}  name="invoice_date" className="input-form" onChange={handleChange} />
                    </div>
                </div>

                <div className="form-rows">
                    <div className="form-row">
                        <label htmlFor="" className="label-form">Date d'échéance de la facture<span>*</span></label>
                        <input type="date" value={moment(due_date).format('YYYY-MM-DD') || ''} name='due_date' className="input-form" onChange={handleChange}/>
                    </div>
                    <div className="form-row">
                        <label htmlFor="" className="label-form">Montant total de la facture<span>*</span></label>
                        <input type="number" value={total_amount}  name='total_amount' className="input-form" onChange={handleChange} />
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
  );
};

export default FatureEdit;