export const data = {
    labels: ['01/10/2023', '05/10/2023', '10/10/2023'],
    datasets: [
      {
        data: [50, 30, 20],
        backgroundColor: ['red', 'blue', 'yellow'],
      },
    ],
  };
  
export  const options = {
    // Options de configuration du graphique
  };
  
export  const tooltips = {
    callbacks: {
      label: (tooltipItem, data) => {
        const label = data.labels[tooltipItem.index];
        const amount = data.datasets[0].data[tooltipItem.index];
        const paymentMethod = 'Carte de crédit'; // Remplacez par la méthode de paiement correspondante pour chaque tranche
        return `${label}: ${amount}$ (${paymentMethod})`;
      },
    },
  };
  export const userData = [
    {
        id : 1,
        year : 2023,
        montant : 200,
        prix : 3000,
    },
    {
        id : 2,
        year : 2024,
        montant : 100,
        prix : 2000,
    },
    {
        id : 3,
        year : 2024,
        montant : 400,
        prix : 4000,
    },
  ]

