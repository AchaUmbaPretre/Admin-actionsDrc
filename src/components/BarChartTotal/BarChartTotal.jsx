import React, { useState, useEffect } from 'react';
import './barChartTotal.scss'
import axios from 'axios';
import config from '../../config';
import { Chart as ChartJS, BarElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';
import { UserOutlined } from '@ant-design/icons';
import { Bar } from 'react-chartjs-2';
ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

const BarChartTotal = ({ employeeData }) => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [data, setData] = useState({ labels: [], datasets: [] });
    const [responseData, setResponseData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${DOMAIN}/api/admin/count`);
        setResponseData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  
  useEffect(() => {
    const formattedData = formatData(responseData);
    setData(formattedData);
  }, [responseData]);

  const formatData = (responseData) => {
    const totals = responseData.map((employee) => employee.total);
  
    return {
      labels: ['Employé'],
      datasets: [
        {
          label: 'Total des employé(e)s',
          data: totals,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <div className="employeeChart">
      <h2 className='employeeH2'>
      <UserOutlined className="icon-title" />
      Total des employé(e)s
      </h2>
      <hr />
      <Bar data={data} options={{
    scales: {
      y: {
        type: 'linear',
      },
    },
  }}/>
    </div>
  );
};

export default BarChartTotal;