import { Link } from 'react-router-dom';
import { DeleteOutline} from '@mui/icons-material';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from 'react';
import * as React from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { useEffect } from 'react';
import { FadeLoader } from 'react-spinners';
import config from '../../config'
import MissionForm from './form/MissionForm';
import { Box, Fade, Modal} from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Breadcrumb } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';

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

const Mission = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [searchValue, setSearchValue] = useState('');

    const joursSemaineOrdre = [
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi",
      "Dimanche"
    ];
    

    const navigate = useNavigate();

     useEffect(()=>{
      const fetchData = async ()=> {
          try{
              const {data} = await axios.get(`${DOMAIN}/api/admin/allmission`);
              setData(data)
              setLoading(false);
      
            }catch(error){
              console.log(error)
            };
      }
      fetchData()
    }, [])

    const filteredData = data.filter((item) =>
      item.first_name.toLowerCase().includes(searchValue.toLowerCase())
    );
    
    const handleEdit = (id) => {
    Swal.fire({
      title: 'Confirmation',
      text: 'Voulez-vous vraiment modifier ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/missionEdite/${id}`);
      }
    });
    }

    const handleDelete = async (id) => {
        try {
          const result = await Swal.fire({
            title: 'Es-tu sûr?',
            text: "Vous ne pourrez pas revenir en arrière !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, supprimez-le!'
          });
      
          if (result.isConfirmed) {
            await axios.delete(`${DOMAIN}/api/admin/mission/${id}`);
            window.location.reload();
          }
        } catch (err) {
          console.log(err);
        }
    };

    const MyTable = ({ data }) => { 
        const groupedData = data.reduce((acc, row) => {
          const { agent_id, ...rest } = row;
          if (!acc[agent_id]) {
            acc[agent_id] = {
              agent_id,
              rows: [rest],
            };
          } else {
            acc[agent_id].rows.push(rest);
          }
          return acc;
        }, {});
      
        return (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Client</TableCell>
                  <TableCell>Agent</TableCell>
                  <TableCell>Jour</TableCell>
                  <TableCell>Heure de début</TableCell>
                  <TableCell>Heure fin</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.values(groupedData).map((group) => (
                  <CollapsibleRow key={group.agent_id} group={group} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        );
      };
      
    const CollapsibleRow = ({ group }) => {
        const [open, setOpen] = React.useState(false);

        return (
          <>
            <TableRow>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpen(!open)}
                    >
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>
                </Box>
              </TableCell>
              <TableCell>{group.rows[0].company_name}</TableCell>
              <TableCell>{group.rows[0].first_name}</TableCell>
              <TableCell>{group.rows[0].days}</TableCell>
              <TableCell>{group.rows[0].heureEntrant.substring(0, 5)}</TableCell>
              <TableCell>{group.rows[0].heureSortant.substring(0, 5)}</TableCell>
              <TableCell>
                <div className="table-icons-row">
                  <div className="userOvert2">
                    <DeleteOutline className="userListDelete" onClick={() => { handleDelete(group.agent_id) }} />
                    <span className='userOvert'>Supprimer</span>
                  </div>
                </div>
              </TableCell>
            </TableRow>
            {open && (
            <TableRow>
              <TableCell colSpan={7}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow style={{ background: "#253053"}}>
                        <TableCell style={{color: "white"}}>Jour du travail</TableCell>
                        <TableCell style={{color: "white"}}>Heure de début</TableCell>
                        <TableCell style={{color: "white"}}>Heure fin</TableCell>
                        <TableCell style={{color: "white"}}>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {group.rows
                        // Trier les données en utilisant l'ordre personnalisé des jours de la semaine
                        .sort((a, b) => joursSemaineOrdre.indexOf(a.days) - joursSemaineOrdre.indexOf(b.days))
                        .map((row) => (
                          <TableRow key={row.id}>
                            <TableCell>{row.days}</TableCell>
                            <TableCell style={{ background: row.heureEntrant.substring(0, 5) === "Fermé" ? "#eeeeee" : "transparent", color: row.heureEntrant.substring(0, 5) === "Fermé" ? "black" : "black" }}>
                              {row.heureEntrant.substring(0, 5)}
                            </TableCell>
                            <TableCell style={{ background: row.heureSortant.substring(0, 5) === "Fermé" ? "#eeeeee" : "transparent", color: row.heureSortant.substring(0, 5) === "Fermé" ? "black" : "black" }}>
                              {row.heureSortant.substring(0, 5)}
                            </TableCell>
                            <TableCell>
                              <DriveFileRenameOutlineOutlinedIcon className='mission-icon' onClick={() => { handleEdit(row.mission_id) }} />
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </TableCell>
            </TableRow>
            )}
          </>
        );
      };

    const exportToExcel = () => {
        
        const excelData = data.map(row => ({
          Client: row.company_name,
          Agent: row.first_name,
          Jour: row.days,
          'Heure de début': row.heureEntrant.substring(0, 5),
          'Heure de fin': row.heureSortant.substring(0, 5),
        }));
      

        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(excelData);
      
   
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Feuille 1');
      
  
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const excelBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        

        const excelFilename = 'tableau.xlsx';
        saveAs(excelBlob, excelFilename);
      };
      
  return (
    <>
        <div className="personnel">
            <div className="personnel-rows">
                <div className="personnel-top">
                    <AccessTimeIcon className='personnel-icon'/>
                    <div className="personnel-info">
                        <h2 className="personnel-title">Horaires</h2>
                        <span className="personnel-span">liste des horaires</span>
                    </div>
                </div>
                <div className="personPdf">
                  <Link className="personnel-btn" onClick={handleOpen}><PersonAddAlt1Icon/>Rechercher le client</Link>
                  <Link className="personnel-btn-pdf" onClick={() => navigate('/missionsPdf')}><PictureAsPdfIcon/>Pdf</Link>
                  <Link className="personnel-btn-excel" onClick={exportToExcel}>Export Excel</Link>
                </div>
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
                            <Box component="form" sx={{'& > :not(style)': { m: 1, width: '250ch' }, display:'flex', flexWrap:'wrap'}} noValidate autoComplete="off">
                              <MissionForm handleModalClose={handleClose} />
                            </Box>
                        </Box>
                    </Fade>
                </Modal>
            </div>
            {loading ? (
          <div className="spinner-container">
            <FadeLoader color={'#36D7B7'} loading={loading} />
          </div>
          ) : (
            <div>
              <div className="bread">
                <Breadcrumb
                  items={[
                    {
                      href: '/',
                      title: (
                        <>
                          <HomeOutlined />
                          <span>Accueil</span>
                        </>
                      ),
                    },
                    {
                      href: '/personnel',
                      title: (
                        <>
                          <UserOutlined />
                          <span>Liste des employés</span>
                        </>
                      ),
                    },
                  ]}
                />
                <div className="bread-search">
                  <input type="search" name="" id="" className='input-search' value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)} placeholder='Recherche...' />
                </div>
              </div>
              <MyTable data={filteredData} />
            </div>
            )}
        </div>
    </>
  )
}

export default Mission