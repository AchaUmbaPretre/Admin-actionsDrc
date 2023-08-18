import moment from 'moment'
import React from 'react'

const FactureDetails = ({facture}) => {

  return (
    <div>
        
        <h1>Facture #{facture.status}</h1>
        <p>Date: {moment(facture.due_date).format('DD/MM/YYYY')}</p>
        
    </div>
  )
}

export default FactureDetails