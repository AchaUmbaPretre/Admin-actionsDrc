import { List, Modal, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeOutlined, LoadingOutlined, UserOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import { format } from 'date-fns';
import config from '../../config';
import userImg from './../../assets/user.png';
import "./featedList.scss"

const FeatedList = () => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSpinner, setShowSpinner] = useState(true);
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

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Confirmation',
      content: 'Voulez-vous vraiment supprimer ?',
      okText: 'Oui',
      cancelText: 'Non',
      onOk: () => {
        // Logique de suppression à implémenter ici en utilisant l'ID
      },
    });
  };

  return (
    <>
      <div className="featedList">
        <h2 className="titles-h2" onClick={() => navigate('/personnel')}>
          <UserOutlined className="icon-title" />
          Employé(e)
        </h2>
        <div className="feated-container">
          {loading ? (
            <div className="spinner-container">
              <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
            </div>
          ) : (
            <List
              dataSource={data}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <img
                        src={item.source ? `../upload/${item.source}` : userImg}
                        alt="User Image"
                        style={{ borderRadius: '50%', height: 40, width: 40, objectFit:'cover' }}
                      />
                    }
                    title={item.first_name}
                    description={item.skills}
                  />
                  <div className="table-icons-row">
                    <EyeOutlined className="userEye" onClick={() => navigate(`/views/${item.id}`)} />
                    <EditOutlined className="userListBtn" onClick={() => handleEdit(item.id)} />
                    <DeleteOutlined className="userListDelete" onClick={() => handleDelete(item.id)} />
                  </div>
                </List.Item>
              )}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default FeatedList;