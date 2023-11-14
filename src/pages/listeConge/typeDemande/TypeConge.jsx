import { DataGrid } from '@mui/x-data-grid'
import { Link, useNavigate } from 'react-router-dom';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import { EditOutlined } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Table, Button, Space, Popconfirm } from 'antd';
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import BarReturn from '../../../components/barReturn/BarReturn';
import config from '../../../config';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Box } from '@mui/material';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import TypeCongForm from './typeCongeForm/TypeCongForm';

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
  outline: 'none'
}

const TypeConge = () => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [dataTable, setDataTable] = useState([]);
  const [type, setType] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const handleEdit = (id) => {
    navigate(`/editConge/${id}`);
};

useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await axios.get(`${DOMAIN}/api/leave/typeConge`);
      setType(res.data);
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };
  fetchData();
}, []);

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
  { title: 'Nom de type', dataIndex: 'nom_type', key: 'nom_type' },
  { title: 'Nombre de jour', dataIndex: 'nombre_jour', key: 'nombre_jour' },
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
                  <h2 className="contrats-title">Type des congés</h2>
                  <span className="contrats-span">Liste des types congés</span>
              </div>
          </div>
          <div className="personPdf">
            <Link className="personnel-btn" onClick={handleOpen}><PersonAddAlt1Icon/>Nouveau</Link>
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
                <Box component="form" sx={{'& > :not(style)': { m: 1},}} noValidate autoComplete="off">
                  <TypeCongForm handleClose={handleClose}/>
                </Box>
              </Box>
            </Fade>
          </Modal>
        </div>
        <BarReturn/>
          <>
          <Table
            columns={columns}
            dataSource={type}
            className="presenceTable"
            loading={loading} 
          />
          </>
      </div>
    </>
  )
}

export default TypeConge