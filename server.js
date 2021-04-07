const express = require('express')
const http = require('http')
const webpack = require('webpack')
const cookieParser = require('cookie-parser')
const middleware = require('webpack-dev-middleware')
const compiler = webpack(require('./webpack.config'))
const { cookieSecret, PORT } = require('./config')
const sslRedirect = require('./util/general').sslRedirect
const setLocals = require('./server/routes/locals')
const serialize = require('serialize-javascript')
const db = require('./models')

const isDev = process.env.NODE_ENV === 'development'

const app = express()

app.set('view engine', 'pug')
app.set('views', 'template')

app.use(sslRedirect())
app.use(cookieParser(cookieSecret))
app.use(express.json())
app.use(express.static('dist'))

if (isDev) {
    app.use(middleware(compiler))
}

app.use(setLocals)
app.use('/api', require('./server/routes'))

const { Game, User } = db
app.get('*', async (req, res) => {
    const { game: gameId, user: userId } = res.locals
    const initialState = { game: {} }

    if (gameId !== undefined) {
        const game = await Game.findOne({ where: { id: gameId } })

        initialState.game.gameId = game.id
        initialState.game.gamePassword = game.game_password
    }

    if (userId !== undefined) {
        const user = await User.findOne({ where: { id: userId } })

        initialState.game.username = user.username
        initialState.game.color = user.color
        initialState.game.userId = user.id
    }

    res.render('index', { initialState: serialize(initialState) })
})

const getRoomsUsers = (io, gameId) => {
    const room = io.sockets.adapter.rooms.get(gameId)
    const users = []
    for (const clientId of room) {
        users.push(io.sockets.sockets.get(clientId).info)
    }

    return users
}

const server = http.createServer(app)
const io = require('socket.io')(server)

io.on('connection', (socket) => {
    socket.info = {}

    socket.on('action', (action) => {
        console.log(action)
        switch (action.type) {
            case 'server/change_info': {
                socket.info.user = action.payload
                const users = getRoomsUsers(io, action.payload.gameId)

                io.in(action.payload.gameId).emit('action', { type: 'io/set_users', payload: { users } })
                break
            }
            case 'server/change_room': {
                socket.info.user = action.payload
                socket.join(action.payload.gameId)
                const users = getRoomsUsers(io, action.payload.gameId)

                io.in(action.payload.gameId).emit('action', { type: 'io/set_users', payload: { users } })
                break
            }
            default:
                return
        }
    })

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
})

server.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`)
})
