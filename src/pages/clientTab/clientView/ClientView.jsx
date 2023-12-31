import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './clientView.scss'
import {  EmailOutlined, LoginOutlined, MapsHomeWorkOutlined, PasswordOutlined, Person2Outlined, PhoneAndroidOutlined } from '@mui/icons-material';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import config from '../../../config'

const ClientView = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN
    const [data, setData] = useState({});
    const {pathname} = useLocation();
    const id = pathname.split('/')[2]

    useEffect(()=>{
        const fetchData = async ()=> {
            try{
                const res = await axios.get(`${DOMAIN}/api/admin/viewsClient/${id}`);
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
                <h2 className="client-title">DETAIL DU CLIENT</h2>
                <div className="client-rows">
                    <div className="client-row1">
                        <h2 className="client-row-title">Raison sociale <span>*</span></h2>
                        <div className="client-row">
                            <div className="client-sous">
                                <span className="client-nom"><Person2Outlined/> Nom de compagnie :</span>
                                <span className="client-nom">{data.company_name}</span>
                            </div>
                            <div className="client-sous">
                                <span className="client-nom"><MapsHomeWorkOutlined/>  Adresse :</span>
                                <span className="client-nom">{data.address}</span>
                            </div>
                        </div>
                        <div className="client-row">
                            <div className="client-sous">
                                <span className="client-nom"><MapsHomeWorkOutlined/> Ville :</span>
                                <span className="client-nom">{data.province}</span>
                            </div>
                            <div className="client-sous">
                                <span className="client-nom"><MapsHomeWorkOutlined/> Pays :</span>
                                <span className="client-nom">{data.pays}</span>
                            </div>
                        </div>
                        <div className="client-row">
                            <div className="client-sous">
                                <span className="client-nom"><PasswordOutlined/>  Rccm :</span>
                                <span className="client-nom">{data.rccm}</span>
                            </div>
                            <div className="client-sous">
                                <span className="client-nom"><PasswordOutlined/>  Id nate :</span>
                                <span className="client-nom">{data.idnate}</span>
                            </div>
                        </div>
                    </div>
                    <div className="client-row1">
                        <h2 className="client-row-title">Contact <span>*</span></h2>
                        <div className="client-row">
                            <div className="client-sous">
                                <span className="client-nom"><PhoneAndroidOutlined/> Tel de compagnie :</span>
                                <span className="client-nom">{data.phone_number}</span>
                            </div>
                            <div className="client-sous">
                                <span className="client-nom"><PhoneAndroidOutlined/> Nom du contact principal :</span>
                                <span className="client-nom">{data.contact_name}</span>
                            </div>
                        </div>
                        <div className="client-row">
                            <div className="client-sous">
                                <span className="client-nom"><EmailOutlined/> Email :</span>
                                <span className="client-nom">{data.contact_email}</span>
                            </div>
                        </div>
                    </div>
                    <div className="clientR-right">
                        <Link to={`/clientUpdate/${data?.id}`} className='btn-edite'><BorderColorOutlinedIcon className='client-btn-icon' />Modifer</Link>
                    </div>

                </div>
            </div>
        </div>
    </>
  )
}

export default ClientView