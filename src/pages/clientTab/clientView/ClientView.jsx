import axios from 'axios';
import '../form/clientForm.scss'
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './clientView.scss'

const ClientView = () => {
    const [data, setData] = useState({});
    const {pathname} = useLocation();
    const id = pathname.split('/')[2]

    useEffect(()=>{
        const fetchData = async ()=> {
            try{
                const res = await axios.get(`http://localhost:8080/api/admin/viewsClient/${id}`);
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
                <h2 className="client-title">INFORMATION DU CLIENT</h2>
                <div className="client-rows">
                    <div className="client-row">
                        <span className="client-nom">Nom de compagnie :</span>
                        <span className="client-nom">{data.company_name}</span>
                    </div>
                    <div className="client-row">
                        <span className="client-nom">Adresse :</span>
                        <span className="client-nom">{data.address}</span>
                    </div>

                    <div className="client-row">
                        <span className="client-nom">Tel de compagnie :</span>
                        <span className="client-nom">{data.phone_number}</span>
                    </div>

                    <div className="client-row">
                        <span className="client-nom">Tel du contact principal :</span>
                        <span className="client-nom">{data.contact_name}</span>
                    </div>

                    <div className="client-row">
                        <span className="client-nom">Email :</span>
                        <span className="client-nom">{data.contact_email}</span>
                    </div>

                    <div className="client-row">
                        <span className="client-nom">Rccm :</span>
                        <span className="client-nom">{data.rccm}</span>
                    </div>

                    <div className="client-row">
                        <span className="client-nom">Id nate :</span>
                        <span className="client-nom">{data.idnate}</span>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default ClientView