var db = require('../db');
var mysql = require('mysql');
var _ = require('lodash');

var insertHelper = function ( table, obj, callback ) {
  _.each(obj, function(val) {
    val = db.escape(val);
  });
  var sql = 'INSERT INTO ' + table + ' SET ?';

  db.query(sql, obj, callback);
};

var selectHelper = function ( table, columns, field, args, callback ) {
  var sql = 'SELECT ?? FROM ??';
  var insert = [columns, table];
  columns = columns || '*';  // 'ABDUL'  '/'ABDUL/''
  field = field || 'id';
  if (args) {
    sql = sql + ' WHERE ?? = ?';
    insert.push(field, args);
  }
  sql = mysql.format(sql, insert);
  console.log(sql); //TODO: REMOVE

  var select = {
    sql: sql,
    timeout: 20000
  };
  db.query(select, callback);
  //console.log(result);
  //return result;
};

var queryReturn = function (err, result, el) {
  if (err) throw err;
  if (el) return result[el];
  return result;
};

var queryAssign = function (err, result, el, val) {
  if (err) throw err;
  if (el) val = result[el];
  val = result;
};

module.exports = {
  messages: {
    get: function (columns, field, args, callback) {
      selectHelper('messages', columns, field, args, callback);
    },
    post: function (message, roomname, username, callback ) { // maybe we can pull user_id and
      var roomid;
      roomid = selectHelper('rooms', 'id', 'roomname', roomname, function (err, result) {
        if (err) throw err;//{
          // console.log("creating Roomname");
          // console.log(exports.rooms);
          // that.rooms.post( roomname, queryCallback(err, result, 'insertId'));
        // }
         //  // add error handler to add room in case it doesn't exist
        console.log(result);
       roomid = result.id;

              console.log("roomid:  " + roomid);
      // do you we get error or empty result?

      var obj = {
        'room_id': 1,
        text: message,
        'user_id': 1  // TEMPRORARY

        // 'user_id': selectHelper('users', 'id', 'username', db.escape(username), function (err, result) {
        //   if (err) { // if first error, it will attempt to add user name below
        //     console.log("creating username");
        //     exports.users.post( username, function (err, result) {
        //       if (err) throw err;
        //       return result.insertId; // must add insertId to return id only
        //     });
        //   } //
        //   return result;
        // })
      };
      insertHelper( 'messages', obj , callback );
      });
      // if err
      //    create room (or user)
      //    run insert again!
      //

    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function ( columns, field, args, callback ) {
      selectHelper('users', columns, field, args, callback);
    },
    post: function ( username, callback ) {
      var obj = { username: username };
      insertHelper( 'users', obj , callback );
    }
  },


  rooms: {
    // Ditto as above.
    get: function ( columns, field, args, callback ) {
      selectHelper('rooms', columns, field, args, callback);
    },
    post: function ( roomname, callback ) {
      var obj = { roomname: roomname };
      insertHelper( 'rooms', obj , callback );
    }
  }
};
var that = module.exports;
