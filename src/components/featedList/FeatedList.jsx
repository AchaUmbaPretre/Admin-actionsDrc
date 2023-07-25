import './featedList.scss'
import {data} from '../../data'
import { useState } from 'react'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import InfoIcon from '@mui/icons-material/Info';

const FeatedList = () => {
    const [list, setList] = useState(data)
  return (
    <>
        <div className="featedList">
            <h2 className="feated-title">Personnel</h2>
            <table>
                <tr>
                    <th>Nom</th>
                    <th>Postnom</th>
                    <th>Prenom</th>
                    <th>Sexe</th>
                    <th>Adresse</th>
                    <th>Fonction</th>
                    <th>Etat civil</th>
                    <th>Actions</th>
                </tr>
                { list.map((item) =>
                <tr>
                    <td>{item.nom}</td>
                    <td>{item.postnom}</td>
                    <td>{item.prenom}</td>
                    <td>{item.sexe}</td>
                    <td>{item.adresse}</td>
                    <td>{item.fonction}</td>
                    <td>{item.etat}</td>
                    <td className='item-action'>
                        <DeleteOutlineIcon/>
                        <VisibilityIcon/>
                        <InfoIcon/>
                    </td> 
                </tr> 
                )}
            </table>
        </div>
    </>
  )
}

export default FeatedList