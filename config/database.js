const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      port : 3306,
      user : 'rama',
      password : '1',
      database : 'hpai'
    },
});

module.exports = knex;