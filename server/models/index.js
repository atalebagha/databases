var db = require('../db');
var mysql = require('mysql');

var insertHelper = function ( table, obj, callback ) {
  Object.keys(obj).forEach(function(key) {
    obj[key] = db.escape(obj[key]);
  });
  var sql = "INSERT INTO " + table + " SET ?";

  db.query(sql, obj, callback);
};

var selectHelper = function ( table, columns, field, args, callback ) {
  columns = columns || "*";
  field = field || "id";
  args = ( args ? args : '' );
  // var where = ( args ? "WHERE " + field + " = ?" : "" );
  var sql = "SELECT ?? FROM ?? WHERE ?? = ? ORDER BY ??";
  var inserts = ( args ? [columns, table, field, args] : [columns, table] );
  sql = mysql.format(sql, inserts);

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
        room_id: selectHelper('rooms', 'id', 'roomname', db.escape(roomname), function (err, result) {
          if (err) throw err;
          return result;
        }),
        message: db.escape(username),
        user_id: selectHelper('users', 'id', 'username', db.escape(username), function (err, result) {
          if (err) throw err;
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
      var obj = { username: db.escape(username) };
      insertHelper( 'users', obj , callback );
    }
  },


  rooms: {
    // Ditto as above.
    get: function ( columns, field, args, callback ) {
      selectHelper('rooms', columns, field, args, callback);
    },
    post: function ( roomname, callback ) {
      var obj = { roomname: db.escape(roomname) };
      insertHelper( 'rooms', obj , callback );
    }
  }
};
