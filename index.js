var app = require('express')();
var server = require('http').Server(app);
var e = require('express')
var md5 = require('md5');



const mysql = require("mysql");
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 3000;
const fs = require('fs');

app.use(bodyParser.json());
app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));

var pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "mobile_pangan"
});



app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.post("/beranda", (req, res) => {
    console.log(req.body);
    var sql = `UPDATE person SET latitude =${req.body.latitude}, longitude=${req.body.longitude} WHERE email='${req.body.email}'`;
    console.log(sql);
    pool.getConnection(function (err, connection) {
        connection.query(sql, function (error, results, fields) {
            connection.release();
            if (error) throw error;
            console.log(results.length);
            if (results == "") {
                return res.json("gagal")
            } else {
                return res.json("berhasil");
            }
        });
    });
})

app.post("/daftar", (req, res) => {
    console.log(req.body);
    var sql = `INSERT INTO person (nama, email, password, telepon, alamat) VALUES ('${req.body.nama}','${req.body.email}','${req.body.password}','${req.body.telepon}','${req.body.alamat}')`;
    console.log(sql);
    pool.getConnection(function (err, connection) {
        connection.query(sql, function (error, results, fields) {
            connection.release();
            if (error) throw error;
            console.log(results.length);
            if (results == "") {
                return res.json("gagal")
            } else {
                return res.json("berhasil");
            }
        });
    });
})


app.post("/login", (req, res) => {
    var pass = req.body.password;
    console.log(pass);
    var sql = `SELECT * FROM person WHERE email = '${req.body.email}' AND password = '${pass} ' LIMIT 1`;
    console.log(sql);
    pool.getConnection(function (err, connection) {
        connection.query(sql, function (error, results, fields) {
            console.log(results)
            connection.release();
            if (error) throw error;

            if (results == "") {
                return res.json("gagal");
            } else {

                return res.json(results);
            }
        });
    });
})

app.post("/pangan", (req, res) => {
    var sql = `SELECT * FROM pangan WHERE jenis_bahan = 'Lauk Pauk'`;
    console.log(sql);
    pool.getConnection(function (err, connection) {
        connection.query(sql, function (error, results, fields) {
            console.log(results)
            connection.release();
            if (error) throw error;

            if (results == "") {
                return res.json("gagal");
            } else {

                return res.json(results);
            }
        });
    });
})


app.post("/pangan1", (req, res) => {
    var sql = `SELECT * FROM pangan WHERE jenis_bahan = 'Sayuran'`;
    console.log(sql);
    pool.getConnection(function (err, connection) {
        connection.query(sql, function (error, results, fields) {
            console.log(results)
            connection.release();
            if (error) throw error;

            if (results == "") {
                return res.json("gagal");
            } else {

                return res.json(results);
            }
        });
    });
})

app.post("/pangan2", (req, res) => {
    var sql = `SELECT * FROM pangan WHERE jenis_bahan = 'Buah'`;
    console.log(sql);
    pool.getConnection(function (err, connection) {
        connection.query(sql, function (error, results, fields) {
            console.log(results)
            connection.release();
            if (error) throw error;

            if (results == "") {
                return res.json("gagal");
            } else {

                return res.json(results);
            }
        });
    });
})

app.post("/pangan3", (req, res) => {
    var sql = `SELECT * FROM pangan WHERE jenis_bahan = 'Sembako'`;
    console.log(sql);
    pool.getConnection(function (err, connection) {
        connection.query(sql, function (error, results, fields) {
            console.log(results)
            connection.release();
            if (error) throw error;

            if (results == "") {
                return res.json("gagal");
            } else {

                return res.json(results);
            }
        });
    });
})

app.post("/pangan4", (req, res) => {
    var sql = `SELECT * FROM pangan WHERE jenis_bahan = 'Bumbu'`;
    console.log(sql);
    pool.getConnection(function (err, connection) {
        connection.query(sql, function (error, results, fields) {
            console.log(results)
            connection.release();
            if (error) throw error;

            if (results == "") {
                return res.json("gagal");
            } else {

                return res.json(results);
            }
        });
    });
})

app.post("/alamat", (req, res) => {
    var sql = `SELECT * FROM person WHERE alamat`;
    console.log(sql);
    pool.getConnection(function (err, connection) {
        connection.query(sql, function (error, results, fields) {
            console.log(results)
            connection.release();
            if (error) throw error;

            if (results == "") {
                return res.json("gagal");
            } else {

                return res.json(results);
            }
        });
    });
})

app.post("/detail", (req, res) => {
    console.log(req.body);
    var sql = `INSERT INTO person (detail_alamat) VALUES ('${req.body.detail_alamat}')`;
    console.log(sql);
    pool.getConnection(function (err, connection) {
        connection.query(sql, function (error, results, fields) {
            connection.release();
            if (error) throw error;
            console.log(results.length);
            if (results == "") {
                return res.json("gagal")
            } else {
                return res.json("berhasil");
            }
        });
    });
})

// app.post("/keranjang", (req, res) => {
//     console.log(req.body);
//     var sql = `INSERT INTO pembelian (nama_pembeli, nama_bahan, jumlah_bahan, total_harga) VALUES ('${req.body.nama_pembelian}', '${req.body.nama_bahan}', '${req.body.jumlah_bahan}', '${req.body.total_harga}')`;
//     console.log(sql);
//     pool.getConnection(function (err, connection) {
//         connection.query(sql, function (error, results, fields) {
//             connection.release();
//             if (error) throw error;
//             console.log(results.length);
//             if (results == "") {
//                 return res.json("gagal")
//             } else {
//                 return res.json("berhasil");
//             }
//         });
//     });
// })

app.post("/admin", (req, res) => {
    var pass = md5(req.body.password);
    console.log(md5(pass));
    var sql = `SELECT * FROM user WHERE username = '${req.body.username}' AND password = '${pass}' LIMIT 1`;
    console.log(sql);
    pool.getConnection(function (err, connection) {
        connection.query(sql, function (error, results, fields) {
            console.log(results)
            connection.release();
            if (error) throw error;

            if (results == "") {
                return res.json("gagal");
            } else {

                return res.json(results);
            }
        });
    });
})

app.get("/pembelians", (req, res) => {
    var sql = 'SELECT * FROM pembelian WHERE status = 0';
    console.log(sql);
    pool.getConnection(function (err, connection) {
        connection.query(sql, function (error, results, fields) {
            console.log(results)
            connection.release();
            if (error) throw error;

            if (results == "") {
                return res.json("gagal");
            } else {

                return res.json(results);
            }
        });
    });
})

app.post("/details", (req, res) => {
    var sql = `SELECT * FROM pembelian WHERE id = ${req.body.id}`;
    console.log(sql);
    pool.getConnection(function (err, connection) {
        connection.query(sql, function (error, results, fields) {
            console.log(results)
            connection.release();
            if (error) throw error;

            if (results == "") {
                return res.json("gagal");
            } else {

                return res.json(results);
            }
        });
    });
})

app.post("/edit", (req, res) => {
    var sql = `UPDATE pembelian SET status= 1 WHERE id=${req.body.id}`;
    console.log(sql);
    pool.getConnection(function (err, connection) {
        connection.query(sql, function (error, results, fields) {
            console.log(results)
            connection.release();
            if (error) throw error;

            if (results == "") {
                return res.json("gagal");
            } else {

                return res.json(results);
            }
        });
    });
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
