const http = require('http')
const app = require('./src/app')


const port = process.env.PORT || 3000 // server port

const server = http.createServer(app)


server.listen(port, () => console.info(`Server has started on PORT ${port}`))