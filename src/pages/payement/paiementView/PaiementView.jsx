import React from 'react'
import './paiementView.scss'
import action from './../../../assets/actionssarl.PNG'

const PaiementView = () => {
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
                <span className="paiement-span">Kilolo</span>
              </div>
              <div className="paiement-form-row">
                <span className="paiement-span">Adresse : </span>
                <span className="paiement-span">Kilolo</span>
              </div>
              <div className="paiement-form-row">
                <span className="paiement-span">Date : </span>
                <span className="paiement-span">Kilolo</span>
              </div>
              <div className="paiement-form-row">
                <span className="paiement-span">Méthode de paiement : </span>
                <span className="paiement-span">Kilolo</span>
              </div>
            </div>
          </div>
        </div>

    </>
  )
}

export default PaiementView