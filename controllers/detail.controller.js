const detailModel = require(`../models/index`).detail_transaksi;
const menuModel = require(`../models/index`).menu;
const transaksiModel = require(`../models/index`).transaksi;
const Op = require(`sequelize`).Op;
const { path } = require(`../models/detail_transaksi`);
const fs = require(`fs`);
const md5 = require(`md5`);
const mysql = require(`mysql2`);

exports.getAllDetail = async (request, response) => {
    detailModel.findAll()
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

exports.findDetail = async (request, response) => {
  let keyword = request.body.keyword;

  let detail = await detailModel.findAll({
    where: {
      [Op.or]: [
        { id_transaksi: { [Op.substring]: keyword } },
        "=================================",
        { id_menu: { [Op.substring]: keyword } },
        "=================================",
        { harga: { [Op.substring]: keyword } },
      ],
    },
  });
  return response.json({
    success: true,
    data: detail,
    message: `All detail have been loaded`,
  });
};

exports.addDetail = async (request, response) => {
    let data = {
     id_transaksi: request.body.id_transaksi,
     id_menu: request.body.id_menu,
     harga: request.body.harga
   }

   detailModel.create(data)
   .then(result => {
       response.json ({
           message: "Data Berhasil Ditambahkan",
           data: result
       })
   })
   .catch(error => {
    response.json({
        message: error.message
    })
})
};

exports.statistikTransaksi = (request, response) => {
  const menuTotals = new Map();

  detailModel
    .findAll()
    .then((details) => {
      // Fetch menu details
      menuModel.findAll().then((menus) => {
        // Iterate over each detail
        details.forEach((detail) => {
          const menuId = detail.id_menu;

          // Find the corresponding menu for the current detail
          const menu = menus.find((m) => m.id === menuId);

          if (menu) {
            const menuName = menu.nama_menu;
            const total = detail.qty;

            // Update or initialize total for the menu item in the hash map
            if (menuTotals.has(menuName)) {
              menuTotals.set(menuName, menuTotals.get(menuName) + total);
            } else {
              menuTotals.set(menuName, total);
            }
          }
        });

        // Convert hash map to array of objects
        const result = Array.from(menuTotals, ([menuName, total]) => ({
          nama_menu: menuName,
          total_pembelian: total,
        }));

        return response.json({
          data: result,
        });
      });
    })
    .catch((error) => {
      response.json({
        message: error.message,
      });
    });
};


exports.updateDetail = (request, response) => {
  let data = {
    id_transaksi: request.body.id_transaksi,
    id_menu: request.body.id_menu,
    harga: request.body.harga
  }

    let id_detail = request.params.id;


    detailModel.update(data, { where: { id: id_detail } })
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

exports.deleteDetail = (request, response) => {
  let id_detail = request.params.id;

  detailModel
    .destroy({ where: { id: id_detail } })
    .then((result) => {
      return response.json({
        success: true,
        message: `Data detail has been deleted`,
      });
    })
    .catch((error) => {
      return response.json({
        success: false,
        message: error.message,
      });
    });
};
