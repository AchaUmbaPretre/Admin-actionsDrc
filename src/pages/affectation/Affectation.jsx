import './affectation.scss'
import { DeleteOutline, EditOutlined, VisibilityOutlined} from '@mui/icons-material';
import { useEffect, useState } from 'react';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import axios from 'axios';
import { FadeLoader } from 'react-spinners';
import config from '../../config';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Link, useNavigate } from "react-router-dom";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import * as React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { Button, Input, Popconfirm, Space, Table, Tag, Popover } from 'antd';
import moment from 'moment';
import {FileExcelOutlined} from '@ant-design/icons';
import BarReturn from '../../components/barReturn/BarReturn';

const Affectation = () => {

  const DOMAIN = config.REACT_APP_SERVER_DOMAIN;

  const [data, setData] = useState([]);
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
  

  const columns = [
    {
      title: 'Code',
      dataIndex: 'contrat_id',
      key: 'contrat_id',
      width: '5%',
    },
    {
      title: 'Nom',
      dataIndex: 'first_name',
      key: 'last_name',
      width: '11%',
      ...getColumnSearchProps('first_name'),
    },
    {
      title: 'Client',
      dataIndex: 'client_nom',
      key: 'client_nom',
      width: '12%',
      ...getColumnSearchProps('client_nom'),
    },
    {
      title: 'Type du contrat',
      dataIndex: 'contract_type',
      key: 'contract_type',
      width: '14%',
      render: (text) => {
        let color = '';
        let icon = null;
        if (text === 'Journalier') {
          color = 'green';
        } else if (text === 'Interim') {
          color = 'blue';
        } else if (text === 'Resilié') {
          color = 'red';
        }
        return (
          <Space>
            <Tag color={color}>{text}</Tag>
          </Space>
        );
      },
    },
    {
      title: 'Domaine',
      dataIndex: 'nom_departement',
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
      title: 'Salaire',
      dataIndex: 'salaire',
      key: 'prix',
      width: '10%',
      ...getColumnSearchProps('prix'),
      sorter: (a, b) => a.prix - b.prix,
      sortDirections: ['descend', 'ascend'],
      render: (text) => `${text} $`, 
    },
    {
      title: "Date d'affectation",
      dataIndex: 'created_at',
      key: 'created_at',
      width: '19%',
      ...getColumnSearchProps('created_at'),
      sorter: (a, b) => moment(a.created_at) - moment(b.created_at),
      sortDirections: ['descend', 'ascend'],
      render: (text) => moment(text).locale('fr').format('DD-M-YYYY')
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text, record) => {
        const handleEdit = () => {
            navigate(`/affectationEdit/${record.id}`);
        };
    
        return (
          <>
            <div className="table-icons-row">
                <div className="userOvert0">
                  <Popover title="Modifier" trigger="hover">
                    <EditOutlined className='userListBtn' onClick={handleEdit}/>
                  </Popover>
                </div>
                <Popover title="Detail" trigger="hover">
                  <VisibilityOutlined
                  className="userEye"
                  onClick={() => navigate(`/affectations/${record.id}`)}
                />
                </Popover>
              <Popover title="Supprimer" trigger="hover">
                <Popconfirm
                  title="Êtes-vous sûr de vouloir supprimer?"
                  onConfirm={()=>{handleDelete(record.id, record.userId)}}
                  okText="Oui"
                  cancelText="Non"
                >
                  <DeleteOutline className="userListDelete"/>
                </Popconfirm>
              </Popover>
            </div>
          </>
        );
      },
    },

  ];

  const handleDelete = async (id, userId) => {
    try {
      window.location.reload();
      await Promise.all([
        axios.put(`${DOMAIN}/api/admin/deleteAff/${id}`),
        axios.put(`${DOMAIN}/api/admin/affectationPutAgent/${userId}`)
      ]);
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
            <Link className="personnel-btn-pdf" onClick={() => navigate('/affectationPdf')}><PictureAsPdfIcon/>Pdf</Link>
            <Link className="personnel-btn-excel" onClick={exportToExcel}><FileExcelOutlined />Export Excel</Link>
          </div>
        </div>
        <BarReturn/>
          {loading ? (
        <div className="spinner-container">
            <FadeLoader color={'#36D7B7'} loading={loading} />
        </div>
        ) : (
          <Table columns={columns} dataSource={data} scroll={scroll} pagination={{ pageSize: 5}}/>
        )}
      </div>
    </>
  )
}

export default Affectation