import './affectation.scss'
import { DataGrid } from '@mui/x-data-grid'
import { DeleteOutline, EditOutlined, VisibilityOutlined} from '@mui/icons-material';
import { useEffect, useState } from 'react';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import Swal from 'sweetalert2'
import axios from 'axios';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { FadeLoader } from 'react-spinners';
import config from '../../config';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Link, useNavigate } from "react-router-dom";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { Button, Input, Space, Table } from 'antd';
import moment from 'moment';

const Affectation = () => {

  const DOMAIN = config.REACT_APP_SERVER_DOMAIN;

  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [tap1, setTap1] = useState([]);
  const navigate = useNavigate();
 const [loading, setLoading] = useState(true);
 const [value, setValue] = React.useState('1');
 const [searchText, setSearchText] = useState('');
 const [searchedColumn, setSearchedColumn] = useState('');
 const searchInput = React.useRef(null);
 const scroll = { x: 400 };

 const handleChange = (event, newValue) => {
   setValue(newValue);
 };


const handleSearch = (selectedKeys, confirm, dataIndex) => {
  confirm();
  setSearchText(selectedKeys[0]);
  setSearchedColumn(dataIndex);
};

const handleReset = (clearFilters) => {
  clearFilters();
  setSearchText('');
};

const getColumnSearchProps = (dataIndex) => ({
  filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
    <div
      style={{
        padding: 8,
      }}
      onKeyDown={(e) => e.stopPropagation()}
    >
      <Input
        ref={searchInput}
        placeholder={`Recherche...`}
        value={selectedKeys[0]}
        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
        onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
        style={{
          marginBottom: 8,
          display: 'block',
        }}
      />
      <Space>
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{
            width: 100,
          }}
        >
          Recherche
        </Button>
        <Button
          onClick={() => clearFilters && handleReset(clearFilters)}
          size="small"
          style={{
            width: 90,
          }}
        >
          supprimer
        </Button>
        <Button
          type="link"
          size="small"
          onClick={() => {
            confirm({
              closeDropdown: false,
            });
            setSearchText(selectedKeys[0]);
            setSearchedColumn(dataIndex);
          }}
        >
          Filtre
        </Button>
        <Button
          type="link"
          size="small"
          onClick={() => {
            close();
          }}
        >
          Fermer
        </Button>
      </Space>
    </div>
  ),
  filterIcon: (filtered) => (
    <SearchOutlined
      style={{
        color: filtered ? '#1677ff' : undefined,
      }}
    />
  ),
  onFilter: (value, record) =>
    record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
  onFilterDropdownOpenChange: (visible) => {
    if (visible) {
      setTimeout(() => searchInput.current?.select(), 100);
    }
  },
  render: (text) =>
    searchedColumn === dataIndex ? (
      <Highlighter
        highlightStyle={{
          backgroundColor: '#ffc069',
          padding: 0,
        }}
        searchWords={[searchText]}
        autoEscape
        textToHighlight={text ? text.toString() : ''}
      />
    ) : (
      text
    ),
});

/*   const columns = [
    { field: 'client_nom', headerName: "Client", width: 120 },
    { field: 'first_name', headerName: "Nom", width: 120 },
    {
      field: 'last_name',
      headerName: "Post-nom",
      width: 120
    },
    {
      field: 'skills',
      headerName: 'Competence',
      width: 120 
    },
    {
      field: 'salaire',
      headerName: 'Salaire',
      width: 110,renderCell: (params) => `${params.value} $`
    },
    {
      field: 'prix',
      headerName: 'Prix',
      width: 110,renderCell: (params) => `${params.value} $`
    },
    {
      field: 'end_date',
      headerName: 'Date de la fin',
      width: 120,
      valueGetter: (params) =>
      format(new Date(params.row.end_date), 'dd-MM-yyyy', { locale: fr }),
    },
    {field: 'action', HeaderName: 'Action', width: 140, renderCell: (params) =>{
        return(
          <>
            <div className="table-icons-row">
                <div className="userOvert0">
                  <Link onClick={handleEdit}>
                    <EditOutlined className="userListBtn" />
                    <span className='userOvert'>Modifier</span>
                  </Link>
                </div>
                <div className="userOvert1">
                  <VisibilityOutlined className='userEye' onClick={() => navigate(`/affectations/${params.row.id}`)} />
                  <span className='userOvert'>détail</span>
                </div>
                <div className="userOvert2">
                  <DeleteOutline className="userListDelete" onClick={() => { handleDelete(params.row.id) }} />
                  <span className='userOvert'>Supprimer</span>
                </div>
            </div>
          </>

        )
    }},
  ]; */

