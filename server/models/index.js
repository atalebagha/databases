var db = require('../db');
var mysql = require('mysql');
var _ = require('lodash');

var insertHelper = function ( table, obj, callback ) {
  _.each(obj, function(val) {
    val = db.escape(val);
  });
  var sql = "INSERT INTO " + table + " SET ??";

  db.query(sql, obj, callback);
};

var selectHelper = function ( table, columns, field, args, callback ) {
  var sql = "SELECT ?? FROM ??" // WHERE ?? = ? ORDER BY ??;
  columns = columns || "*";
  field = field || "id";
  sql = args ? sql + " WHERE ?? = ?" : sql;
  var inserts = ( args ? [columns, table, field, args] : [columns, table] );
  sql = mysql.format(sql, inserts);
  console.log(sql);

  var select = {
    sql: sql,
    timeout: 20000
  };
  db.query(select, callback);
};



module.exports = {
  messages: {
    get: function (columns, field, args, callback) {
      selectHelper('messages', columns, field, args, callback);
    },
    post: function (message, roomname, username, callback ) { // maybe we can pull user_id and
      var obj = {
        'room_id': selectHelper('rooms', 'id', 'roomname', db.escape(roomname), function (err, result) {
          if (err) throw err;// if first error, it will attempt to add user name below
          if (!result) {
            console.log("creating Roomname");
            exports.rooms.post( roomname, function (err, result) {
              if (err) throw err;
              return result.insertId; // must add insertId to return ID only
            });
          }
           //  // add error handler to add room in case it doesn't exist
          return result;
        }),

        text: message,

        'user_id': selectHelper('users', 'id', 'username', db.escape(username), function (err, result) {
          if (err) { // if first error, it will attempt to add user name below
            console.log("creating username");
            exports.users.post( username, function (err, result) {
              if (err) throw err;
              return result.insertId; // must add insertId to return id only
            });
          } //
          return result;
        }) };
      insertHelper( 'messages', obj , callback );
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
