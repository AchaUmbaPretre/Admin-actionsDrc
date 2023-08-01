import './contrats.scss'
import { Link } from 'react-router-dom';
import FlakyIcon from '@mui/icons-material/Flaky';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { DeleteOutline} from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import moment from 'moment';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '1px solid #FFF',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  }



const Contrats = () => {
  const navigate = useNavigate();
    const [data, setData] = useState({});
    const [date, setDate] = useState('');
    const [datefin, setDateFin] = useState('');
    const [inputs, setInputs] = useState({});

    const handleChange = (e) =>{
        setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
    }
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleClick = () =>{

    }
  
/*     const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'contract_type', headerName: 'Type de contrat', width: 120 },

        {
          field: 'start_date',
          headerName: 'Date du debut',
          width: 120 
        },
        {
            field: 'end_date',
            headerName: 'Date de la fin',
            width: 120 
        },
        {
            field: 'hourly_rate',
            headerName: 'Salaire',
            type: 'number',
            width: 100 
        },
        {
          field: 'benefits',
          headerName: 'Avantages sociaux',
          width: 140 
        },
        {
          field: 'contract_status',
          headerName: 'Statut du contrat',
          width: 140 
        },
        {field: 'action', HeaderName: 'Action', width: 150, renderCell: (params) =>{
            return(
              <>
                <div className="table-icons-row">
                    <Link to={`/editContrat/${params.row.id}`}><ModeEditOutlineIcon className='userListBtn'/></Link>
                    <VisibilityIcon className='userEye'/>
                    <DeleteOutline className="userListDelete" onClick={()=>{handleDelete(params.row.id)}} />
                </div>
              </>
    
            )
        }},
      ]; */

      const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'first_name', headerName: 'Nom', width: 110 },
        { field: 'last_name', headerName: 'Prenom', width: 100 },
        {
          field: 'phone_number',
          headerName: 'Telephone',
          type: 'number',
          width: 100,
        },
        {
            field: 'email',
            headerName: 'Email',
            type: 'number',
            width: 120,
          },
        {
            field: 'date_of_birth',
            headerName: 'Date de naissance',
            width: 110,
        },
        { field: 'gender', headerName: 'Genre', width: 50 },
        { field: 'phone_number', headerName: 'Telephone', width: 100 },
        {
          field: 'skills',
          headerName: 'Competence',
          width: 120,
        },
      ];

/*       useEffect(()=>{

        const fetchData = async ()=> {
            try{
                const res = await axios.get("http://localhost:8080/api/admin/contrat");
                setData(res.data)
        
              }catch(error){
                console.log(error)
              };
        }
        fetchData()
     }, [])
 */

   
   useEffect(()=>{

    const fetchData = async ()=> {
        try{
            const res = await axios.get("http://localhost:8080/api/admin");
            setData(res.data)
    
          }catch(error){
            console.log(error)
          };
    }
    fetchData()
 }, [])

     

/*      const handleClick = async(e) =>{
      e.preventDefault();

      try{
          await axios.post(`http://localhost:8080/api/admin/contrat`,{...inputs, 	start_date: date, end_date:datefin})
          navigate("/contrats")
      }
      catch(error){
          console.log(error)
      }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/admin/contrat/${id}`);
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  }; */

  return (
    <>
        <div className="contrats">
            <div className="contrats-wrapper">
                <div className="contrats-top">
                    <FlakyIcon className='contrats-icon'/>
                    <div className="contrats-info">
                        <h2 className="contrats-title">Contrat</h2>
                        <span className="contrats-span">Liste des contrats</span>
                    </div>
                </div>
                <div className="contract">
                      <select name="" id="" className='contract-select'>
                        <option value="dog">Cuisinier</option>
                        <option value="cat">Nounou à domicile</option>
                        <option value="hamster">Chauffeur</option>
                        <option value="hamster">Femme de ménage</option>
                        <option value="hamster">Puéricultrice</option>
                      </select>
                </div>
                <button className="contrats-btn" onClick={handleOpen}><PersonAddAlt1Icon/>Ajouter</button>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                    }} 
                >
                    <Fade in={open}>
                        <Box sx={style}>
                            <Box component="form" sx={{'& > :not(style)': { m: 1, width: '43ch' }, display:'flex', flexWrap:'wrap'}} noValidate autoComplete="off">
                                <TextField id="filled-basic" name='contract_type' onChange={handleChange} label="Type de contrat" variant="filled" />
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DateRangePicker']}>
                                      <DatePicker name="start_date" label="Date de début" format={"DD-MM-YYYY"} onChange={(value)=>{setDate(moment(value).format("DD-MM-YYYY"))}}/>
                                    </DemoContainer>
                                </LocalizationProvider>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DateRangePicker']}>
                                      <DatePicker name="end_date" label="Date de la fin" format={"DD-MM-YYYY"} onChange={(value)=>{setDateFin(moment(value).format("DD-MM-YYYY"))}}/>
                                    </DemoContainer>
                                </LocalizationProvider>
                                <TextField id="filled-number" name='hourly_rate' onChange={handleChange} label="Salaire" type='number' InputLabelProps={{shrink: true,}} variant="filled" />
                                <TextField id="filled-basic" name='benefits' onChange={handleChange} label="Avantages sociaux du contrat" variant="filled" />
                                <TextField id="filled-basic" name='contract_status' onChange={handleChange} label="Status du contrat" variant="filled" />
                                <Button variant="contained" onClick={handleClick} endIcon={<SendIcon />}>
                                    Envoyer
                                </Button>
                            </Box>
                        </Box>
                    </Fade>
                </Modal>
            </div>
            <div className="contrats-left">
              <DataGrid rows={data} columns={columns} pageSize={10} checkboxSelection className="contratTable" />
              <div className="contrats-right">
                  <div className="contrats-right-wrapper">
                      <div className="contrats-right-rows">
                        <span className="contrats-prix">Prix : </span>
                        <span className="contrats-prix">100$</span>
                      </div>

                      <div className="contrats-right-rows">
                        <span className="contrats-prix">Salaire : </span>
                        <span className="contrats-prix">80$</span>
                      </div>

                      <div className="contrats-right-rows">
                        <span className="contrats-prix">Validité : </span>
                        <span className="contrats-prix">1 mois</span>
                      </div>

                  </div>
                  <button className="btn-contrat" onClick ={handleClick}>Envoyer</button>
              </div>
            </div>
        </div>
    </>
  )
}

export default Contrats