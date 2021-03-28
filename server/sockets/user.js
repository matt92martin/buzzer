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
}

module.exports = UserSocket
