import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import './paiementView.scss'
import action from './../../../assets/actionssarl.PNG'
import config from '../../../config'
import axios from 'axios';
import moment from 'moment';

const PaiementView = () => {

    const DOMAIN = config.REACT_APP_SERVER_DOMAIN
    const [data, setData] = useState({});
    const {pathname} = useLocation();
    const id = pathname.split('/')[2]

    useEffect(()=>{
      const fetchData = async ()=> {
          try{
              const res = await axios.get(`${DOMAIN}/api/admin/payementView/${id}`);
              setData(res.data[0])
      
            }catch(error){
              console.log(error)
            };
      }
      fetchData()
  }, [id])

  return (
    <>
        <div className="paiement">
          <div className="paiement-wrapper">
            <div className="paiement-tete">
              <img src={action} alt="" className="paiement-logo" />
            </div>
            <div className="paiement-row-title">
              <span className="span-paiement-color"></span>
              <h2 className="paiement-h2">Recu de Paiement</h2>
              <span className="span-paiement-color"></span>
            </div>
            <div className="paiement-form">
              <div className="paiement-form-row">
                <h3 className="paiement-h3">Facturé à : </h3>
              </div>
              <div className="paiement-form-row">
                <span className="paiement-span">Nom : </span>
                <span className="paiement-span">{data.company_name}</span>
              </div>
              <div className="paiement-form-row">
                <span className="paiement-span">Adresse : </span>
                <span className="paiement-span">{data.address}</span>
              </div>
              <div className="paiement-form-row">
                <span className="paiement-span">Date : </span>
                <span className="paiement-span">{moment(data.payment_date).format('DD/MM/YYYY')}</span>
              </div>
              <div className="paiement-form-row">
                <span className="paiement-span">Méthode de paiement : </span>
                <span className="paiement-span">{data.methode_paiement}</span>
              </div>
            </div>
          </div>
        </div>

    </>
  )
}

export default PaiementView