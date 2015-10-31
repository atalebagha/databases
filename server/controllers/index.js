var models = require('../models');
var bluebird = require('bluebird');
// var models = Promise.promisify(require("../models"))



module.exports = {
  '/classes/messages': {
    messages: {
      get: function (req, res) {
        models.messages.get(['message', 'created', 'user_id'], '*', '', function (err, result) {
          res.json(result);
        })
      }, // a function which handles a get request for all messages
      post: function (req, res) {} // a function which handles posting a message to the database
    },

    users: {
      // Ditto as above
      get: function (req, res) {},
      post: function (req, res) {}
    }
  }
};

sendResponse
