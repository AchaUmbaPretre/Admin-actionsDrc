import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../mission/views/missionView.scss'
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import FormatListNumberedOutlinedIcon from '@mui/icons-material/FormatListNumberedOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import config from '../../../config'

const SitesViews = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN
    const [data, setData] = useState({});
    const {pathname} = useLocation();
    const id = pathname.split('/')[2]

    useEffect(()=>{
        const fetchData = async ()=> {
            try{
                const res = await axios.get(`${DOMAIN}/api/admin/sitesOne/${id}`);
                setData(res.data[0])
              }catch(error){
                console.log(error)
              };
        }
        fetchData()
    }, [id]);

  return (
    <>
        <div className="clientView">
            <div className="clientView-wrapper">
                <h2 className="client-title">DETAIL DU SITE</h2>
                <div className="client-rows">
                    <div className="client-row1">
                        <div className="client-row">
                            <div className="client-sous">
                                <span className="client-nom"><PeopleAltOutlinedIcon/> Client :</span>
                                <span className="client-nom">{data.company_name}</span>
                            </div>
                            <div className="client-sous">
                                <span className="client-nom"><CottageOutlinedIcon/> Avenue :</span>
                                <span className="client-nom">{data.avenue}</span>
                            </div>
                        </div>
                        <div className="client-row">
                            <div className="client-sous">
                                <span className="client-nom"><CottageOutlinedIcon/> Quartier :</span>
                                <span className="client-nom">{data.quartier}</span>
                            </div>
                            <div className="client-sous">
                                <span className="client-nom"><FormatListNumberedOutlinedIcon /> N° :</span>
                                <span className="client-nom">{data.numero}</span>
                            </div>
                        </div>
                        <div className="client-row">
                            <div className="client-sous">
                                <span className="client-nom"><CottageOutlinedIcon/> Commune :</span>
                                <span className="client-nom">{data.commune}</span>
                            </div>
                            <div className="client-sous">
                                <span className="client-nom"><PsychologyOutlinedIcon/> Description :</span>
                                <span className="client-nom">{data.description}</span>
                            </div>
                        </div>
                    </div>
                    <div className="clientR-right">
                        <Link to={`/sitesEdit/${data.id}`} className='btn-edite'><BorderColorOutlinedIcon className='client-btn-icon' />Modifer</Link>
                    </div>
                </div>
            </div>
        </div>

    </>
  )
}

export default SitesViews;