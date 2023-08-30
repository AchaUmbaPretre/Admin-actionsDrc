import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { CalendarMonthOutlined, Person2Outlined, Person3Outlined } from '@mui/icons-material';
import config from '../../../config'
import moment from 'moment';

const PresenceView = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN
    const [data, setData] = useState({});
    const {pathname} = useLocation();
    const id = pathname.split('/');
    const emp1Id = id[2];
    const rowId = id[3]

    const [attendanceCount, setAttendanceCount] = useState(0);

    useEffect(()=>{
        const fetchData = async ()=> {
            try{
                const res = await axios.get(`${DOMAIN}/api/admin/presenceAllView/${rowId}`);
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
                const res = await axios.get(`${DOMAIN}/api/admin/presenceCount/${emp1Id}`);

                const employeeAttendanceCount = res.data.attendanceCount;
      
                setAttendanceCount(employeeAttendanceCount);
                console.log(attendanceCount)
        
              }catch(error){
                console.log(error)
              };
        }
        fetchData()
    }, []);

    const formattedDatPresence = moment(data?.date).format('DD/MM/YYYY');

  return (
    <>
        <div className="contrat-View">
            <div className="clientView-wrapper">
                <h2 className="client-title">PRESENCE</h2>
                <div className="client-rows">
                    <div className="client-row">
                        <span className="client-nom"><Person2Outlined/> Agent :</span>
                        <span className="client-nom">{data?.first_name}</span>
                    </div>
                    <div className="client-row">
                        <span className="client-nom"><Person3Outlined/> Client :</span>
                        <span className="client-nom">{data?.company_name}</span>
                    </div>

                    <div className="client-row">
                        <span className="client-nom"><CalendarMonthOutlined/> Date de la presence :</span>
                        <span className="client-nom">{formattedDatPresence}</span>
                    </div>

                    <div className="client-row">
                        <span className="client-nom"><AccessTimeIcon/> Heure d'arrivée :</span>
                        <span className="client-nom">{data && data.check_in_time && data.check_in_time.substring(0, 5)}</span>
                    </div>

                    <div className="client-row">
                        <span className="client-nom"><AccessTimeIcon/> Heure de départ  :</span>
                        <span className="client-nom">{data && data.check_out_time && data.check_out_time.substring(0, 5)}</span>
                    </div>

                    <div className="client-row">
                        <span className="client-nom"><AccessTimeIcon/> Nombre de presence  :</span>
                        <span className="client-nom">{attendanceCount}</span>
                    </div>

                </div>
            </div>
        </div>
    </>
  )
}

export default PresenceView