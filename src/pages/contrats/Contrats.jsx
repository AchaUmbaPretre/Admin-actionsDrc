import './contrats.scss'
import { Link } from 'react-router-dom';
import FlakyIcon from '@mui/icons-material/Flaky';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { DeleteOutline} from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { contrats } from '../../data';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useTheme } from '@mui/material/styles';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import moment from 'moment';

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

  const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'CDI',
  'CDD',
  'Intérim'
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const Contrats = () => {

    const [data, setData] = useState(contrats);
    const [time, setTime] = useState();
    const [dataa, setDataa] = useState();
    const [date, setDate] = useState()
    const HandleDelete = (id) =>{
        const dataFilter = data.filter(item=> item.id !== id)
        setData(dataFilter)
      }

    const handChange = (e) =>{
        setDataa(prev=>({...prev, [e.target.name]: e.target.value}))
    }
    console.log(dataa)

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const theme = useTheme();
    const [personName, setPersonName] = useState([]);
  
/*     const handleChange = (event) => {
      const {
        target: { value },
      } = event;
      setPersonName(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    }; */
    const handleChange = () =>{

    }
    const columns = [
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
                    <Link to={`/users/${params.row.id}`}><ModeEditOutlineIcon className='userListBtn'/></Link>
                    <VisibilityIcon className='userEye'/>
                    <DeleteOutline className="userListDelete" onClick={()=>{HandleDelete(params.row.id)}} />
                </div>
              </>
    
            )
        }},
      ];

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
                                      <DatePicker name="date_of_birth" label="Date de début" onChange={(value)=>{setDate(moment(value).format("DD-MM-YYYY"))}}/>
                                    </DemoContainer>
                                </LocalizationProvider>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DateRangePicker']}>
                                      <DatePicker name="date_of_birth" label="Date de la fin" onChange={(value)=>{setDate(moment(value).format("DD-MM-YYYY"))}}/>
                                    </DemoContainer>
                                </LocalizationProvider>
                                <TextField id="filled-basic" name='hourly_rate' onChange={handleChange} label="durée du contrat" variant="filled" />
                                <TextField id="filled-basic" name='benefits' onChange={handleChange} label="Avantages sociaux du contrat" variant="filled" />
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['TimePicker']}>
                                        <TimePicker label="Heure du travail" onChange={(value)=>{setTime(moment(value))}} />
                                    </DemoContainer>
                                </LocalizationProvider>
                                <TextField id="filled-basic" onChange={handleChange} label="Status du contrat" variant="filled" />
                                <Button variant="contained" endIcon={<SendIcon />}>
                                    Envoyer
                                </Button>
                            </Box>
                        </Box>
                    </Fade>
                </Modal>
            </div>
            <DataGrid rows={data} columns={columns} pageSize={10} checkboxSelection className="contratTable" />
        </div>
    </>
  )
}

export default Contrats