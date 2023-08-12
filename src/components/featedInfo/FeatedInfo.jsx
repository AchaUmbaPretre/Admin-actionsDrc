import { useEffect, useState } from 'react';
import './featedInfo.scss'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import axios from 'axios';
import GroupsIcon from '@mui/icons-material/Groups';
import FlakyIcon from '@mui/icons-material/Flaky';

const FeatedInfo = () => {
    const [data, setData] = useState([]);
    const [aff, setAff] = useState([]);
    const [client, setClient] = useState([]);
    const [contrat, setContrat] = useState([]);

    useEffect(()=>{

        const fetchData = async ()=> {
            try{
                const res = await axios.get("http://localhost:8080/api/admin/count");
                setData(res.data)
              }catch(error){
                console.log(error)
              };
        }
        fetchData()
     }, [])

     console.log(data[0]?.total)

     useEffect(()=>{

        const fetchData = async ()=> {
            try{
                const res = await axios.get("http://localhost:8080/api/admin/affectationCount");
                setAff(res.data)
              }catch(error){
                console.log(error)
              };
        }
        fetchData()
     }, [])

     useEffect(()=>{

        const fetchData = async ()=> {
            try{
                const res = await axios.get("http://localhost:8080/api/admin/clientCount");
                setClient(res.data)
              }catch(error){
                console.log(error)
              };
        }
        fetchData()
     }, [])

     useEffect(()=>{

        const fetchData = async ()=> {
            try{
                const res = await axios.get("http://localhost:8080/api/admin/contratCount");
                setContrat(res.data)
              }catch(error){
                console.log(error)
              };
        }
        fetchData()
     }, [])

  return (
    <>
        <div className="featedInfo">
            <div className="feated-top">
                <h2 className="feated-title">Menu</h2>
                <PersonOutlineIcon className='feated-title'/>
            </div>
            <div className="feated-rows">
                <div className="feated-row">
                    <div className="feated-top">
                        <div className="feated-row-title">
                            <h3 className="feated-h2">Personnel</h3>
                            <span className="feated-span">{data[0]?.total}</span>
                        </div>
                        <div className="feated-right">
                            <PersonOutlineIcon className='feated-icon'/>
                        </div>
                    </div>
                    <div className="feated-bottom">
                        <span>*****  ******  *****</span>
                    </div>
                </div>

                <div className="feated-row">
                    <div className="feated-top">
                        <div className="feated-row-title">
                            <h3 className="feated-h2">Affectation</h3>
                            <span className="feated-span">{aff[0]?.total}</span>
                        </div>
                        <div className="feated-right">
                            <ShowChartIcon className='feated-icon'/>
                        </div>
                    </div>
                    <div className="feated-bottom">
                        <span>*****  ******  *****</span>
                    </div>
                </div>

                <div className="feated-row">
                    <div className="feated-top">
                        <div className="feated-row-title">
                            <h3 className="feated-h2">Client</h3>
                            <span className="feated-span">{client[0]?.total}</span>
                        </div>
                        <div className="feated-right">
                            <GroupsIcon className='feated-icon'/>
                        </div>
                    </div>
                    <div className="feated-bottom">
                        <span>*****  ******  *****</span>
                    </div>
                </div>

                <div className="feated-row">
                    <div className="feated-top">
                        <div className="feated-row-title">
                            <h3 className="feated-h2">Contrat</h3>
                            <span className="feated-span">{contrat[0]?.total}</span>
                        </div>
                        <div className="feated-right">
                            <FlakyIcon className='feated-icon'/>
                        </div>
                    </div>
                    <div className="feated-bottom">
                        <span>*****  ******  *****</span>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default FeatedInfo