import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../../mission/views/missionView.scss'
import { format } from 'date-fns';
import { CalendarMonth, Money, Person, Person3 } from '@mui/icons-material';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import config from '../../../config'
import moment from 'moment';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';

const AffView2 = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN
    const [data, setData] = useState({});
    const [datas, setDatas] = useState({});
    const {pathname} = useLocation();
    const id = pathname.split('/')[2]

    useEffect(()=>{
        const fetchData = async ()=> {
            try{
                const res = await axios.get(`${DOMAIN}/api/admin/affectations/${id}`);
                setData(res.data[0])
        
              }catch(error){
                console.log(error)
              };
        }
        fetchData()
    }, [id]);

    useEffect(()=>{
        const fetchData = async ()=> {
            try{
                const res = await axios.get(`${DOMAIN}/api/admin/contratEmploie/${id}`);
                setData(res.data[0])
        
              }catch(error){
                console.log(error)
              };
        }
        fetchData()
    }, [id]);

    const formattedDatSortant = moment(data?.end_date).format('DD/MM/YYYY');

  return (
    <>
        <div className="clientView">
            <div className="clientView-wrapper">
                <h2 className="client-title">INFORMATION D'AFFECTATION</h2>
                <div className="client-rows">
                    <div className="client-row1">
                        <div className="client-row">
                            <div className="client-sous">
                                <span className="client-nom"><PersonOutlineOutlinedIcon /> Agent :</span>
                                <span className="client-nom">{data?.first_name}</span>
                            </div>
                            <div className="client-sous">
                                <span className="client-nom"><PeopleAltOutlinedIcon /> Client :</span>
                                <span className="client-nom">{data?.client_nom}</span>
                            </div>
                        </div>
                        <div className="client-row">
                            <div className="client-sous">
                                <span className="client-nom"><PsychologyOutlinedIcon/>  Compétence :</span>
                                <span className="client-nom">{data?.skills}</span>
                            </div>
                            <div className="client-sous">
                                <span className="client-nom"><CalendarMonth/>  Date de fin : </span>
                                <span className="client-nom">{formattedDatSortant}</span>
                            </div>
                        </div>
                        <div className="client-row">
                            <div className="client-sous">
                                <span className="client-nom"><CurrencyExchangeOutlinedIcon/>  Prix :</span>
                                <span className="client-nom">{data?.prix} $</span>
                            </div>
                            <div className="client-sous">
                                <span className="client-nom"><CurrencyExchangeOutlinedIcon/>  Salaire : </span>
                                <span className="client-nom">{data?.salaire} $</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>
  )
}

export default AffView2