/*   const columns2 = [
    { field: 'company2', headerName: "Client", width: 130 },
    { field: 'first2', headerName: "Nom", width: 130},
    {
      field: 'last2',
      headerName: "Post-nom",
      width: 130
    },
    {
      field: 'skills2',
      headerName: 'Competence',
      width: 120
    },
    {
      field: 'salaire2',
      headerName: 'Salaire',
      width: 100,renderCell: (params) => `${params.value} $`
    },
    {
      field: 'prix2',
      headerName: 'Prix',
      width: 100,renderCell: (params) => `${params.value} $`
    },
    {
      field: 'date2',
      headerName: 'Date de la fin',
      width: 100,
      valueGetter: (params) =>
      format(new Date(params.row.date2), 'dd-MM-yyyy', { locale: fr }),
    },
    {field: 'action', HeaderName: 'Action', width: 140, renderCell: (params) =>{
        return(
          <>
            <div className="table-icons-row">
                <div className="userOvert0">
                  <Link onClick={handleEdit}>
                    <EditOutlined className="userListBtn" />
                    <span className='userOvert'>Modifier</span>
                  </Link>
                </div>
                <div className="userOvert1">
                    <VisibilityOutlined className='userEye' onClick={() => navigate(`/affectationView/${params.row.id}`)} />
                    <span className='userOvert'>détail</span>
                </div>
                <div className="userOvert2">
                  <DeleteOutline className="userListDelete" onClick={() => { handleDelete(params.row.id) }} />
                  <span className='userOvert'>Supprimer</span>
                </div>
                
            </div>
          </>

        )
    }},
  ];
 */

  useEffect(() => {

    const fetchDatas = async () => {
      try {
        const res = await axios.get(`${DOMAIN}/api/admin/allaffectation`);
        setData(res?.data)
        setLoading(false);

      } catch (error) {
        console.log(error)
      };
    }
    fetchDatas()
  }, [])
  
  useEffect(() => {

    const fetchDatas = async () => {
      try {
        const res = await axios.get(`${DOMAIN}/api/admin/contratEmploie`);
        setTap1(res?.data)
        setLoading(false);
      } catch (error) {
        console.log(error)
      };
    }
    fetchDatas()
  }, [])

  const columns = [
    {
      title: 'Code',
      dataIndex: 'contrat_id',
      key: 'contrat_id',
      width: '5%',
    },
    {
      title: 'Client',
      dataIndex: 'client_nom',
      key: 'client_nom',
      width: '13%',
      ...getColumnSearchProps('client_nom'),
    },
    {
      title: 'Type contrat',
      dataIndex: 'contract_type',
      key: 'contract_type',
      width: '14%',
      ...getColumnSearchProps('contract_type'),
    },
    {
      title: 'Nom',
      dataIndex: 'first_name',
      key: 'last_name',
      width: '13%',
      ...getColumnSearchProps('first_name'),
    },
    {
      title: 'Compétence',
      dataIndex: 'skills',
      key: 'skills',
      width: '10%',
      ...getColumnSearchProps('skills'),
    },
    {
      title: 'Prix',
      dataIndex: 'prix',
      key: 'prix',
      width: '13%',
      ...getColumnSearchProps('prix'),
      sorter: (a, b) => a.prix - b.prix,
      sortDirections: ['descend', 'ascend'],
      render: (text) => `${text} $`, 
    },
    {
      title: "Date d'affectation",
      dataIndex: 'created_at',
      key: 'created_at',
      width: '20%',
      ...getColumnSearchProps('created_at'),
      sorter: (a, b) => moment(a.created_at) - moment(b.created_at),
      sortDirections: ['descend', 'ascend'],
      render: (text) => moment(text).locale('fr').format('DD/MM/YYYY')
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text, record) => {
        const handleEdit = () => {
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
              navigate(`/affectationEdit/${record.id}`);
            }
          });
        };
    
        return (
          <>
            <div className="table-icons-row">
              <EditOutlined className="userListBtn" onClick={handleEdit} />
              <VisibilityOutlined
                className="userEye"
                onClick={() => navigate(`/affectations/${record.id}`)}
              />
              <DeleteOutline
                className="userListDelete"
                onClick={() => {
                  handleDelete(record.id);
                }}
              />
            </div>
          </>
        );
      },
    },

  ];

  const columns2 = [
    {
      title: 'N° du contrat',
      dataIndex: 'contrat_ID',
      key: 'contrat_ID',
      width: '10%',
    },
    {
      title: 'Client',
      dataIndex: 'company2',
      key: 'company2',
      width: '10%',
      ...getColumnSearchProps('company2'),
    },
    {
      title: 'Type contrat',
      dataIndex: 'contract_type',
      key: 'contract_type',
      width: '20%',
      ...getColumnSearchProps('contract_type'),
    },
    {
      title: 'Nom',
      dataIndex: 'first2',
      key: 'first2',
      width: '10%',
      ...getColumnSearchProps('first2'),
    },
    {
      title: 'Competence',
      dataIndex: 'skills2',
      key: 'skills2',
      width: '10%',
      ...getColumnSearchProps('skills2'),
    },
    {
      title: 'Prix',
      dataIndex: 'prix2',
      key: 'prix2',
      width: '10%',
      ...getColumnSearchProps('prix2'),
      sorter: (a, b) => a.prix - b.prix,
      sortDirections: ['descend', 'ascend'],
      render: (text) => `${text} $`,
    },
    {
      title: "Date d'affectation",
      dataIndex: 'created_at',
      key: 'created_at',
      width: '20%',
      ...getColumnSearchProps('created_at'),
      sorter: (a, b) => moment(a.created_at) - moment(b.created_at),
      sortDirections: ['descend', 'ascend'],
      render: (text) => moment(text).locale('fr').format('DD/MM/YYYY')
    },
    {
      title: 'Date fin',
      dataIndex: 'date2',
      key: 'date2',
      width: '20%',
      ...getColumnSearchProps('end_date'),
      sorter: (a, b) => moment(a.date2) - moment(b.date2),
      sortDirections: ['descend', 'ascend'],
      render: (text) => moment(text).locale('fr').format('DD/MM/YYYY')
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text, record) => {
        const handleEdit = () => {
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
              navigate(`/affectationEdit/${record.id}`);
            }
          });
        };
    
        return (
          <>
            <div className="table-icons-row">
              <EditOutlined className="userListBtn" onClick={handleEdit} />
              <VisibilityOutlined
                className="userEye"
                onClick={() => navigate(`/affectationView/${record.id}`)}
              />
              <DeleteOutline
                className="userListDelete"
                onClick={() => {
                  handleDelete(record.id);
                }}
              />
            </div>
          </>
        );
      },
    },

  ];

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
      await axios.delete(`${DOMAIN}/api/admin/deleteAff/${id}`);
      window.location.reload();
    }
  } catch (err) {
    console.log(err);
  }
};

