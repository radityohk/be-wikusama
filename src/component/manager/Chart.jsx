// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'

// ChartJS.register(
//     BarElement, CategoryScale, LinearScale, Tooltip, Legend
// )
// export default function ChartTransaksi() {
//     const headers = {
//         'Authorization': `Bearer ${sessionStorage.getItem('token')}`
//     };
//     const [transaksi, setTransaksi] = useState([])
//     const [menu, setMenu] = useState([])

//     useEffect(() => {
//         const fecthDatas = async () => {
//             try {
//                 const response = await axios.get("http://localhost:8080/transaksi/", {headers})
//                 setTransaksi((response.data.data).filter((select) => select.status === "lunas"))

//                 const res = await axios.get("http://localhost:8080/menu/", {headers})
//                 setMenu(res.data.data)
//             } catch (err) {
//                 console.log(err)
//             }
//         }
//         fecthDatas()
//     }, [])

//     console.log(transaksi)

//     const data = {
//         labels: menu
//             .sort((a, b) =>
//                 transaksi.reduce(
//                     (total, transaksi) => {
//                         const detailTransaksiA = transaksi.detail_transaksi.find(
//                             (dt) => dt.id_menu === a.id
//                         );
//                         const detailTransaksiB = transaksi.detail_transaksi.find(
//                             (dt) => dt.id_menu === b.id,
                            
//                         );
//                         return total + (detailTransaksiB?.qty || 0) - (detailTransaksiA?.qty || 0);
//                     },
//                     0
//                 )
//             )
//             .map((item) => item.nama_menu),
//         datasets: [
//             {
//                 label: 'Penjualan',
//                 //2 argument: accumulator acc, elemen yg diproses(menu)
//                 data: menu.reduce((acc, menu) => {
//                     const totalQty = transaksi.reduce((total, transaksi) => {
//                         //mencari id yg sama 'id_menu' di detail dan menu
//                         const detailTransaksi = transaksi.detail_transaksi.find(
//                             (dt) => dt.id_menu === menu.id
//                         );
//                         //jika ditemukan, ditambahkan ke total yang sedang berjalan menggunakan ekspresi total + detailTransaksi.qty.
//                         if (detailTransaksi) {
//                             return total + detailTransaksi.qty;
//                         }
//                         return total;
//                     }, 0);
//                     return [...acc, totalQty];
//                     //mengurutkan dari yang terbanyak
//                 }, []).sort((a, b) => b - a),

//                 backgroundColor: 'rgba(54, 162, 235, 0.2)',
//                 borderColor: 'rgba(54, 162, 235, 1)',
//                 borderWidth: 1,
//             },
//         ],
//     };

//     const options = {
//         scales: {
//             y: {
//                 beginAtZero: true,
//             },
//         },
//     };

//     return (
//         <div>
//             <Bar data={data} options={options} />
//         </div>
//     )
// }


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const LineChartComponent = () => {
  const headers = {
  'Authorization': `Bearer ${sessionStorage.getItem('token')}`
  };

  const [data, setData] = useState([]);
  const [menuData, setMenuData] = useState([]); // State untuk data menu

  useEffect(() => {
    axios.get('http://localhost:8080/detail', {headers}) // Ganti dengan URL backend Anda
      .then(response => {
          setData(response.data.data);
        })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

    axios.get('http://localhost:8080/menu', {headers}) // Ganti dengan URL untuk data menu
      .then(response => {
        setMenuData(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching menu data:', error);
      });
  }, []);

  const calculateTotalPembelian = (menuId) => {
    const totalQty = data.reduce((total, item) => {
      if (item.id_menu === menuId) {
        return total + item.qty;
      }
      return total;
    }, 0);
    return totalQty;
  };

  const chartData = menuData.map(menuItem => {
    console.log(menuItem); // Tampilkan nilai menuItem untuk periksaan
    return {
      nama_menu: menuItem.nama_menu,
      total_pembelian: calculateTotalPembelian(menuItem.id),
    };
  });

  

  return (
    <div className='pt-16'>
      <LineChart width={950} height={500} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="nama_menu" interval={0} textAnchor="end" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="total_pembelian" stroke="#8884d8" name="Total Pembelian" />
      </LineChart>
    </div>
  );
}

export default LineChartComponent;




