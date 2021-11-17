var express = require('express');
var router = express.Router();
const formidable = require('formidable');
let multiparty = require('multiparty');
var conn = require('../dbconn/connect');


router.post('/savebook', function(req, res, next){
     //This section saves the image in the folder public -> images using the module formidable
     const input = new formidable.IncomingForm(); 
     input.uploadDir = 'images'; 
     input.parse(req); 
     input.on('fileBegin', (field, file) => {
         file.path = "public/images/" + file.name; 
     });
     //This section parses the form using the module multiparty
     var formData = new multiparty.Form();
     formData.parse(req, (error, fields, files) => { //The callback function returns error if any, fields(properties), and files loaded
         var rowData = {
            title: fields.title,
            author: fields.author,
            genre: fields.genre,
            cover: files.image[0].originalFilename
         };
         var sqlCmd = 'INSERT INTO books SET  ?'
         conn.query(sqlCmd, [rowData], (error, result) => {
             if (error) throw error;
             res.end();
         });
     });
})

router.put('/updatebook/:id', function(req, res, next){
    let id = req.params.id;
    console.log(id);
     //This section saves the image in the folder public -> images using the module formidable
     const input = new formidable.IncomingForm(); 
     input.uploadDir = 'images'; 
     input.parse(req); 
     input.on('fileBegin', (field, file) => {
         file.path = "public/images/" + file.name; 
     });
     //This section parses the form using the module multiparty
     var formData = new multiparty.Form();
     formData.parse(req, (error, fields, files) => { //The callback function returns error if any, fields(properties), and files loaded
         var rowData = {
            title: fields.title,
            author: fields.author,
            genre: fields.genre,
            cover: files.image[0].originalFilename
         };
         var sqlCmd = 'UPDATE books SET  ? WHERE book_id = ?'
         conn.query(sqlCmd, [rowData, id], (error, result) => {
             if (error) throw error;
             res.end();
         });
     });
})



router.get('/listbooks', function(req, res){
    let cmd = 'SELECT * FROM books';
    conn.query(cmd, (err, result) => {
        if (err) throw err;
        res.writeHead(200, { 'content-type': 'json' });
        res.write(JSON.stringify(result));
        res.end();
      });
})

router.delete('/deletebooks/:id', function(req, res){
    let id = req.params.id;
    var sqlCmd = 'DELETE FROM books WHERE book_id = ?'
         conn.query(sqlCmd, id, (error, result) => {
             if (error) throw error;
             res.end();
         });
})
module.exports = router;