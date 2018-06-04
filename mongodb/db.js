'use strict'

import mongoose from 'mongoose'
import chalk from 'chalk'
import configLite from 'config-lite'

const config = configLite(__dirname);

mongoose.connect(config.dbUrl)

const db = mongoose.connection;

db.once('open', () => {
  console.log(
    chalk.green('链接数据库成功')
  )
})

db.on('error', function (error) {
  console.log(
    chalk.red('Error in MongoDB connection: ' + error)
  );
})

db.on('close', function () {
  console.log(
    chalk.red('数据库断开链接，重新链接...')
  );
  mongoose.connect(config.dbUrl, {
    server: {
      auto_reconnect: true
    }
  })
})
