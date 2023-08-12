import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../clientTab/clientView/clientView.scss'
import { CalendarMonth, CodeOffOutlined, ContactPage, EmailOutlined, LoginOutlined, MapsHomeWorkOutlined, PasswordOutlined, Person2Outlined, Person3Outlined, PhoneAndroidOutlined, TimeToLeaveOutlined } from '@mui/icons-material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const FactureView = () => {
    const [data, setData] = useState({});
    const {pathname} = useLocation();
    const id = pathname.split('/')[2]

    useEffect(()=>{
        const fetchData = async ()=> {
            try{
                const res = await axios.get(`http://localhost:8080/api/admin/factureAllView/${id}`);
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
                <h2 className="client-title">FACTURE N° {data?.status}</h2>
                <div className="client-rows">
                    <div className="client-row">
                        <span className="client-nom"><Person2Outlined/> Client :</span>
                        <span className="client-nom">{data?.company_name}</span>
                    </div>
                    <div className="client-row">
                        <span className="client-nom"><Person3Outlined/>  Date de la facture :</span>
                        <span className="client-nom">{data?.invoice_date}</span>
                    </div>

                    <div className="client-row">
                        <span className="client-nom"><CalendarMonth/>  Date d'échéance :</span>
                        <span className="client-nom">{data?.due_date}</span>
                    </div>

                    <div className="client-row">
                        <span className="client-nom"><CalendarMonth/>  Montant total :</span>
                        <span className="client-nom">{data?.total_amount}</span>
                    </div>

                    <div className="client-row">
                        <span className="client-nom"><CalendarMonth/>  Statut de la facture :</span>
                        <span className="client-nom">{data?.status}</span>
                    </div>

                </div>
            </div>
        </div>
    </>
  )
}

export default FactureView