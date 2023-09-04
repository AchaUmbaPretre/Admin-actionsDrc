import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
import { Schedule as ScheduleIcon } from '@mui/icons-material';

/* const useStyles = makeStyles(() => ({
  container: {
    height: 400,
    width: '100%',
  },
  formControl: {
    marginRight: '16px',
    marginBottom: '16px',
  },
  addButton: {
    marginTop: '16px',
  },
  scheduleIcon: {
    marginRight: '8px',
  },
})); */

const Horaire = () => {
  const classes = ('');
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [horaire, setHoraire] = useState([]);

  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleAddHoraire = () => {
    if (selectedDay && selectedTime) {
      const newHoraire = [...horaire, { day: selectedDay, time: selectedTime }];
      setHoraire(newHoraire);
      setSelectedDay('');
      setSelectedTime('');
    }
  };

  const handleDeleteHoraire = (id) => {
    const updatedHoraire = horaire.filter((item, index) => index !== id);
    setHoraire(updatedHoraire);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'day', headerName: 'Jour', width: 120 },
    { field: 'time', headerName: 'Heure', width: 120 },
    {
      field: 'delete',
      headerName: '',
      width: 60,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={() => handleDeleteHoraire(params.row.id)}
        >
          Supprimer
        </Button>
      ),
    },
  ];

  return (
    <div className={classes.container}>
      <div className="horaire-wrapper">
        <h2 className="horaire-title">Mon Horaire</h2>
        <div className="horaire-form">
          <FormControl className={classes.formControl}>
            <InputLabel>Jour</InputLabel>
            <Select value={selectedDay} onChange={handleDayChange}>
              <MenuItem value="lundi">Lundi</MenuItem>
              <MenuItem value="mardi">Mardi</MenuItem>
              <MenuItem value="mercredi">Mercredi</MenuItem>
              <MenuItem value="jeudi">Jeudi</MenuItem>
              <MenuItem value="vendredi">Vendredi</MenuItem>
              <MenuItem value="samedi">Samedi</MenuItem>
              <MenuItem value="dimanche">Dimanche</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel>Heure</InputLabel>
            <Select value={selectedTime} onChange={handleTimeChange}>
              <MenuItem value="09:00">09:00</MenuItem>
              <MenuItem value="10:00">10:00</MenuItem>
              <MenuItem value="11:00">11:00</MenuItem>
              <MenuItem value="12:00">12:00</MenuItem>
              <MenuItem value="13:00">13:00</MenuItem>
              <MenuItem value="14:00">14:00</MenuItem>
              <MenuItem value="15:00">15:00</MenuItem>
              <MenuItem value="16:00">16:00</MenuItem>
              <MenuItem value="17:00">17:00</MenuItem>
            </Select>
          </FormControl>
          <Button
            className={classes.addButton}
            variant="contained"
            color="primary"
            onClick={handleAddHoraire}
            startIcon={<ScheduleIcon />}
          >
            Ajouter
          </Button>
        </div>
      </div>
      <DataGrid rows={horaire} columns={columns} />
    </div>
  );
};

export default Horaire;