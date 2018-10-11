var models = require('../models');

module.exports = {
  messages: {
    // a function which handles a get request for all messages
    get: function (req, res) {
      var data = models.messages.get((err, data) => {
        res.send(data);           
      });
      
    }, 
    // a function which handles posting a message to the database
    post: function (req, res) {
      const {username, roomname, text} = req.body;
      models.messages.post(username, roomname, text);
      res.send();
    } 
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      var data = models.users.get((err, data) => {
        res.send(data);
      });
      
    },
    post: function (req, res) {
      const {username} = req.body; 
      models.users.post(username);
      res.send();
    }
  }
};

