import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import './personnel.scss'
import { DeleteOutline} from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { useState } from 'react';
import { rows } from '../../data';
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import SendIcon from '@mui/icons-material/Send';

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

const Personnel = () => {
    const [data, setData] = useState(rows);

    const HandleDelete = (id) =>{
      const dataFilter = data.filter(item=> item.id !== id)
      setData(dataFilter)
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'nom', headerName: 'Nom', width: 110 },
        { field: 'prenom', headerName: 'Prenom', width: 110 },
        {
          field: 'age',
          headerName: 'Age',
          type: 'number',
          width: 100,
        },
        {
            field: 'genre',
            headerName: 'Genre',
            width: 90,
        },
        { field: 'adresse', headerName: 'Adresse', width: 120 },
        { field: 'telephone', headerName: 'Telephone', width: 120 },
        {
          field: 'competence',
          headerName: 'Competence',
          width: 120,
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
        <div className="personnel">
            <div className="personnel-rows">
                <div className="personnel-top">
                    <PeopleIcon className='personnel-icon'/>
                    <div className="personnel-info">
                        <h2 className="personnel-title">Employé</h2>
                        <span className="personnel-span">Liste des employés</span>
                    </div>
                </div>
                <button className="personnel-btn" onClick={handleOpen}><PersonAddAlt1Icon/>Ajouter</button>
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
                                <TextField id="filled-basic" label="Nom" variant="filled" />
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
            <DataGrid rows={data} columns={columns} pageSize={10} checkboxSelection className="userTable" />
        </div>
    </>
  )
}

export default Personnel