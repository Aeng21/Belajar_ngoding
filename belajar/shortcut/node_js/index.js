const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const db = require('./db')
const response = require('./response')


app.use(bodyParser.json());

app.get('/get', (req, res) => {
  db.query("select * from mahasiswa", (error, result) => {
    res.send(result);
  })
});

app.get('/getcustom', (req, res) => {
  db.query("select * from mahasiswa", (error, result) => {
    response(200, result, "get data mahasiswa", res)

  })
});

app.get('/find', (req, res) => {
  db.query(`select nama from mahasiswa where npm = ${req.query.npm}`, (error, result) => {
    response(200, result, "find mahasiswa name", res)
  })

})

app.get('/', (req, res) => {
  res.send("uhuy")
})

app.post('/post', (req, res) => {
  res.send('berhasil ditambahkaan!');
  console.info({ requestFromOutside: req.body });
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});