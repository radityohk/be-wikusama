const userModel = require(`../models/index`).user;
const transaksiModel = require(`../models/index`).transaksi;
const detailModel = require(`../models/index`).detail_transaksi;
const mejaModel = require(`../models/index`).meja;
const menuModel = require(`../models/index`).menu;
const Op = require(`sequelize`).Op;
const md5 = require(`md5`);
const mysql = require(`mysql2`);
const moment = require('moment')

exports.getAllTransaksi = async (request, response) => {
  transaksiModel.findAll({
    include: [
      {
        model: mejaModel,
        required: true, 
      },
      {
        model: userModel,
        required: true,
      },
      {
        model: detailModel,
        as: "detail_transaksi",
        include: [
          menuModel
        ],
        required: true,
      },
  ],
  })
    .then(result => {
        response.json({
            data: result
        })
    })
    .catch(error => {
        response.json({
            message: error.message
        })
    })
};

exports.findTransaksi = async (request, response) => {
  let keyword = request.body.keyword;

  let transaksi = await transaksiModel.findAll({
    where: {
      [Op.or]: [
        { tgl_transaksi: { [Op.substring]: keyword } },
        { id_user: { [Op.substring]: keyword } },
        { id_meja: { [Op.substring]: keyword } },
        { nama_pelanggan: { [Op.substring]: keyword } },
        { status: { [Op.substring]: keyword } },
      ],
    },
  });
  return response.json({
    success: true,
    data: transaksi,
    message: `All transaksi have been loaded`,
  });
};

exports.findTransaksibyName = async (request, response) => {
  let keyword = request.body.keyword;

  let transaksi = await transaksiModel.findAll({
    where: {
      [Op.or]: [
        { nama_pelanggan: { [Op.substring]: keyword } },
        { status: { [Op.substring]: keyword } },
      ],
    },
  });
  return response.json({
    success: true,
    data: transaksi,
    message: `All transaksi have been loaded`,
  });
};

// exports.addTransaksi = async (request, response) => {
//   const cekMeja = await transaksiModel.findOne({
//    where: {
//      id_meja: request.body.id_meja,
//      tgl_transaksi: {
//        [Op.eq]: new Date()
//      }
//    }
//  });

//  if (cekMeja) {
//    return response.status(400).json({
//      status: "error",
//      message: "Meja telah digunakan"
//    });
//  }

//    let data = {
//        id_user: request.body.id_user,
//        tgl_transaksi: request.body.tgl_transaksi,
//        id_meja: request.body.id_meja,
//        nama_pelanggan: request.body.nama_pelanggan,
//        status: request.body.status,
//        total: request.body.total
//    }
//    transaksiModel.create(data)
//     .then(result => {
//         response.json ({
//             success: true,
//             message: "Data Berhasil Dibuat",
//         })
//     })
//     .catch(error => {
//         response.json({
//             message: error.message
//         })
//     })
// };

exports.addTransaksi = async (request, response) => {
  let { tgl_transaksi, id_user, id_meja, nama_pelanggan, status } = request.body;

  let check = await transaksiModel.findOne({
    where: {
      id_meja: id_meja,
      tgl_transaksi: tgl_transaksi
    }
  });

 

  let data = {
    tgl_transaksi: request.body.tgl_transaksi,
    id_user: request.body.id_user,
    id_meja: request.body.id_meja,
    nama_pelanggan: request.body.nama_pelanggan,
    total: request.body.total,
    status: request.body.status
  };

  transaksiModel.create(data)
  .then(result => {
    // Simpan data detail transaksi
    let detailData = {
      id_transaksi: result.id, // ID transaksi yang baru dibuat
      id_menu: request.body.id_menu,
      qty: request.body.totalQty,
      harga: request.body.totalPrice
      // tambahkan properti detail transaksi lainnya
    };
console.log(detailData);
    detailModel.create(detailData)
      .then(detailResult => {
        response.json({
          message: "Data Berhasil Ditambahkan",
          data: {
            transaksi: result,
            detailTransaksi: detailResult
          }
        });
      })
      .catch(error => {
        response.json({
          message: error.message
        });
      });
  })
  .catch(error => {
    response.json({
      message: error.message
    });
  });

};

exports.updateTransaksi = (request, response) => {
  let data = {
    tgl_transaksi: request.body.tgl,
    id_user: request.body.id_user,
    id_meja: request.body.id_meja,
    nama_pelanggan: request.body.nama_pelanggan,
    status: request.body.status

  }

    let id_transaksi = request.params.id;


    transaksiModel.update(data, { where: { id: id_transaksi } })
    .then(result => {
        response.json ({
            success: true,
            message: "Data Berhasil Diganti",
        })
    })
    .catch(error => {
        response.json({
            message: error.message
        })
    })
};

exports.deleteTransaksi = (request, response) => {
  let id_transaksi = request.params.id;

  transaksiModel
    .destroy({ where: { id: id_transaksi } })
    .then((result) => {
      return response.json({
        success: true,
        message: `Data transaksi has been deleted`,
      });
    })
    .catch((error) => {
      return response.json({
        success: false,
        message: error.message,
      });
    });
};

exports.checkTransaksi = async (request, response) => {
  const { id_meja, tgl_transaksi } = request.query;

  if (id_meja === '' && tgl_transaksi === '') {
    return res.status(400).json({
      status: 'error',
      message: 'Meja telah digunakan pada tanggal yang sama'
    });
  }
}
