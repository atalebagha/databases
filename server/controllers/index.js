var models = require('../models');
var bluebird = require('bluebird');
// var models = Promise.promisify(require("../models"))



module.exports = {
  messages : {
    get: function (req, res) {
      models.messages.get(function (results)  {
        // console.log("Hi I am models get controller and I am running");
        // console.log(results);
        res.json(results);
      });

      // models.messages.get('text', '', '', function (err, result) {
      //   if (err) throw err;
      //   //console.log(result);
      //   res.json(result);
      // });
    }, // a function which handles a get request for all messages

    post: function (req, res) {
      console.log(req.body);
      // var roomname = req.body['roomname'];
      // var text = req.body['text'];
      // var username = req.body['username'];
      var params = [req.body['text'], req.body['username'], req.body['roomname']];

      models.messages.post(params, function (err, results) {
        if (err) throw err;
        console.log(results);
        res.sendStatus(201);
      });


      // phony data placed below.  data will be received as property of req
      // models.messages.post('Hi there!', 'Lobby', 'Abdul', function (err, result) {
      //   if (err) throw err;
      //   res.status(201);
      //   res.end("Success");
      // });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {}
  }
};

