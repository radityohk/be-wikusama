import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export const PrintBill = ({ transaksi }) => {
  const componentRef = useRef();

  // Fungsi ini akan dipanggil saat tombol "Cetak Struk" di klik
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <button onClick={handlePrint}>Cetak Struk</button>
      {/* Komponen untuk mencetak */}
      <div style={{ display: "none" }}>
        <div ref={componentRef}>
          <h2>Struk Pembayaran</h2>
          <p>Tanggal: 31 Juli 2023</p>
          {/* ... Tambahkan informasi transaksi yang lain sesuai kebutuhan */}
          <table>
            <thead>
              <tr>
                <th>Nama Menu</th>
                <th>Jumlah</th>
                <th>Harga</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {transaksi.map((item) => (
                <tr key={item.id}>
                  <td>{item.nama_menu}</td>
                  <td>{item.qty}</td>
                  <td>{item.harga}</td>
                  <td>{item.subtotal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
