const express = require(`express`);
const app = express();
app.use(express.json());
const userController = require(`../controllers/transaksi.controller`);
const { auth } = require(`../auth/auth`);

app.get("/", auth, userController.getAllTransaksi);
app.get("/:id", auth, userController.getTransaksibyID);
app.get("/:date", auth, userController.getTransaksibyDate);
app.post("/add", auth, userController.addTransaksi);
app.post("/find", auth, userController.findTransaksi);
app.post("/findby", auth, userController.findTransaksibyName);
app.get("/check", auth, userController.checkTransaksi);
app.put("/:id", auth, userController.updateTransaksi);
app.delete("/:id", auth, userController.deleteTransaksi);
module.exports = app;
