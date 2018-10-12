var models = require('../models');
var Sequelize = require('sequelize');
var db = require('../db/index');
var Promise = require('bluebird');


var Message = db.con.define('messages', {
  message: Sequelize.STRING,
  roomname: Sequelize.STRING
});

var Users = db.con.define('users', {
  username: Sequelize.STRING 
}); 

Message.belongsTo(Users);
Users.hasMany(Message);

Message.sync();
Users.sync();

// Users.findAll({where: {id: message.userId} }).then( (username) => {
//   console.log('username from findAll: ', username);
//   message.username = username;
// });
            
      
module.exports = {
  messages: {
    // a function which handles a get request for all messages
    get: function (req, res) {
            
      Message.findAll({include: [Users] })
        .then( (messages) => {  
          res.json(messages);      
          
          // messages.forEach( (message) => { 
            
                    
          //   // promises.push(Users.findById(message.dataValues.userId)
          //   //   // .then ( (username) => {
          //   //   //   message.dataValues.username = username.dataValues.username;
          //   //   //   console.log('message from findById:', message.dataValues);
          //   //   // })
          //   // );             
              
              
          // });
          
          // Promise.all(promises)
          //   .then((results) => {
          //     //console.log('result from promiseall', results);
              
          //     messages.forEach( (message) => {              
          //       message.dataValues.username = results[0].dataValues.username;                               
          //     });
              
          //     //console.log('messages in PromiseAll: ', messages[0].dataValues);
          //     res.send(JSON.stringify(messages[0].dataValues ));
          //   });
          // console.log('messages are:', messages.dataValues);    
          //res.json(messages); 
          
          
          
        });      
    }, 
    // a function which handles posting a message to the database
    post: function (req, res) {
     
      const {username, roomname, message} = req.body;
     
      Users.findOrCreate({where: {username: username}}).then((result) =>{
        
        var userId = result[0].dataValues.id;
   
        Message.create({
          roomname,
          message,
          userId
        });
        
        res.send();
      });
    } 
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      // var data = models.users.get((err, data) => {
      //   res.send(data);
      // });
      User.findAll()
        .then((users) => {
          res.json(users);
        });
    },
    post: function (req, res) {
      const {username} = req.body; 
      // models.users.post(username);
      res.send();
    }
  }
};

