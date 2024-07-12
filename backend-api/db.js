const dotenv = require("dotenv")
dotenv.config()
const { MongoClient } = require("mongodb")

// const conectionString= process.env.CONNECTIONSTRING
const conectionString= 'mongodb://root:root@127.0.0.1:27017'

const client = new MongoClient(conectionString)

const port = process.env.PORT || 4000
async function start() {
  await client.connect()
  module.exports = client
  const app = require("./app")
  console.log('listenning to port ', port)
  app.listen(port)
}

start()
