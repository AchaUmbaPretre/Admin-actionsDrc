import './affectation.scss'
import { DataGrid } from '@mui/x-data-grid'
import { DeleteOutline} from '@mui/icons-material';
import { useEffect, useState } from 'react';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import Swal from 'sweetalert2'
import axios from 'axios';
import { format } from 'date-fns';
import { FadeLoader } from 'react-spinners';

const Affectation = () => {

  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
   const [loading, setLoading] = useState(true);

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'first_name', headerName: "Nom", width: 150 },
    {
      field: 'last_name',
      headerName: "Post-nom",
      width: 150 
    },
    {
      field: 'skills',
      headerName: 'Competence',
      width: 150 
    },
    {
      field: 'salaire',
      headerName: 'Salaire',
      width: 150 
    },
    {
      field: 'end_date',
      headerName: 'Date de la fin',
      width: 150,
      valueGetter: (params) =>
      format(new Date(params.row.end_date), 'yyyy-MM-dd'),
    },
    {field: 'action', HeaderName: 'Action', width: 200, renderCell: (params) =>{
        return(
          <>
            <div className="table-icons-row">
                <DeleteOutline className="userListDelete" onClick={()=>{handleDelete(params.row.id)}} />
            </div>
          </>

        )
    }},
  ];
/*   useEffect(() => {

    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/admin/affectation");
        setData(res.data)

      } catch (error) {
        console.log(error)
      };
    }
    fetchData()
  }, []) */

  useEffect(() => {

    const fetchDatas = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/admin/allaffectation");
        setData(res.data)
        setLoading(false);

      } catch (error) {
        console.log(error)
      };
    }
    fetchDatas()
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
      await axios.delete(`http://localhost:8080/api/admin/deleteAff/${id}`);
      window.location.reload();
    }
  } catch (err) {
    console.log(err);
  }
};

  return (
    <>

      <div className="listeConge">
        <div className="liste-wrapper">
          <div className="contrats-top">
              <ShowChartIcon className='contrats-icon'/>
              <div className="contrats-info">
                  <h2 className="contrats-title">Affectation</h2>
                  <span className="contrats-span">Liste des agents affectés</span>
              </div>
          </div>
        </div>
          {loading ? (
        <div className="spinner-container">
            <FadeLoader color={'#36D7B7'} loading={loading} />
        </div>
        ) : (
        <DataGrid rows={data} columns={columns} pageSize={10} checkboxSelection className="presenceTable" />
        )}
      </div>
    </>
  )
}

export default Affectation