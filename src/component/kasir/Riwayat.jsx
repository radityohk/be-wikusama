import React, { useEffect, useState } from "react";
import axios from "axios";
import { PrintBill } from "./PrintBill";

export default function Riwayat() {
  const headers = {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  };
  const [transaksi, setTransaksi] = useState([]);
  const [meja, setMeja] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [filteredName, setFilteredName] = useState(null);
  const [namaPelanggan, setNamaPelanggan] = useState("");

  useEffect(() => {
    const fecthDatas = async () => {
      try {
        const response = await axios.get("http://localhost:8080/transaksi/", {
          headers,
        });
        setTransaksi(response.data.data);
        console.log(transaksi);

        const res = await axios.get("http://localhost:8080/meja/", { headers });
        setMeja(res.data.data);
        console.log(meja);
      } catch (err) {
        console.log(err);
      }
    };
    fecthDatas();
  }, []);

  const handleBayar = async (id) => {
    const selectedTransaksi = transaksi.find((select) => select.id === id);
    const selectedMeja = meja.find(
      (select) => select.id === selectedTransaksi.meja.id
    );

    const updatedStatusTransaksi = {
      ...selectedTransaksi,
      status: "lunas",
    };

    const updatedStatusMeja = {
      ...selectedMeja,
      status: "tersedia",
    };

    try {
      await axios.put(
        "http://localhost:8080/transaksi/" + id,
        updatedStatusTransaksi,
        { headers }
      );
      await axios.put(
        "http://localhost:8080/meja/" + selectedMeja.id,
        updatedStatusMeja,
        { headers }
      );
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemove = async (id) => {
    try {
      const selectedTransaksi = transaksi.find((select) => select.id === id);
      // const selectedMeja = meja.find((select) => select.id === selectedTransaksi.meja.id)

      // const updatedStatusMeja = {
      //     ...selectedMeja,
      //     status: "tersedia"
      // }

      await axios.delete("http://localhost:8080/transaksi/" + id, { headers });
      // await axios.put("http://localhost:8080/meja/" + selectedMeja.id, updatedStatusMeja, {headers})
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/transaksi/findby",
        { keyword },
        { headers }
      );
      const data = await response.data.data;
      setFilteredName(data);
      console.log(filteredName);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className="flex p-2 ml-5 bg-gray-100 rounded-md border shadow-sm">
        <input
          type="text"
          value={keyword}
          className="pl-1 bg-gray-100"
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search keyword"
        />
        <button
          className="ml-2 bg-cyan-100 p-1 rounded-md"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Nama Pelanggan
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Nomor Meja
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Total Harga
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Status
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Cetak Nota
              </th>
              {/* <th scope="col" className="px-6 py-4 font-medium text-gray-900"></th> */}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {filteredName && filteredName.length > 0
              ? filteredName.map((transaksi) => (
                  <tr key={transaksi.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{transaksi.nama_pelanggan}</td>
                    <td className="px-6 py-4">
                      Meja nomor {transaksi.id_meja}
                    </td>
                    <td className="px-6 py-4">{transaksi.total}</td>
                    <td className="px-6 py-4">
                      {transaksi.status === "belum bayar" ? (
                        <div className="flex gap-2">
                          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                            Belum Lunas
                          </span>
                          <button
                            onClick={() => handleBayar(transaksi.id)}
                            className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-rose-600"
                          >
                            Bayar
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                            Lunas
                          </span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              : transaksi.map((transaksi) => (
                  <tr key={transaksi.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{transaksi.nama_pelanggan}</td>
                    <td className="px-6 py-4">
                      Meja nomor {transaksi.meja.nomor_meja}
                    </td>
                    <td className="px-6 py-4">{transaksi.total}</td>
                    <td className="px-6 py-4">
                      {transaksi.status === "belum bayar" ? (
                        <div className="flex gap-2">
                          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                            Belum Lunas
                          </span>
                          <button
                            onClick={() => handleBayar(transaksi.id)}
                            className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-rose-600"
                          >
                            Bayar
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                            Lunas
                          </span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

{
  /* {transaksi.status === "belum bayar" ? (
                                    <td className="px-6 py-4">
                                        <div className="flex justify-end gap-4">
                                            <button onClick={() => handleRemove(transaksi.id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6" x-tooltip="tooltip">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                </svg>
                                            </button>
                                            <a href="#">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6" x-tooltip="tooltip">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                                </svg>
                                            </a>
                                        </div>
                                    </td>
                                ) : (
                                    <td className="px-6 py-4">
                                        <div className="flex justify-end gap-4"></div>
                                    </td>
                                )} */
}
