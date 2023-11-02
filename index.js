import server from './api/server.js'

const port = 2000

server.listen(port, () => console.log(`listening on port ${port}`))