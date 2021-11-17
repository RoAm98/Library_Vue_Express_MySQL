var express = require('express');
var router = express.Router();
const formidable = require('formidable');
let multiparty = require('multiparty');
var conn = require('../dbconn/connect')

/* GET users listing. */
router.get('/addcustomers', function(req, res, next) {
    res.render('addcustomer');
});

router.get('/listcustomers', function(req, res, next) {
    res.render('custlist');
});

router.post('/savecustomers', function(req, res, next){
    //This section parses the form using the module multiparty
    var form = req.body;
    console.log(form)
    var sqlCmd = 'INSERT INTO customers SET ?'
        conn.query(sqlCmd, form, (error, result) => {
            if (error) throw error;
            res.end();
        });
})

router.get('/listcusts', function(req, res){
    let cmd = 'SELECT * FROM customers';
    conn.query(cmd, (err, result) => {
        if (err) throw err;
        res.writeHead(200, { 'content-type': 'json' });
        res.write(JSON.stringify(result));
        res.end();
      });
})

router.put('/updatecustomers/:id', function(req, res, next){
    let id = req.params.id;
    let form = req.body;
    console.log(id);
     var sqlCmd = 'UPDATE customers SET  ? WHERE cust_id = ?'
         conn.query(sqlCmd, [form, id], (error, result) => {
             if (error) throw error;
             res.end();
         });
})

router.delete('/deletecustomers/:id', function(req, res){
    let id = req.params.id;
    var sqlCmd = 'DELETE FROM customers WHERE cust_id = ?'
         conn.query(sqlCmd, id, (error, result) => {
             if (error) throw error;
             res.end();
         });
})


module.exports = router;