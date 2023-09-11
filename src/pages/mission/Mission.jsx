import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { DeleteOutline} from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import Collapse from '@mui/material/Collapse';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
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
          const { first_name, ...rest } = row;
          if (!acc[first_name]) {
            acc[first_name] = {
              first_name,
              rows: [rest],
            };
          } else {
            acc[first_name].rows.push(rest);
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
                  <TableCell>Site</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.values(groupedData).map((group) => (
                  <CollapsibleRow key={group.first_name} group={group} />
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
                  <KeyboardArrowDownIcon
                    onClick={() => setOpen(!open)}
                    sx={{ cursor: 'pointer' }}
                  />
                </Box>
              </TableCell>
              <TableCell>{group.rows[0].company_name}</TableCell>
              <TableCell>{group.first_name}</TableCell>
              <TableCell>{group.rows[0].days}</TableCell>
              <TableCell>{group.rows[0].heureEntrant.substring(0, 5)}</TableCell>
              <TableCell>{group.rows[0].heureSortant.substring(0, 5)}</TableCell>
              <TableCell>{group.site}</TableCell>
              <TableCell>
                <div className="table-icons-row">
                  <Link to={`/missionEdite/${group.rows[0].id}`}>
                    <ModeEditOutlineIcon className='userListBtn' />
                  </Link>
                  <DeleteOutline
                    className="userListDelete"
                    onClick={() => {
                      handleDelete(group.rows[0].id);
                    }}
                  />
                </div>
              </TableCell>
            </TableRow>
            {open && (
              <TableRow>
                <TableCell colSpan={7}>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Jour</TableCell>
                          <TableCell>Heure de début</TableCell>
                          <TableCell>Heure fin</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {group.rows.map((row) => (
                          <TableRow key={row.id}>
                            <TableCell>{row.days}</TableCell>
                            <TableCell>{row.heureEntrant.substring(0, 5)}</TableCell>
                            <TableCell>{row.heureSortant.substring(0, 5)}</TableCell>
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
                    <PeopleIcon className='personnel-icon'/>
                    <div className="personnel-info">
                        <h2 className="personnel-title">Mission</h2>
                        <span className="personnel-span">liste des missions</span>
                    </div>
                </div>
                <div className="personPdf">
                  <Link className="personnel-btn" onClick={handleOpen}><PersonAddAlt1Icon/>Recherche le client</Link>
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
              <MyTable data={data} />
            </div>
            )}
        </div>
    </>
  )
}

export default Mission