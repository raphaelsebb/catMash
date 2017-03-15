var mysql   = require('mysql');

/**
 * Connect to database
 */
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database : "CatMash_db"
});

connection.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});

/**
 * Get list of available cats
 */
module.exports.read = function (callback) {
  var datas = [];
  var query = 'SELECT * FROM Cat ORDER BY votes DESC';

  connection.query(query, function(err, rows, fields) {
    if (!err){
      datas = rows;
    }
    else{
      console.log('Error while performing Query.');
      callback && callback(err);
    }
    callback && callback(null, datas);
  });
}

/**
 * Get selected cat
 */
module.exports.selectCat = function (id, callback) {
  var datas = [];
  var query = 'SELECT * FROM Cat WHERE id = "' + id + '"';

  connection.query(query, function(err, rows, fields) {
    if (!err){
      datas = rows;
      console.log('Selected cat : ' + rows);
    }
    else{
      console.log('Error while performing Query.');
      callback && callback(err);
    }

    callback && callback(null, datas);
  });
}

/**
 * Vote for one cat selected
 */
module.exports.vote = function (id, callback) {
  var datas = [];
  var query = 'UPDATE Cat SET votes = votes + 1 WHERE id = "' + id + '"';

  connection.query(query, function(err, rows, fields) {
    if (!err){
      console.log('+1 for : ' + id);
    }
    else{
      console.log('Error while performing Query.');
      callback && callback(err);
    }

    callback && callback(null, datas);
  });
}
