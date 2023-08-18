import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../../clientTab/clientView/clientView.scss'
import { CalendarMonth, Person2Outlined} from '@mui/icons-material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import config from '../../../config'
import moment from 'moment';

const FactureView = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN
    const [data, setData] = useState({});
    const {pathname} = useLocation();
    const id = pathname.split('/')[2]

    useEffect(()=>{
        const fetchData = async ()=> {
            try{
                const res = await axios.get(`${DOMAIN}/api/admin/factureAllView/${id}`);
                setData(res.data[0])
        
              }catch(error){
                console.log(error)
              };
        }
        fetchData()
    }, [id]);

    const formattedDate = moment(data?.due_date).format('DD/MM/YYYY');
    const formattedDateVoice = moment(data?.invoice_date).format('DD/MM/YYYY');

  return (
    <>
        <div className="clientView">
            <div className="clientView-wrapper">
                <h2 className="client-title">FACTURE N° {data?.status}</h2>
                <div className="client-rows">
                    <div className="client-row">
                        <span className="client-nom"><Person2Outlined/> Client :</span>
                        <span className="client-nom">{data?.company_name}</span>
                    </div>
                    <div className="client-row">
                        <span className="client-nom"><CalendarMonth/>  Date de la facture :</span>
                        <span className="client-nom">{formattedDateVoice}</span>
                    </div>

                    <div className="client-row">
                        <span className="client-nom"><CalendarMonth/>  Date d'échéance :</span>
                        <span className="client-nom">{formattedDate}</span>
                    </div>

                    <div className="client-row">
                        <span className="client-nom"><MonetizationOnIcon/>  Montant total :</span>
                        <span className="client-nom">{data?.total_amount}</span>
                    </div>

                    <div className="client-row">
                        <span className="client-nom"><TroubleshootIcon/>  Statut de la facture :</span>
                        <span className="client-nom">{data?.status}</span>
                    </div>

                </div>
            </div>
        </div>
    </>
  )
}

export default FactureView