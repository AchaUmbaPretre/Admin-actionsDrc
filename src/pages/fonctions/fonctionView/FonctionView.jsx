import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import './../../clientTab/clientView/clientView.scss'
import { CalendarMonth, Person2Outlined} from '@mui/icons-material';
import PsychologyAltOutlinedIcon from '@mui/icons-material/PsychologyAltOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import config from '../../../config'
import moment from 'moment';

const FonctionView = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN
    const [data, setData] = useState({});
    const {pathname} = useLocation();
    const id = pathname.split('/')[2]
    const {avantages, nom_client, nom, prix, salaire, skills} = data;

    useEffect(()=>{
        const fetchData = async ()=> {
            try{
                const res = await axios.get(`${DOMAIN}/api/admin/contratFonctionOne/${id}`);
                setData(res.data[0])
        
              }catch(error){
                console.log(error)
              };
        }
        fetchData()
    }, [id]);

  return (
    <>
        <div className="contrat-View">
            <div className="clientView-wrapper">
                <h2 className="client-title">INFORMATION DE FONCTION</h2>
                <div className="client-rows">
                    <div className="client-row">
                        <span className="client-nom"><Person2Outlined/> Client :</span>
                        <span className="client-nom">{nom_client}</span>
                    </div>
                    <div className="client-row">
                        <span className="client-nom"><PsychologyAltOutlinedIcon/> Compétence :</span>
                        <span className="client-nom">{nom}</span>
                    </div>

                    <div className="client-row">
                        <span className="client-nom"><CalendarMonth/> Avantages :</span>
                        <span className="client-nom">{avantages}</span>
                    </div>

                    <div className="client-row">
                        <span className="client-nom"><CurrencyExchangeOutlinedIcon/> Prix :</span>
                        <span className="client-nom">{prix} $</span>
                    </div>

                    <div className="client-row">
                        <span className="client-nom"><CurrencyExchangeOutlinedIcon/> Salaire :</span>
                        <span className="client-nom">{salaire} $</span>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default FonctionView 