var db = require('../db');

module.exports = {
  messages: {
    // a function which produces all the messages
    get: function (callback) {
           
      var data = [];
      db.con.connect((err) => { 
        var sql = 'SELECT * FROM messages';
        db.con.query(sql, (err, result) => {
          if (err) {
            throw (err);
          }
          var idArr = [];
          result.forEach((el) => {
            idArr.push(el.userId);
          });
          db.con.query('SELECT * FROM users WHERE id IN (?)', [idArr], (err, idResult) => {
            result.map((el) => {
              idResult.forEach((idEl) => {
                if (el.userId === idEl.id) {
                  el.username = idEl.username;
                }
              });            
            });
            
            data = JSON.stringify(result);
            callback(null, data);             
            
          });
        });           
      });        
    }, 
    // a function which can be used to insert a message into the database
    post: function (username, roomname, message) {
 
      var userSQL = 'SELECT id from users WHERE username = ?';
      var roomSQL = 'SELECT id from rooms WHERE roomname = ?';
      var testSQL = 'SELECT * from users';
      var userId;
      var roomId;
             
      db.con.connect((err) => {               
        //check if username exists in db
        db.con.query(userSQL, [username], function (err, result) {
          if (err) {
            console.log(err);
          }
          //if not then insert username into users table  
          if (result.length === 0) {    
            var insertSQL = 'INSERT INTO users (username) VALUES(?)';
            db.con.query(insertSQL, [username], function (err, result) {     
              if ( err ) {
                console.log(err);
              }       
              console.log(`Insert ${username} complete!`);
            });  
            //get new userid
            db.con.query(userSQL, [username], function (err, result) {     
              if (err) {
                throw (err);
              }       
              userId = result[0].id;            
            });        
          //if username exists, get userid         
          } else {
          //console.log('result in username query:', result);
            userId = result[0].id;      
          } 
          
          var msgSQL = `INSERT INTO messages (contents, roomname, userId) VALUES(${db.con.escape(message)},${db.con.escape(roomname)},${db.con.escape(userId)});`;
                 
          db.con.query(msgSQL, function (err, result) {
            if (err) {
              console.log(err);
            }
            console.log('Message inserted!');
          });             
        });
      });
    } 
  },

  users: {
    // Ditto as above.
    get: function (callback) {
      var data;
      
      db.con.connect((err) => {
        var sql = 'SELECT * FROM users';
        db.con.query(sql, (err, result) => {
          if (err) {
            reject(err);
          }
          data = JSON.stringify(result);
          callback(null, data);       
        });
                  
      });  
    },
    post: function (username) {
      db.con.connect((err) => {       
        var sql = 'INSERT INTO users (username) VALUES(?)';
        db.con.query(sql, [username], function (err, result) {
          console.log(`${username} is inserted!`);
        });
        
      });
    }
  }
};

