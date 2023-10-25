import './barReturn.scss'
import { Breadcrumb } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';

const BarReturn = () => {
  return (
    <>
        <div className="barReturn">
            <Breadcrumb
                items={[
                {
                    href: '/',
                    title: (
                    <>
                    <HomeOutlined />
                    <span>Accueil</span>
                    </>
                    ),
                    },
                {
                    href: '/personnel',
                    title: (
                    <>
                    <UserOutlined />
                    <span>Liste des employés</span>
                    </>
                    ),
                    },
                ]}
            />
        </div>

    </>
  )
}

export default BarReturn