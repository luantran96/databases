var db = require('../db');
var Promise = require('bluebird');


module.exports = {
  messages: {
    get: function (callback) {
           
      var data;
      
      db.con.connect((err) => {
    
        var sql = 'SELECT * FROM messages';
        db.con.query(sql, (err, result) => {
          if (err) {
            reject(err);
          }
          data = JSON.stringify(result);
          callback(null, data);       
        });
                  
      });        
      
    }, // a function which produces all the messages
    post: function (username, roomname, message) {
 
 
      var userSQL = 'SELECT id from users WHERE username = ?';
      var roomSQL = 'SELECT id from rooms WHERE roomname = ?';
      var testSQL = 'SELECT * from users';
      var userID;
      var roomID;
             
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
              userID = result[0].id;            
            });        
          //if username exists, get userid         
          } else {
          //console.log('result in username query:', result);

            userID = result[0].id;      
          } 
          
          
          var msgSQL = `INSERT INTO messages (contents, roomname, userID) VALUES(${db.con.escape(message)},${db.con.escape(roomname)},${db.con.escape(userID)});`;
                 
          db.con.query(msgSQL, function (err, result) {
            if (err) {
              console.log(err);
            }
            
            console.log(msgSQL);
            console.log('Message inserted!');
          });          
           
        });
                     
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

