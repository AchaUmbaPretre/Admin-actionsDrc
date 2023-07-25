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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import SendIcon from '@mui/icons-material/Send';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

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

    const HandleDelete = (id) =>{
        const dataFilter = data.filter(item=> item.id !== id)
        setData(dataFilter)
      }

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const theme = useTheme();
    const [personName, setPersonName] = useState([]);
  
    const handleChange = (event) => {
      const {
        target: { value },
      } = event;
      setPersonName(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'type_de_contrat', headerName: 'Type de contrat', width: 110 },
        {
          field: 'duree_du_contrat',
          headerName: 'durée du contrat',
          type: 'number',
          width: 120,
        },
        {
          field: 'date_du_debut',
          headerName: 'Date du debut',
          width: 110 
        },
        {
            field: 'date_de_la_fin',
            headerName: 'Date de la fin',
            width: 110 
        },
        {
            field: 'salaire',
            headerName: 'Salaire',
            type: 'number',
            width: 80 
        },
        {
            field: 'heure_du_travail',
            headerName: 'Heure du travail',
            width: 100 
        },
        {
            field: 'avantage_social',
            headerName: 'Avantage social',
            width: 130 
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
                            <Box component="form" sx={{'& > :not(style)': { m: 1, width: '43ch' },}} noValidate autoComplete="off">
                            <FormControl sx={{ m: 1, width: 300 }}>
                                    <InputLabel id="demo-multiple-name-label">Name</InputLabel>
                                    <Select
                                    labelId="demo-multiple-name-label"
                                    id="demo-multiple-name"
                                    multiple
                                    value={personName}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="Name" />}
                                    MenuProps={MenuProps}
                                    >
                                    {names.map((name) => (
                                        <MenuItem
                                        key={name}
                                        value={name}
                                        style={getStyles(name, personName, theme)}
                                        >
                                        {name}
                                        </MenuItem>
                                    ))}
                                    </Select>
                                </FormControl>
                                <TextField id="filled-basic" label="Prenom" variant="filled" />
                                <TextField id="filled-basic" label="Date" variant="filled" />
                                <TextField id="filled-basic" label="Adresse" variant="filled" />
                                <TextField id="filled-basic" label="Email" variant="filled" />
                                <TextField id="filled-basic" label="Id unique" variant="filled" />
                                <TextField id="filled-basic" label="Type de pièce" variant="filled" />
                                <TextField id="filled-number" label="Number" type="number" InputLabelProps={{shrink: true,}} variant="filled"/>
                                <TextField id="filled-basic" label="Competence" variant="filled" />
                                <TextField id="filled-basic" label="Certificat" variant="filled" />
                                <TextField id="filled-basic" label="Status" variant="filled" />
                                <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Genre</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                        defaultValue="homme"
                                    >
                                        <FormControlLabel value="homme" control={<Radio />} label="Homme" />
                                        <FormControlLabel value="femme" control={<Radio />} label="Femme" />
                                        <FormControlLabel
                                        value="disabled"
                                        disabled
                                        control={<Radio />}
                                        label="autre"
                                        />
                                    </RadioGroup>
                                </FormControl>
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