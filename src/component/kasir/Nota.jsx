// import React from "react";
// import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// const styles = StyleSheet.create({
//     page: {
//         flexDirection: "column",
//         padding: 20,
//       },
//       section: {
//         padding: 5, // Ubah margin menjadi lebih kecil
//         flexGrow: 1,
//       },
//       title: {
//         fontSize: 24,
//         marginBottom: 10,
//         textAlign: "center",
//       },
//       subtitle: {
//         fontSize: 16,
//         marginBottom: 5, // Ubah margin menjadi lebih kecil
//         textAlign: "center",
//       },
//       table: {
//         display: "flex  ",
//         width: "auto",
//         border: "1pt solid #000", // Tambahkan garis untuk tabel
//         justifyContent: "center",
//         alignItems: "center",
//       },
//       tableRow: {
//         flexDirection: "row",
//         borderBottomWidth: 1,
//         borderBottomColor: "#000",
//         borderBottomStyle: "solid",
//       },
//       tableCell: {
//         padding: 5,
//         fontSize: 12,
//         textAlign: "left",
//         width: "25%",
//         borderRightWidth: 1, // Tambahkan garis vertikal untuk setiap sel
//         borderRightColor: "#000",
//         borderRightStyle: "solid",
//       },
// });

// const NotaTransaksiPDF = ({ transaksi }) => {
//   return (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         <View style={styles.section}>
//           <Text style={styles.title}>Nota Transaksi</Text>
//           <Text style={styles.subtitle}>ID Transaksi: {transaksi.id}</Text>
//           <Text>Nama Pelanggan: {transaksi.nama_pelanggan}</Text>
//           <Text>Nomor Meja: {transaksi.meja.nomor_meja}</Text>
//           <Text>Total Harga: {transaksi.total}</Text>
//         </View>
//         <View style={styles.table}>
//           <View style={styles.tableRow}>
//             <Text style={styles.tableCell}>ID Menu</Text>
//             <Text style={styles.tableCell}>Nama Menu</Text>
//             <Text style={styles.tableCell}>Qty</Text>
//             <Text style={styles.tableCell}>Harga</Text>
//           </View>
//           {transaksi.detail_transaksi.map((detail) => (
//             <View style={styles.tableRow} key={detail.id}>
//               <Text style={styles.tableCell}>{detail.menu.id}</Text>
//               <Text style={styles.tableCell}>{detail.menu.nama_menu}</Text>
//               <Text style={styles.tableCell}>{detail.qty}</Text>
//               <Text style={styles.tableCell}>{detail.harga}</Text>
//             </View>
//           ))}
//         </View>
//       </Page>
//     </Document>
//   );
// };

// export default NotaTransaksiPDF;