const exportToExcel = () => {
        
  const excelData = data.map(row => ({
    Client : row.client_nom,
    Nom: row.first_name,
    'Post-nom': row.last_name,
    Compténce: row.skills,
    Salaire: row.salaire,
    'Date de la fin':row.end_date
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
      <div className="listeConge">
        <div className="liste-wrapper">
          <div className="contrats-top">
              <ShowChartIcon className='contrats-icon'/>
              <div className="contrats-info">
                  <h2 className="contrats-title">Affectation</h2>
                  <span className="contrats-span">Liste des agents affectés</span>
              </div>
          </div>
          <div className="personPdf">
            <Link className="personnel-btn-pdf" onClick={() => navigate('')}><PictureAsPdfIcon/>Pdf</Link>
            <Link className="personnel-btn-excel" onClick={exportToExcel}>Export Excel</Link>
          </div>
        </div>
          {loading ? (
        <div className="spinner-container">
            <FadeLoader color={'#36D7B7'} loading={loading} />
        </div>
        ) : (
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', background:'white' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example" sx={{ display: 'flex', gap: '10px' }}>
                <Tab sx={{ display: 'flex', alignItems: 'center', fontSize: '12px' }} icon={<AdsClickIcon />} label="Liste des affectations" value="1" />
                <Tab sx={{ display: 'flex', alignItems: 'center', fontSize: '12px' }} icon={<AdsClickIcon />} label="Liste des affectations personnalisées" value="2" />
            </TabList>
            </Box>
              <TabPanel value="1" sx={{background:'white' }}>
                <Table columns={columns} dataSource={data} scroll={scroll} pagination={{ pageSize: 5}}/>
              </TabPanel>
              <TabPanel value="2" sx={{background:'white' }}>
                <Table columns={columns2} dataSource={tap1} scroll={scroll} pagination={{ pageSize: 5}}/>
              </TabPanel>
            </TabContext>
          </Box>
        )}
      </div>
    </>
  )
}

export default Affectation