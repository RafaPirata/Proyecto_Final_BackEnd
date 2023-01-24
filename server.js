
const app = require('./app') //express()
const logger = require('./utils/logger')
// const PORT = process.env.PORT || 3000
const PORT = process.argv[2] || 8000


const initSocket = require('./utils/initSocket')

const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
//------------------------------------------------------------------------
initSocket(io)
//--------------------------------------------------


httpServer.listen(PORT, () => {
    logger.info(`SERVER listen on port ${PORT}`)
})


module.exports = app
