import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../../clientTab/clientView/clientView.scss'
import { CalendarMonth, Person2Outlined} from '@mui/icons-material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import config from '../../../config'
import moment from 'moment';
import "./../view/factureView.scss"
import actions from '../../../assets/actionssarl.PNG'

const FactureView = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN
    const [data, setData] = useState({});
    const {pathname} = useLocation();
    const id = pathname.split('/')[2]

    useEffect(()=>{
        const fetchData = async ()=> {
            try{
                const res = await axios.get(`${DOMAIN}/api/admin/factureAllView/${id}`);
                setData(res.data)
              }catch(error){
                console.log(error)
              };
        }
        fetchData()
    }, [id]);

    const formattedDateVoice = moment(data?.created_at).format('DD/MM/YYYY');

  return (
    <>
        <div className="facture-View">
            <div className="facture-wrapper">
                <div className="facture-title">
                    <h1 className="facture-title-h1">Facture N° {data.id}</h1>
                    <img src={actions} alt="" className="facture-logo" />
                </div>
                <div className="facture-center">
                    <div className="facture-center-row">
                        <h2 className="facture-h2">Client : </h2>
                        <div className="facture-info">
                            <h3 className="facture-h3">{data.company_name}</h3>
                            <div className="facture-cm">
                                <span className="facture-adress">C/ {data.commune}</span>
                                <span className="facture-adress">Av/ {data.avenue}</span>
                                <span className="facture-adress">Q/ {data.quartier}</span>
                                <span className="facture-adress">N° {data.numero}</span>
                            </div>
                        </div>
                    </div>
                    <div className="facture-center-row1">
                        <table>
                            <tr>
                                <th>Date de facturation</th>
                                <th>Numéro de facture</th>
                                <th>Status</th>
                                <th>Montant</th>
                            </tr>
                            <tr>
                                <td>{formattedDateVoice}</td>
                                <td>{data.id}</td>
                                <td>{data.status}</td>
                                <td>{data.total_amount} $</td>
                            </tr>
                        </table>
                    </div>
                    <div className="facture-right">
                        <h3 className="facture-h4">Informations additionnelles :</h3>
                        <span>Merci d'avoir choisi notre entreprise pour nos services </span>
                    </div>
                </div>
                <div className="facture-bottom">
                    <table>
                        <tr>
                            <th>% TVA</th>
                            <th>Total TVA</th>
                            <th>Total TTC</th>
                        </tr>
                        <tr>
                            <td>16 %</td>
                            <td>{data.montant_tva} $</td>
                            <td>{data.montant_total} $</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </>
  )
}

export default FactureView