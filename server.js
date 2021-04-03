const express = require('express')
const http = require('http')
const webpack = require('webpack')
const cookieParser = require('cookie-parser')
const middleware = require('webpack-dev-middleware')
const compiler = webpack(require('./webpack.config'))
const { cookieSecret, PORT, cookieName, gameCookieName } = require('./config')
const { parseSignedCookies } = require('./util/signedCookies')
const { jwtVerify } = require('./server/db/jwt')
const UserSocket = require('./server/sockets/user')
const sslRedirect = require('./util/general').sslRedirect

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

app.use('/api', require('./server/routes'))

app.get('*', (req, res) => {
    res.render('index')
})

const setUserInfo = async (socket) => {
    try {
        const gameRoomCookie = parseSignedCookies(socket.handshake.headers.cookie, cookieSecret, gameCookieName)

        socket.info = {
            ...socket.info,
            gameRoom: gameRoomCookie,
        }

        const userInfoCookie = parseSignedCookies(socket.handshake.headers.cookie, cookieSecret, cookieName)
        const userInfoJson = await jwtVerify(userInfoCookie).catch(() => ({}))

        socket.info = {
            ...socket.info,
            username: userInfoJson.username,
            color: userInfoJson.color,
            moderator: userInfoJson.moderator,
        }
    } catch (e) {
        console.error('IO Middleware: ', e)
    } finally {
        // socket.emit('me', socket.info)
    }
}

const server = http.createServer(app)
const io = require('socket.io')(server)

io.use(async (socket, next) => {
    // await setUserInfo(socket)
    next()
})

const getUsers = () => {
    const users = []
    for (let [id, socket] of io.of('/').sockets) {
        users.push({
            userId: id,
            username: socket?.info?.username,
            color: socket?.info?.color,
        })
    }
    return users
}

const buzzer = {
    hasWinner: false,
}

io.on('connection', (socket) => {
    // const eventHandlers = {
    //     user: new UserSocket(io, socket),
    // }
    //
    // for (let category in eventHandlers) {
    //     const handler = eventHandlers[category].handler
    //     for (let event in handler) {
    //         socket.on(event, handler[event])
    //     }
    // }

    socket.on('action', (action) => {
        console.log({ action })
    })

    // socket.onAny((event, ...args) => {
    //     console.log('Logger: ', event, args)
    // })

    // socket.on('connect', () => {
    //     console.log(socket.info)
    // })

    //
    // socket.on('join', () => {
    //     socket.join(`gameRoom${socket.info.gameRoom}`)
    // })
    //
    // socket.on('userNameUpdate', () => {
    //     console.log(socket.info)
    //     console.log(socket.handshake.headers.cookie)
    // })
    //
    // socket.on('buzzer', () => {
    //     if (!buzzer.hasWinner) {
    //         buzzer.hasWinner = true
    //         io.emit('winner', socket.id)
    //     }
    // })
    //
    // socket.on('set_moderator', () => {})
    //
    // socket.on('logout', () => {
    //     console.log('io logout')
    // })
    //
    // socket.on('reset_buzzer', () => {
    //     buzzer.hasWinner = false
    //     io.emit('winner', null)
    // })

    socket.on('disconnect', () => {
        io.emit('users', getUsers())
        console.log('user disconnected')
    })
})

server.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`)
})
