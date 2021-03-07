const express = require('express')
const http = require('http')
const webpack = require('webpack')
const cookieParser = require('cookie-parser')
const middleware = require('webpack-dev-middleware')
const compiler = webpack(require('./webpack.config'))
const { cookieSecret, PORT, cookieName, gameCookieName } = require('./config')
// const cookie = require('cookie')
const { parseSignedCookies } = require('./util/signedCookies')

const isDev = process.env.NODE_ENV === 'development'

const app = express()

app.set('view engine', 'pug')
app.set('views', 'template')

app.use(cookieParser(cookieSecret))
app.use(express.json())
app.use(express.static('public'))

if (isDev) {
    app.use(middleware(compiler))
}

app.use('/api', require('./server/routes'))

// app.use((req, res, next) => {
//     const cookie = req.cookies
//     const gamecookie = req.signedCookies
//     console.log({ cookie, gamecookie })
//     next()
// })

app.get('*', (req, res) => {
    res.render('index')
})

const server = http.createServer(app)
const io = require('socket.io')(server)

io.use((socket, next) => {
    // const username = socket.handshake.auth.username
    let gameRoom, userInfo
    try {
        gameRoom = parseSignedCookies(socket.handshake.headers.cookie, cookieSecret, gameCookieName)
        userInfo = parseSignedCookies(socket.handshake.headers.cookie, cookieSecret, cookieName)
    } catch (e) {
        console.error(e)
    }

    if (gameRoom !== undefined) {
        socket.gameRoom = gameRoom
    }

    if (userInfo !== undefined) {
        socket.username = userInfo.username
        socket.info = { color: userInfo.color }
    }
    next()
})

const getUsers = () => {
    const users = []
    for (let [id, socket] of io.of('/').sockets) {
        users.push({
            userId: id,
            username: socket?.username,
            color: socket?.info?.color,
        })
    }
    return users
}

const buzzer = {
    hasWinner: false,
}

io.on('connection', (socket) => {
    io.emit('users', getUsers())

    socket.onAny((event, ...args) => {
        console.log(event, args)
    })

    socket.on('buzzer', () => {
        if (!buzzer.hasWinner) {
            buzzer.hasWinner = true
            io.emit('winner', socket.id)
        }
    })
    socket.on('logout', () => {
        console.log('io logout')
    })

    socket.on('reset_buzzer', () => {
        buzzer.hasWinner = false
        io.emit('winner', null)
    })

    socket.on('disconnect', () => {
        io.emit('users', getUsers())
        console.log('user disconnected')
    })
})

server.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`)
})
