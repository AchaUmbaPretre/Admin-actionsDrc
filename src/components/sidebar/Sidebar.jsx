import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu } from 'antd';
import './sidebar.scss';
import {
  HomeOutlined,
  UserOutlined,
  LineChartOutlined,
  CheckOutlined,
  CheckCircleOutlined,
  ClusterOutlined,
  SolutionOutlined,
  ScheduleOutlined,
  MoneyCollectOutlined,
  PlusOutlined,
  FileSearchOutlined,
} from '@ant-design/icons';
import actions from './../../assets/actionssarl.PNG';

const { SubMenu } = Menu;

const Sidebar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <div className="sidebar">
      <div className="sidebar-wrapper">
        <div className="sidebar-imgs">
          <img src={actions} alt="" className="sidenav-img" />
          <h2 className="sidebar-h2">Actions DRC</h2>
        </div>
        <Menu
          mode="vertical"
          theme="dark"
          selectedKeys={[location.pathname]}
          defaultOpenKeys={[]}
          inlineCollapsed={open}
          style={{ background: 'none' }}
        >
          <Menu.Item key="/" icon={<HomeOutlined />} title="Accueil" style={{ fontSize: '16px' }}>
            <Link to="/">Accueil</Link>
          </Menu.Item>
          <Menu.Item key="/personnel" icon={<UserOutlined />} title="Personnel" style={{ fontSize: '16px' }}>
            <Link to="/personnel">Personnel</Link>
          </Menu.Item>
          <Menu.Item key="/contrats" icon={<CheckCircleOutlined />} title="Contrats" style={{ fontSize: '16px' }}>
            <Link to="/contrats">Contrats</Link>
          </Menu.Item>
          <Menu.Item key="/affectation" icon={<LineChartOutlined />} title="Affectation" style={{ fontSize: '16px' }}>
            <Link to="/affectation">Affectation</Link>
          </Menu.Item>
          <SubMenu key="sub1" icon={<ClusterOutlined />} title="Client" style={{ fontSize: '16px' }}>
            <Menu.Item key="/client" title="client" icon={<SolutionOutlined />} style={{ fontSize: '16px' }}>
              <Link to="/client">Client</Link>
            </Menu.Item>
            <Menu.Item key="/fonction" title="Fonctions" icon={<CheckOutlined />} style={{ fontSize: '16px' }}>
              <Link to="/fonction">Fonctions</Link>
            </Menu.Item>
            <Menu.Item key="/sites" title="Lieu du travail" icon={<PlusOutlined />} style={{ fontSize: '16px' }}>
              <Link to="/sites">Lieu du travail</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="/mission" icon={<ScheduleOutlined />} title="Horaires" style={{ fontSize: '16px' }}>
            <Link to="/mission">Horaires</Link>
          </Menu.Item>
          <SubMenu key="sub2" icon={<CheckOutlined />} title="Presence" style={{ fontSize: '16px' }}>
            <Menu.Item key="/presence" title="Presence" icon={<CheckCircleOutlined />} style={{ fontSize: '16px' }}>
              <Link to="/presence">Presence</Link>
            </Menu.Item>
            <Menu.Item key="/rapport" title="Rapport" icon={<FileSearchOutlined />} style={{ fontSize: '16px' }}>
              <Link to="/rapportPresence">Rapport des presences</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="/facturation" icon={<FileSearchOutlined />} title="Facturation" style={{ fontSize: '16px' }}>
            <Link to="/facturation">Facturation</Link>
          </Menu.Item>
          <Menu.Item key="/paiement" icon={<MoneyCollectOutlined />} title="Paiement" style={{ fontSize: '16px' }}>
            <Link to="/paiement">Paiement</Link>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
};

export default Sidebar;