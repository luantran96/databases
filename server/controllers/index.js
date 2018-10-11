var models = require('../models');
var db = require('../db/index');



module.exports = {
  messages: {
    get: function (req, res) {
      

      // var data = models.messages.get();
      // console.log('data: ',data);
      // 
      
      var data;
      
      db.con.connect((err) => {
             
        var sql = 'SELECT * FROM messages';
        db.con.query(sql, function (err, result) {
          
          
          
          data = JSON.stringify(result);
          console.log(`data is: `, data);
          res.send(data);
          
          
        });
        
      }); 
      
      
      
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      const {username, roomname, message} = req.body;

      models.messages.post(username, roomname, message);
      
      res.send();
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      
      console.log('IN HERE YO!');
      
    },
    post: function (req, res) {
      const {username} = req.body;
      
      db.con.connect((err) => {       
        var sql = 'INSERT INTO users (username) VALUES(?)';
        db.con.query(sql, [username], function (err, result) {
          console.log(`${username} is inserted!`);
        });
        
      });
      
      res.send();
    }
  }
};

