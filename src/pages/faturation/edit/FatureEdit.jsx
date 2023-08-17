import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import moment from 'moment';
import Select from 'react-select';
import config from './../../../config'

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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data} = await axios.get(`${DOMAIN}/api/admin/status`);
        setOptionsStatus(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

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
      <div className="edit">
        <div className="edit-wrapper">
          <div className="edit-title">
            <h2 className="edit-h2">Editer Facture</h2>
          </div>
          <form action="" className="formulaire-edit">
            <div className="edit-rows">
              <div className="edit-row">
                <label htmlFor="" className="label-edit">
                  Client <span>*</span>
                </label>
                <Select
                  value={selectedOption}
                  onChange={handleSelectChange}
                  options={optionsClient.map((item) => ({
                    value: item.id,
                    label: item.company_name,
                  }))}
                  placeholder="Selectionnez un client..."
                  className=""
                />
              </div>
              <div className="edit-row">
                <label htmlFor="" className="label-edit">
                  Date de la facture <span>*</span>
                </label>
                <input
                  type="date"
                  value={moment(invoice_date).format('YYYY-MM-DD') || ''}
                  name="invoice_date"
                  className="input-form"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="edit-rows">
              <div className="edit-row">
                <label htmlFor="" className="label-edit">
                  Date d'échéance de la facture <span>*</span>
                </label>
                <input
                  type="date"
                  value={moment(due_date).format('YYYY-MM-DD') || ''}
                  name="due_date"
                  className="input-form"
                  onChange={handleChange}
                />
              </div>
              <div className="edit-row">
                <label htmlFor="" className="label-edit">
                  Montant total de la facture <span>*</span>
                </label>
                <input
                  type="number"
                  value={total_amount || ''}
                  name="total_amount"
                  className="input-form"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="edit-rows">
              <div className="edit-row">
                <label htmlFor="" className="label-edit">
                  Statut de la facture <span>*</span>
                </label>
                <Select
                  value={selectedOptionClient}
                  onChange={handleSelectChanges}
                  options={optionsStatus.map((item) => ({
                  value: item.id,
                  label: item.status
                  }))}
                  placeholder="Selectionnez un statut..."
                  className=""
                />
              </div>
            </div>
            <button className="edit-btn" onClick={handleClick}>
              Edit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FatureEdit;