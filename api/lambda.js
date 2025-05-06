const serverlessExpress = require('@vendia/serverless-express');
const app = require('./app'); // This is your existing Express app

exports.handler = serverlessExpress({ app });