var controllers = require('./controllers');
var router = require('express').Router();
var _ = require('underscore');

for (var route in controllers) {
  router.route("/" + route)
    .get(controllers[route].get)
    .post(controllers[route].post);
}


// var app = express();
// var storage = [
//   { roomname: 'lobby', username: 'abcd', text: 'How are you?', createdAt: 'Tue, 27 Oct 2015 14:54:07 GMT'},
//   { roomname: 'lobby', username: 'xyz', text: 'Great!', createdAt: 'Tue, 27 Oct 2015 14:54:13 GMT'},
//   { roomname: 'room1', username: 'xyz', text: 'How are you?', createdAt: 'Tue, 27 Oct 2015 14:54:18 GMT'},
//   { roomname: 'room1', username: 'abcd', text: 'Great!', createdAt: 'Tue, 27 Oct 2015 14:54:22 GMT'},
//   { roomname: 'room32', username: 'xyz', text: 'How are you?', createdAt: 'Tue, 27 Oct 2015 14:54:28 GMT'},
//   { roomname: 'room32', username: 'abcd', text: 'Tired of you asking!', createdAt: 'Tue, 27 Oct 2015 14:54:35 GMT'}
// ];



// var port = 3000;

// var ip = "127.0.0.1";

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(morgan('combined'));


// var server = app.listen(port, ip, function () {
//   console.log("Server is listening at http://%s:%s", ip, port);
// });


// app.get('/classes/messages' , function (req, res, next) {
//   res.send({results: storage});
//   res.end();
//   next();
// });

// app.route('/classes/:room')
//   .get(function(req, res) {
//     var filter = _.filter(storage, function(val){
//       if(val.roomname === req.params.room) {
//         return val;
//       }
//     });
//    res.json({results: filter});
//    res.end();
//   })
//   .post(function (req, res, next) {
//     var data = req.body;
//     if (!data.hasOwnProperty('username') || !data.hasOwnProperty('message') || Object.keys(data).length !== 2) { //number of keys may be 3
//       console.error('Invalid username/message text or properties');
//     }
//     data.createdAt = new Date();
//     data.roomname = req.params.room;
//     storage.push(data);
//     res.status(201);
//     res.end();
//     next();
//   });

// app.post('/send', function (req, res, next) {
//   var data = req.body;
//   if (!data.hasOwnProperty('username') || !data.hasOwnProperty('message') || Object.keys(data).length > 3) { //number of keys may be 3
//     console.error('Invalid username/message text or properties');
//   }
//   data.roomname = data.roomname || 'lobby';
//   data.createdAt = new Date();
//   storage.push(data);
//   //res.send("Success")
//   res.status(201);
//   res.end();
//   next();
//   //console.log(req.body);
// });






module.exports = router;

