class UserSocket {
    constructor(io, socket) {
        this.io = io
        this.socket = socket
    }

    getUsers({ msg, to }) {
        if (to) {
            return this.io.to(to).emit('users', msg)
        }
        return this.io.emit('users', msg)
    }

    me() {
        return this.io.emit('me', this.socket.info)
    }

    async changeInfo(info) {
        this.socket.info = {
            ...this.socket.info,
            gameRoom: info.gameRoom,
            username: info.username,
            color: info.color,
        }
        this.me()
    }

    handlers() {
        return {
            user_me: this.me,
            user_getUsers: this.getUsers,
        }
    }
}

module.exports = UserSocket
