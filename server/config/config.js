require('dotenv').config();

module.exports = {
  development: {
    port:process.env.RDS_PORT,
    username: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.RDS_HOST,
    dialect: 'mysql'
  },
  test: {
    port:process.env.RDS_PORT,
    username: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.RDS_HOST,
    dialect: 'mysql'
  },
  production: {
    port:process.env.RDS_PORT,
    username: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.RDS_HOST,
    dialect: 'mysql'
  }
};
