var express = require('express');
var router = express.Router();
var conn = require('../dbconn/connect')

router.get('/rentlist', function (req, res, next) {
    res.render('rentlist');
})

router.post('/rentbook', function (req, res, next) {
    var form = req.body;
    console.log(form)
    var sqlCmd = 'INSERT INTO rents SET ?'
    conn.query(sqlCmd, form, (error, result) => {
        if (error) throw error;
        res.end();
    });
})

router.get('/listrents', function (req, res) {
    let cmd = "SELECT b.book_id, c.cust_id, r.rent_id, r.rentdate, r.returndate, concat(c.fname,' ',c.lname) AS fullname, b.title FROM rents r INNER JOIN customers c ON r.cust_id = c.cust_id INNER JOIN books b ON r.book_id = b.book_id";
    conn.query(cmd, (err, result) => {
        if (err) throw err;
        res.writeHead(200, { 'content-type': 'json' });
        res.write(JSON.stringify(result));
        console.log(result);
        res.end();
    });
})

router.put('/updaterents/:id', function(req, res, next){
    let id = req.params.id;
    let form = req.body;
    console.log(id);
     var sqlCmd = 'UPDATE rents SET  ? WHERE rent_id = ?'
         conn.query(sqlCmd, [form, id], (error, result) => {
             if (error) throw error;
             res.end();
         });
})

router.delete('/deleterents/:id', function (req, res) {
    let id = req.params.id;
    var sqlCmd = 'DELETE FROM rents WHERE rent_id = ?'
    conn.query(sqlCmd, id, (error, result) => {
        if (error) throw error;
        res.end();
    });
})

module.exports = router;