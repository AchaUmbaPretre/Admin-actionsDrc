import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../mission/views/missionView.scss'
import { CalendarMonth, Edit, Person, Person3 } from '@mui/icons-material';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import config from '../../../config'
import moment from 'moment';

const AffView = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN
    const [data, setData] = useState({});
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

    const formattedDatSortant = moment(data?.end_date).format('DD-MM-YYYY');

  return (
    <>
        <div className="clientView">
            <div className="clientView-wrapper">
                <h2 className="client-title">INFORMATION D'AFFECTATION</h2>
                <div className="client-rows">
                    <div className="client-row1">
                        <div className="client-row">
                            <div className="client-sous">
                                <span className="client-nom"><Person2OutlinedIcon/> Agent :</span>
                                <span className="client-nom">{data?.first_name}</span>
                            </div>
                            <div className="client-sous">
                                <span className="client-nom"><Person2OutlinedIcon/> Client :</span>
                                <span className="client-nom">{data?.last_name}</span>
                            </div>
                        </div>
                        <div className="client-row">
                            <div className="client-sous">
                                <span className="client-nom"><Person2OutlinedIcon/> Agent :</span>
                                <span className="client-nom">{data?.client_nom}</span>
                            </div>
                            <div className="client-sous">
                                <span className="client-nom"><Person2OutlinedIcon/> Client :</span>
                                <span className="client-nom">{data?.contract_type}</span>
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
                                <span className="client-nom"><MonetizationOnOutlinedIcon/>  Prix :</span>
                                <span className="client-nom">{data?.prix} $</span>
                            </div>
                            <div className="client-sous">
                                <span className="client-nom"><MonetizationOnOutlinedIcon/>  Salaire : </span>
                                <span className="client-nom">{data?.salaire} $</span>
                            </div>
                        </div>
                    </div>
                    <div className="clientR-right">
                        <Link to={`/affectationEdit/${data.id}`} className='btn-edite'><BorderColorOutlinedIcon className='client-btn-icon' />Modifer</Link>
                    </div>
                </div>
            </div>
        </div>

    </>
  )
}

export default AffView