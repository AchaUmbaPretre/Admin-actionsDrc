import { List, Modal, Spin, Pagination } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeOutlined, LoadingOutlined, UserOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import config from '../../config';
import userImg from './../../assets/user.png';
import "./featedList.scss"

const FeatedList = () => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSpinner, setShowSpinner] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const spinnerDuration = 2000;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${DOMAIN}/api/admin`);
        setData(res.data);
        setLoading(false);
        setTimeout(() => {
          setShowSpinner(false);
        }, spinnerDuration);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleEdit = (id) => {
    Modal.confirm({
      title: 'Confirmation',
      content: 'Voulez-vous vraiment modifier ?',
      okText: 'Oui',
      cancelText: 'Non',
      onOk: () => {
        navigate(`/edit/${id}`);
      },
    });
  };

  const handleDelete = async (id) => {
    Modal.confirm({
      title: 'Confirmation',
      content: 'Voulez-vous vraiment supprimer ?',
      okText: 'Oui',
      cancelText: 'Non',
      async onOk() {
        await axios.put(`${DOMAIN}/api/admin/employes/${id}`);
        window.location.reload();
      },
    });
  };

  const handleChangePage = (page, pageSize) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="featedList">
        <h2 className="titles-h2" onClick={() => navigate('/personnel')}>
          <UserOutlined className="icon-title" />
          Employé(e)s
        </h2>
        <hr />
        <div className="feated-container">
          {loading ? (
            <div className="spinner-container">
              <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
            </div>
          ) : (
            <>
              <List
                dataSource={data.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <img
                          src={item.source ? item.source : userImg}
                          alt="User Image"
                          style={{ borderRadius: '50%', height: 40, width: 40, objectFit:'cover' }}
                        />
                      }
                      title={`${item.first_name} ${item.last_name}`}
                      description={item.nom_departement}
                    />
                    <div className="table-icons-row">
                      <EyeOutlined className="userEye" onClick={() => navigate(`/views/${item.id}`)} />
                      <EditOutlined className="userListBtn" onClick={() => handleEdit(item.id)} />
                      <DeleteOutlined className="userListDelete" onClick={() => handleDelete(item.id)} />
                    </div>
                  </List.Item>
                )}
              />
              <Pagination
                className="pagination"
                current={currentPage}
                pageSize={pageSize}
                total={data.length}
                onChange={handleChangePage}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default FeatedList;