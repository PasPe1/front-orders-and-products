export const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  datasets: [
    {
      label: 'Orders',
      backgroundColor: 'rgba(248,121,121,0.8)',
      borderColor: '#f87979',
      pointBackgroundColor: 'rgba(248,121,121,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(248,121,121,1)',
      data: [34, 12, 55, 29, 47, 63, 41, 68, 27, 51, 36, 59],
    },
    {
      label: 'Products',
      backgroundColor: 'rgba(139,195,74,0.8)',
      borderColor: '#8bc34a',
      pointBackgroundColor: 'rgba(139,195,74,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(139,195,74,1)',
      data: [25, 67, 14, 42, 58, 33, 19, 46, 28, 62, 53, 11],
    },
  ],
}

export const options = {
  responsive: true,
}
