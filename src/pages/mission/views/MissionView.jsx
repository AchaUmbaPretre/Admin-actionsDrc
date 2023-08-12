import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './missionView.scss'
import { format } from 'date-fns';
import { CalendarMonth, Money, PermDataSetting, Person, Person3 } from '@mui/icons-material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const MissionView = () => {
    const [data, setData] = useState({});
    const {pathname} = useLocation();
    const id = pathname.split('/')[2]

    useEffect(()=>{
        const fetchData = async ()=> {
            try{
                const res = await axios.get(`http://localhost:8080/api/admin/missionAllView/${id}`);
                setData(res.data[0])
        
              }catch(error){
                console.log(error)
              };
        }
        fetchData()
    }, []);

  return (
    <>
        <div className="clientView">
            <div className="clientView-wrapper">
                <h2 className="client-title">INFORMATION DE MISSION</h2>
                <div className="client-rows">
                    <div className="client-row">
                        <span className="client-nom"><Person/> Agent :</span>
                        <span className="client-nom">{data?.first_name}</span>
                    </div>
                    <div className="client-row">
                        <span className="client-nom"><Person3/>  Client :</span>
                        <span className="client-nom">{data?.company_name}</span>
                    </div>

                    <div className="client-row">
                        <span className="client-nom"><CalendarMonth/>  Date de début :</span>
                        <span className="client-nom">{data?.dateEntrant}</span>
                    </div>

                    <div className="client-row">
                        <span className="client-nom"><CalendarMonth/>  Date de fin :</span>
                        <span className="client-nom">{data?.dateSortant}</span>
                    </div>
                    
                    <div className="client-row">
                        <span className="client-nom"><AccessTimeIcon/>  durée :</span>
                        <span className="client-nom">{data?.duree}</span>
                    </div>

                    <div className="client-row">
                        <span className="client-nom"><Money/>  Montant :</span>
                        <span className="client-nom">{data?.montant}</span>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default MissionView