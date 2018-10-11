var Messages = {


  _data: {},

  items: function() {
    return _.chain(Object.values(Messages._data));
  },

  add: function(message, callback = ()=>{}) {
    Messages._data[message.id] = message;
    callback(Messages.items());
  },

  update: function(messages, callback = ()=>{}) {
    console.log('_data: ', Messages._data);
    var length = Object.keys(Messages._data).length;

    for (let message of messages) {
      Messages._data[message.id] = Messages._conform(message);
    }

    // only invoke the callback if something changed
    if (Object.keys(Messages._data).length !== length) {
      callback(Messages.items());
    }
  },

  _conform: function(message) {
    // ensure each message object conforms to expected shape
    message.text = message.contents || '';
    message.username = message.username || '';
    message.roomname = message.roomname || '';
    return message;
  }
  
};