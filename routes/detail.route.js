const express = require(`express`)
const app = express()
app.use(express.json())
const userController =
require(`../controllers/detail.controller`)
app.get("/", userController.getAllDetail)
app.get('/statistik',userController.statistikTransaksi)
app.post("/add", userController.addDetail)
app.post("/find", userController.findDetail)
app.put("/:id", userController.updateDetail)
app.delete("/:id", userController.deleteDetail)
module.exports = app