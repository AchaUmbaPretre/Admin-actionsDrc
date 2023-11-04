import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import './barChart.scss'
ChartJS.register(ArcElement, Tooltip, Legend);

const BarChart = ({ datas }) => {
  const [data, setData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const formattedData = formatData(datas);
    setData(formattedData);
  }, [datas]);

  const formatData = (datas) => {
    const votes = datas.map(item => item.prix);
    const labels = datas.map(item => item.salaire);

    return {
      labels: labels,
      datasets: [
        {
          label: 'Salaire',
          data: votes,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <>
      <div className="barChart">
        <h2 className='barChart-h2'>Graphique de paiement</h2>
        <Pie data={data} />
      </div>
    </>
  );
};

export default BarChart;