import { useEffect, useState } from 'react';
import './views.scss'
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import userImg from './../../assets/user.png'
const Views = () => {
    const [data, setData] = useState({});
    const {pathname} = useLocation();
    const id = pathname.split('/')[2]

    useEffect(()=>{
        const fetchData = async ()=> {
            try{
                const res = await axios.get(`http://localhost:8080/api/admin/views/${id}`);
                setData(res.data[0])
        
              }catch(error){
                console.log(error)
              };
        }
        fetchData()
    }, []);

  return (
    <>
        <div className="views">
            <div className="views-wrapper">
                <div className="views-title">
                    <h1 className='h1-views'>Information de l'employé</h1>
                    <span className="views-bar"></span>
                </div>
                <div className="views-rows-items">
                    <img src={data.source ? `../upload/${data.source}` : userImg } alt="" className="views-photo" />
                    <div className="views-container">
                        <div className="views-rows">
                            <div className="views-left">
                                <span className="view-label">Nom : </span>
                                <span className="view-result">{data.first_name}</span>
                            </div>
                            <div className="views-right">
                                <span className="view-label">Prenom : </span>
                                <span className="view-result">{data.first_name}</span>
                            </div>
                        </div>

                        <div className="views-rows">
                            <div className="views-left">
                                <span className="view-label">Date de naissance : </span>
                                <span className="view-result">{data.date_of_birth}</span>
                            </div>
                            <div className="views-right">
                                <span className="view-label">Genre : </span>
                                <span className="view-result">{data.gender}</span>
                            </div>
                        </div>

                        <div className="views-rows">
                            <div className="views-left">
                                <span className="view-label">Adresse : </span>
                                <span className="view-result">{data.address}</span>
                            </div>
                            <div className="views-right">
                                <span className="view-label">Téléphone : </span>
                                <span className="view-result">{data.phone_number}</span>
                            </div>
                        </div>

                        <div className="views-rows">
                            <div className="views-left">
                                <span className="view-label">Email : </span>
                                <span className="view-result">{data.email}</span>
                            </div>
                            <div className="views-right">
                                <span className="view-label">Numero du pièce : </span>
                                <span className="view-result">{data.identification_number}</span>
                            </div>
                        </div>

                        <div className="views-rows">
                            <div className="views-left">
                                <span className="view-label">Type du pièce : </span>
                                <span className="view-result">{data.identification_type}</span>
                            </div>
                            <div className="views-right">
                                <span className="view-label">Compétence : </span>
                                <span className="view-result">{data.skills}</span>
                            </div>
                        </div>

                        <div className="views-rows">
                            <div className="views-left">
                                <span className="view-label">Certificat : </span>
                                <span className="view-result">{data.certifications}</span>
                            </div>
                            <div className="views-right">
                                <span className="view-label">Status : </span>
                                <span className="view-result">{data.employment_status}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Views