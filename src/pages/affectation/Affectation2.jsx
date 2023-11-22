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
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { Button, Input, Popconfirm, Space, Table, Tag } from 'antd';
import moment from 'moment';

const Affectation2 = () => {

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
        const res = await axios.get(`${DOMAIN}/api/admin/contratEmploie`);
        setTap1(res?.data)
        setLoading(false);
      } catch (error) {
        console.log(error)
      };
    }
    fetchDatas()
    }, [])

    const columns2 = [
        {
          title: 'Code',
          dataIndex: 'contrat_ID',
          key: 'contrat_ID',
          width: '5%',
        },
        {
          title: 'Nom',
          dataIndex: 'first2',
          key: 'first2',
          width: '13%',
          ...getColumnSearchProps('first2'),
        },
        {
          title: 'Client',
          dataIndex: 'company2',
          key: 'company2',
          width: '13%',
          ...getColumnSearchProps('company2'),
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
          dataIndex: 'skills2',
          key: 'skills2',
          width: '10%',
          ...getColumnSearchProps('skills2'),
        },
        {
          title: 'Prix',
          dataIndex: 'prix2',
          key: 'prix2',
          width: '13%',
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
          render: (text) => moment(text).locale('fr').format('DD-MM-YYYY')
        },
        {
          title: 'Action',
          dataIndex: 'action',
          render: (text, record) => {
            const handleEdit = () => {
              navigate(`/affectationEdit2/${record.id}`);
            }
        
            return (
              <>
                <div className="table-icons-row">
                    <EditOutlined className='userListBtn' onClick={handleEdit}/>
                  <VisibilityOutlined
                    className="userEye"
                    onClick={() => navigate(`/affectationView/${record.id}`)}
                  />
                  <Popconfirm
                    title="Êtes-vous sûr de vouloir supprimer?"
                    onConfirm={()=>{handleDelete(record.id,record.userId)}}
                    okText="Oui"
                    cancelText="Non"
                  >
                    <DeleteOutline className="userListDelete"/>
                  </Popconfirm>
                </div>
              </>
            );
          },
        },
    
    ];

    const handleDelete = async (id,userId) => {
        try {
   
            await Promise.all([
              axios.put(`${DOMAIN}/api/admin/deleteAff/${id}`),
              axios.put(`${DOMAIN}/api/admin/affectationPutAgent/${userId}`)
            ]);
            window.location.reload();
        } catch (err) {
          console.log(err);
        }
    };

  return (
    <>
        <div className="affectation2">
            <Table columns={columns2} dataSource={tap1} scroll={scroll} pagination={{ pageSize: 5}}/>
        </div>

    </>
  )
}

export default Affectation2