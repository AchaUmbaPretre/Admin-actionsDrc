import { DataGrid } from '@mui/x-data-grid'
import { Link, useNavigate } from 'react-router-dom';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import { EditOutlined } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../config'
import moment from 'moment';
import BarReturn from '../../components/barReturn/BarReturn';
import {FileExcelOutlined} from '@ant-design/icons';
import RapportRow from './rapportRow/RapportRow';
import { Table, Button, Space, Popconfirm } from 'antd';
import { DeleteOutlined, EyeOutlined, CheckCircleOutlined, ClearOutlined} from '@ant-design/icons';

const RapportPresence = () => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [dataTable, setDataTable] = useState([])

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);


  const handleEdit = (id) => {
    navigate(`/presenceEdit/${id}`);
};

const handleDelete = async (id) => {
  try {
    await axios.delete(`${DOMAIN}/api/admin/presence/${id}`);
      window.location.reload();
  } catch (err) {
    console.log(err);
  }
};

const columns = [
  { title: '#', dataIndex: 'id', key: 'id', render: (text, record, index) => index + 1 },
  { title: 'Nom', dataIndex: 'first_name', key: 'first_name' },
  { title: 'Post-nom', dataIndex: 'last_name', key: 'last_name' },
  { title: 'Client', dataIndex: 'company_name', key: 'company_name' },
  { title: 'Date de la présence', dataIndex: 'date', key: 'date', render: (text) => moment(text).format('DD-MM-yyyy') },
  { title: 'Mois', dataIndex: 'month_name', key: 'month_name' },
  { title: "Heure d'arrivée", dataIndex: 'check_in_time', key: 'check_in_time', render: (text) => text.substring(0, 5) },
  { title: 'Heure de sortie', dataIndex: 'check_out_time', key: 'check_out_time', render: (text) => text.substring(0, 5) },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
        
      <Space size="middle">
        <Popconfirm
          title="Êtes-vous sûr de vouloir modifier?"
          onConfirm={()=> handleEdit(record.id)}
          okText="Oui"
          cancelText="Non"
        >
          <Button icon={<EditOutlined />} style={{ color: 'green' }} />
        </Popconfirm>
        <Link to={`/presenceListView/${record.emp1_id}`}>
          <Button icon={<EyeOutlined />} style={{ color: 'blue' }} />
        </Link>
        <Popconfirm
          title="Êtes-vous sûr de vouloir supprimer?"
          onConfirm={() => handleDelete(record.id)}
          okText="Oui"
          cancelText="Non"
        >
          <Button icon={<DeleteOutlined />} style={{ color: 'red' }} />
        </Popconfirm>
      </Space>
    ),
  },
];

  return (
    <>
      <div className="presence">
        <div className="presence-wrapper">
          <div className="contrats-top">
              <ChecklistRtlIcon className='contrats-icon'/>
              <div className="contrats-info">
                  <h2 className="contrats-title">Rapport</h2>
                  <span className="contrats-span">Rapport des presences</span>
              </div>
          </div>
          <div className="personPdf">
            
          </div>
        </div>
        <BarReturn/>
        <RapportRow setDataTable={setDataTable} setLoading={setLoading}/>
          <>
          <Table
            columns={columns}
            dataSource={dataTable}
            className="presenceTable"
            loading={loading} 
          />
          </>
      </div>
    </>
  )
}

export default RapportPresence